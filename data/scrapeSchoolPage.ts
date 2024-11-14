import { JSDOM } from "jsdom";
import { assert } from "console";
import * as fs from "fs";
import OpenAI from "openai";

import { schoolListFilePath } from "./shared";

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// extract street addresses from text using OpenAI GPT-3
async function extractStreetAddresses(userText: string): Promise<string[]> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "Extract street addresses from the user text, expanding abbreviations (e.g., st., ave. to street, avenue). List the extracted addresses one per line.",
        },
        {
          role: "user",
          content: userText,
        },
      ],
      temperature: 0, // Set to 0 for deterministic output
      max_tokens: 250, // Adjust token limit based on expected response length
    });

    // Extract the addresses from the API response
    const completion = response.choices[0].message?.content;
    if (completion) {
      // Split the response by lines and trim whitespace to get clean addresses
      const addresses = completion
        .split("\n")
        .map((address) => address.trim())
        .filter((address) => address.length > 0);
      return addresses;
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error extracting addresses:", error);
    return [];
  }
}

// create a school stub from a URL stub
// ex. /schools/abraham-lincoln-high-school => abraham-lincoln-high-school
function schoolStubFromUrlStub(urlStub: string): string | undefined {
  if (urlStub) {
    const parts = urlStub.split("/");
    return parts[parts.length - 1].trim();
  } else return undefined;
}

// generate URL to the school directory page from page number
function UrlFromPageNumber(index: number): string {
  assert(index < 13);
  if (index === 0) return `https://www.sfusd.edu/schools/directory`;
  else return `https://www.sfusd.edu/schools/directory?page=${index}`;
}

async function processSchoolSlat(slat: Element) {
  // extract school image if available
  let image = null;
  const img = slat.querySelector("img");
  if (img) {
    const imageStub = img.getAttribute("src") || undefined;
    image = {
      src: imageStub ? `https://www.sfusd.edu${imageStub}` : null,
      width: img.getAttribute("width") || "",
      height: img.getAttribute("height") || "",
    };
  }

  // extract title and primary URL
  let schoolUrlStub = null;
  let schoolLabel = null;
  const title = slat.querySelector(".school-slat_title>a");
  if (title) {
    schoolUrlStub = title.getAttribute("href") || "";
    schoolLabel = title.textContent?.trim() || "";
  }

  // extract subtitle
  const [gradesLabel, gradesCodeString] = (
    slat.querySelector(".school-slat_subtitle")?.textContent?.trim() || ""
  ).split(/[\(\)]/, 2);

  // extract school "details"
  let neighborhood = null;
  let principal = null;
  let address = null;
  let phone = null;

  const schoolDetails = Array.from(
    slat.querySelectorAll("ul.school-slat_details>li"),
  );

  schoolDetails.forEach((schoolDetail) => {
    const label =
      schoolDetail
        .querySelector("span.slat-footer_label")
        ?.textContent?.trim()
        .toLowerCase() || null;
    if (label) {
      const value =
        schoolDetail
          .querySelector("span.slat-footer_value")
          ?.textContent?.trim() || null;

      if (label.startsWith("neighborhood")) neighborhood = value;
      if (label.startsWith("principal")) principal = value;
      if (label.startsWith("address")) address = value;
      if (label.startsWith("phone")) phone = value;
    }
  });

  // extract addresses from address string
  const locations = address ? await extractStreetAddresses(address) : [];

  // calculate schoolStub
  const schoolStub = schoolUrlStub
    ? schoolStubFromUrlStub(schoolUrlStub)
    : null;

  return {
    schoolStub,
    schoolUrl: `https://www.sfusd.edu${schoolUrlStub}`,
    schoolLabel,
    image,
    gradesLabel: gradesLabel.trim(),
    gradeCodes: gradesCodeString?.split(",").map((code) => code.trim()),
    neighborhood,
    principal,
    locations,
    phone,
  };
}

async function processPage(index: number) {
  const url = UrlFromPageNumber(index);

  const response = await fetch(url);
  const html = await response.text();

  const dom = new JSDOM(html);
  const document = dom.window.document;

  const schoolSlats = Array.from(document.querySelectorAll("div.school-slat"));
  const schoolResults = schoolSlats.map(async (school) => {
    const result = await processSchoolSlat(school);
    return result;
  });

  return Promise.all(schoolResults);
}

async function processPages() {
  const results = [];
  for (let index = 0; index < 13; index++) {
    // throttle the fetches to avoid DOS
    if (index !== 0) await new Promise((resolve) => setTimeout(resolve, 5000));
    console.log(
      `processing page ${index + 1} of ${13}: https://www.sfusd.edu/schools/directory${index === 0 ? "" : `?page=${index}`}`,
    );
    const result = await processPage(index);
    results.push(...result);
  }
  return results;
}

processPages()
  .then((results) => {
    if (results) {
      console.log(`writing results to ${schoolListFilePath}`);
      fs.writeFileSync(schoolListFilePath, JSON.stringify(results, null, 2), {
        encoding: "utf-8",
      });
      console.log("done.");
    }
  })
  .catch((err) => {
    console.error("something went wrong!", err);
  });

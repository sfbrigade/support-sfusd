import { JSDOM } from "jsdom";
import OpenAI from "openai";

import { readSchoolList, SchoolProfile, writeSchoolList } from "./shared";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function generateProfile(articleText: string) {
  if (articleText.length < 1) return {};

  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content: [
          {
            type: "text",
            text: "You are a marketing expert helping the user construct a compelling description of a school based on text input extracted from a webpage. The overview should be a one or two sentence overview of the school. Create 3-5 bullet points of the most compelling aspects of the school. Extract the programs described in the text creating a name and description for each. Return the result as a JSON object based on the provided schema.",
          },
        ],
      },
      {
        role: "user",
        content: [{ type: "text", text: articleText }],
      },
    ],
    temperature: 1,
    max_tokens: 2048,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    response_format: {
      type: "json_schema",
      json_schema: {
        name: "schema_overview",
        strict: true,
        schema: {
          type: "object",
          properties: {
            overview: {
              type: "string",
              description:
                "A compelling overview of the school expressed in one or two sentences.",
            },
            bullets: {
              type: "array",
              description:
                "A list of the most compelling aspects of the school summarized in bullet points.",
              items: {
                type: "string",
              },
            },
            programs: {
              type: "array",
              description: "A list of available programs.",
              items: {
                type: "object",
                properties: {
                  name: {
                    type: "string",
                    description: "The name of the program.",
                  },
                  description: {
                    type: "string",
                    description: "A detailed description of the program.",
                  },
                },
                required: ["name", "description"],
                additionalProperties: false,
              },
            },
          },
          required: ["overview", "bullets", "programs"],
          additionalProperties: false,
        },
      },
    },
  });

  const profile = {
    model: response.model,
    ...JSON.parse(response.choices[0].message.content || ""),
  };

  return profile;
}

async function extractDetails(url: string): Promise<SchoolProfile> {
  const response = await fetch(url);
  const html = await response.text();

  const dom = new JSDOM(html);
  const document = dom.window.document;
  const items = document.querySelectorAll("li.field-item");

  let enrollment: string | undefined = undefined;
  let schoolCode: string | undefined = undefined;

  items.forEach((item) => {
    const name = item.querySelector(".field-item_name")?.textContent?.trim();
    const value = item.querySelector(".field-item_value")?.textContent?.trim();

    if (name?.toLowerCase().includes("enrollment"))
      enrollment = value || undefined;
    if (name?.toLowerCase().includes("school code"))
      schoolCode = value || undefined;
  });

  // process text
  const articleText =
    document
      .querySelector("div.section-school-tabs_content")
      ?.textContent?.trim()
      .replace(/\s+/g, " ") || "";

  const ytLinks = Array.from(document.querySelectorAll("iframe"))
    .map((frame) => frame?.getAttribute("src") || "")
    .filter((url) => url?.includes("youtube"));

  const ytCodes = ytLinks
    .map((link) => {
      const [base] = link?.split("?");
      return base.split("/").at(-1) || "";
    })
    .filter((code) => code.length !== 0);

  const generatedProfile = await generateProfile(articleText);

  return { enrollment, schoolCode, ytLinks, ytCodes, generatedProfile };
}

// extractDetails("https://www.sfusd.edu/school/ap-giannini-middle-school")
//   .then(() => {
//     console.log("done.");
//   })
//   .catch(console.error);

async function main() {
  const schoolList = readSchoolList();
  for (const school of schoolList) {
    console.log(
      `extracting details and generating profile for ${school.schoolUrl}`,
    );
    const details = await extractDetails(school.schoolUrl);
    Object.assign(school, details);
  }
  writeSchoolList(schoolList);
}

main()
  .then(() => {
    console.log("done.");
  })
  .catch(console.error);

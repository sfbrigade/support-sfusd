// TODO: this needs a serious refactor. It's a mess. Use the shared library. This is gross.

// import fetch from "node-fetch";
import { JSDOM } from "jsdom";
import * as fs from "fs";

const schoolListFileName = "./schoolList.json";

type SchoolRecord = {
  schoolStub: string;
  schoolName: string;
  gradesLabel: string;
  gradeCodes: string[];
  address: string;
};

function schoolURLFromStub(stub: string): string {
  return `https://www.sfusd.edu${stub}`;
}

// fetch and parse data from the HTML table: https://www.sfusd.edu/schools/directory/table
async function fetchAndParseSFUSD() {
  const response = await fetch("https://www.sfusd.edu/schools/directory/table");
  const html = await response.text();

  const dom = new JSDOM(html);
  const document = dom.window.document;

  const tableRows = document.querySelectorAll("tr");

  const schoolData = Array.from(tableRows)
    .map((row) => {
      const schoolName =
        row.querySelector("td.views-field-title a")?.textContent?.trim() || "";

      const schoolStub =
        (
          row.querySelector("td.views-field-title a") as HTMLAnchorElement
        )?.href?.trim() || "";

      const [gradesLabel, gradesCodeString] = (
        row.querySelector("td.views-field-nothing-1")?.textContent?.trim() || ""
      ).split(/[\(\)]/, 2);

      const address =
        row.querySelector("td.views-field-nothing")?.textContent?.trim() || "";

      return {
        schoolStub,
        schoolName,
        gradesLabel: gradesLabel.trim(),
        gradeCodes: gradesCodeString?.split(",").map((code) => code.trim()),
        address: address.replace(/\s+/g, " ").trim(),
      };
    })
    .filter((school) => school.schoolName !== "");

  return schoolData as SchoolRecord[];
}

async function readSchoolListFromFile(): Promise<SchoolRecord[] | undefined> {
  const buffer = fs.readFileSync(schoolListFileName, { encoding: "utf-8" });
  try {
    const schoolRecords: SchoolRecord[] = JSON.parse(buffer);
    return schoolRecords;
  } catch (parseError) {
    console.error("error parsing file", parseError);
    return undefined;
  }
}

async function fetchSchoolDetails() {
  const schoolList = await readSchoolListFromFile();
  console.log(`${schoolList?.length} schools read from ${schoolListFileName}`);

  schoolList?.forEach((school, index, schoolList) => {
    console.log(
      `fetching school details ${index + 1} of ${schoolList.length}: ${school.schoolName} (${school.schoolStub})`,
    );

    const schoolURL = schoolURLFromStub(school.schoolStub);
    console.log(`fetching ${schoolURL}`);
  });
}

// create schoolList.json
// fetchAndParseSFUSD()
//   .catch((err) => console.error("Error fetching and parsing data:", err))
//   .then((data) => {
//     if (data)
//       fs.writeFileSync(schoolListFileName, JSON.stringify(data), {
//         encoding: "utf-8",
//       });
//     console.log("done.");
//   });

fetchSchoolDetails()
  .then(() => {
    console.log("done.");
  })
  .catch((err) => {
    console.error("something went wrong!", err);
  });

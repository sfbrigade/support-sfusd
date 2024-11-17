// document.querySelector(".site-logo>img").getAttribute("src")
import { JSDOM } from "jsdom";

import {
  readSchoolList,
  SchoolProfile,
  writeSchoolList,
  downloadImage,
  schoolStubFromUrlStub,
  SchoolLogo,
  extractExtensionFromUrl,
  sleep,
} from "./shared";

const dosDelay = 3000; // mercy mode - 3 second delay between fetches (avoid DOS)

async function extractLogoDetails(url: string): Promise<SchoolLogo> {
  const response = await fetch(url);
  const html = await response.text();

  const dom = new JSDOM(html);
  const document = dom.window.document;

  const logoElement = document.querySelector(".site-logo>img");
  const logoUrl: string = logoElement?.getAttribute("src") || "";
  const logoAltText: string = logoElement?.getAttribute("alt") || "";
  const filePath = `public/school_img/logo/${schoolStubFromUrlStub(url)}.${extractExtensionFromUrl(logoUrl)}`;

  return { logoUrl, logoAltText, filePath };
}

// extractLogoDetails("https://www.sfusd.edu/school/ap-giannini-middle-school")
//   .then((details) => {
//     console.log(JSON.stringify(details, null, 2));
//     console.log("done.");
//   })
//   .catch(console.error);

async function main() {
  const schoolList = readSchoolList();
  for (const school of schoolList) {
    console.log(`extracting logo for ${school.schoolUrl}`);
    const logo = await extractLogoDetails(school.schoolUrl);
    if (logo.logoUrl !== "") {
      Object.assign(school, { logo });
      await sleep(dosDelay, true);
      await downloadImage(logo.logoUrl, logo.filePath);
    }
  }
  writeSchoolList(schoolList);
}

main()
  .then(() => {
    console.log("done.");
  })
  .catch(console.error);

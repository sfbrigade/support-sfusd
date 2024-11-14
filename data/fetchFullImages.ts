// fetchFullImages.ts
// Purpose: fetch full-size images for each school in the school list

import {
  readSchoolList,
  schoolListFilePath,
  sleep,
  extractExtensionFromUrl,
  downloadImage,
  writeSchoolList,
} from "./shared";

const dosDelay = 3000; // mercy mode - 3 second delay between fetches (avoid DOS)

async function downloadFullImages() {
  if (dosDelay > 100)
    console.warn(
      `mercy mode enabled - expect roughly ${dosDelay}ms delay between fetches ...`,
    );

  const schoolList = readSchoolList();

  for (const school of schoolList) {
    const src = school.image?.src || "";
    const ext = extractExtensionFromUrl(src);
    const filePath =
      ext && ext.length > 1
        ? `public/school_img/${school.schoolStub}.${ext}`
        : "";

    // update the schoolList with the new image path
    if (school.image) school.image.filePath = filePath;

    if (src.length > 1 && filePath.length > 1) {
      await sleep(dosDelay, true);
      console.log(`storing ${src} as ${filePath}`);
      await downloadImage(src, filePath);
    }
  }

  // rewrite the schoolList file with the new image paths
  console.log(`writing results to ${schoolListFilePath}`);
  writeSchoolList(schoolList);
}

function main() {
  downloadFullImages()
    .then(() => {
      console.log("done.");
    })
    .catch(console.error);
}

main();

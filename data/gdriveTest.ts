// an attempt to extract school data directly from the SARCS PDFs
// using the Google Drive API
//
// This test is on-hold since the SFUSD data may be available
// in a more structured format from:
// https://caaspp-elpac.ets.org/caaspp/ResearchFileListSB?ps=true&lstTestYear=2024&lstTestType=B&lstCounty=38&lstDistrict=68478-000&lstFocus=b

import { google } from "googleapis";

async function listFilesInFolder(folderId: string) {
  // Initialize client
  const auth = new google.auth.GoogleAuth({
    keyFile: "data/sfusd-data-secretkey.json", // replace with your JSON key file
    scopes: ["https://www.googleapis.com/auth/drive"],
  });

  const drive = google.drive({ version: "v3", auth });

  // grab the file list
  const res = await drive.files.list({
    q: `'${folderId}' in parents`,
    fields: "files(id, name)",
  });

  const files = res.data.files;
  if (files && files.length > 0) {
    // grab the right file (hopefully)
    const candidateFiles = files.filter(
      (file) =>
        file.name &&
        file.name.toLowerCase().includes("eng") &&
        file.name.toLowerCase().includes("23"),
    );

    candidateFiles.forEach((file) => {
      console.log(`${file.name} (${file.id})`);
    });
  } else {
    console.log("No files found.");
  }
}

// Call the function with the folder ID
listFilesInFolder("1AwM5P8Pf3JqhqqAy8aRELwyqtdK6ew4W")
  .then(() => {
    console.log("done");
  })
  .catch(console.error);

// grab the right file
// Select and Read a File: Once you’ve listed files, you can use their IDs to download or read specific files. The drive.files.get method with alt: 'media' can be used to fetch file content.

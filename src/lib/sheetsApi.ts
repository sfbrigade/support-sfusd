import {
  GoogleAuth,
  JSONClient,
} from "google-auth-library/build/src/auth/googleauth";
import { google } from "googleapis";

function getGoogleAuthCredentials() {
  const scopes = [
    "https://www.googleapis.com/auth/spreadsheets.readonly",
    "https://www.googleapis.com/auth/drive.readonly",
  ];

  const credentials = JSON.parse(
    process.env.GOOGLE_SERVICE_ACCOUNT_CREDENTIALS || "{}",
  );

  if (!credentials || !Object.keys(credentials).length) {
    console.warn("Google API credentials not properly configured");
  }

  return new google.auth.GoogleAuth({
    credentials,
    scopes,
  });
}

export async function getSheetValues(name: string, range: string) {
  try {
    const auth = getGoogleAuthCredentials();
    const sheets = google.sheets({ version: "v4", auth });

    const sheetId = await getSpreadsheetIdByName(name, auth);
    if (!sheetId) {
      throw new Error(`Spreadsheet with name "${name}" not found`);
    }

    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range,
    });

    return res.data.values || [];
  } catch (error) {
    console.error(
      `Error fetching sheet values: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
    throw error;
  }
}

async function getSpreadsheetIdByName(
  name: string,
  auth: GoogleAuth<JSONClient>,
) {
  try {
    const drive = google.drive({ version: "v3", auth });
    const res = await drive.files.list({
      q: `name='${name}' and mimeType='application/vnd.google-apps.spreadsheet' and trashed=false`,
      fields: "files(id, name)",
    });

    const file = res.data.files?.[0];
    if (!file?.id) {
      console.warn(`No spreadsheet found with name "${name}"`);
      console.warn(
        `Confirm ${name} exists and is accessible by the service account`,
      );

      return null;
    }

    return file.id;
  } catch (error) {
    console.error(
      `Error finding spreadsheet: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
    throw error;
  }
}

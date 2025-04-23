import * as fs from "fs";
import * as path from "path";
import sharp from "sharp";
import { google } from "googleapis";

/**
 * Options for converting a file, typically parsed from the filename.
 */
export type FileConversionOptions = {
  /** The target path for the converted file. */
  targetPath: string;
  /** Target width for image resizing. */
  w?: number;
  /** Target height for image resizing. */
  h?: number;
  /** Target file type (extension) for conversion. */
  t?: string;
};

/**
 * Represents a file found in Google Drive, including conversion options.
 */
export type DriveFile = {
  /** Google Drive file ID. */
  id: string;
  /** Original filename in Google Drive. */
  name: string;
  /** MIME type of the file in Google Drive. */
  mimeType: string;
  /** Original path of the file within the scanned Drive folder structure. */
  path: string;
} & FileConversionOptions;

/**
 * Creates a promise that resolves after a specified delay.
 * @param ms The delay time in milliseconds.
 * @returns A promise that resolves after the delay.
 */
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Retrieves Google Authentication credentials from environment variables.
 * @returns A configured GoogleAuth instance.
 * @throws Error if credentials are not properly configured.
 */
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

/**
 * Replaces the extension of a file path with a new one.
 * @param filePath The original file path.
 * @param newExt The new extension (e.g., ".jpg", "png").
 * @returns The file path with the replaced extension.
 */
function replaceExtension(filePath: string, newExt: string): string {
  const parsed = path.parse(filePath);
  return path.format({
    ...parsed,
    base: undefined, // avoid overriding `name + ext`
    ext: newExt.startsWith(".") ? newExt : `.${newExt}`,
  });
}

/**
 * Parses a filepath string potentially containing conversion options
 * embedded in directory or file names (e.g., "images/logo--w 100--h 50--t jpg/logo.png").
 * Options are specified after "--" and separated by spaces (key value).
 * @param filepath The filepath string to parse.
 * @returns An object containing the parsed options and the cleaned target path.
 */
function parseFilepath(filepath: string): FileConversionOptions {
  const parts = filepath.split("/").filter((part) => part !== "");
  const options: Omit<FileConversionOptions, "targetPath"> & {
    [key: string]: string | number | undefined;
  } = {};
  const targetPathParts: string[] = [];

  parts.forEach((part) => {
    const fnparts = part.split("--");
    const [pathname, ...args] = fnparts;
    targetPathParts.push(pathname); // Add the actual path part

    args.forEach((arg) => {
      const [key, ...valueParts] = arg.trim().split(" "); // Split key and potential multi-word value
      const value = valueParts.join(" ").trim(); // Rejoin value parts and trim

      if (key && value) {
        // Convert known numeric types
        if (key === "w" || key === "h") {
          const numValue = parseInt(value, 10);
          if (!isNaN(numValue)) {
            options[key] = numValue;
          }
        } else {
          options[key] = value;
        }
      }
    });
  });

  let targetPath = targetPathParts.join("/");

  if ("t" in options)
    targetPath = replaceExtension(targetPath, options["t"] as string);

  return {
    ...options,
    targetPath,
  };
}

/**
 * Recursively walks a Google Drive folder structure starting from a given folder ID.
 * @param folderId The ID of the Google Drive folder to start walking from.
 * @param currentPath The current path string being built during recursion.
 * @returns A promise that resolves with an array of DriveFile objects found.
 */
async function walkFolder(
  folderId: string,
  currentPath: string,
): Promise<DriveFile[]> {
  const drive = google.drive({
    version: "v3",
    auth: getGoogleAuthCredentials(),
  });

  const results: DriveFile[] = [];

  let pageToken: string | undefined = undefined;
  do {
    const res: any = await drive.files.list({
      q: `'${folderId}' in parents and trashed = false`,
      fields: "nextPageToken, files(id, name, mimeType)",
      spaces: "drive",
      pageToken,
    });
    delay(200); // delay to avoid hitting the GAPI too hard

    for (const file of res.data.files || []) {
      const filePath = `${currentPath}/${file.name}`;
      if (file.mimeType === "application/vnd.google-apps.folder") {
        const children = await walkFolder(file.id!, filePath);
        results.push(...children);
      } else {
        results.push({
          id: file.id!,
          name: file.name!,
          mimeType: file.mimeType!,
          path: filePath,
          ...parseFilepath(filePath),
        });
      }
    }

    pageToken = res.data.nextPageToken!;
  } while (pageToken);

  return results;
}

/**
 * Finds the Google Drive folder ID for a given folder name.
 * Returns the ID of the first matching folder found.
 * @param folderName The name of the folder to search for.
 * @returns A promise that resolves with the folder ID.
 * @throws Error if no folder with the given name is found.
 */
async function getFolderIdByName(folderName: string): Promise<string> {
  const drive = google.drive({
    version: "v3",
    auth: getGoogleAuthCredentials(),
  });

  try {
    const res = await drive.files.list({
      q: `mimeType='application/vnd.google-apps.folder' and name='${folderName}' and trashed=false`,
      fields: "files(id, name)",
      spaces: "drive",
    });

    const folders = res.data.files!;
    if (folders.length === 0)
      throw new Error(`No folder named "${folderName}" found`);
    if (folders.length > 1)
      console.warn(
        `Multiple folders named "${folderName}" found, using the first`,
      );

    return folders[0].id!;
  } catch (error) {
    console.error(`Error finding folder "${folderName}":`, error);
    throw error;
  }
}

/**
 * Downloads the content of a Google Drive file.
 * @param googleDriveFileId The Google file id representing the file to download.
 * @returns A Promise that resolves with the file content as a Buffer.
 */
export async function downloadDriveFile(
  googleDriveFileId: string,
): Promise<Buffer> {
  const drive = google.drive({
    version: "v3",
    auth: getGoogleAuthCredentials(),
  });

  try {
    const response = await drive.files.get(
      {
        fileId: googleDriveFileId,
        alt: "media",
      },
      { responseType: "arraybuffer" },
    );

    const arrayBuffer = response.data as ArrayBuffer;
    return Buffer.from(arrayBuffer); // Convert ArrayBuffer to Node.js Buffer
  } catch (error) {
    console.error(
      `Error downloading Google Drive file id ${googleDriveFileId}):`,
      error,
    );
    throw error;
  }
}

/**
 * Scans a Google Drive folder recursively and returns metadata for all files found within it,
 * including parsed conversion options from file/folder names.
 * @param folderName Name of the root folder in Google Drive to scan.
 * @returns A promise that resolves with an array of DriveFile objects.
 */
export async function scanDriveFolder(
  folderName: string,
): Promise<DriveFile[]> {
  try {
    const rootId = await getFolderIdByName(folderName);
    const rateLimit = 300; // 300ms delay between requests

    // Modify walkFolder to respect rate limiting
    const walkWithRateLimit = async (
      folderId: string,
      currentPath: string,
      depth = 0,
    ): Promise<DriveFile[]> => {
      if (rateLimit > 0 && depth > 0) {
        await delay(rateLimit); // Delay for rate limiting
      }

      const results = await walkFolder(folderId, currentPath);

      return results;
    };

    const files = await walkWithRateLimit(rootId, "");
    return files;
  } catch (error) {
    console.error("Error scanning Drive folder:", error);
    throw error;
  }
}

/**
 * Synchronizes files from a specified Google Drive folder to a local target folder.
 * It scans the Drive folder, downloads each file, applies transformations (resize, type change)
 * based on parsed options from filenames/paths, and saves them to the target directory.
 * @param sourceFolder The name of the source folder in Google Drive.
 * @param targetFolder The local path where files should be saved. Defaults to "./".
 */
export async function syncDriveFiles(
  sourceFolder: string,
  targetFolder: string = "./",
) {
  try {
    const files = await scanDriveFolder(sourceFolder);

    for (const file of files) {
      const targetFilePath = path.join(targetFolder, file.targetPath);
      const targetDir = path.dirname(targetFilePath);

      console.log(
        `Syncing ${file.name} to ${targetFilePath} // id: ${file.id}, w: ${file.w}, h: ${file.h}, t: ${file.t}`,
      );

      // create the target path if needed
      if (!fs.existsSync(targetDir)) {
        console.log(
          `Target location does not exist. Creating folder ${targetDir}`,
        );
        fs.mkdirSync(targetDir, { recursive: true });
      }

      // download the image from Google Drive
      delay(200); // delay to avoid hitting the GAPI too hard
      const imgBuffer = await downloadDriveFile(file.id);

      let sharpInstance = sharp(imgBuffer);

      // Apply resize if dimensions are specified
      if (file.w || file.h) {
        sharpInstance = sharpInstance.resize(file.w || null, file.h || null);
      }

      // Save the image (potentially resized)
      await sharpInstance.toFile(targetFilePath); // Use targetFilePath directly
    }
  } catch (error) {
    console.error("Failed to sync images:", error);
    throw error;
  }
}

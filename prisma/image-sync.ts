/**
 * This script synchronizes files from a specified Google Drive folder
 * to a local directory. It's intended to be run from the command line or npm script.
 * It loads environment variables from .env and .env.local files before
 * initiating the synchronization process using the syncDriveFiles function.
 */
import * as fs from "fs";
import * as path from "path";
import dotenv from "dotenv";
import { syncDriveFiles } from "@/lib/googleDriveApi";

if (require.main === module) {
  // Load base .env file for environment variables.
  dotenv.config({ path: path.resolve(process.cwd(), ".env") });
  // Check if a local override file (.env.local) exists.
  const localEnvPath = path.resolve(process.cwd(), ".env.local");
  if (fs.existsSync(localEnvPath)) {
    // Load .env.local, overriding any variables defined in the base .env file.
    dotenv.config({ path: localEnvPath });
  }

  // Immediately invoked async function (IIAF) to run the synchronization.
  (async () => {
    // Call the syncDriveFiles function with the source Google Drive folder name
    // and the target local directory path.
    await syncDriveFiles("image_sync", "public/sync");
  })();
}

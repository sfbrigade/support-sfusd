import * as fs from "fs";
import * as path from "path";
import dotenv from "dotenv";
import { syncDriveFiles } from "@/lib/googleDriveApi";

if (require.main === module) {
  // Load base .env and if .env.local exists, load it and override
  dotenv.config({ path: path.resolve(process.cwd(), ".env") });
  const localEnvPath = path.resolve(process.cwd(), ".env.local");
  if (fs.existsSync(localEnvPath)) {
    dotenv.config({ path: localEnvPath });
  }

  (async () => {
    await syncDriveFiles("public-sync", "public/sync");
  })();
}

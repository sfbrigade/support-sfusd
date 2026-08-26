import { postgresAdapter } from "@payloadcms/db-postgres";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
import path from "node:path";
import { buildConfig } from "payload";
import sharp from "sharp";
import { Media } from "./collections/Media.ts";
import { Opportunities } from "./collections/Opportunities.ts";
import { Users } from "./collections/Users.ts";

const payloadDatabaseURL =
  process.env.PAYLOAD_DATABASE_URL ||
  process.env.POSTGRES_URL_NON_POOLING ||
  "";
const useVercelBlobStorage =
  process.env.VERCEL === "1" && process.env.NODE_ENV !== "development";
const vercelBlobToken = process.env.BLOB_READ_WRITE_TOKEN;

if (useVercelBlobStorage && !vercelBlobToken) {
  throw new Error(
    "BLOB_READ_WRITE_TOKEN is required for Payload media storage on Vercel.",
  );
}

export default buildConfig({
  admin: {
    importMap: {
      baseDir: path.resolve(process.cwd(), "src"),
    },
    user: Users.slug,
  },
  collections: [Users, Media, Opportunities],
  db: postgresAdapter({
    migrationDir: path.resolve(process.cwd(), "src", "migrations"),
    pool: {
      connectionString: payloadDatabaseURL,
    },
    // Payload owns this schema; Prisma continues to own the public schema.
    schemaName: "payload",
  }),
  plugins: [
    vercelBlobStorage({
      addRandomSuffix: true,
      clientUploads: true,
      collections: {
        [Media.slug]: true,
      },
      enabled: useVercelBlobStorage,
      token: vercelBlobToken,
    }),
  ],
  secret: process.env.PAYLOAD_SECRET || "",
  sharp,
  typescript: {
    outputFile: path.resolve(process.cwd(), "src", "payload-types.ts"),
  },
});

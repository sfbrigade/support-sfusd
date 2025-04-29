/**
 * Prisma Database Export Script
 *
 * This script connects to the database using Prisma and exports all school records
 * along with their related profile, metrics, and programs data to a JSON file.
 *
 * Usage: `npx tsx prisma-dump.ts`
 * Output: Creates or overwrites `prisma-dump.json` in the current directory
 */
import prisma from "@/lib/prisma";
import * as fs from "fs";

/**
 * Main function to export school data from the database
 */
async function exportSchoolData() {
  try {
    console.log("Connecting to database and fetching school records...");

    const schools = await prisma.school.findMany({
      include: {
        // profile: true, (profile table removed)
        metrics: true,
        programs: true,
      },
    });

    if (schools.length === 0) {
      console.warn("Warning: No school records found in the database.");
    }

    // Write data to file
    const outputPath = "prisma-dump.json";
    fs.writeFileSync(outputPath, JSON.stringify(schools, null, 2));

    console.log(
      `Success: Exported ${schools.length} school records to ${outputPath}`,
    );
    return true;
  } catch (error) {
    console.error("Error exporting school data:");
    console.error(error);
    return false;
  } finally {
    // Ensure Prisma connection is properly closed
    await prisma.$disconnect();
  }
}

// Execute the export function
exportSchoolData()
  .then((success) => {
    process.exit(success ? 0 : 1);
  })
  .catch((error) => {
    console.error("Unhandled error in export process:", error);
    process.exit(1);
  });

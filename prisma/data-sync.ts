import * as fs from "fs";
import * as path from "path";
import dotenv from "dotenv";
import { getSheetValues } from "@/lib/sheetsApi";

function arrayToObjects(data: string[][]): Record<string, string>[] {
  if (!data.length || !data[0].length) return [];
  const [headers, ...rows] = data;
  return rows.map((row) => {
    if (row.length < headers.length) {
      console.warn("Row has fewer values than headers:", row);
    }

    return headers.reduce(
      (obj, header, index) => {
        if (row[index] !== "NULL") obj[header] = row[index];
        return obj;
      },
      {} as Record<string, string>,
    );
  });
}

function arrayToGroupedObjects(
  data: string[][],
  stubColumn: string = "stub",
): Record<string, Record<string, string>[]> {
  const [headers, ...rows] = data;
  const stubIndex = headers.indexOf(stubColumn);
  if (stubIndex === -1)
    throw new Error(`Stub column "${stubColumn}" not found in headers`);

  const valueHeaders = headers.filter((_, index) => index !== stubIndex);
  const grouped: Record<string, Record<string, string>[]> = {};

  rows.forEach((row) => {
    const stub = row[stubIndex] ?? "";
    if (!grouped[stub]) grouped[stub] = [];

    const obj = valueHeaders.reduce(
      (acc, header, idx) => {
        const rowIndex = headers.indexOf(header);
        if (row[rowIndex] !== "NULL") acc[header] = row[rowIndex];
        return acc;
      },
      {} as Record<string, string>,
    );

    grouped[stub].push(obj);
  });

  return grouped;
}

function mergeTables(
  master: Record<string, string>[],
  subtables: { name: string; data: Record<string, Record<string, string>[]> }[],
): Record<string, unknown>[] {
  return master.map((row) => {
    const merged: Record<string, unknown> = { ...row };
    subtables.forEach((subtable) => {
      merged[subtable.name] = subtable.data[row.stub] || [];
    });
    return merged;
  });
}

async function syncPrismaWithGoogleSheets() {
  // Load base .env and if .env.local exists, load it and override
  dotenv.config({ path: path.resolve(process.cwd(), ".env") });
  const localEnvPath = path.resolve(process.cwd(), ".env.local");
  if (fs.existsSync(localEnvPath)) {
    dotenv.config({ path: localEnvPath, override: true });
  }

  try {
    // load Google Sheets data
    const profile_rows = await getSheetValues("sfschools-scaled", "profiles");
    const metric_rows = await getSheetValues("sfschools-scaled", "metrics");
    const program_rows = await getSheetValues("sfschools-scaled", "programs");

    // Convert rows to objects
    const profiles = arrayToObjects(profile_rows);
    const metrics = arrayToGroupedObjects(metric_rows);
    const programs = arrayToGroupedObjects(program_rows);

    const rawSchools = mergeTables(profiles, [
      { name: "metrics", data: metrics },
      { name: "programs", data: programs },
    ]);

    // finishing touches - correct datatypes
    const schools = rawSchools.map((school: any) => {
      return {
        ...school,
        about_bp: school.about_bp.split("\n"),
        priority: school.priority === "TRUE",
        metrics: school.metrics.map((metric: any) => ({
          ...metric,
          value: parseFloat(metric.value),
        })),
        programs: school.programs.map((program: any) => ({
          ...program,
          img: program.img
            ? program.img.length > 0
              ? program.img
              : null
            : null,
        })),
      };
    });

    const outputFilePath = path.join(__dirname, "schools.json");
    fs.writeFileSync(outputFilePath, JSON.stringify(schools, null, 2));
  } catch (error) {
    console.error("Error syncing with Google Sheets:", error);
    throw error;
  }
}

console.log("Syncing Prisma schema with Google Sheets...");
syncPrismaWithGoogleSheets()
  .then(() => {
    console.log("Sync completed successfully.");
  })
  .catch((error) => {
    console.error("Sync failed:", error);
  });

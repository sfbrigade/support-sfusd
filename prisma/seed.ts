import { MetricCategory, PrismaClient, ProgramCategory } from "@prisma/client";
import * as fs from "fs";

const prisma = new PrismaClient();

async function main() {
  const schools = JSON.parse(fs.readFileSync("prisma/seed.json", "utf-8"));
  for (const school of schools) {
    await prisma.school.create({
      data: school,
    });
  }
}

const scaled = process.argv.slice(2).some((str) => str === "--scaled");

if (!scaled) {
  console.log("seeding db with original dataset ...");
  main()
    .then(async () => {
      await prisma.$disconnect();
    })
    .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
      process.exit(1);
    });
} else {
  console.log(
    'TODO: seed db with "scaled" dataset - fake it till you make it!',
  );
}

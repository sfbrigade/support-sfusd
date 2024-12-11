import { MetricCategory, PrismaClient, ProgramCategory } from "@prisma/client";
import * as fs from "fs";

const prisma = new PrismaClient();

async function main(scaled: boolean) {
  const fn = scaled ? "prisma/seed_scale.json" : "prisma/seed.json";

  const schools = JSON.parse(fs.readFileSync(fn, "utf-8"));
  for (const school of schools) {
    await prisma.school.create({
      data: school,
    });
  }
}

const scaled = process.argv.slice(2).some((str) => str === "--scaled");
if (scaled) {
  console.log("Seeding scaled data");
} else {
  console.log("Seeding unscaled data");
}

main(scaled)
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

import { PrismaClient } from "@prisma/client";
import * as fs from "fs";

const prisma = new PrismaClient();

async function main() {
  const fn = "prisma/seed.json";

  const schools = JSON.parse(fs.readFileSync(fn, "utf-8"));
  for (const school of schools) {
    await prisma.school.create({
      data: school,
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

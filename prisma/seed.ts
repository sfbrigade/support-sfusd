import fs from "fs";
import path from "path";
import { MetricCategory, PrismaClient, ProgramCategory } from "@prisma/client";

const prisma = new PrismaClient();

function addPrismaCreateStatements(school: any) {
  const { metrics, programs, ...rest } = school;
  return {
    ...rest,
    metrics: { createMany: { data: metrics } },
    programs: { createMany: { data: programs } },
  };
}

/**
 * Generates an unsigned 32-bit hash value from a string using a simple
 * hash function algorithm based on the djb2 approach.
 *
 * The function iterates through each character of the input string,
 * multiplying the current hash by 31 and adding the character code,
 * then forcing it to a 32-bit signed integer with the bitwise OR operation.
 * Finally, it converts the result to an unsigned 32-bit integer.
 *
 * @param str - The input string to hash
 * @returns A 32-bit unsigned integer hash of the input string
 */
function djb2Hash(str: string): number {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) + hash + str.charCodeAt(i); // hash * 33 + char
  }
  return hash >>> 0; // Convert to unsigned 32-bit integer
}

/**
 * Get image file names from a subdirectory of /public/stock-images based
 * on the category name.
 * @param category subdirectory of /public/stock-images e.g. "HS/event"
 * @returns array of image file names
 */
const getImageFileNamesFromCategory = (category: string): string[] => {
  const dir = path.join(process.cwd(), `public/stock-images/${category}`);
  return fs
    .readdirSync(dir)
    .filter((file) => /\.(jpg|jpeg|png|gif|webp|avif)$/i.test(file))
    .map((file) => `/stock-images/${category}/${file}`);
};

// Get stock images for each school category
const hsStockEventImages = getImageFileNamesFromCategory("HS/event");
const hsStockTutoringImages = getImageFileNamesFromCategory("HS/tutoring");
const hsStockMentoringImages = getImageFileNamesFromCategory("HS/mentoring");

// Add random images to each program based on the program name
const addRandomImages = (school: any) => {
  school.programs.createMany.data.forEach((program: any) => {
    const programHashString = `**${school.name}**${school.address}**${program.name}**`;
    const programHash = djb2Hash(programHashString);
    if (program.category === ProgramCategory.volunteer) {
      if (program.name.toLowerCase().includes("tutor")) {
        program.img =
          hsStockTutoringImages[programHash % hsStockTutoringImages.length];
      } else if (
        program.name.toLowerCase().includes("mentor") ||
        program.name.toLowerCase().includes("career")
      ) {
        program.img =
          hsStockMentoringImages[programHash % hsStockMentoringImages.length];
      } else {
        // assume an EVENT type if not tutoring or mentoring
        program.img =
          hsStockEventImages[programHash % hsStockEventImages.length];
      }
    }
  });
};

async function main() {
  const schools = JSON.parse(
    fs.readFileSync(path.join(__dirname, "schools.json"), {
      encoding: "utf-8",
    }),
  );
  for (const school of schools) {
    // addRandomImages(school);
    await prisma.school.create({
      data: addPrismaCreateStatements(school),
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

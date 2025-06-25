-- CreateEnum
CREATE TYPE "SchoolType" AS ENUM ('elementary', 'middle', 'high');

-- AlterTable
ALTER TABLE "School" ADD COLUMN     "school_type" "SchoolType"[];

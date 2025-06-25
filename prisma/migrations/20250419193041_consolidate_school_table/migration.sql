/*
  Warnings:

  - You are about to drop the column `schoolId` on the `Metric` table. All the data in the column will be lost.
  - You are about to drop the column `schoolId` on the `Program` table. All the data in the column will be lost.
  - The primary key for the `School` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `School` table. All the data in the column will be lost.
  - You are about to drop the `SchoolProfile` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `stub` to the `Metric` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stub` to the `Program` table without a default value. This is not possible if the table is not empty.
  - Added the required column `about` to the `School` table without a default value. This is not possible if the table is not empty.
  - Added the required column `donation_text` to the `School` table without a default value. This is not possible if the table is not empty.
  - Added the required column `principal` to the `School` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stub` to the `School` table without a default value. This is not possible if the table is not empty.
  - Added the required column `volunteer_form_url` to the `School` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Metric" DROP CONSTRAINT "Metric_schoolId_fkey";

-- DropForeignKey
ALTER TABLE "Program" DROP CONSTRAINT "Program_schoolId_fkey";

-- DropForeignKey
ALTER TABLE "SchoolProfile" DROP CONSTRAINT "SchoolProfile_schoolId_fkey";

-- AlterTable
ALTER TABLE "Metric" DROP COLUMN "schoolId",
ADD COLUMN     "stub" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Program" DROP COLUMN "schoolId",
ADD COLUMN     "stub" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "School" DROP CONSTRAINT "School_pkey",
DROP COLUMN "id",
ADD COLUMN     "about" TEXT NOT NULL,
ADD COLUMN     "about_bp" TEXT[],
ADD COLUMN     "donation_text" TEXT NOT NULL,
ADD COLUMN     "donation_url" TEXT,
ADD COLUMN     "facebook_url" TEXT,
ADD COLUMN     "instagram_url" TEXT,
ADD COLUMN     "noteable_video" TEXT,
ADD COLUMN     "principal" TEXT NOT NULL,
ADD COLUMN     "stub" TEXT NOT NULL,
ADD COLUMN     "testimonial" TEXT,
ADD COLUMN     "testimonial_author" TEXT,
ADD COLUMN     "testimonial_img" TEXT,
ADD COLUMN     "testimonial_video" TEXT,
ADD COLUMN     "volunteer_form_url" TEXT NOT NULL,
ADD COLUMN     "website_url" TEXT,
ADD CONSTRAINT "School_pkey" PRIMARY KEY ("stub");

-- DropTable
DROP TABLE "SchoolProfile";

-- AddForeignKey
ALTER TABLE "Metric" ADD CONSTRAINT "Metric_stub_fkey" FOREIGN KEY ("stub") REFERENCES "School"("stub") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Program" ADD CONSTRAINT "Program_stub_fkey" FOREIGN KEY ("stub") REFERENCES "School"("stub") ON DELETE RESTRICT ON UPDATE CASCADE;

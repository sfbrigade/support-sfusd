-- CreateEnum
CREATE TYPE "MetricCategory" AS ENUM ('demographic', 'outcome');

-- CreateEnum
CREATE TYPE "ProgramCategory" AS ENUM ('volunteer', 'donate', 'enrichment', 'donation_funded', 'donors_choose');

-- CreateTable
CREATE TABLE "School" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "neighborhood" TEXT NOT NULL,
    "students" INTEGER,
    "frl" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "ell" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "ssn" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "priority" BOOLEAN NOT NULL DEFAULT false,
    "img" TEXT,
    "latitude" TEXT NOT NULL,
    "longitude" TEXT NOT NULL,

    CONSTRAINT "School_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SchoolProfile" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "schoolId" UUID NOT NULL,
    "about" TEXT NOT NULL,
    "mission" TEXT NOT NULL,
    "testimonial" TEXT,
    "principal" TEXT NOT NULL,
    "instagram_url" TEXT,
    "facebook_url" TEXT,
    "website_url" TEXT,

    CONSTRAINT "SchoolProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Metric" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "schoolId" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "percentage" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "category" "MetricCategory" NOT NULL,

    CONSTRAINT "Metric_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Program" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "schoolId" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "details" TEXT NOT NULL,
    "url" TEXT,
    "category" "ProgramCategory" NOT NULL,

    CONSTRAINT "Program_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SchoolProfile_schoolId_key" ON "SchoolProfile"("schoolId");

-- AddForeignKey
ALTER TABLE "SchoolProfile" ADD CONSTRAINT "SchoolProfile_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Metric" ADD CONSTRAINT "Metric_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Program" ADD CONSTRAINT "Program_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

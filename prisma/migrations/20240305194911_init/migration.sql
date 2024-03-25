-- CreateTable
CREATE TABLE "Schools" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "sf_district" TEXT NOT NULL,
    "students" DECIMAL,
    "free_reduced_lunch" TEXT,
    "ell" TEXT,
    "color" TEXT,
    "img" TEXT,
    "latitude" DECIMAL,
    "longitude" DECIMAL,

    CONSTRAINT "Schools_pkey" PRIMARY KEY ("id")
);

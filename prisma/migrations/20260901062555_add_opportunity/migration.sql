-- CreateTable
CREATE TABLE "Opportunity" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "organization" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "start_date" DATE,
    "end_date" DATE,
    "time_text" TEXT,
    "is_year_round" BOOLEAN NOT NULL DEFAULT false,
    "location" TEXT NOT NULL,
    "school_stub" TEXT,
    "is_test" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Opportunity_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Opportunity" ADD CONSTRAINT "Opportunity_school_stub_fkey" FOREIGN KEY ("school_stub") REFERENCES "School"("stub") ON DELETE SET NULL ON UPDATE CASCADE;

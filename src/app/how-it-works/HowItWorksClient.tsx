"use client";

import Image from "next/image";
import Link from "next/link";
import StepBox from "@/components/HowItWorks/StepBox";
import StepBoxMobile from "@/components/HowItWorks/StepBoxMobile";

const STEP_2 = {
  title: "We Match You with Opportunities",
  description:
    "Based on your responses we will connect you with our recommendation from our growing list of partner organizations, to set up a volunteer placement:",
};

export default function HowItWorksClient() {
  return (
    <>
      <section className="relative flex h-full flex-col overflow-hidden bg-[#D7F1FF]">
        {/* Center content */}
        <div className="z-10 flex flex-1 flex-col items-center justify-center px-4 pb-[5vh] text-center">
          <h1 className="mb-6 font-fredoka text-6xl font-semibold text-[#5B6FE8]">
            How It Works
          </h1>
          <p className="max-w-xl text-lg text-gray-800">
            Support SF Schools is run by an{" "}
            <Link
              href="https://www.sfcivictech.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              all-volunteer team at SF Civic Tech
            </Link>
            . We built this website to help San Francisco residents quickly and
            easily find ways to volunteer and donate to San Francisco public
            schools.
          </p>
          <div className="mt-10 flex flex-col items-center gap-1 font-semibold text-gray-800">
            <span>Start Here</span>
            <span className="text-xl">↓</span>
          </div>
        </div>

        {/* Hero background (desktop) — cable car + grass + Coit Tower */}
        <div className="absolute bottom-0 left-0 right-0 z-0 hidden h-[40vw] md:block">
          <Image
            src="/how-it-works/hero-bg.png"
            alt="San Francisco cable car and Coit Tower"
            fill
            className="object-contain object-bottom"
          />
        </div>

        {/* Hero background (mobile) */}
        <div className="absolute bottom-0 left-0 right-0 z-0 md:hidden">
          <Image
            src="/how-it-works/hero-bg-mobile.svg"
            alt="San Francisco cable car and Coit Tower"
            width={393}
            height={110}
            className="h-auto w-full"
          />
        </div>
      </section>

      {/* ===== Step 1 goes here ===== */}

      {/* ===== Step 2 — We Match You with Opportunities ===== */}
      <section className="w-full bg-[#D7F1FF]">
        {/* Desktop / tablet: full-width illustration with the step card overlaid on the right */}
        <div className="relative hidden w-full md:block">
          <Image
            src="/how-it-works/step02-matching.svg"
            alt="A schoolhouse and two volunteers being matched together"
            width={1440}
            height={486}
            className="h-auto w-full"
          />
          <div className="absolute right-[6%] top-1/2 w-[38%] max-w-[460px] -translate-y-1/2">
            <StepBox
              stepNumber={2}
              title={STEP_2.title}
              description={STEP_2.description}
            />
          </div>
        </div>

        {/* Mobile: illustration stacked above the step card */}
        <div className="mx-auto flex max-w-md flex-col gap-4 px-4 py-8 md:hidden">
          <Image
            src="/how-it-works/step02-matching-mobile.svg"
            alt="A schoolhouse and two volunteers being matched together"
            width={196}
            height={95}
            className="mx-auto h-auto w-[70%]"
          />
          <StepBoxMobile
            stepNumber={2}
            title={STEP_2.title}
            description={STEP_2.description}
          />
        </div>
      </section>
    </>
  );
}

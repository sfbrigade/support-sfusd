"use client";

import Image from "next/image";
import Link from "next/link";
import StepBox from "@/components/HowItWorks/StepBox";
import StepBoxMobile from "@/components/HowItWorks/StepBoxMobile";
import Footer from "@/components/Footer";

const STEP_1 = {
  title: "Share Your Preferences",
  description: (
    <>
      Answer a few quick questions so we can learn about your volunteer
      interests, availability, and the types of opportunities you&apos;re
      looking for.{" "}
      <em className="font-lato text-[14px] italic">(Takes about 2 minutes)</em>
    </>
  ),
};

const STEP_2 = {
  title: "Get Recommendations",
  description:
    "Based on your responses, we'll recommend partner organizations that support San Francisco public schools and students and offer volunteer opportunities that fit your interests and schedule.",
};

const STEP_3 = {
  title: "Connect and Make an Impact",
  description:
    "We'll connect you with those partners, and they will guide you through the next steps, share details about the opportunities, and help you start making a meaningful impact.",
};

export default function VolunteerYourWayClient() {
  return (
    <>
      <section className="relative flex flex-col overflow-hidden bg-[#E9FAFC] md:h-full">
        {/* Center content */}
        <div className="z-10 flex flex-1 flex-col items-center justify-start px-4 pt-20 text-center md:justify-center md:pb-[5vh] md:pt-0">
          <h1 className="mb-6 font-fredoka text-[32px] font-semibold tracking-[0.02em] text-[#5B6FE8] md:text-[3.5rem] md:font-medium">
            Volunteer Your Way
          </h1>
          <p className="max-w-xl text-left font-lato text-[20px] font-normal tracking-[0.005em] text-gray-800">
            We built this website to help San Francisco residents quickly and
            easily find ways to support our public schools and strengthen our
            communities. No matter your experience or availability, you can make
            a difference.
          </p>
          <div className="mt-10 flex max-w-xl flex-col items-start gap-1 text-gray-800">
            <span className="text-left font-lato text-[20px] font-bold tracking-[0.005em]">
              It’s easy! Find the volunteer opportunity that is right for you:
            </span>
          </div>
        </div>

        {/* Hero background (desktop) — cable car + grass + Coit Tower */}
        <div className="absolute bottom-0 left-0 right-0 z-0 hidden h-[40vw] md:block">
          <Image
            src="/volunteer-your-way/hero-bg.png"
            alt="San Francisco cable car and Coit Tower"
            fill
            className="object-contain object-bottom"
          />
        </div>

        {/* Hero background (mobile) */}
        <div className="mb-8 mt-6 md:hidden">
          <Image
            src="/volunteer-your-way/bg-mobile.svg"
            alt=""
            width={393}
            height={110}
            className="h-auto w-full"
          />
        </div>
      </section>

      {/* ===== Step 1 — Take the Volunteer Survey ===== */}
      <section className="w-full bg-[#E9FAFC]">
        {/* Desktop / tablet: full-width illustration with the step card overlaid in the center */}
        <div className="relative hidden w-full md:block">
          <Image
            src="/volunteer-your-way/step01-how-it-works.svg"
            alt="Volunteers with a donation box and the Golden Gate Bridge"
            width={1440}
            height={522}
            className="h-auto w-full"
          />
          <div className="absolute left-1/2 top-1/2 w-[34%] max-w-[460px] -translate-x-1/2 -translate-y-1/2">
            <StepBox
              stepNumber={1}
              title={STEP_1.title}
              description={STEP_1.description}
            />
          </div>
        </div>

        {/* Mobile: centered step card (no illustration) */}
        <div className="mx-auto flex max-w-md flex-col gap-4 px-4 py-8 md:hidden">
          <StepBoxMobile
            stepNumber={1}
            title={STEP_1.title}
            description={STEP_1.description}
          />
        </div>
      </section>

      {/* ===== Step 1 ends ===== */}

      {/* ===== Step 2 — We Match You with Opportunities ===== */}
      <section className="w-full bg-[#E9FAFC]">
        {/* Desktop / tablet: full-width illustration with the step card overlaid on the right */}
        <div className="relative hidden w-full md:block">
          <Image
            src="/volunteer-your-way/step02-matching.svg"
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
          <StepBoxMobile
            stepNumber={2}
            title={STEP_2.title}
            description={STEP_2.description}
          />
        </div>
      </section>

      {/* ===== Step 3 — Connect and Make an Impact ===== */}
      <section className="relative w-full overflow-hidden bg-[#E9FAFC] md:aspect-[2880/1074]">
        {/* SF skyline background (desktop) */}
        <div className="pointer-events-none absolute inset-0 z-0 hidden md:block">
          <Image
            src="/volunteer-your-way/step03.png"
            alt=""
            aria-hidden="true"
            fill
            className="object-cover object-bottom"
          />
        </div>

        {/* Content */}
        <div className="relative z-10 mx-auto w-full max-w-6xl px-4 pb-12 pt-8 md:px-12 md:py-16 lg:px-20">
          {/* Desktop */}
          <div className="hidden max-w-[460px] md:block">
            <StepBox
              stepNumber={3}
              title={STEP_3.title}
              description={STEP_3.description}
              button={
                <Link
                  href="/survey"
                  className="inline-flex min-w-[280px] items-center justify-center gap-[10px] rounded-lg bg-brand-sunglow px-4 py-3 font-lato text-base font-bold leading-7 tracking-[0.005em] text-brand-navy transition-opacity hover:opacity-90"
                >
                  Start Now
                </Link>
              }
            />
          </div>

          {/* Mobile: centered step card */}
          <div className="mx-auto flex max-w-md flex-col gap-4 py-4 md:hidden">
            <StepBoxMobile
              stepNumber={3}
              title={STEP_3.title}
              description={STEP_3.description}
              button={
                <Link
                  href="/survey"
                  className="inline-flex w-full items-center justify-center gap-[10px] rounded-lg bg-brand-sunglow px-4 py-3 font-lato text-base font-bold leading-7 tracking-[0.005em] text-black transition-opacity hover:opacity-90"
                >
                  Start Now
                </Link>
              }
            />
          </div>
        </div>

        {/* SF skyline background (mobile) — full-bleed, sits below the card */}
        <div className="md:hidden">
          <Image
            src="/volunteer-your-way/step03-mobile.svg"
            alt=""
            aria-hidden="true"
            width={393}
            height={217}
            className="h-auto w-full"
          />
        </div>
      </section>

      <Footer />
    </>
  );
}

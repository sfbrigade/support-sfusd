"use client";

import Image from "next/image";
import Link from "next/link";
import StepBox from "@/components/HowItWorks/StepBox";
import StepBoxMobile from "@/components/HowItWorks/StepBoxMobile";
import PartnerCard from "@/components/HowItWorks/PartnerCard";

const STEP_1 = {
  title: "Take the Volunteer Survey",
  description:
    "You can take our Volunteer Survey to find the best match for your interests. Or Explore Schools on your own.",
};

const STEP_2 = {
  title: "We Match You with Opportunities",
  description:
    "Based on your responses we will connect you with our recommendation from our growing list of partner organizations, to set up a volunteer placement:",
};

const PARTNERS = [
  {
    logoSrc: "/how-it-works/partners-logos/organization-sf-ed-fund.svg",
    logoAlt: "SF Ed Fund logo",
    name: "SF Ed Fund",
    description:
      "It's a nonprofit that officially partners with the school district on in-school support, including volunteer placement. They typically place volunteers in classrooms Monday-Friday.",
  },
  {
    logoSrc: "/how-it-works/partners-logos/organization-good-neighbor-lab.svg",
    logoAlt: "Good Neighbor Lab logo",
    name: "Good Neighbor Lab",
    description:
      "It's a nonprofit that connects San Francisco residents with local civic institutions in their neighborhoods.",
  },
  {
    logoSrc: "/how-it-works/partners-logos/organization-mission-bit.svg",
    logoAlt: "Mission Bit logo",
    name: "Mission Bit",
    description:
      "a San Francisco-based nonprofit that offers free coding programs and career pathways for high school students.",
  },
  {
    logoSrc: "/how-it-works/partners-logos/organization-826-valencia.svg",
    logoAlt: "826 Valencia logo",
    name: "826 Valencia",
    description:
      "a city-wide nonprofit supporting under-resourced students with writing skills.",
  },
];

export default function HowItWorksClient() {
  return (
    <>
      <section className="relative flex h-full flex-col overflow-hidden bg-[#E9FAFC]">
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

      {/* ===== Step 1 — Take the Volunteer Survey ===== */}
      <section className="w-full bg-[#E9FAFC]">
        {/* Desktop / tablet: full-width illustration with the step card overlaid in the center */}
        <div className="relative hidden w-full md:block">
          <Image
            src="/how-it-works/step01-how-it-works.svg"
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
              button={
                <Link
                  href="/survey"
                  className="bg-brand-sunglow text-brand-navy inline-flex items-center gap-[10px] rounded-lg px-4 py-3 font-lato text-base font-bold leading-7 tracking-[0.005em] transition-opacity hover:opacity-90"
                >
                  Take the Volunteer Survey
                </Link>
              }
            />
          </div>
        </div>

        {/* Mobile: centered step card (no illustration) */}
        <div className="mx-auto flex max-w-md flex-col gap-4 px-4 py-8 md:hidden">
          <StepBoxMobile
            stepNumber={1}
            title={STEP_1.title}
            description={STEP_1.description}
            button={
              <Link
                href="/survey"
                className="bg-brand-azure inline-flex w-full items-center justify-center gap-[10px] rounded-lg px-4 py-3 font-lato text-base font-bold leading-7 tracking-[0.005em] text-white transition-opacity hover:opacity-90"
              >
                Take the Volunteer Survey
              </Link>
            }
          />
        </div>
      </section>

      {/* ===== Step 1 ends ===== */}

      {/* ===== Step 2 — We Match You with Opportunities ===== */}
      <section className="w-full bg-[#E9FAFC]">
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
            className="h-auto w-full"
          />
          <StepBoxMobile
            stepNumber={2}
            title={STEP_2.title}
            description={STEP_2.description}
          />
        </div>
      </section>

      {/* ===== Step 3 — Partner Organizations ===== */}
      <section className="relative w-full overflow-hidden bg-[#E9FAFC]">
        {/* SF skyline background (desktop) — fills the entire section */}
        <div className="pointer-events-none absolute inset-0 z-0 hidden md:block">
          <Image
            src="/how-it-works/step-03-sf-skyline.png"
            alt=""
            aria-hidden="true"
            fill
            className="object-cover object-bottom"
          />
        </div>

        {/* SF skyline background (mobile) — sits at the top */}
        <div className="md:hidden">
          <Image
            src="/how-it-works/step03-mobile.svg"
            alt=""
            aria-hidden="true"
            width={393}
            height={217}
            className="h-auto w-full"
          />
        </div>

        {/* Content */}
        <div className="relative z-10 mx-auto w-full max-w-6xl px-4 pb-12 pt-8 md:px-12 md:py-16 lg:px-20">
          {/* Header (desktop) */}
          <div className="mb-8 hidden md:block">
            <StepBox stepNumber={3} title="Partner Organizations" />
          </div>

          {/* Mobile: header + cards united in one white card. Desktop: transparent passthrough */}
          <div className="rounded-[25px] bg-white p-5 shadow-[0_2px_12px_rgba(0,0,0,0.06)] md:bg-transparent md:p-0 md:shadow-none">
            {/* Header (mobile) — centered number + title */}
            <div className="mb-6 flex flex-col items-center gap-4 md:hidden">
              <div className="bg-brand-sunglow flex h-9 w-9 items-center justify-center rounded-full">
                <span className="text-brand-navy font-fredoka text-[24px] font-semibold leading-none tracking-[0.02em]">
                  3
                </span>
              </div>
              <h3 className="text-brand-azure font-fredoka text-[28px] font-medium leading-none tracking-[0.02em]">
                Partner Organizations
              </h3>
            </div>

            <div className="flex max-w-[680px] flex-col gap-4">
              {PARTNERS.map((partner) => (
                <PartnerCard key={partner.name} {...partner} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

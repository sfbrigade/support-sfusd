"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import StepBox from "@/components/HowItWorks/StepBox";
import StepBoxMobile from "@/components/HowItWorks/StepBoxMobile";
import PartnerCard from "@/components/HowItWorks/PartnerCard";
import TimelinePath from "@/components/HowItWorks/TimelinePath";
import { useMobileConnector } from "@/components/HowItWorks/useMobileConnector";
import {
  useDesktopConnector,
  sliceConnectorPath,
} from "@/components/HowItWorks/useDesktopConnector";
import { TIMELINE_PATHS } from "@/components/HowItWorks/timelinePaths.data";
import Footer from "@/components/Footer";

// DESKTOP_1's source curve (Timeline-Path-1.svg) visually covers two hops in
// one continuous Figma asset - a short flourish from "Start Here" down to
// badge 1, then a much longer curve on to badge 2 (confirmed against the
// reference art: a small top bump, then a long straight run into a second
// bump). Split it once into two independently-anchored connectors so desktop
// has one connector per hop, same as mobile (MOBILE_1..4).
const [DESKTOP_1A_D, DESKTOP_1B_D] = sliceConnectorPath(
  TIMELINE_PATHS.DESKTOP_1.d,
  0.22,
);

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

const STEP_4 = {
  title: "Volunteer Placement",
  description:
    "You're placed with a school or organization where you can make the biggest impact",
};

/** A point on an element's edge, offset outward by `gap` px — used to anchor
 * a desktop connector's dot just outside the element it points at. */
function anchorPoint(
  el: Element | null,
  edge: "top" | "bottom" | "left" | "right",
  gap: number,
) {
  if (!el) return null;
  const r = el.getBoundingClientRect();
  switch (edge) {
    case "top":
      return { x: r.left + r.width / 2, y: r.top - gap };
    case "bottom":
      return { x: r.left + r.width / 2, y: r.bottom + gap };
    case "left":
      return { x: r.left - gap, y: r.top + r.height / 2 };
    case "right":
      return { x: r.right + gap, y: r.top + r.height / 2 };
  }
}

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
  const pageRef = useRef<HTMLDivElement>(null);

  const step1Ref = useRef<HTMLElement>(null);
  const step2Ref = useRef<HTMLElement>(null);
  const step3Ref = useRef<HTMLElement>(null);
  const step4Ref = useRef<HTMLElement>(null);

  // Desktop connectors, one per hop: Start Here -> 1 (1A), 1 -> 2 (1B, the
  // second half of DESKTOP_1's split source), 2 -> 3, 3 -> 4.
  const pathDesktop1ARef = useRef<SVGPathElement>(null);
  const pathDesktop1BRef = useRef<SVGPathElement>(null);
  const pathDesktop2Ref = useRef<SVGPathElement>(null);
  const pathDesktop3Ref = useRef<SVGPathElement>(null);

  const pathMobile1Ref = useRef<SVGPathElement>(null);
  const pathMobile2Ref = useRef<SVGPathElement>(null);
  const pathMobile3Ref = useRef<SVGPathElement>(null);
  const pathMobile4Ref = useRef<SVGPathElement>(null);

  // Anchors the desktop connectors snap to (see useDesktopConnector).
  const startHereArrowRef = useRef<HTMLSpanElement>(null);
  const badge1Ref = useRef<HTMLDivElement>(null);
  const badge2Ref = useRef<HTMLDivElement>(null);
  const badge3Ref = useRef<HTMLDivElement>(null);
  const badge4Ref = useRef<HTMLDivElement>(null);

  const visiblePathDesktop1ARef = useRef<SVGPathElement>(null);
  const visiblePathDesktop1BRef = useRef<SVGPathElement>(null);
  const visiblePathDesktop2Ref = useRef<SVGPathElement>(null);
  const visiblePathDesktop3Ref = useRef<SVGPathElement>(null);
  const markerPathDesktop1ARef = useRef<SVGPathElement>(null);
  const markerPathDesktop1BRef = useRef<SVGPathElement>(null);
  const markerPathDesktop2Ref = useRef<SVGPathElement>(null);
  const markerPathDesktop3Ref = useRef<SVGPathElement>(null);

  useDesktopConnector([
    {
      pathRef: pathDesktop1ARef,
      visiblePathRef: visiblePathDesktop1ARef,
      markerPathRef: markerPathDesktop1ARef,
      sourceD: DESKTOP_1A_D,
      sectionRef: step1Ref,
      getScreenStart: () => anchorPoint(startHereArrowRef.current, "bottom", 0),
      getScreenEnd: () => anchorPoint(badge1Ref.current, "left", 12),
    },
    {
      pathRef: pathDesktop1BRef,
      visiblePathRef: visiblePathDesktop1BRef,
      markerPathRef: markerPathDesktop1BRef,
      sourceD: DESKTOP_1B_D,
      sectionRef: step2Ref,
      getScreenStart: () => anchorPoint(badge1Ref.current, "bottom", 8),
      getScreenEnd: () => anchorPoint(badge2Ref.current, "left", 12),
    },
    {
      pathRef: pathDesktop2Ref,
      visiblePathRef: visiblePathDesktop2Ref,
      markerPathRef: markerPathDesktop2Ref,
      sourceD: TIMELINE_PATHS.DESKTOP_2.d,
      sectionRef: step2Ref,
      getScreenStart: () => anchorPoint(badge2Ref.current, "bottom", 8),
      getScreenEnd: () => anchorPoint(badge3Ref.current, "top", 12),
    },
    {
      pathRef: pathDesktop3Ref,
      visiblePathRef: visiblePathDesktop3Ref,
      markerPathRef: markerPathDesktop3Ref,
      sourceD: TIMELINE_PATHS.DESKTOP_3.d,
      sectionRef: step4Ref,
      getScreenStart: () => anchorPoint(badge3Ref.current, "right", 12),
      getScreenEnd: () => anchorPoint(badge4Ref.current, "top", 12),
    },
  ]);

  useMobileConnector({
    paths: [pathMobile1Ref, pathMobile2Ref, pathMobile3Ref, pathMobile4Ref],
  });

  return (
    <div ref={pageRef}>
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
            <span ref={startHereArrowRef} className="text-xl">
              ↓
            </span>
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
      <section ref={step1Ref} className="relative w-full bg-[#E9FAFC]">
        {/* Connector from "Start Here" into Step 1 */}
        <TimelinePath
          ref={pathDesktop1ARef}
          d={DESKTOP_1A_D}
          stroke={TIMELINE_PATHS.DESKTOP_1.stroke}
          strokeWidth={TIMELINE_PATHS.DESKTOP_1.strokeWidth}
          visiblePathRef={visiblePathDesktop1ARef}
          markerPathRef={markerPathDesktop1ARef}
          className="pointer-events-none absolute left-0 top-0 hidden overflow-visible md:block"
        />
        <TimelinePath
          ref={pathMobile1Ref}
          {...TIMELINE_PATHS.MOBILE_1}
          className="pointer-events-none absolute left-1/2 top-[-90px] h-[90px] w-auto -translate-x-1/2 md:hidden"
        />

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
              badgeRef={badge1Ref}
              button={
                <Link
                  href="/survey"
                  className="inline-flex items-center gap-[10px] rounded-lg bg-brand-sunglow px-4 py-3 font-lato text-base font-bold leading-7 tracking-[0.005em] text-brand-navy transition-opacity hover:opacity-90"
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
                className="inline-flex w-full items-center justify-center gap-[10px] rounded-lg bg-brand-azure px-4 py-3 font-lato text-base font-bold leading-7 tracking-[0.005em] text-white transition-opacity hover:opacity-90"
              >
                Take the Volunteer Survey
              </Link>
            }
          />
        </div>
      </section>

      {/* ===== Step 1 ends ===== */}

      {/* ===== Step 2 — We Match You with Opportunities ===== */}
      <section ref={step2Ref} className="relative w-full bg-[#E9FAFC]">
        {/* Connector from badge 1 into Step 2 (second half of DESKTOP_1's split source) */}
        <TimelinePath
          ref={pathDesktop1BRef}
          d={DESKTOP_1B_D}
          stroke={TIMELINE_PATHS.DESKTOP_1.stroke}
          strokeWidth={TIMELINE_PATHS.DESKTOP_1.strokeWidth}
          visiblePathRef={visiblePathDesktop1BRef}
          markerPathRef={markerPathDesktop1BRef}
          className="pointer-events-none absolute left-0 top-0 hidden overflow-visible md:block"
        />
        {/* Connector from Step 2 into Step 3 (desktop-only - reaches down into
            the Step 3 section visually; kept as a DOM child of Step 2 since
            Step 3 has overflow-hidden and would clip it) */}
        <TimelinePath
          ref={pathDesktop2Ref}
          d={TIMELINE_PATHS.DESKTOP_2.d}
          stroke={TIMELINE_PATHS.DESKTOP_2.stroke}
          strokeWidth={TIMELINE_PATHS.DESKTOP_2.strokeWidth}
          visiblePathRef={visiblePathDesktop2Ref}
          markerPathRef={markerPathDesktop2Ref}
          className="pointer-events-none absolute left-0 top-0 hidden overflow-visible md:block"
        />
        <TimelinePath
          ref={pathMobile2Ref}
          {...TIMELINE_PATHS.MOBILE_2}
          className="pointer-events-none absolute left-1/2 top-[-60px] w-[140px] -translate-x-1/2 md:hidden"
        />

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
              badgeRef={badge2Ref}
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

      {/* ===== Step 3 — Partner Organizations ===== */}
      <section
        ref={step3Ref}
        className="relative w-full overflow-hidden bg-[#E9FAFC]"
      >
        {/* Connector from Step 2 into Step 3 (mobile only - the desktop
            equivalent is rendered up in the Step 2 section, see above) */}
        <TimelinePath
          ref={pathMobile3Ref}
          {...TIMELINE_PATHS.MOBILE_3}
          className="pointer-events-none absolute left-1/2 top-[-100px] w-[120px] -translate-x-1/2 md:hidden"
        />

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
            <StepBox
              stepNumber={3}
              title="Partner Organizations"
              badgeRef={badge3Ref}
            />
          </div>

          {/* Mobile: header + cards united in one white card. Desktop: transparent passthrough */}
          <div className="rounded-[25px] bg-white p-5 shadow-[0_2px_12px_rgba(0,0,0,0.06)] md:bg-transparent md:p-0 md:shadow-none">
            {/* Header (mobile) — centered number + title */}
            <div className="mb-6 flex flex-col items-center gap-4 md:hidden">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-sunglow">
                <span className="font-fredoka text-[24px] font-semibold leading-none tracking-[0.02em] text-brand-navy">
                  3
                </span>
              </div>
              <h3 className="font-fredoka text-[28px] font-medium leading-none tracking-[0.02em] text-brand-azure">
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

      {/* ===== Step 4 — Volunteer Placement ===== */}
      <section
        ref={step4Ref}
        className="relative w-full bg-[#FDF6E1] px-4 py-12 md:py-20"
      >
        {/* Connector from Step 3 into Step 4 */}
        <TimelinePath
          ref={pathDesktop3Ref}
          d={TIMELINE_PATHS.DESKTOP_3.d}
          stroke={TIMELINE_PATHS.DESKTOP_3.stroke}
          strokeWidth={TIMELINE_PATHS.DESKTOP_3.strokeWidth}
          visiblePathRef={visiblePathDesktop3Ref}
          markerPathRef={markerPathDesktop3Ref}
          className="pointer-events-none absolute left-0 top-0 hidden overflow-visible md:block"
        />
        <TimelinePath
          ref={pathMobile4Ref}
          {...TIMELINE_PATHS.MOBILE_4}
          className="pointer-events-none absolute left-1/2 top-[-87px] h-[87px] w-auto -translate-x-1/2 md:hidden"
        />

        <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 rounded-[32px] bg-white px-6 py-6 text-center md:gap-8 md:px-12 md:py-10">
          {/* Header — number + title */}
          <div className="flex items-center gap-[clamp(1rem,2.2vw,1.5rem)]">
            <div
              ref={badge4Ref}
              className="flex h-[clamp(2.5rem,3.3vw,3rem)] w-[clamp(2.5rem,3.3vw,3rem)] shrink-0 items-center justify-center rounded-full bg-brand-sunglow"
            >
              <span className="font-fredoka text-[clamp(1.5rem,2.5vw,2.25rem)] font-semibold leading-none tracking-[0.02em] text-brand-navy">
                4
              </span>
            </div>
            <h3 className="font-fredoka text-[clamp(1.25rem,2.2vw,2rem)] font-medium leading-none tracking-[0.02em] text-brand-azure">
              {STEP_4.title}
            </h3>
          </div>

          {/* Description */}
          <p className="max-w-md font-lato text-[clamp(1rem,1.4vw,1.25rem)] font-normal leading-8 tracking-[0.02em] text-brand-raisin">
            {STEP_4.description}
          </p>

          {/* Button */}
          <Link
            href="/survey"
            className="inline-flex w-full items-center justify-center gap-[10px] rounded-lg bg-brand-azure px-4 py-3 font-lato text-base font-bold leading-7 tracking-[0.005em] text-white transition-opacity hover:opacity-90 md:w-auto md:bg-brand-sunglow md:text-brand-navy"
          >
            Take the Volunteer Survey
          </Link>
        </div>

        {/* Mobile: volunteer blobs illustration below the card */}
        <div className="mx-auto mt-8 w-full max-w-[260px] md:hidden">
          <Image
            src="/how-it-works/step04-mobile.svg"
            alt="Volunteers gathered around a donation box"
            width={245}
            height={136}
            className="h-auto w-full"
          />
        </div>
      </section>

      {/* Footer — mobile only for now */}
      <div className="md:hidden">
        <Footer />
      </div>
    </div>
  );
}

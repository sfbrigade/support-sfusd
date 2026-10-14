"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import StepBox from "@/components/HowItWorks/StepBox";
import StepBoxMobile from "@/components/HowItWorks/StepBoxMobile";
import Footer from "@/components/Footer";
import { useConnectorLine } from "./useConnectorLine";
import { useScrollRevealProgress } from "./useScrollReveal";

// Fixed anchor points inside each connector SVG's own artwork (its accent
// dots), in the SVG's native coordinate space. These never change — only
// where they land on screen does, which useConnectorLine recalculates.
const TIMELINE_1_FROM = { x: 19.5, y: 274 }; // near step 1's circle
const TIMELINE_1_TO = { x: 315.8, y: 683 }; // near step 2's circle
const TIMELINE_2_FROM = { x: 553.5, y: 8 }; // near step 2's circle
const TIMELINE_2_TO = { x: 8, y: 334.5 }; // near step 3's circle

// Pixels to pull an anchor back from a circle's edge (toward the other
// circle) so the line's own baked-in accent dot there lands visibly next to
// the circle instead of hidden behind it.
const CIRCLE_GAP = 30;

// Straight up/down, used to keep step 2's two dots vertically centered on
// its circle instead of drifting toward wherever step 1/step 3 sit.
const UP = { x: 0, y: -1 };
const DOWN = { x: 0, y: 1 };

// Mobile connector lines (hero → 1 → 2 → 3), one asset per segment — same
// idea as the desktop lines, but no scroll reveal for now, just placement.
const TIMELINE_MOB1_FROM = { x: 2, y: 4 }; // near the hero "Start Here" sign
const TIMELINE_MOB1_TO = { x: 4, y: 125.5 }; // near step 1's circle
const TIMELINE_MOB2_FROM = { x: 60, y: 20 }; // near step 1's circle
const TIMELINE_MOB2_TO = { x: 85, y: 260 }; // near step 2's circle
const TIMELINE_MOB3_FROM = { x: -30, y: 20a }; // near step 2's circle
const TIMELINE_MOB3_TO = { x: -35, y: 290 }; // near step 3's circle
const CIRCLE_GAP_MOB = 14;

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
  const containerRef = useRef<HTMLDivElement>(null);
  const circle1Ref = useRef<HTMLDivElement>(null);
  const circle2Ref = useRef<HTMLDivElement>(null);
  const circle3Ref = useRef<HTMLDivElement>(null);

  const heroMobRef = useRef<HTMLDivElement>(null);
  const circle1MobRef = useRef<HTMLDivElement>(null);
  const circle2MobRef = useRef<HTMLDivElement>(null);
  const circle3MobRef = useRef<HTMLDivElement>(null);

  const timeline1Style = useConnectorLine(
    containerRef,
    circle1Ref,
    circle2Ref,
    TIMELINE_1_FROM,
    TIMELINE_1_TO,
    405,
    // circle 1's own baked-in double-dot already brackets it correctly
    // (no gap needed there) — only pull back from circle 2's end, so its
    // dot shows above it instead of hiding behind it.
    { toGap: CIRCLE_GAP, toDirection: UP },
  );
  const timeline2Style = useConnectorLine(
    containerRef,
    circle2Ref,
    circle3Ref,
    TIMELINE_2_FROM,
    TIMELINE_2_TO,
    562,
    {
      fromGap: CIRCLE_GAP,
      fromDirection: DOWN,
      toGap: CIRCLE_GAP,
      toDirection: UP,
    },
  );

  // Mobile connector lines — static placement only, no scroll reveal yet.
  const timelineMob1Style = useConnectorLine(
    containerRef,
    heroMobRef,
    circle1MobRef,
    TIMELINE_MOB1_FROM,
    TIMELINE_MOB1_TO,
    62,
    { toGap: CIRCLE_GAP_MOB, toDirection: UP },
  );
  const timelineMob2Style = useConnectorLine(
    containerRef,
    circle1MobRef,
    circle2MobRef,
    TIMELINE_MOB2_FROM,
    TIMELINE_MOB2_TO,
    249,
    { toGap: CIRCLE_GAP_MOB, toDirection: UP },
  );
  const timelineMob3Style = useConnectorLine(
    containerRef,
    circle2MobRef,
    circle3MobRef,
    TIMELINE_MOB3_FROM,
    TIMELINE_MOB3_TO,
    148,
    { toGap: CIRCLE_GAP_MOB, toDirection: UP },
  );

  // Scroll-driven reveal — purely additive clip-paths layered on top of the
  // positioning above; doesn't affect left/top/width/rotation at all.
  const timeline1ScrollProgress = useScrollRevealProgress(
    circle1Ref,
    circle2Ref,
    1.05,
  );
  const timeline2ScrollProgress = useScrollRevealProgress(
    circle2Ref,
    circle3Ref,
    0.55,
  );

  // Same scroll-driven reveal for the mobile lines.
  const timelineMob1ScrollProgress = useScrollRevealProgress(
    heroMobRef,
    circle1MobRef,
    0.9,
  );
  const timelineMob2ScrollProgress = useScrollRevealProgress(
    circle1MobRef,
    circle2MobRef,
    0.9,
  );
  const timelineMob3ScrollProgress = useScrollRevealProgress(
    circle2MobRef,
    circle3MobRef,
    0.9,
  );

  // A soft gradient instead of a hard clip edge: the dotted line curves
  // (sometimes bending back up before continuing down), so a flat cutoff
  // by vertical position alone can reveal a visually-higher segment before
  // an earlier one that's lower down, reading as a broken gap. Fading the
  // edge over a band hides that mismatch instead of showing it as a hard
  // break.
  const revealMask = (progress: number, feather = 6) => {
    // The fade band (2×feather wide) sweeps from fully above the image
    // (progress 0, box entirely transparent) to fully below it (progress 1,
    // box entirely solid black/opaque) — never straddling an edge at either
    // extreme, so the end dot can't get stuck permanently semi-transparent.
    const band = feather * 2;
    const start = -band + progress * (100 + band);
    const end = start + band;
    return `linear-gradient(to bottom, black 0%, black ${start}%, transparent ${end}%)`;
  };
  const timeline1PartBMask = revealMask(timeline1ScrollProgress);
  const timeline2Mask = revealMask(timeline2ScrollProgress);
  const timelineMob1Mask = revealMask(timelineMob1ScrollProgress);
  const timelineMob2Mask = revealMask(timelineMob2ScrollProgress);
  const timelineMob3Mask = revealMask(timelineMob3ScrollProgress);

  return (
    <>
      <div ref={containerRef} className="relative h-full">
        {/* Dotted connector line, part A: hero → where the hero grass ends.
            A real, separate file (not a mask) — always fully visible, never
            animated, so it can't be affected by the scroll reveal at all. */}
        {timeline1Style && (
          <Image
            src="/volunteer-your-way/Timeline_0-1_part-a.svg"
            alt=""
            aria-hidden="true"
            width={405}
            height={691}
            className="pointer-events-none absolute z-20 hidden h-auto md:block"
            style={timeline1Style}
          />
        )}

        {/* Dotted connector line, part B: grass end → step 1 → step 2. Same
            file canvas and the identical position/scale/rotation as part A
            above (so the two tile together seamlessly) — only this piece
            reveals on scroll. */}
        {timeline1Style && (
          <Image
            src="/volunteer-your-way/Timeline_0-1_part-b.svg"
            alt=""
            aria-hidden="true"
            width={405}
            height={691}
            className="pointer-events-none absolute z-20 hidden h-auto md:block"
            style={{
              ...timeline1Style,
              maskImage: timeline1PartBMask,
              WebkitMaskImage: timeline1PartBMask,
            }}
          />
        )}

        {/* Dotted connector line: step 2 → step 3 (desktop only) */}
        {timeline2Style && (
          <Image
            src="/volunteer-your-way/Timeline_2-3.svg"
            alt=""
            aria-hidden="true"
            width={562}
            height={343}
            className="pointer-events-none absolute z-20 hidden h-auto md:block"
            style={{
              ...timeline2Style,
              maskImage: timeline2Mask,
              WebkitMaskImage: timeline2Mask,
            }}
          />
        )}

        {/* Dotted connector lines (mobile only) — same scroll-driven reveal
            as the desktop lines. */}
        {timelineMob1Style && (
          <Image
            src="/volunteer-your-way/Timeline1-mob.svg"
            alt=""
            aria-hidden="true"
            width={62}
            height={130}
            className="pointer-events-none absolute z-20 block h-auto md:hidden"
            style={{
              ...timelineMob1Style,
              maskImage: timelineMob1Mask,
              WebkitMaskImage: timelineMob1Mask,
            }}
          />
        )}
        {timelineMob2Style && (
          <Image
            src="/volunteer-your-way/Timeline2-mob.svg"
            alt=""
            aria-hidden="true"
            width={249}
            height={298}
            className="pointer-events-none absolute z-20 block h-auto md:hidden"
            style={{
              ...timelineMob2Style,
              maskImage: timelineMob2Mask,
              WebkitMaskImage: timelineMob2Mask,
            }}
          />
        )}
        {timelineMob3Style && (
          <Image
            src="/volunteer-your-way/Timeline3-mob.svg"
            alt=""
            aria-hidden="true"
            width={148}
            height={327}
            className="pointer-events-none absolute z-20 block h-auto md:hidden"
            style={{
              ...timelineMob3Style,
              maskImage: timelineMob3Mask,
              WebkitMaskImage: timelineMob3Mask,
            }}
          />
        )}

        <section className="relative flex flex-col overflow-hidden bg-[#E9FAFC] md:h-full">
          {/* Center content */}
          <div className="z-10 flex flex-1 flex-col items-center justify-start px-4 pt-20 text-center md:justify-center md:pb-[5vh] md:pt-0">
            <h1 className="mb-6 font-fredoka text-[32px] font-semibold tracking-[0.02em] text-[#5B6FE8] md:text-[3.5rem] md:font-medium">
              Volunteer Your Way
            </h1>
            <p className="max-w-xl text-left font-lato text-[20px] font-normal tracking-[0.005em] text-gray-800">
              We built this website to help San Francisco residents quickly and
              easily find ways to support our public schools and strengthen our
              communities. No matter your experience or availability, you can
              make a difference.
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
          <div className="relative mb-8 mt-6 md:hidden">
            <Image
              src="/volunteer-your-way/bg-mobile.svg"
              alt=""
              width={393}
              height={110}
              className="h-auto w-full"
            />
            {/* Plain marker (no circle badge) anchoring where the mobile
                connector line starts, next to the "Start Here" sign. */}
            <div
              ref={heroMobRef}
              className="absolute left-[53%] top-[38%] h-px w-px"
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
            <div
              ref={circle1Ref}
              className="absolute left-[45%] top-[42%] z-30 w-[34%] max-w-[460px] -translate-x-1/2 -translate-y-1/2"
            >
              <StepBox
                stepNumber={1}
                title={STEP_1.title}
                description={STEP_1.description}
              />
            </div>
          </div>

          {/* Mobile: centered step card (no illustration) */}
          <div
            ref={circle1MobRef}
            className="relative z-10 mx-auto flex max-w-md flex-col gap-4 px-4 py-8 md:hidden"
          >
            <StepBoxMobile
              stepNumber={1}
              title={STEP_1.title}
              description={STEP_1.description}
            />
          </div>
        </section>

        {/* ===== Step 1 ends ===== */}

        {/* ===== Step 2 — We Match You with Opportunities ===== */}
        <section className=" w-full bg-[#E9FAFC] md:pb-24">
          {/* Desktop / tablet: full-width illustration with the step card overlaid on the right */}
          <div className="relative hidden w-full md:block">
            <Image
              src="/volunteer-your-way/step02-matching.svg"
              alt="A schoolhouse and two volunteers being matched together"
              width={681}
              height={340}
              className="ml-[5%] h-auto w-[50%]"
            />
            <div
              ref={circle2Ref}
              // Between 768–1400px, the image's clear space to the right of
              // the characters isn't wide enough for this box, so it moves
              // to sit where step 1's bridge illustration is — the same
              // empty-sky region (left/top ~82%/55%, bridge's own center)
              // reused at this width range. At 1400px+ it returns to its
              // usual spot beside the schoolhouse.
              className="absolute left-[82%] top-[55%] z-30 w-[38%] max-w-[460px] -translate-x-1/2 -translate-y-1/2 min-[1400px]:left-auto min-[1400px]:right-[16%] min-[1400px]:top-[70%] min-[1400px]:translate-x-0"
            >
              <StepBox
                stepNumber={2}
                title={STEP_2.title}
                description={STEP_2.description}
              />
            </div>
          </div>

          {/* Mobile: illustration stacked above the step card */}
          <div
            ref={circle2MobRef}
            className="relative z-10 mx-auto flex max-w-md flex-col gap-4 px-4 py-8 md:hidden"
          >
            <StepBoxMobile
              stepNumber={2}
              title={STEP_2.title}
              description={STEP_2.description}
            />
          </div>
        </section>

        {/* ===== Step 3 — Connect and Make an Impact ===== */}

        <section className="relative w-full bg-[#E9FAFC] md:min-h-[35vw]">
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
          <div className="relative z-30 mx-auto w-full max-w-6xl px-4 pb-12 pt-8 md:px-12 md:py-16 lg:px-20">
            {/* Desktop: flows normally (not absolutely positioned over the
                background) so the section always grows tall enough to fit
                the text, at any screen width */}
            <div ref={circle3Ref} className="hidden max-w-[460px] md:block">
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
            <div
              ref={circle3MobRef}
              className="relative z-10 mx-auto flex max-w-md flex-col gap-4 py-4 md:hidden"
            >
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
      </div>
    </>
  );
}

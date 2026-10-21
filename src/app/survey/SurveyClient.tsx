"use client";

import Image from "next/image";
import Link from "next/link";

export default function SurveyClient() {
  return (
    <section className="relative flex w-full flex-col overflow-hidden bg-white md:h-full md:min-h-[47.15vw] md:items-center md:justify-center md:px-4 md:py-16 md:bg-[#E9FAFC]">
      {/* Background (desktop) — SF skyline, Golden Gate Bridge, and grass strip */}
      <div className="pointer-events-none absolute inset-0 z-0 hidden md:block">
        <Image
          src="/survey-page/survey-bg.svg"
          alt=""
          aria-hidden="true"
          fill
          className="object-cover object-bottom"
        />
      </div>

      {/* Top banner (mobile) — SF skyline */}
      <div
        className="relative z-10 shrink-0 bg-[#E9FAFC] md:hidden"
        style={{ paddingTop: "var(--navbar-top-offset, 0px)" }}
      >
        <Image
          src="/survey-page/mobile-top.svg"
          alt=""
          aria-hidden="true"
          width={393}
          height={280}
          className="h-auto w-full"
        />
      </div>

      {/* Card */}
      <div className="relative z-10 flex flex-1 items-center justify-center px-4 py-6 md:flex-none md:py-0">
        <div className="w-full max-w-xl rounded-3xl bg-white px-6 py-10 text-center md:px-12 md:py-12 md:shadow-[0_20px_50px_rgba(0,0,0,0.12)]">
          <h1 className="mb-6 font-fredoka text-[28px] font-semibold tracking-[0.02em] text-brand-azure md:text-[2.5rem]">
            Volunteer Your Way
          </h1>
          <p className="mb-4 font-lato text-lg font-bold text-brand-raisin">
            Thank you for your interest in supporting SF Public Schools!
          </p>
          <p className="mb-6 font-lato text-base text-gray-700">
            Answer a few short questions and we&apos;ll match you with the
            opportunity that best fits your volunteering goals
          </p>
          <div className="mb-8 flex items-center justify-center gap-1.5 font-lato text-sm font-medium text-orange-600">
            <ClockIcon className="h-4 w-4" />
            Takes about 2 minutes
          </div>
          <Link
            href="/survey/questions"
            className="inline-flex w-full max-w-[220px] items-center justify-center rounded-lg bg-brand-azure px-6 py-3 font-lato text-base font-semibold text-white transition-opacity hover:opacity-90 md:w-auto"
          >
            Start Now
          </Link>
        </div>
      </div>

      {/* Bottom banner (mobile) — grass */}
      <Image
        src="/survey-page/mobile-bottom.svg"
        alt=""
        aria-hidden="true"
        width={393}
        height={81}
        className="relative z-10 h-auto w-full shrink-0 md:hidden"
      />
    </section>
  );
}

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.3" />
      <path
        d="M8 4.5V8l2.5 1.5"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

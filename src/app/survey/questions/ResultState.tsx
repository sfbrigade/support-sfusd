"use client";

import Image from "next/image";
import Link from "next/link";

export default function ResultState() {
  return (
    <section className="relative flex w-full flex-col items-center overflow-hidden bg-white px-4 py-16 md:h-full md:min-h-[47.15vw] md:items-center md:justify-center md:bg-[#E9FAFC]">
      {/* Grass (desktop) */}
      <Image
        src="/survey-page/grass-bottom.svg"
        alt=""
        aria-hidden="true"
        width={1440}
        height={234}
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 hidden h-auto w-full md:block"
      />

      {/* Clouds (desktop) */}
      <Image
        src="/survey-page/loading-clouds-desktop.svg"
        alt=""
        aria-hidden="true"
        width={1203}
        height={262}
        className="pointer-events-none absolute inset-x-0 top-12 z-0 hidden h-auto w-full md:block"
      />

      {/* Card */}
      <div className="relative z-10 w-full max-w-5xl rounded-3xl bg-white px-16 pb-24 pt-20 text-center shadow-[0_20px_50px_rgba(0,0,0,0.12)]">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#4CC32E]">
          <CheckIcon className="h-7 w-7 text-white" />
        </div>

        <h1 className="mb-3 font-fredoka text-[32px] font-semibold text-brand-azure">
          You&apos;re Matched!
        </h1>

        <p className="font-lato text-base text-brand-raisin">
          Based on your answers, you are a great match for
        </p>

        <p className="mb-8 mt-1 font-fredoka text-lg font-semibold tracking-wide text-brand-navy">
          [ PARTNER ORGANIZATION ]
        </p>

        <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start sm:text-left">
          <Image
            src="/survey-page/result-pink.svg"
            alt=""
            aria-hidden="true"
            width={211}
            height={206}
            className="h-auto w-32 shrink-0 sm:w-36"
          />

          <div className="flex-1">
            <p className="mb-4 font-lato text-sm text-brand-raisin">
              <Link
                href="#"
                className="font-semibold text-brand-azure underline"
              >
                Sign up at their website.
              </Link>{" "}
              We&apos;ll also send you an email to support you through the
              process.
            </p>

            <Link
              href="#"
              className="mb-4 inline-flex w-full items-center justify-center rounded-lg bg-brand-azure px-6 py-3 font-lato text-base font-semibold text-white transition-opacity hover:opacity-90 sm:w-auto"
            >
              Visit Our Partner Website
            </Link>

            <div className="flex items-center justify-center gap-1.5 font-lato text-sm text-brand-raisin sm:justify-start">
              <MailIcon className="h-4 w-4 shrink-0" />
              <span>
                You can also check out other opportunities{" "}
                <Link
                  href="/volunteer-your-way"
                  className="text-brand-azure underline"
                >
                  here
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M5 13l4.5 4.5L19 8"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MailIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <rect
        x="1.5"
        y="3.5"
        width="13"
        height="9"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path
        d="M2 4.5L8 9L14 4.5"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

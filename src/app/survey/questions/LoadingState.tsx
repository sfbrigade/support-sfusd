"use client";

import Image from "next/image";

export default function LoadingState() {
  return (
    <>
      <MobileLoadingState />
      <DesktopLoadingState />
    </>
  );
}

function DesktopLoadingState() {
  return (
    <section className="relative hidden w-full flex-col items-center overflow-hidden bg-white px-4 py-16 md:flex md:h-full md:bg-[#E9FAFC]">
      {/* Grass + mascot — scaled to its natural aspect ratio, anchored to the bottom */}
      <Image
        src="/survey-page/loading-grass-desktop.svg"
        alt=""
        aria-hidden="true"
        width={1440}
        height={234}
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-auto w-full"
      />
      {/* Clouds — scaled to its own natural aspect ratio, anchored to the top */}
      <Image
        src="/survey-page/loading-clouds-desktop.svg"
        alt=""
        aria-hidden="true"
        width={1203}
        height={262}
        className="pointer-events-none absolute inset-x-0 top-12 z-0 h-auto w-full"
      />
      l
      {/* Content — the dots are the anchor: they sit at the exact vertical
          center of the section, with the heading/message positioned relative to them */}
      <div className="absolute left-1/2 top-1/2 z-10 flex w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 flex-col items-center px-4 text-center">
        <h1 className="absolute bottom-full left-1/2 mb-6 w-full -translate-x-1/2 font-fredoka text-[36px] font-medium leading-[40px] text-[#214C7A]">
          Hang tight—we&apos;re finding meaningful ways for you to Volunteer
          Your Way.
        </h1>

        <LoadingDots />

        <p className="absolute left-1/2 top-full mt-6 w-full -translate-x-1/2 font-lato text-base text-gray-600">
          This will only take a moment.
        </p>
      </div>
    </section>
  );
}

function MobileLoadingState() {
  return (
    <section
      className="relative flex w-full flex-col items-center overflow-hidden bg-[#E9FAFC] pt-10 text-center md:hidden"
      style={{ marginTop: "var(--navbar-top-offset, 0px)" }}
    >
      {/* Clouds — scaled to its own natural aspect ratio, anchored to the top */}
      <Image
        src="/survey-page/loading-clouds-mobile.svg"
        alt=""
        aria-hidden="true"
        width={326}
        height={292}
        className="pointer-events-none absolute inset-x-0 top-0 z-0 h-auto w-full"
      />

      {/* Heading + animated dot */}
      <div className="relative z-10 flex flex-col items-center px-6">
        <h1 className="max-w-xs font-fredoka text-2xl font-medium leading-tight text-[#214C7A]">
          Matching your answers with the best opportunities…
        </h1>

        <div className="relative mt-12 flex h-24 w-24 items-center justify-center">
          <span className="h-16 w-16 animate-grow-shrink rounded-full bg-brand-azure" />
          <span className="sr-only">Loading matches…</span>
        </div>
      </div>

      {/* Mascots + grass — rendered at its true natural scale, in normal flow so it
          can never overlap the content above it */}
      <Image
        src="/survey-page/loading-grass-mobile.svg"
        alt=""
        aria-hidden="true"
        width={393}
        height={349}
        className="relative z-10 mt-10 h-auto w-full"
      />
    </section>
  );
}

function LoadingDots({ className = "" }: { className?: string }) {
  const delays = ["0ms", "150ms", "300ms", "450ms"];
  return (
    <div className={`flex items-center gap-2 ${className}`} role="status">
      {delays.map((delay, i) => (
        <span
          key={i}
          className="h-2.5 w-2.5 animate-bounce rounded-full bg-[#8DA4EF]"
          style={{ animationDelay: delay }}
        />
      ))}
      <span className="sr-only">Loading matches…</span>
    </div>
  );
}

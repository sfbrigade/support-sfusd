"use client";

import { useEffect, useRef, useState } from "react";

const PATH_LENGTH = 2200;
const PATH_CURVE = "M372 0 C362 220 312 430 258 700 C226 950 214 1215 210 1560";

export default function PathConnector() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const section = sectionRef.current;
      if (!section) {
        return;
      }

      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const totalTravel = rect.height + viewportHeight;
      const rawProgress = (viewportHeight - rect.top) / totalTravel;
      const clampedProgress = Math.max(0, Math.min(1, rawProgress));

      setProgress(clampedProgress);
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  const horizontalShift = 162 * Math.pow(1 - progress, 1.03);
  const currentStrokeWidth = 56 + progress * 32;
  const fogOpacity = Math.max(0, 1 - progress * 1.75);

  return (
    <section
      ref={sectionRef}
      className="relative h-[135vh] overflow-hidden bg-gradient-to-b from-[#84d961] via-[#74be50] to-[#5ba73f]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 h-40 w-1/2 transition-opacity duration-200"
        style={{ opacity: fogOpacity }}
      >
        <div className="absolute -left-6 top-2 h-20 w-24 rounded-full bg-[#f6fcff]" />
        <div className="absolute left-10 top-0 h-24 w-28 rounded-full bg-[#f6fcff]" />
        <div className="absolute left-28 top-5 h-16 w-24 rounded-full bg-[#f6fcff]" />
        <div className="bg-[#f6fcff]/85 absolute left-14 top-12 h-14 w-20 rounded-full" />
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 h-40 w-1/2 transition-opacity duration-200"
        style={{ opacity: fogOpacity }}
      >
        <div className="absolute -right-6 top-2 h-20 w-24 rounded-full bg-[#f6fcff]" />
        <div className="absolute right-10 top-0 h-24 w-28 rounded-full bg-[#f6fcff]" />
        <div className="absolute right-28 top-5 h-16 w-24 rounded-full bg-[#f6fcff]" />
        <div className="bg-[#f6fcff]/85 absolute right-14 top-12 h-14 w-20 rounded-full" />
      </div>

      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 md:w-36">
        <div className="absolute -left-8 top-16 h-32 w-32 rounded-full bg-[#2f7b2a]" />
        <div className="absolute -left-6 top-48 h-24 w-24 rounded-full bg-[#2a6e26]" />
        <div className="absolute -left-10 bottom-24 h-36 w-36 rounded-full bg-[#326f2b]" />
      </div>

      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 md:w-36">
        <div className="absolute -right-8 top-20 h-32 w-32 rounded-full bg-[#2f7b2a]" />
        <div className="absolute -right-6 top-56 h-24 w-24 rounded-full bg-[#2a6e26]" />
        <div className="absolute -right-10 bottom-20 h-36 w-36 rounded-full bg-[#326f2b]" />
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-full w-[340px] md:w-[420px]"
        style={{ transform: `translateX(calc(-50% + ${horizontalShift}px))` }}
      >
        <svg
          className="h-full w-full"
          viewBox="0 0 420 1600"
          preserveAspectRatio="none"
        >
          <path
            d={PATH_CURVE}
            fill="none"
            stroke="rgba(176, 138, 98, 0.28)"
            strokeLinecap="round"
            style={{ strokeWidth: currentStrokeWidth + 14 }}
          />
          <path
            d={PATH_CURVE}
            fill="none"
            stroke="#dfb98d"
            strokeLinecap="round"
            style={{
              strokeWidth: currentStrokeWidth,
              strokeDasharray: PATH_LENGTH,
              strokeDashoffset: PATH_LENGTH - PATH_LENGTH * progress,
              transition: "stroke-width 120ms linear",
            }}
          />
        </svg>
      </div>
    </section>
  );
}

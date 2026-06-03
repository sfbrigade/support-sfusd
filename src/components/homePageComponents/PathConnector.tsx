"use client";

import { useEffect, useRef, useState } from "react";

const PATH_LENGTH = 2200;
const PATH_CURVE = "M372 0 C362 220 312 430 258 700 C226 950 214 1215 210 1560";
const FLOWER_SPOTS = [
  { y: 190, offset: 46, delay: 0.04, rotate: -8, color: "#ff8fa8" },
  { y: 330, offset: 52, delay: 0.12, rotate: 6, color: "#ffd166" },
  { y: 500, offset: 58, delay: 0.2, rotate: -6, color: "#f8a5ff" },
  { y: 680, offset: 48, delay: 0.3, rotate: 7, color: "#ff9f6e" },
  { y: 870, offset: 54, delay: 0.4, rotate: -5, color: "#ff86c8" },
  { y: 1040, offset: 46, delay: 0.5, rotate: 4, color: "#ffe083" },
  { y: 1220, offset: 52, delay: 0.58, rotate: -7, color: "#f6a6ff" },
  { y: 1400, offset: 44, delay: 0.66, rotate: 5, color: "#ffb06e" },
] as const;

const GRASS_TREES = [
  { top: 12, left: 14, size: 30, trunk: 9, tone: "#2f7b2a", depth: 0.92 },
  { top: 19, left: 28, size: 26, trunk: 8, tone: "#2a6e26", depth: 0.86 },
  { top: 27, left: 72, size: 34, trunk: 10, tone: "#326f2b", depth: 0.9 },
  { top: 35, left: 18, size: 28, trunk: 9, tone: "#2f7b2a", depth: 0.84 },
  { top: 43, left: 81, size: 24, trunk: 8, tone: "#2a6e26", depth: 0.8 },
  { top: 51, left: 32, size: 36, trunk: 11, tone: "#326f2b", depth: 0.88 },
  { top: 58, left: 69, size: 30, trunk: 9, tone: "#2f7b2a", depth: 0.83 },
  { top: 66, left: 21, size: 32, trunk: 10, tone: "#2a6e26", depth: 0.87 },
  { top: 73, left: 79, size: 27, trunk: 8, tone: "#326f2b", depth: 0.82 },
  { top: 82, left: 36, size: 33, trunk: 10, tone: "#2f7b2a", depth: 0.85 },
] as const;

const clamp01 = (value: number) => Math.max(0, Math.min(1, value));

const cubicAt = (p0: number, p1: number, p2: number, p3: number, t: number) => {
  const omt = 1 - t;
  return omt ** 3 * p0 + 3 * omt ** 2 * t * p1 + 3 * omt * t ** 2 * p2 + t ** 3 * p3;
};

const findTForY = (
  y: number,
  p0: [number, number],
  p1: [number, number],
  p2: [number, number],
  p3: [number, number],
) => {
  let low = 0;
  let high = 1;

  for (let i = 0; i < 18; i += 1) {
    const mid = (low + high) / 2;
    const midY = cubicAt(p0[1], p1[1], p2[1], p3[1], mid);

    if (midY < y) {
      low = mid;
    } else {
      high = mid;
    }
  }

  return (low + high) / 2;
};

const pathXForY = (y: number) => {
  const clampedY = clamp01(y / 1560) * 1560;

  if (clampedY <= 700) {
    const p0: [number, number] = [372, 0];
    const p1: [number, number] = [362, 220];
    const p2: [number, number] = [312, 430];
    const p3: [number, number] = [258, 700];
    const t = findTForY(clampedY, p0, p1, p2, p3);
    return cubicAt(p0[0], p1[0], p2[0], p3[0], t);
  }

  const p0: [number, number] = [258, 700];
  const p1: [number, number] = [226, 950];
  const p2: [number, number] = [214, 1215];
  const p3: [number, number] = [210, 1560];
  const t = findTForY(clampedY, p0, p1, p2, p3);
  return cubicAt(p0[0], p1[0], p2[0], p3[0], t);
};

export default function PathConnector() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [isSectionInView, setIsSectionInView] = useState(false);

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
      setIsSectionInView(rect.bottom > 0 && rect.top < viewportHeight);
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
  const showFogMid = fogOpacity > 0.34;
  const showFogFine = fogOpacity > 0.58;

  return (
    <section
      ref={sectionRef}
      className="relative h-[135vh] overflow-hidden bg-gradient-to-b from-[#84d961] via-[#74be50] to-[#5ba73f]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none fixed bottom-0 left-0 h-44 w-[58%] transition-opacity duration-200"
        style={{ opacity: isSectionInView ? fogOpacity : 0 }}
      >
        <div className="absolute -left-10 -top-5 h-20 w-24 rounded-full bg-[#f6fcff]" />
        <div className="absolute left-2 -top-6 h-22 w-28 rounded-full bg-[#f6fcff]" />
        <div className="absolute left-[6.5rem] -top-5 h-20 w-26 rounded-full bg-[#f6fcff]" />
        <div className="absolute left-[11rem] -top-4 h-20 w-24 rounded-full bg-[#f6fcff]" />
        <div className="absolute left-[16rem] -top-5 h-20 w-24 rounded-full bg-[#f6fcff]" />
        <div className="absolute left-[21rem] -top-4 h-20 w-24 rounded-full bg-[#f6fcff]" />
        <div className="absolute -left-8 top-2 h-24 w-28 rounded-full bg-[#f6fcff]" />
        <div className="absolute left-4 top-0 h-28 w-32 rounded-full bg-[#f6fcff]" />
        <div className="absolute left-[5.5rem] top-6 h-20 w-28 rounded-full bg-[#f6fcff]" />
        <div className="absolute left-[9rem] top-1 h-24 w-[7.5rem] rounded-full bg-[#f6fcff]" />
        <div className="absolute left-[12.5rem] top-7 h-[4.5rem] w-[6.5rem] rounded-full bg-[#f6fcff]" />
        <div className="absolute left-[16rem] top-2 h-[5.5rem] w-28 rounded-full bg-[#f6fcff]" />
        <div className="absolute left-[19.5rem] top-8 h-[4.5rem] w-24 rounded-full bg-[#f6fcff]" />
        <div className="absolute left-[22.5rem] top-3 h-[5.5rem] w-28 rounded-full bg-[#f6fcff]" />
        <div className="absolute left-[25.5rem] top-8 h-16 w-[5.5rem] rounded-full bg-[#f6fcff]" />
        <div className="absolute left-[28.5rem] top-2 h-18 w-24 rounded-full bg-[#f6fcff]" />
        <div className="absolute left-[31rem] top-6 h-14 w-20 rounded-full bg-[#f6fcff]" />
        {showFogMid && (
          <>
            <div className="bg-[#f6fcff]/90 absolute left-2 top-[4.6rem] h-12 w-20 rounded-full" />
            <div className="bg-[#f6fcff]/90 absolute left-[6.5rem] top-[4.8rem] h-12 w-22 rounded-full" />
            <div className="bg-[#f6fcff]/90 absolute left-[11.5rem] top-[4.7rem] h-12 w-20 rounded-full" />
            <div className="bg-[#f6fcff]/90 absolute left-[15.5rem] top-[4.9rem] h-12 w-22 rounded-full" />
            <div className="bg-[#f6fcff]/90 absolute left-[20.5rem] top-[4.7rem] h-12 w-20 rounded-full" />
            <div className="bg-[#f6fcff]/90 absolute left-[24.5rem] top-[4.9rem] h-12 w-20 rounded-full" />
          </>
        )}
        {showFogFine && (
          <>
            <div className="bg-[#f6fcff]/85 absolute left-[7rem] top-14 h-12 w-[4.5rem] rounded-full" />
            <div className="bg-[#f6fcff]/85 absolute left-[18rem] top-14 h-12 w-[4.5rem] rounded-full" />
          </>
        )}
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none fixed bottom-0 right-0 h-44 w-[58%] transition-opacity duration-200"
        style={{ opacity: isSectionInView ? fogOpacity : 0 }}
      >
        <div className="absolute -right-10 -top-5 h-20 w-24 rounded-full bg-[#f6fcff]" />
        <div className="absolute right-2 -top-6 h-22 w-28 rounded-full bg-[#f6fcff]" />
        <div className="absolute right-[6.5rem] -top-5 h-20 w-26 rounded-full bg-[#f6fcff]" />
        <div className="absolute right-[11rem] -top-4 h-20 w-24 rounded-full bg-[#f6fcff]" />
        <div className="absolute right-[16rem] -top-5 h-20 w-24 rounded-full bg-[#f6fcff]" />
        <div className="absolute right-[21rem] -top-4 h-20 w-24 rounded-full bg-[#f6fcff]" />
        <div className="absolute -right-8 top-2 h-24 w-28 rounded-full bg-[#f6fcff]" />
        <div className="absolute right-4 top-0 h-28 w-32 rounded-full bg-[#f6fcff]" />
        <div className="absolute right-[5.5rem] top-6 h-20 w-28 rounded-full bg-[#f6fcff]" />
        <div className="absolute right-[9rem] top-1 h-24 w-[7.5rem] rounded-full bg-[#f6fcff]" />
        <div className="absolute right-[12.5rem] top-7 h-[4.5rem] w-[6.5rem] rounded-full bg-[#f6fcff]" />
        <div className="absolute right-[16rem] top-2 h-[5.5rem] w-28 rounded-full bg-[#f6fcff]" />
        <div className="absolute right-[19.5rem] top-8 h-[4.5rem] w-24 rounded-full bg-[#f6fcff]" />
        <div className="absolute right-[22.5rem] top-3 h-[5.5rem] w-28 rounded-full bg-[#f6fcff]" />
        <div className="absolute right-[25.5rem] top-8 h-16 w-[5.5rem] rounded-full bg-[#f6fcff]" />
        {showFogMid && (
          <>
            <div className="bg-[#f6fcff]/90 absolute right-2 top-[4.6rem] h-12 w-20 rounded-full" />
            <div className="bg-[#f6fcff]/90 absolute right-[6.5rem] top-[4.8rem] h-12 w-22 rounded-full" />
            <div className="bg-[#f6fcff]/90 absolute right-[11.5rem] top-[4.7rem] h-12 w-20 rounded-full" />
            <div className="bg-[#f6fcff]/90 absolute right-[15.5rem] top-[4.9rem] h-12 w-22 rounded-full" />
            <div className="bg-[#f6fcff]/90 absolute right-[20.5rem] top-[4.7rem] h-12 w-20 rounded-full" />
            <div className="bg-[#f6fcff]/90 absolute right-[24.5rem] top-[4.9rem] h-12 w-20 rounded-full" />
          </>
        )}
        {showFogFine && (
          <>
            <div className="bg-[#f6fcff]/85 absolute right-[7rem] top-14 h-12 w-[4.5rem] rounded-full" />
            <div className="bg-[#f6fcff]/85 absolute right-[18rem] top-14 h-12 w-[4.5rem] rounded-full" />
          </>
        )}
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

      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        {GRASS_TREES.map((tree, index) => {
          const sway = (1 - progress) * (index % 2 === 0 ? -2.2 : 2.2);

          return (
            <div
              key={`grass-tree-${tree.top}-${tree.left}-${index}`}
              className="absolute"
              style={{
                top: `${tree.top}%`,
                left: `${tree.left}%`,
                transform: `translate(-50%, -50%) scale(${tree.depth}) rotate(${sway}deg)`,
                transformOrigin: "center bottom",
              }}
            >
              <div
                className="relative"
                style={{ width: `${tree.size}px`, height: `${tree.size + 18}px` }}
              >
                <div
                  className="absolute left-1/2 top-[36%] -translate-x-1/2 rounded-full bg-[#6f4a2a]"
                  style={{ width: `${tree.trunk}px`, height: `${tree.size * 0.6}px` }}
                />
                <div
                  className="absolute left-1/2 top-0 -translate-x-1/2 rounded-full"
                  style={{
                    width: `${tree.size}px`,
                    height: `${tree.size * 0.78}px`,
                    backgroundColor: tree.tone,
                  }}
                />
                <div
                  className="absolute left-[20%] top-[14%] rounded-full"
                  style={{
                    width: `${tree.size * 0.56}px`,
                    height: `${tree.size * 0.48}px`,
                    backgroundColor: tree.tone,
                  }}
                />
                <div
                  className="absolute right-[20%] top-[14%] rounded-full"
                  style={{
                    width: `${tree.size * 0.56}px`,
                    height: `${tree.size * 0.48}px`,
                    backgroundColor: tree.tone,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-full w-[340px] md:w-[420px]"
        style={{ transform: `translateX(calc(-50% + ${horizontalShift}px))` }}
      >
        {FLOWER_SPOTS.map((flower, index) => {
          const bloom = clamp01((progress - flower.delay) / 0.2);
          const stemHeight = 12 + bloom * 20;
          const pathX = pathXForY(flower.y);

          return (
            <div key={`flower-${flower.y}-${index}`}>
              <div
                className="absolute h-7 w-7"
                style={{
                  top: `${(flower.y / 1600) * 100}%`,
                  left: `${((pathX - flower.offset) / 420) * 100}%`,
                  opacity: isSectionInView ? bloom : 0,
                  transform: `translate(-50%, -50%) scale(${0.35 + bloom * 0.9}) rotate(${flower.rotate}deg)`,
                  transformOrigin: "center",
                }}
              >
                <div
                  className="absolute left-1/2 top-full -translate-x-1/2 rounded-full bg-[#3f8e33]"
                  style={{ height: `${stemHeight}px`, width: "3px" }}
                />
                <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ffd36b]" />
                <div className="absolute left-1/2 top-0 h-3.5 w-2.5 -translate-x-1/2 rounded-full" style={{ backgroundColor: flower.color }} />
                <div className="absolute left-1/2 bottom-0 h-3.5 w-2.5 -translate-x-1/2 rounded-full" style={{ backgroundColor: flower.color }} />
                <div className="absolute left-0 top-1/2 h-2.5 w-3.5 -translate-y-1/2 rounded-full" style={{ backgroundColor: flower.color }} />
                <div className="absolute right-0 top-1/2 h-2.5 w-3.5 -translate-y-1/2 rounded-full" style={{ backgroundColor: flower.color }} />
              </div>

              <div
                className="absolute h-7 w-7"
                style={{
                  top: `${((flower.y + 20) / 1600) * 100}%`,
                  left: `${((pathX + flower.offset) / 420) * 100}%`,
                  opacity: isSectionInView ? bloom : 0,
                  transform: `translate(-50%, -50%) scale(${0.35 + bloom * 0.9}) rotate(${-flower.rotate}deg)`,
                  transformOrigin: "center",
                }}
              >
                <div
                  className="absolute left-1/2 top-full -translate-x-1/2 rounded-full bg-[#3f8e33]"
                  style={{ height: `${stemHeight}px`, width: "3px" }}
                />
                <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ffd36b]" />
                <div className="absolute left-1/2 top-0 h-3.5 w-2.5 -translate-x-1/2 rounded-full" style={{ backgroundColor: flower.color }} />
                <div className="absolute left-1/2 bottom-0 h-3.5 w-2.5 -translate-x-1/2 rounded-full" style={{ backgroundColor: flower.color }} />
                <div className="absolute left-0 top-1/2 h-2.5 w-3.5 -translate-y-1/2 rounded-full" style={{ backgroundColor: flower.color }} />
                <div className="absolute right-0 top-1/2 h-2.5 w-3.5 -translate-y-1/2 rounded-full" style={{ backgroundColor: flower.color }} />
              </div>
            </div>
          );
        })}

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

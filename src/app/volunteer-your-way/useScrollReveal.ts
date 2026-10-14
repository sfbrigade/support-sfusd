"use client";

import { useEffect, useState, type RefObject } from "react";

/**
 * Tracks scroll progress (0 → 1) between two elements' positions in the
 * document: 0 while a trigger point (a fixed fraction down the viewport)
 * hasn't reached `fromRef` yet, 1 once it has passed `toRef`, and a smooth
 * ramp in between. Used to drive a scroll-linked reveal — it never touches
 * layout, just reports a number.
 */
export function useScrollRevealProgress(
  fromRef: RefObject<HTMLElement | null>,
  toRef: RefObject<HTMLElement | null>,
  triggerFraction = 0.75,
): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;

    const recompute = () => {
      raf = 0;
      const fromEl = fromRef.current;
      const toEl = toRef.current;
      if (!fromEl || !toEl) return;

      const fromRect = fromEl.getBoundingClientRect();
      const toRect = toEl.getBoundingClientRect();
      // Zero height means display:none (e.g. this desktop-only line hidden
      // on mobile) — nothing meaningful to compute.
      if (!fromRect.height && !toRect.height) return;

      const fromY = fromRect.top + window.scrollY;
      const toY = toRect.top + window.scrollY;
      const span = toY - fromY || 1;
      const triggerY = window.scrollY + window.innerHeight * triggerFraction;

      const next = Math.min(1, Math.max(0, (triggerY - fromY) / span));
      setProgress(next);
    };

    const onScrollOrResize = () => {
      if (raf) return;
      raf = requestAnimationFrame(recompute);
    };

    recompute();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);

    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [fromRef, toRef, triggerFraction]);

  return progress;
}

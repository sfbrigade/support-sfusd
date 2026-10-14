"use client";

import {
  useCallback,
  useLayoutEffect,
  useState,
  type CSSProperties,
  type RefObject,
} from "react";

type Point = { x: number; y: number };
type Circle = { center: Point; radius: number };

/**
 * Finds the numbered circle badge (rendered by StepBox) inside a step's
 * positioning wrapper, so we can measure where it actually landed on screen.
 */
function findCircle(el: HTMLElement | null): HTMLElement | null {
  return el?.querySelector<HTMLElement>(".bg-brand-sunglow") ?? null;
}

function measureCircle(
  containerRect: DOMRect,
  circleEl: HTMLElement,
): Circle | null {
  const rect = circleEl.getBoundingClientRect();
  if (!rect.width) return null; // display:none, e.g. hidden on mobile
  return {
    center: {
      x: rect.left + rect.width / 2 - containerRect.left,
      y: rect.top + rect.height / 2 - containerRect.top,
    },
    radius: rect.width / 2,
  };
}

/** Point `distance` away from `from`, pulled back along the line toward `toward`. */
function pullBack(from: Point, toward: Point, distance: number): Point {
  const dx = toward.x - from.x;
  const dy = toward.y - from.y;
  const length = Math.hypot(dx, dy) || 1;
  return {
    x: from.x + (dx / length) * distance,
    y: from.y + (dy / length) * distance,
  };
}

/** Point `distance` away from `from`, straight along a fixed direction. */
function offsetInDirection(
  from: Point,
  direction: Point,
  distance: number,
): Point {
  const length = Math.hypot(direction.x, direction.y) || 1;
  return {
    x: from.x + (direction.x / length) * distance,
    y: from.y + (direction.y / length) * distance,
  };
}

type Similarity = { a1: number; a2: number; originX: number; originY: number };

/**
 * Derives the similarity transform (uniform scale + rotation + translation,
 * no skew/distortion) that maps the connector SVG's own local coordinate
 * space onto real, measured screen coordinates — fit so fromLocal lands on
 * `fromReal` and toLocal lands on `toReal`.
 */
function fitSimilarity(
  fromReal: Point,
  toReal: Point,
  fromLocal: Point,
  toLocal: Point,
): Similarity | null {
  const dLocalX = toLocal.x - fromLocal.x;
  const dLocalY = toLocal.y - fromLocal.y;
  const dRealX = toReal.x - fromReal.x;
  const dRealY = toReal.y - fromReal.y;

  const denom = dLocalX * dLocalX + dLocalY * dLocalY;
  if (!denom) return null;

  // Complex division (dRealX + i·dRealY) / (dLocalX + i·dLocalY) gives us
  // the scale+rotation factor that exactly maps the "from→to" local vector
  // onto the "from→to" real vector.
  const a1 = (dRealX * dLocalX + dRealY * dLocalY) / denom;
  const a2 = (dRealY * dLocalX - dRealX * dLocalY) / denom;

  const originX = fromReal.x - (a1 * fromLocal.x - a2 * fromLocal.y);
  const originY = fromReal.y - (a2 * fromLocal.x + a1 * fromLocal.y);

  if (![a1, a2, originX, originY].every(Number.isFinite)) return null;
  return { a1, a2, originX, originY };
}

/**
 * Re-runs `compute` whenever the page's layout might have changed —
 * viewport resize, the container's own size changing, or web fonts
 * finishing load (which can reflow text and shift anchor positions) —
 * instead of relying on hardcoded, screen-size-specific values.
 */
function useRecompute(
  containerRef: RefObject<HTMLElement | null>,
  compute: () => void,
) {
  useLayoutEffect(() => {
    compute();

    window.addEventListener("resize", compute);

    const ro = new ResizeObserver(compute);
    if (containerRef.current) ro.observe(containerRef.current);

    document.fonts?.ready?.then(compute).catch(() => {});

    return () => {
      window.removeEventListener("resize", compute);
      ro.disconnect();
    };
  }, [compute, containerRef]);
}

/**
 * Keeps a decorative connector-line SVG anchored between two step circles,
 * recalculating its position/size/rotation whenever the page's layout
 * changes (viewport resize, font load, content reflow) instead of relying
 * on hardcoded, screen-size-specific values.
 *
 * By default each end is anchored exactly on the circle's center (so the
 * line's own baked-in accent dot there ends up hidden behind the circle
 * badge, same as step 1's start). Pass `fromGap`/`toGap` (pixels) to instead
 * anchor that end pulled back from the circle's edge, toward the other
 * circle by default — this reveals the SVG's own native accent dot sitting
 * just outside the circle, with a real gap, instead of hidden behind it.
 * Pass `fromDirection`/`toDirection` (a real screen-space vector, e.g.
 * `{ x: 0, y: -1 }` for straight up) to anchor along a fixed direction
 * instead — e.g. to keep the dot vertically centered on the circle rather
 * than drifting toward wherever the other circle happens to be.
 */
export function useConnectorLine(
  containerRef: RefObject<HTMLElement | null>,
  fromRef: RefObject<HTMLElement | null>,
  toRef: RefObject<HTMLElement | null>,
  fromLocal: Point,
  toLocal: Point,
  nativeWidth: number,
  gaps?: {
    fromGap?: number;
    toGap?: number;
    fromDirection?: Point;
    toDirection?: Point;
  },
): CSSProperties | null {
  const [style, setStyle] = useState<CSSProperties | null>(null);
  const fromGap = gaps?.fromGap ?? 0;
  const toGap = gaps?.toGap ?? 0;
  const fromDirection = gaps?.fromDirection;
  const toDirection = gaps?.toDirection;

  const recompute = useCallback(() => {
    const containerEl = containerRef.current;
    const fromCircleEl = findCircle(fromRef.current);
    const toCircleEl = findCircle(toRef.current);
    if (!containerEl || !fromCircleEl || !toCircleEl) return;

    const containerRect = containerEl.getBoundingClientRect();
    const fromCircle = measureCircle(containerRect, fromCircleEl);
    const toCircle = measureCircle(containerRect, toCircleEl);
    if (!fromCircle || !toCircle) return;

    const fromReal = fromGap
      ? fromDirection
        ? offsetInDirection(
            fromCircle.center,
            fromDirection,
            fromCircle.radius + fromGap,
          )
        : pullBack(
            fromCircle.center,
            toCircle.center,
            fromCircle.radius + fromGap,
          )
      : fromCircle.center;
    const toReal = toGap
      ? toDirection
        ? offsetInDirection(
            toCircle.center,
            toDirection,
            toCircle.radius + toGap,
          )
        : pullBack(toCircle.center, fromCircle.center, toCircle.radius + toGap)
      : toCircle.center;

    const similarity = fitSimilarity(fromReal, toReal, fromLocal, toLocal);
    if (!similarity) return;

    const { a1, a2, originX, originY } = similarity;
    const scale = Math.sqrt(a1 * a1 + a2 * a2);
    const angleDeg = (Math.atan2(a2, a1) * 180) / Math.PI;

    setStyle({
      left: `${originX}px`,
      top: `${originY}px`,
      width: `${nativeWidth * scale}px`,
      transformOrigin: "0 0",
      transform: `rotate(${angleDeg}deg)`,
    });
  }, [
    containerRef,
    fromRef,
    toRef,
    fromLocal,
    toLocal,
    nativeWidth,
    fromGap,
    toGap,
    fromDirection,
    toDirection,
  ]);

  useRecompute(containerRef, recompute);

  return style;
}

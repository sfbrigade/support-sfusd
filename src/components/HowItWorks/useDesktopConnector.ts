import type { RefObject } from "react";
import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(ScrollTrigger);
// MotionPathPlugin's stringToRawPath/transformRawPath/rawPathToString are
// plain functions on the imported object - they don't touch the internals
// gsap.registerPlugin() wires up, so registering the plugin isn't needed
// just to use them.

type Point = { x: number; y: number };

const { stringToRawPath, rawPathToString, sliceRawPath } = MotionPathPlugin;

/**
 * Splits a connector's source `d` into two independent pieces at `at`
 * (0-1 progress along the curve). Some source curves (see DESKTOP_1 in
 * timelinePaths.data.ts) visually cover two hops in one continuous Figma
 * asset - this lets each half get its own anchor fit, same as if they'd
 * been separate source files.
 */
export function sliceConnectorPath(
  sourceD: string,
  at: number,
): [string, string] {
  const raw = stringToRawPath(sourceD);
  return [
    rawPathToString(sliceRawPath(raw, 0, at)),
    rawPathToString(sliceRawPath(raw, at, 1)),
  ];
}
// transformRawPath exists at runtime (gsap/utils/paths.js) but is missing
// from this GSAP version's shipped .d.ts, unlike stringToRawPath/
// rawPathToString which are both declared - narrow just this one method
// instead of casting the whole plugin object.
const transformRawPath = (
  MotionPathPlugin as unknown as {
    transformRawPath(
      rawPath: gsap.plugins.RawPath,
      a: number,
      b: number,
      c: number,
      d: number,
      tx: number,
      ty: number,
    ): gsap.plugins.RawPath;
  }
).transformRawPath;

type Connector = {
  /** The mask-defining path - also doubles as the ScrollTrigger trigger and
   * the element the scroll-scrub reveal animates. */
  pathRef: RefObject<SVGPathElement | null>;
  visiblePathRef: RefObject<SVGPathElement | null>;
  markerPathRef: RefObject<SVGPathElement | null>;
  /** The connector's pristine, un-fitted source `d` (from timelinePaths.data.ts) -
   * every align pass re-derives from this, never from a path's already-transformed
   * live `d`, or repeated resizes would compound the transform. */
  sourceD: string;
  /** Section the connector is positioned relative to (left/top of its anchors
   * are measured relative to this section's own box). */
  sectionRef: RefObject<HTMLElement | null>;
  getScreenStart: () => Point | null;
  getScreenEnd: () => Point | null;
};

/**
 * Fits each desktop connector's curve between its two live screen anchors
 * (the "Start Here" arrow, numbered step badges) and drives its scroll-
 * scrubbed "draws itself in" reveal - both in the same effect pass, so
 * there's no cross-hook ordering to get right (an earlier version of this
 * split the two concerns into separate hooks coordinated by hook-call-order
 * plus an explicit ScrollTrigger.refresh(), which worked but was a footgun
 * class future edits could silently reintroduce).
 *
 * The fit itself is done by baking the affine transform directly into the
 * curve's real Bezier control points (MotionPathPlugin's stringToRawPath ->
 * transformRawPath -> rawPathToString) rather than applying it as a
 * render-time CSS `transform: scale(...)` on the wrapping <svg> (the
 * previous approach) - a non-uniform CSS scale shears `stroke-width` and
 * `stroke-dasharray`, which are defined in the path's local units before
 * that transform, making dashes visibly balloon or shrink depending on the
 * local curve tangent's angle. Baking the transform into `d` means there's
 * no transform left to shear anything: stroke width and dash spacing render
 * in the same real-pixel coordinate space they're defined in.
 */
export function useDesktopConnector(connectors: Connector[]) {
  useLayoutEffect(() => {
    const state = connectors.map(() => ({
      viewStart: null as Point | null,
      viewEnd: null as Point | null,
      tweenCreated: false,
    }));

    const align = () => {
      if (window.innerWidth < 768) return; // hidden on mobile, no layout box

      connectors.forEach((c, i) => {
        const s = state[i];
        const maskPath = c.pathRef.current;
        const visiblePath = c.visiblePathRef.current;
        const markerPath = c.markerPathRef.current;
        const section = c.sectionRef.current;
        const screenStart = c.getScreenStart();
        const screenEnd = c.getScreenEnd();
        if (
          !maskPath ||
          !visiblePath ||
          !markerPath ||
          !section ||
          !screenStart ||
          !screenEnd
        )
          return;

        // The mask path's `d` is still the pristine source value React
        // rendered it with the first time this runs, before anything below
        // has overwritten it - read the pristine start/end points off it
        // once and cache them, rather than re-deriving from sourceD every
        // call (they never change).
        if (!s.viewStart || !s.viewEnd) {
          s.viewStart = maskPath.getPointAtLength(0);
          s.viewEnd = maskPath.getPointAtLength(maskPath.getTotalLength());
        }

        // Similarity transform (uniform scale + rotation), not independent
        // per-axis scale: a curve whose endpoints are close together on one
        // axis while its middle bulges out gets that axis's scale blown up
        // by an axis-aligned fit, dragging the bulge far off-screen with it.
        // Fitting the source start->end vector onto the target start->end
        // vector via complex division instead derives one scale factor and
        // a rotation, so the bulge scales in proportion rather than shears.
        const sourceX = s.viewEnd.x - s.viewStart.x;
        const sourceY = s.viewEnd.y - s.viewStart.y;
        const targetX = screenEnd.x - screenStart.x;
        const targetY = screenEnd.y - screenStart.y;
        const denom = sourceX * sourceX + sourceY * sourceY;
        const a = (targetX * sourceX + targetY * sourceY) / denom;
        const b = (targetY * sourceX - targetX * sourceY) / denom;
        const matC = -b;
        const matD = a;

        const sectionRect = section.getBoundingClientRect();
        const translateX =
          screenStart.x -
          (a * s.viewStart.x + matC * s.viewStart.y) -
          sectionRect.left;
        const translateY =
          screenStart.y -
          (b * s.viewStart.x + matD * s.viewStart.y) -
          sectionRect.top;

        const raw = transformRawPath(
          stringToRawPath(c.sourceD),
          a,
          b,
          matC,
          matD,
          translateX,
          translateY,
        );
        const newD = rawPathToString(raw);

        maskPath.setAttribute("d", newD);
        visiblePath.setAttribute("d", newD);
        markerPath.setAttribute("d", newD);

        if (!s.tweenCreated) {
          const length = maskPath.getTotalLength();
          gsap.set(maskPath, {
            strokeDasharray: length,
            strokeDashoffset: length,
          });
          gsap.to(maskPath, {
            strokeDashoffset: 0,
            ease: "none",
            scrollTrigger: {
              trigger: maskPath,
              start: "top 85%",
              // A plain "bottom 20%" string can ask for more scroll
              // distance than the page actually has left when the trigger
              // sits near the bottom of the document (the last connector,
              // draining into the final section, has nowhere further to
              // scroll to) - the line would then permanently stall mid-draw
              // once the page hits its max scroll. Clamp the computed end
              // to the page's actual max scroll so every connector is
              // guaranteed to finish drawing by the time scrolling runs out.
              end: () => {
                const bottomAbs =
                  maskPath.getBoundingClientRect().bottom + window.scrollY;
                const desiredEnd = bottomAbs - window.innerHeight * 0.2;
                return Math.min(
                  desiredEnd,
                  ScrollTrigger.maxScroll(window) - 2,
                );
              },
              scrub: true,
            },
          });
          s.tweenCreated = true;
        }
      });

      ScrollTrigger.refresh();
    };

    align();
    window.addEventListener("resize", align);
    return () => window.removeEventListener("resize", align);
  }, []);
}

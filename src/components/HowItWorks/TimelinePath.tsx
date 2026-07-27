import { forwardRef, useId, type CSSProperties, type Ref } from "react";
import type { TimelinePathData } from "./timelinePaths.data";

type TimelinePathProps = Omit<TimelinePathData, "viewBox"> & {
  /** Optional so desktop instances (whose `d` is already baked to real
   * section-relative pixel coordinates by useDesktopConnector) can render
   * with no viewBox scaling at all. Mobile instances still pass this. */
  viewBox?: string;
  className?: string;
  style?: CSSProperties;
  svgRef?: Ref<SVGSVGElement>;
  /** Endpoint-dot radius, in the path's own coordinate space. */
  dotRadius?: number;
  /**
   * Refs to the visible dashed path and the marker-carrier path. Only
   * needed by callers (useDesktopConnector) that rewrite `d` after mount to
   * fit the curve between live anchors — mobile instances render everything
   * from the static `d` prop and never need these.
   */
  visiblePathRef?: Ref<SVGPathElement>;
  markerPathRef?: Ref<SVGPathElement>;
};

/**
 * Renders a dashed connector line as three stacked paths sharing one `d`: a
 * mask-defining path (drives the scroll-scrubbed reveal), a visible dashed
 * path (revealed through the mask), and an unmasked marker-carrier path
 * whose `stroke="none"` keeps it invisible except for its `marker-start`/
 * `marker-end` dots — which is what actually draws the solid endpoint dots,
 * always fully visible regardless of how much of the line has reveal-drawn
 * in, matching the reference design. Markers self-position from `d`, so no
 * endpoint math is needed here at all.
 */
const TimelinePath = forwardRef<SVGPathElement, TimelinePathProps>(
  (
    {
      viewBox,
      d,
      stroke,
      strokeWidth,
      className,
      style,
      svgRef,
      dotRadius = 4,
      visiblePathRef,
      markerPathRef,
    },
    maskPathRef,
  ) => {
    const maskId = useId();
    const dotMarkerId = useId();

    return (
      <svg
        ref={svgRef}
        viewBox={viewBox}
        fill="none"
        className={className}
        style={style}
        aria-hidden="true"
      >
        <defs>
          <marker
            id={dotMarkerId}
            markerWidth={dotRadius * 2}
            markerHeight={dotRadius * 2}
            refX={dotRadius}
            refY={dotRadius}
            markerUnits="userSpaceOnUse"
          >
            <circle cx={dotRadius} cy={dotRadius} r={dotRadius} fill={stroke} />
          </marker>
        </defs>
        {/* userSpaceOnUse with an oversized fixed region, not the
            objectBoundingBox default: a perfectly straight vertical or
            horizontal line (MOBILE_1/MOBILE_4) has zero geometric bounding-
            box width/height (bounding box ignores stroke width), which
            collapses the default region to zero on that axis and clips the
            stroke's visible pixels entirely. */}
        <mask
          id={maskId}
          maskUnits="userSpaceOnUse"
          x={-10000}
          y={-10000}
          width={20000}
          height={20000}
        >
          <path
            ref={maskPathRef}
            d={d}
            stroke="white"
            strokeWidth={strokeWidth * 6}
            fill="none"
          />
        </mask>
        <path
          ref={visiblePathRef}
          d={d}
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeDasharray="6 6"
          strokeLinecap="round"
          fill="none"
          mask={`url(#${maskId})`}
        />
        <path
          ref={markerPathRef}
          d={d}
          stroke="none"
          fill="none"
          markerStart={`url(#${dotMarkerId})`}
          markerEnd={`url(#${dotMarkerId})`}
        />
      </svg>
    );
  },
);

TimelinePath.displayName = "TimelinePath";

export default TimelinePath;

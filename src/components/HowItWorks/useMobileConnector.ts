import type { RefObject } from "react";
import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type UseMobileConnectorArgs = {
  paths: RefObject<SVGPathElement | null>[];
};

/**
 * Scroll-scrubs each mobile connector line's mask path from fully hidden to
 * fully revealed as the line's own drawn geometry scrolls through the
 * viewport. Mobile connectors are pre-positioned via plain CSS (no runtime
 * anchor-fitting needed, unlike desktop's useDesktopConnector), so this only
 * has to handle the reveal animation.
 */
export function useMobileConnector({ paths }: UseMobileConnectorArgs) {
  useLayoutEffect(() => {
    const created = new Set<SVGPathElement>();

    const setup = () => {
      if (window.innerWidth >= 768) return; // hidden on desktop, no layout box

      paths.forEach((pathRef) => {
        const path = pathRef.current;
        if (!path || created.has(path)) return;
        created.add(path);

        const length = path.getTotalLength();
        gsap.set(path, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });
        gsap.to(path, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: path,
            start: "top 85%",
            // Same maxScroll clamp as useDesktopConnector - MOBILE_4 also
            // sits near the bottom of the page, with nowhere further to
            // scroll to.
            end: () => {
              const bottomAbs =
                path.getBoundingClientRect().bottom + window.scrollY;
              const desiredEnd = bottomAbs - window.innerHeight * 0.2;
              return Math.min(desiredEnd, ScrollTrigger.maxScroll(window) - 2);
            },
            scrub: true,
          },
        });
      });
    };

    setup();
    window.addEventListener("resize", setup);
    return () => window.removeEventListener("resize", setup);
  }, []);
}

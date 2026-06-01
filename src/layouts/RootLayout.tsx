"use client";

import React, { useEffect, useRef, useState } from "react";
import Navbar from "@/components/NavBar";
import Banner from "@/components/Banner";
import { usePathname } from "next/navigation";
import ContactUs from "@/components/ContactUs";
import { useMapContext } from "@/contexts/MapContext";
import BackToTop from "@/components/BackToTop";
import { usePostHog } from "posthog-js/react";

function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { isMapView } = useMapContext();
  const posthog = usePostHog();
  const homeBannerRef = useRef<HTMLDivElement>(null);
  const homeNavbarRef = useRef<HTMLDivElement>(null);

  const [isBannerShowing, setIsBannerShowing] = useState(true);

  const setToggle = () => {
    setIsBannerShowing(!isBannerShowing);
  };
  const [showContactForm, setShowContactForm] = useState(false);
  const handleOpen = () => {
    posthog?.capture?.("contact_us_form_opened");
    setShowContactForm(true);
  };
  const handleClose = () => setShowContactForm(false);
  const bannerContent = (
    <>
      <strong>BETA:</strong> This website is in beta - let us know if you have
      any&nbsp;
      <button onClick={handleOpen} className="text-blue-800 hover:underline">
        feedback/questions
      </button>
      <span className="hidden md:inline"> to help us improve it</span>.
    </>
  );

  /* NOTE: id="root" is currently required as a hook by the JS view logic in `map.tsx` to help constrain the map height to the mobile viewport */

  useEffect(() => {
    const rootElement = document.getElementById("root");

    if (!rootElement) {
      return;
    }

    const applyHomeTopChromeHeight = () => {
      const bannerHeight = homeBannerRef.current?.offsetHeight ?? 0;
      const navbarHeight = homeNavbarRef.current?.offsetHeight ?? 0;
      const topChromeHeight = bannerHeight + navbarHeight;
      rootElement.style.setProperty(
        "--home-top-chrome-height",
        `${topChromeHeight}px`,
      );
    };

    if (pathname !== "/") {
      rootElement.style.setProperty("--home-top-chrome-height", "0px");
      return;
    }

    applyHomeTopChromeHeight();

    const observer = new ResizeObserver(applyHomeTopChromeHeight);
    if (homeBannerRef.current) observer.observe(homeBannerRef.current);
    if (homeNavbarRef.current) observer.observe(homeNavbarRef.current);

    window.addEventListener("resize", applyHomeTopChromeHeight);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", applyHomeTopChromeHeight);
    };
  }, [pathname, isBannerShowing]);

  return (
    <div
      id="root"
      className={`flex flex-col px-0 ${isMapView && pathname === "/map" ? "h-dvh-with-fallback" : pathname === "/" ? "min-h-dvh-with-fallback" : "h-auto"}`}
    >
      {/* Phase 2: replace with route group layouts to remove pathname logic */}
      {(pathname?.startsWith("/school") || pathname === "/") &&
        isBannerShowing && (
          <div ref={homeBannerRef}>
            <div className="block md:hidden">
              <Banner onClose={setToggle}>{bannerContent}</Banner>
            </div>
            <div className="hidden md:block">
              <Banner>{bannerContent}</Banner>
            </div>
            {showContactForm && <ContactUs handleClose={handleClose} />}
          </div>
        )}
      <div
        ref={homeNavbarRef}
        className={`sticky top-0 z-40 ${pathname === "/" ? "bg-[#7ce0ed]" : ""}`}
      >
        <Navbar />
      </div>
      <div className="flex-1">{children}</div>
      <BackToTop />
    </div>
  );
}

export default RootLayout;

"use client";

import { CSSProperties } from "react";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Navbar from "@/components/NavBar";
import { usePathname } from "next/navigation";
import { useMapContext } from "@/contexts/MapContext";
import BackToTop from "@/components/BackToTop";
import Banner from "@/components/Banner";
import { usePostHog } from "posthog-js/react";

const ContactUs = dynamic(() => import("@/components/ContactUs"));
const BETA_BANNER_DISMISSED_KEY = "betaBannerDismissed";
const NAVBAR_BANNER_GAP = 4;

function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { isMapView } = useMapContext();
  const posthog = usePostHog();

  const [isBannerShowing, setIsBannerShowing] = useState<boolean | null>(null);
  const [bannerHeight, setBannerHeight] = useState(0);
  const [showContactForm, setShowContactForm] = useState(false);

  /* NOTE: id="root" is currently required as a hook by the JS view logic in `map.tsx` to help constrain the map height to the mobile viewport */

  useEffect(() => {
    try {
      const isBannerDismissed =
        sessionStorage.getItem(BETA_BANNER_DISMISSED_KEY) === "true";
      setIsBannerShowing(!isBannerDismissed);
    } catch {
      // If storage is unavailable, default to showing the banner.
      setIsBannerShowing(true);
    }
  }, []);

  useEffect(() => {
    const bannerElement = document.querySelector(
      '[data-beta-banner="true"]',
    ) as HTMLElement | null;

    if (!bannerElement) {
      setBannerHeight(0);
      return;
    }

    const updateBannerHeight = () => {
      setBannerHeight(bannerElement.offsetHeight);
    };

    updateBannerHeight();

    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", updateBannerHeight);
      return () => {
        window.removeEventListener("resize", updateBannerHeight);
      };
    }

    const resizeObserver = new ResizeObserver(() => {
      updateBannerHeight();
    });

    resizeObserver.observe(bannerElement);
    window.addEventListener("resize", updateBannerHeight);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateBannerHeight);
    };
  }, [isBannerShowing]);

  const handleBannerClose = () => {
    setIsBannerShowing(false);
    setShowContactForm(false);

    try {
      sessionStorage.setItem(BETA_BANNER_DISMISSED_KEY, "true");
    } catch {
      // Ignore storage errors; banner is still dismissed for this render session.
    }
  };
  const handleOpen = () => {
    posthog?.capture?.("contact_us_form_opened");
    setShowContactForm(true);
  };
  const handleClose = () => setShowContactForm(false);
  const bannerContent = (
    <>
      <strong>BETA:</strong> This website is in beta - let us know if you have
      any&nbsp;
      <button
        type="button"
        onClick={handleOpen}
        className="text-blue-800 hover:underline"
      >
        feedback/questions
      </button>
      <span className="hidden md:inline"> to help us improve it</span>.
    </>
  );

  const navbarTopOffset = isBannerShowing
    ? bannerHeight + NAVBAR_BANNER_GAP
    : 0;
  const rootLayoutStyle = {
    "--navbar-top-offset": `${navbarTopOffset}px`,
  } as CSSProperties;

  return (
    <div
      id="root"
      className={`flex flex-col px-0 ${(isMapView && pathname === "/map") || pathname === "/volunteer-your-way" ? "h-dvh-with-fallback" : "h-auto"}`}
      style={rootLayoutStyle}
    >
      {isBannerShowing && (
        <div data-beta-banner="true" className="fixed inset-x-0 top-0 z-[70]">
          <Banner onClose={handleBannerClose}>{bannerContent}</Banner>
        </div>
      )}
      {showContactForm && <ContactUs handleClose={handleClose} />}
      {pathname !== "/" && <Navbar topOffset={navbarTopOffset} />}
      <div className="min-h-0 flex-1">{children}</div>
      <BackToTop />
    </div>
  );
}

export default RootLayout;

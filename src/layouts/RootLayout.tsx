"use client";

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

function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { isMapView } = useMapContext();
  const posthog = usePostHog();

  const [isBannerShowing, setIsBannerShowing] = useState<boolean | null>(null);
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

  return (
    <div
      id="root"
      className={`flex flex-col px-0 ${(isMapView && pathname === "/map") || pathname === "/" ? "h-dvh-with-fallback" : "h-auto"}`}
    >
      {(pathname?.startsWith("/school") || pathname === "/") &&
        isBannerShowing && (
          <>
            <Banner onClose={handleBannerClose}>{bannerContent}</Banner>
            {showContactForm && <ContactUs handleClose={handleClose} />}
          </>
        )}
      <Navbar />
      <div className="min-h-0 flex-1">{children}</div>
      <BackToTop />
    </div>
  );
}

export default RootLayout;

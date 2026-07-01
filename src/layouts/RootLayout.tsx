"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import Navbar from "@/components/NavBar";
import { usePathname } from "next/navigation";
import { useMapContext } from "@/contexts/MapContext";
import BackToTop from "@/components/BackToTop";
import Banner from "@/components/Banner";
import { usePostHog } from "posthog-js/react";

const ContactUs = dynamic(() => import("@/components/ContactUs"));

function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { isMapView } = useMapContext();

  /* NOTE: id="root" is currently required as a hook by the JS view logic in `map.tsx` to help constrain the map height to the mobile viewport */
  const posthog = usePostHog();

  const [isBannerShowing, setIsBannerShowing] = useState(true);
  const [showContactForm, setShowContactForm] = useState(false);

  const setToggle = () => {
    setIsBannerShowing((prev) => !prev);
    setShowContactForm(false);
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
      className={`flex flex-col px-0 ${(isMapView && pathname === "/map") || pathname === "/" || pathname === "/how-it-works" ? "h-dvh-with-fallback" : "h-auto"}`}
    >
      {(pathname?.startsWith("/school") || pathname === "/") &&
        isBannerShowing && (
          <>
            <Banner onClose={setToggle}>{bannerContent}</Banner>
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

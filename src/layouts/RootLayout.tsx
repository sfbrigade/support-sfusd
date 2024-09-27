import React, { useState } from "react";
import { Inter } from "next/font/google";
import Navbar from "@/components/NavBar";
import Banner from "@/components/Banner";
import { useRouter } from "next/router";
import ContactUs from "@/components/ContactUs";
import { useMapContext } from "@/contexts/MapContext";

const inter = Inter({ subsets: ["latin"] });

function RootLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { pathname } = router;
  const { isMapView } = useMapContext();

  const [isBannerShowing, setIsBannerShowing] = useState(true);

  const setToggle = () => {
    setIsBannerShowing(!isBannerShowing);
  };
  const [showContactForm, setShowContactForm] = useState(false);
  const handleOpen = () => setShowContactForm(true);
  const handleClose = () => setShowContactForm(false);
  const bannerContent = (
    <>
      <strong>BETA:</strong> This website is in beta - let us know if you have
      any&nbsp;
      <button onClick={handleOpen} className="text-blue-500 hover:underline">
        feedback/questions
      </button>
      <span className="hidden md:inline"> to help us improve it</span>.
    </>
  );

  /* NOTE: id="root" is currently required as a hook by the JS view logic in `map.tsx` to help constrain the map height to the mobile viewport */

  return (
    <div
      id="root"
      className={`${inter.className} flex flex-col px-0 ${(isMapView && pathname === "/map") || pathname === "/" ? "h-dvh-with-fallback" : "h-auto"}`}
    >
      {(pathname.includes("/school") || pathname === "/") &&
        isBannerShowing && (
          <>
            <div className="block md:hidden">
              <Banner onClose={setToggle}>{bannerContent}</Banner>
            </div>
            <div className="hidden md:block">
              <Banner>{bannerContent}</Banner>
            </div>
            {showContactForm && <ContactUs handleClose={handleClose} />}
          </>
        )}
      <Navbar />
      <div className="flex-1">{children}</div>
    </div>
  );
}

export default RootLayout;

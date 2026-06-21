"use client";

import React from "react";
import Navbar from "@/components/NavBar";
import { usePathname } from "next/navigation";
import { useMapContext } from "@/contexts/MapContext";
import BackToTop from "@/components/BackToTop";

function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { isMapView } = useMapContext();

  /* NOTE: id="root" is currently required as a hook by the JS view logic in `map.tsx` to help constrain the map height to the mobile viewport */

  return (
    <div
      id="root"
      className={`flex flex-col px-0 ${(isMapView && pathname === "/map") || pathname === "/" ? "h-dvh-with-fallback" : "h-auto"}`}
    >
      <Navbar />
      <div className="min-h-0 flex-1">{children}</div>
      <BackToTop />
    </div>
  );
}

export default RootLayout;

import React, { useState } from "react";
import { Inter } from "next/font/google";
import Navbar from "@/components/NavBar";
import Banner from "@/components/Banner";
import { useRouter } from "next/router";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

function RootLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { pathname } = router;

  const [isBannerShowing, setIsBannerShowing] = useState(true);

  const setToggle = () => {
    setIsBannerShowing(!isBannerShowing);
  };

  // NOTE: id="root" is currently needed by the JS view logic in `map.tsx`
  // to complement the the Tailwind media-query driven classes in
  // constraining the map height to the viewport for mobile

  return (
    <div
      id="root"
      className={`${inter.className} flex flex-col px-0 md:px-4 ${pathname.includes("/map") || pathname === "/" ? "h-dvh-with-fallback" : "h-auto"}`}
    >
      {/* NOTE: `id="root"` is currently required as a hook for code in `map.tsx`*/}

      {/* TODO: consider refactoring the pathname-dependent logic to simplify; e.g., use layout components and app routing instead of having to bake pathname logic into this high-level component*/}
      {(pathname.includes("/school") || pathname === "/") &&
        isBannerShowing && (
          <Banner onClose={setToggle}>
            <strong>BETA:</strong> This website is in beta - let us know if you
            have any{" "}
            <Link href="/about" className="underline">
              feedback/questions
            </Link>
            <span className="hidden md:inline"> to help us improve it</span>.
          </Banner>
        )}
      <Navbar />
      <div
        className={
          pathname === "/" ? "absolute bottom-0 left-0 right-0 top-0" : "flex-1"
        }
      >
        {children}
      </div>
    </div>
  );
}

export default RootLayout;

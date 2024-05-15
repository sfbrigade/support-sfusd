import React from "react";
import { Inter } from "next/font/google";
// import Footer from "@/components/Footer";
import Navbar from "@/components/NavBar";
import Banner from "@/components/Banner";
import { useRouter } from "next/router";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

function RootLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { pathname } = router;

  return (
    <div id="root" className={`${inter.className} px-0 md:px-4 flex flex-col ${pathname.includes('/map') ? 'h-screen' : 'h-auto'}`}>
      {
        pathname.includes('/profile') &&
          <Banner><strong>BETA:</strong> This website is in beta - let us know if you have any <Link href="/about" className="underline">feedback/questions</Link><span className="hidden md:inline"> to help us improve it</span>.</Banner>
      }
      <Navbar />
      <div className="flex-1">{children}</div>
    </div>
  );
}

export default RootLayout;

import React from "react";
import { Inter } from "next/font/google";
import Footer from "@/components/Footer";
import Navbar from "@/components/NavBar";
import Banner from "@/components/Banner";

const inter = Inter({ subsets: ["latin"] });

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${inter.className} px-0 md:px-4`}>
      <Banner><strong>BETA:</strong> This website is in beta - let us know if you have any <a href="#" className="underline">feedback/questions</a><span className="hidden md:inline"> to help us improve it</span>.</Banner>
      <Navbar />
      <div className="">{children}</div>
      <Footer />
    </div>
  );
}

export default RootLayout;

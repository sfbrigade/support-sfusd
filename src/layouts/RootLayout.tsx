import React from "react";
import { Inter } from "next/font/google";
// import Footer from "@/components/Footer";
import Navbar from "@/components/NavBar";

const inter = Inter({ subsets: ["latin"] });

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${inter.className} px-0 md:px-4 --mobile-new-- h-full flex flex-col`}>
      <Navbar />
      <div id="layout-main" className="--mobile-new-- h-full grow-1">{children}</div>
    </div>
  );
}

export default RootLayout;

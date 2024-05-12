import React from "react";
import { Inter } from "next/font/google";
// import Footer from "@/components/Footer";
import Navbar from "@/components/NavBar";

const inter = Inter({ subsets: ["latin"] });

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${inter.className} px-0 md:px-4`}>
      <Navbar />
      <div className="">{children}</div>
    </div>
  );
}

export default RootLayout;

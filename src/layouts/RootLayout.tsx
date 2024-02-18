import React from "react";
import { Inter } from "next/font/google";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/NavBar";

const inter = Inter({ subsets: ["latin"] });

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${inter.className} mx-auto flex flex-col px-0 md:px-4`}>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}

export default RootLayout;

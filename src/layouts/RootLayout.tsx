import React from "react";
import { Inter } from "next/font/google";
import Navbar from "../components/NavBar";

const inter = Inter({ subsets: ["latin"] });

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`${inter.className} flex flex-col mx-auto max-w-[1280px] px-4`}
    >
      <Navbar />
      {children}
    </div>
  );
}

export default RootLayout;

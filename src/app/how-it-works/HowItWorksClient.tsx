"use client";

import Image from "next/image";
import Link from "next/link";

export default function HowItWorksClient() {
  return (
    <section className="relative flex h-full flex-col overflow-hidden bg-[#D7F1FF]">
      {/* Center content */}
      <div className="z-10 flex flex-1 flex-col items-center justify-center px-4 pb-[5vh] text-center">
        <h1 className="mb-6 font-fredoka text-6xl font-semibold text-[#5B6FE8]">
          How It Works
        </h1>
        <p className="max-w-xl text-lg text-gray-800">
          Support SF Schools is run by an{" "}
          <Link
            href="https://www.sfcivictech.org"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            all-volunteer team at SF Civic Tech
          </Link>
          . We built this website to help San Francisco residents quickly and
          easily find ways to volunteer and donate to San Francisco public
          schools.
        </p>
        <div className="mt-10 flex flex-col items-center gap-1 font-semibold text-gray-800">
          <span>Start Here</span>
          <span className="text-xl">↓</span>
        </div>
      </div>

      {/* Hero background — cable car + grass + Coit Tower */}
      <div className="absolute bottom-0 left-0 right-0 z-0 h-[40vw]">
        <Image
          src="/how-it-works/hero-bg.svg"
          alt="San Francisco cable car and Coit Tower"
          fill
          className="object-contain object-bottom"
        />
      </div>
    </section>
  );
}

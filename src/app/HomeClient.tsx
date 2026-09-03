"use client";

import Image from "next/image";
import Link from "next/link";
import { usePostHog } from "posthog-js/react";
import OurProcess from "@/components/HomePage/OurProcess";
import OurMission from "@/components/HomePage/OurMission";
import Opportunities from "@/components/HomePage/Opportunities";
import Navbar from "@/components/NavBar";

export default function HomeClient() {
  const posthog = usePostHog();

  const trackHeroVolunteerClick = () => {
    posthog?.capture?.("hero_volunteer_click");
  };

  if (posthog) {
    posthog.capture("pageview", { page: "home" });
  }

  return (
    <>
      <div className="relative">
        <div
          className="fixed inset-x-0 z-50"
          style={{ top: "var(--navbar-top-offset, 0px)" }}
        >
          <Navbar />
        </div>

        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#7CE0ED] to-[#E3FCFF]">
          <Image
            src="/homepage-background.png"
            alt="Homepage Background"
            className="absolute bottom-0 w-full"
            width={2000}
            height={2000}
            priority={true}
          />
        </div>

        <main className="relative flex flex-row justify-between p-4 max-[809px]:mx-auto max-[809px]:max-w-[350px] max-[809px]:px-0 min-[810px]:h-dvh-with-fallback min-[810px]:max-[1199px]:mx-auto min-[810px]:max-[1199px]:max-w-[730px] min-[810px]:max-[1199px]:px-0 min-[1440px]:px-[72px] min-[1920px]:px-[88px] min-[2560px]:px-[96px]">
          <section className="flex flex-1 flex-col items-center justify-start gap-8 pt-[clamp(5.5rem,12vh,10rem)] lg:gap-11">
            <header className="text-center">
              <h1 className="text-[36px] font-medium tracking-wider min-[810px]:text-[64px] min-[810px]:leading-none min-[1440px]:text-[72px] min-[1920px]:text-[80px] min-[2560px]:text-[88px]">
                Get <span className="text-[#F15437]">Involved</span> with <br />
                <span className="text-[#F15437]">
                  San Francisco Public Schools
                </span>
              </h1>
            </header>

            <div className="max-w-[400px] text-center text-sm tracking-wide text-black sm:text-base md:text-lg lg:text-xl lg:leading-8 min-[810px]:max-w-[650px] min-[810px]:text-[16px] min-[1440px]:max-w-[560px] min-[1440px]:text-[24px] min-[1920px]:max-w-[640px] min-[1920px]:text-[28px] min-[2560px]:max-w-[720px] min-[2560px]:text-[32px]">
              <span className="font-semibold">Our public schools need support.</span>{" "}
              Whether or not you have experience in education, we connect you
              with meaningful ways to make an impact for San Francisco youth.
            </div>

            <Link
              href="/how-it-works"
              onClick={trackHeroVolunteerClick}
              className="flex items-center justify-center gap-3 rounded-lg bg-amber-400 px-4 py-4 lg:px-8 shadow-[0_6px_14px_rgba(0,0,0,0.25)]"
            >
              <span className="text-sm font-medium leading-7 tracking-wide text-zinc-950 sm:text-base md:text-lg lg:text-xl min-[810px]:text-[16px] min-[1440px]:text-[16px] min-[1920px]:text-[18px] min-[2560px]:text-[20px]">
                Volunteer Your Way
              </span>
              <div className="flex items-center justify-center rounded-full bg-orange-200 p-1">
                <Image
                  src="/right-arrow.png"
                  alt="Arrow Icon"
                  width={20}
                  height={20}
                />
              </div>
            </Link>
          </section>
        </main>
      </div>
      <OurMission />
      <OurProcess />
      <Opportunities />
    </>
  );
}

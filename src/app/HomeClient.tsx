"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { usePostHog } from "posthog-js/react";
import OurProcess from "@/components/HomePage/OurProcess";
import OurMission from "@/components/HomePage/OurMission";
import Opportunities from "@/components/HomePage/Opportunities";
import Navbar from "@/components/NavBar";

export default function HomeClient() {
  const router = useRouter();
  const posthog = usePostHog();

  const handleClick = () => {
    posthog?.capture("explore_schools_clicked");
    router.push("/map");
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

        <main className="relative flex h-dvh-with-fallback flex-row justify-between p-4">
          <section className="flex flex-1 flex-col items-center justify-start gap-8 pt-[clamp(5.5rem,12vh,10rem)] lg:gap-11">
            <header className="text-center">
              <h1 className="text-3xl font-medium tracking-wider xl:text-5xl xl:leading-normal">
                Get <span className="text-[#F15437]">Involved</span> with <br />
                <span className="text-[#F15437]">
                  San Francisco Public Schools
                </span>
              </h1>
            </header>

            <div className="max-w-[400px] text-center text-sm tracking-wide text-black sm:text-base md:text-lg lg:text-xl lg:leading-8">
              Find public schools near you that need support from the local
              community.
            </div>

            <button
              className="flex items-center justify-center gap-3 rounded-lg bg-amber-400 px-4 py-4 lg:px-8 shadow-[0_6px_14px_rgba(0,0,0,0.25)]"
              onClick={handleClick}
            >
              <span className="text-sm font-medium leading-7 tracking-wide text-zinc-950 sm:text-base md:text-lg lg:text-xl">
                Explore Schools
              </span>
              <div className="flex items-center justify-center rounded-full bg-orange-200 p-1">
                <Image
                  src="/right-arrow.png"
                  alt="Arrow Icon"
                  width={20}
                  height={20}
                />
              </div>
            </button>
          </section>
        </main>
      </div>
      <OurMission />
      <OurProcess />
      <Opportunities />
    </>
  );
}

"use client";

import Hero from "@/components/homePageComponents/Hero";
import { useRouter } from "next/navigation";
import { usePostHog } from "posthog-js/react";

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
      <main className="relative isolate flex min-h-full flex-row justify-between overflow-hidden bg-gradient-to-b from-[#7ce0ed] to-[#e3fcff] p-4">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[url('/homepage-background.png')] bg-cover bg-bottom bg-no-repeat"
        />
        <Hero onExplore={handleClick} />
      </main>
    </>
  );
}

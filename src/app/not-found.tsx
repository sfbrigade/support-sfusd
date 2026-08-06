// Global 404 page — rendered for any unmatched route.
// A school-specific not-found lives (or will live) at app/school/[stub]/not-found.tsx.
import type { Metadata } from "next";
import Image from "next/image";
import Footer from "@/components/Footer";
import GoBackButton from "@/components/GoBackButton";

export const metadata: Metadata = {
  title: "Support SF Schools - Page Not Found",
};

export default function NotFound() {
  return (
    <div className="flex min-h-full flex-col">
      <section className="relative flex min-h-[55vh] flex-1 flex-col items-center justify-center overflow-hidden bg-[#E9FAFC] px-6 pb-10 pt-16 text-center">
        {/* Decorative clouds */}
        <Image
          src="/404-page/cloud.svg"
          alt=""
          aria-hidden="true"
          width={164}
          height={77}
          className="pointer-events-none absolute -left-4 top-40 w-[101px] md:left-40 md:top-24 md:w-[141px]"
        />
        <Image
          src="/404-page/cloud.svg"
          alt=""
          aria-hidden="true"
          width={164}
          height={77}
          className="pointer-events-none absolute -left-4 bottom-20 w-[122px] md:bottom-28 md:left-48 md:w-[158px]"
        />
        <Image
          src="/404-page/cloud.svg"
          alt=""
          aria-hidden="true"
          width={164}
          height={77}
          className="pointer-events-none absolute -right-4 bottom-16 w-[122px] md:bottom-24 md:right-48 md:w-[141px]"
        />

        {/* 404 illustration */}
        <Image
          src="/404-page/404-page.svg"
          alt="Page not found"
          width={469}
          height={236}
          priority
          className="relative w-full max-w-[300px] md:max-w-[420px]"
        />

        <h1 className="relative mt-8 font-fredoka text-2xl font-medium text-brand-raisin md:text-3xl">
          Looks like this page skipped class.
        </h1>
        <p className="relative mt-3 max-w-md text-base text-[#333333] md:text-lg">
          The page you&apos;re looking for may have moved, been deleted, or
          never existed.
        </p>

        <GoBackButton className="relative mt-8" />
      </section>

      <Footer />
    </div>
  );
}

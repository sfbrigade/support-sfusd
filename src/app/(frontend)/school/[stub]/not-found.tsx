// School-specific not-found page — rendered when a school stub can't be found
// (SchoolPage calls notFound()). Distinct from the global app/not-found.tsx 404.
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";

export default function SchoolNotFound() {
  return (
    <>
      <section className="relative flex min-h-[calc(100dvh-96px)] flex-col items-center overflow-hidden bg-[#D7F1FF] pt-10 text-center md:pt-16">
        {/* Desktop scene: full-bleed overlay pinned to the bottom, behind the text */}
        <Image
          src="/school-not-found/school-not-found-desktop.svg"
          alt=""
          aria-hidden="true"
          width={1440}
          height={624}
          priority
          className="pointer-events-none absolute inset-x-0 bottom-0 hidden w-full md:block"
        />

        {/* Foreground text */}
        <div className="relative z-10 flex flex-col items-center px-6">
          <h1 className="font-fredoka text-3xl font-medium text-brand-azure md:text-5xl">
            Oops! School Not Found!
          </h1>
          <p className="mt-4 max-w-xl font-fredoka text-lg font-normal tracking-[0.02em] text-brand-raisin md:mt-12 md:text-2xl">
            We couldn&apos;t find the school you were looking for.
            <br />
            <span className="font-semibold">
              Let&apos;s get you back on track.
            </span>
          </p>
          <Link
            href="/map"
            className="mt-10 rounded-lg bg-brand-sunglow px-6 py-2.5 font-fredoka text-xl font-normal text-brand-raisin shadow-[0_6px_14px_rgba(0,0,0,0.15)] transition hover:brightness-95 md:mt-12"
          >
            Explore Schools
          </Link>
        </div>

        {/* Mobile scene: full-bleed, pushed to the bottom in normal flow (no overlap) */}
        <Image
          src="/school-not-found/school-not-found-mobile.svg"
          alt=""
          aria-hidden="true"
          width={393}
          height={554}
          priority
          className="pointer-events-none absolute inset-x-0 bottom-0 w-full md:hidden"
        />
      </section>
      <Footer />
    </>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type Opportunity = {
  id: string;
  provider: string;
  title: string;
  description: string;
  date: string;
  location: string;
  accentFrom: string;
  accentTo: string;
};

const OPPORTUNITIES: Opportunity[] = [
  {
    id: "back-to-school-setup-day",
    provider: "SF Ed Fund",
    title: "Back to School Setup Day",
    description: "Help set up teacher's classrooms!",
    date: "Fri, Aug 14, 2026 · 9AM-4PM",
    location: "City-wide",
    accentFrom: "#DCEFFB",
    accentTo: "#BFE3FF",
  },
  {
    id: "coding-project-volunteer",
    provider: "Mission Bit",
    title: "Coding project volunteer",
    description: "Help students with summer coding projects!",
    date: "Jun 23 - Jul 30, 2026 · 4-6PM",
    location: "329 Bryant St. SF",
    accentFrom: "#FDE7D3",
    accentTo: "#FBCE9E",
  },
  {
    id: "cantonese-translation-support",
    provider: "Good Neighbor Lab",
    title: "Cantonese translation support",
    description: "Translate elementary school communication into Cantonese",
    date: "Year-round",
    location: "Remote",
    accentFrom: "#E4F5E1",
    accentTo: "#C3E9BC",
  },
  {
    id: "reading-buddies-program",
    provider: "Bay Area Book Bank",
    title: "Reading Buddies Program",
    description: "Read one-on-one with 2nd graders during lunch.",
    date: "Tue & Thu, Sept-May · 12-1PM",
    location: "Various Elementary Schools",
    accentFrom: "#FDE1F0",
    accentTo: "#FBC7E3",
  },
  {
    id: "career-day-speaker",
    provider: "SF Chamber of Commerce",
    title: "Career Day Speaker",
    description: "Share your career journey with middle schoolers.",
    date: "Fri, Oct 9, 2026 · 10AM-12PM",
    location: "Various Middle Schools",
    accentFrom: "#EDE4FB",
    accentTo: "#D8C7F5",
  },
  {
    id: "garden-club-helper",
    provider: "Green Schoolyards SF",
    title: "Garden Club Helper",
    description: "Help students plant and tend the campus garden.",
    date: "Saturdays, Sept-Jun · 9-11AM",
    location: "City-wide",
    accentFrom: "#FFF6D6",
    accentTo: "#FFE9A8",
  },
];

function CalendarIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="shrink-0"
    >
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="shrink-0"
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 24 24"
      fill="none"
      stroke="white"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function ChevronIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={direction === "left" ? "rotate-180" : ""}
    >
      <path d="M9 6l6 6-6 6" />
    </svg>
  );
}

function OpportunityCard({ opportunity }: { opportunity: Opportunity }) {
  return (
    <article className="flex h-full w-full flex-col overflow-hidden rounded-[14px] bg-white text-left shadow-[0_2px_10px_rgba(0,0,0,0.08)]">
      <div
        className="h-[min(110px,13vh)] w-full md:h-[min(130px,13vh)] lg:h-[min(160px,14vh)] xl:h-[min(180px,14vh)]"
        style={{
          background: `linear-gradient(135deg, ${opportunity.accentFrom}, ${opportunity.accentTo})`,
        }}
      />

      <div className="flex flex-1 flex-col gap-1.5 p-5 lg:p-5 xl:p-5">
        <p className="italic text-[13px] text-black lg:text-[15px]">{opportunity.provider}</p>

        <h3 className="text-[18px] font-medium leading-snug text-[#2A2A2A] lg:text-[20px] xl:text-[22px]">
          {opportunity.title}
        </h3>

        <p className="text-[14px] leading-snug text-[#5B5B5B] lg:text-[15px] xl:text-[16px]">
          {opportunity.description}
        </p>

        <div className="mt-1 flex flex-col gap-1.5 text-[13px] text-[#5B5B5B] lg:text-[14px]">
          <span className="flex items-center gap-2">
            <CalendarIcon />
            {opportunity.date}
          </span>
          <span className="flex items-center gap-2">
            <PinIcon />
            {opportunity.location}
          </span>
        </div>

        <Link
          href="/survey"
          className="mt-auto inline-flex w-fit items-center gap-2 self-start rounded-md border border-[#3A86FF] bg-white px-4 py-1.5 text-sm font-semibold text-[#3A86FF] transition hover:bg-[#EAF3FF] lg:px-5 lg:py-2"
        >
          Get Started
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#3A86FF]">
            <ArrowRightIcon />
          </span>
        </Link>
      </div>
    </article>
  );
}

export default function Opportunities() {
  const [itemsPerView, setItemsPerView] = useState(3);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    const updateItemsPerView = () => setItemsPerView(mediaQuery.matches ? 3 : 1);
    updateItemsPerView();
    mediaQuery.addEventListener("change", updateItemsPerView);
    return () => mediaQuery.removeEventListener("change", updateItemsPerView);
  }, []);

  const totalPages = Math.max(1, Math.ceil(OPPORTUNITIES.length / itemsPerView));

  useEffect(() => {
    setPage((current) => Math.min(current, totalPages - 1));
  }, [totalPages]);

  const goToPage = (index: number) => setPage((index + totalPages) % totalPages);

  return (
    <section
      className="flex min-h-dvh-with-fallback w-full items-center bg-[#FDF6E8] pb-6 md:pb-7"
      style={{
        paddingTop: "calc(var(--navbar-top-offset, 0px) + clamp(5.5rem, 12vh, 7.5rem))",
      }}
    >
      <div className="relative mx-auto flex w-full max-w-[1600px] flex-col items-center px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12">
        <h2 className="text-center text-[38px] font-medium leading-none text-[#357BE8] md:text-[48px] lg:text-[52px] xl:text-[60px] 2xl:text-[68px]">
          Featured Opportunities
        </h2>

        <p className="mt-3 max-w-[560px] text-center text-[15px] text-[#5B5B5B] md:mt-4 md:max-w-[640px] md:text-[18px] lg:max-w-[700px] lg:text-[20px] xl:max-w-[820px] xl:text-[22px]">
          Here are some schools that have available volunteer opportunities right now.
        </p>

        <div className="relative mt-5 flex w-full items-center gap-3 lg:mt-6 xl:mt-6">
          <Image
            src="/home-page/opportunities-wave.svg"
            alt=""
            width={170}
            height={174}
            aria-hidden="true"
            priority={false}
            className="pointer-events-none absolute -top-[70px] right-[10px] z-0 hidden w-[90px] md:block lg:-top-[88px] lg:right-[12px] lg:w-[110px] xl:-top-[105px] xl:right-[16px] xl:w-[130px]"
          />

          <button
            type="button"
            onClick={() => goToPage(page - 1)}
            aria-label="Previous opportunities"
            disabled={totalPages <= 1}
            className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-[#357BE8] shadow-[0_2px_8px_rgba(0,0,0,0.12)] transition hover:bg-[#EAF3FF] disabled:pointer-events-none disabled:opacity-0 md:flex lg:h-12 lg:w-12"
          >
            <ChevronIcon direction="left" />
          </button>

          <div className="w-full overflow-x-hidden">
            <div
              className="relative z-10 flex transition-transform duration-300 ease-out"
              style={{ transform: `translateX(-${page * 100}%)` }}
            >
              {Array.from({ length: totalPages }).map((_, pageIndex) => (
                <div
                  key={pageIndex}
                  className="grid w-full shrink-0 grid-cols-1 gap-6 md:grid-cols-3 md:gap-8 lg:gap-10"
                >
                  {OPPORTUNITIES.slice(
                    pageIndex * itemsPerView,
                    pageIndex * itemsPerView + itemsPerView,
                  ).map((opportunity) => (
                    <OpportunityCard key={opportunity.id} opportunity={opportunity} />
                  ))}
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={() => goToPage(page + 1)}
            aria-label="Next opportunities"
            disabled={totalPages <= 1}
            className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-[#357BE8] shadow-[0_2px_8px_rgba(0,0,0,0.12)] transition hover:bg-[#EAF3FF] disabled:pointer-events-none disabled:opacity-0 md:flex lg:h-12 lg:w-12"
          >
            <ChevronIcon direction="right" />
          </button>
        </div>

        {totalPages > 1 && (
          <div className="mt-3 flex items-center gap-2 lg:mt-4">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => goToPage(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={`h-2.5 rounded-full transition-all ${
                  index === page ? "w-6 bg-[#3A86FF]" : "w-2.5 bg-[#D9D9D9]"
                }`}
              />
            ))}
          </div>
        )}

        <div className="mt-6 flex flex-col items-center gap-3 text-center lg:mt-7 lg:flex-row lg:justify-center lg:gap-6 lg:text-left">
          <Image
            src="/home-page/opportunities-pencil.svg"
            alt=""
            width={160}
            height={156}
            aria-hidden="true"
            priority={false}
            className="w-[80px] lg:w-[100px] xl:w-[110px]"
          />

          <p className="text-[15px] text-[#2A2A2A] lg:text-[18px] xl:text-[20px]">
            Don&apos;t see what interests you? Fill out our volunteer form.
          </p>

          <Link
            href="/how-it-works"
            className="inline-flex items-center justify-center rounded-md bg-[#3A86FF] px-6 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90 lg:px-8 lg:py-3 lg:text-base"
          >
            Volunteer Your Way
          </Link>
        </div>
      </div>
    </section>
  );
}

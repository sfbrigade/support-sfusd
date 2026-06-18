"use client";

import Image from "next/image";
import Link from "next/link";

const steps = [
  {
    id: "1",
    title: "Take the Volunteer Survey",
    description:
      "You can take our Volunteer Survey to find the best match for your interests. Or Explore Schools on your own.",
    button: "Take the Volunteer Survey",
    image: "/volunteer-graphic.png",
    imageClass: "md:w-[320px]",
  },
  {
    id: "2",
    title: "We Match You with Opportunities",
    description:
      "Based on your responses, we will connect you with opportunities that match your interests and give you a greater sense of purpose to set up a volunteer placement.",
    image: "/Map.svg",
    imageClass: "md:w-[320px]",
  },
  {
    id: "3",
    title: "Partner Organizations",
    description:
      "SF Ed Fund, Good Neighbor Lab, Mission Bit, and 826 Valencia support volunteers and students through local partnerships.",
    image: "/donation-graphic.png",
    imageClass: "md:w-[320px]",
  },
  {
    id: "4",
    title: "Volunteer Placement",
    description:
      "Your place with a school or organization where your skills can make a real impact.",
    button: "Take the Volunteer Survey",
    image: "/about-graphic.png",
    imageClass: "md:w-[280px]",
  },
] as const;

type Step = {
  id: string;
  title: string;
  description: string;
  image: string;
  imageClass: string;
  button?: string;
};

const partners = [
  {
    name: "SF Ed Fund",
    description:
      "SF Ed Fund works with the school district to help students thrive. They provide places for volunteers in community literacy programs.",
    tone: "bg-[#FF4B87]",
  },
  {
    name: "Good Neighbor Lab",
    description:
      "Good Neighbor Lab connects volunteers with local needs in their neighborhoods.",
    tone: "bg-[#B47CFF]",
  },
  {
    name: "Mission Bit",
    description:
      "Mission Bit helps underrepresented students with coding programs and project-based learning.",
    tone: "bg-[#3D7FE5]",
  },
  {
    name: "826 Valencia",
    description:
      "826 Valencia supports students with writing and creativity-centered support.",
    tone: "bg-[#FFC83D]",
  },
];

function HeroIllustration() {
  return (
    <div className="relative isolate flex h-screen w-full items-center overflow-hidden bg-[#E9FAFC] px-4 md:px-8">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <Image
          src="/how_it_works/Cloud.png"
          alt="Cloud"
          width={260}
          height={120}
          className="absolute left-[5%] top-[12%] z-30 h-auto w-[18%]"
        />
        <Image
          src="/how_it_works/Cloud.png"
          alt="Cloud"
          width={240}
          height={110}
          className="absolute right-[14%] top-[44%] z-30 h-auto w-[14%]"
        />
        <Image
          src="/how_it_works/Mountains.png"
          alt="Mountains"
          width={1200}
          height={420}
          className="absolute left-0 top-[44%] h-auto w-[58%]"
        />
        <Image
          src="/how_it_works/cable-car.png"
          alt="Cable car"
          width={520}
          height={260}
          className="absolute left-[5%] bottom-[10%] z-30 h-auto w-[24%]"
        />
        <Image
          src="/how_it_works/CoitTower.png"
          alt="Coit Tower"
          width={320}
          height={560}
          className="absolute right-[11%] bottom-0 z-30 h-auto w-[10%]"
        />
        <Image
          src="/how_it_works/building.png"
          alt="Building"
          width={360}
          height={520}
          className="absolute right-[3%] bottom-0 z-30 h-auto w-[11%]"
        />
        <Image
          src="/how_it_works/botom_cloud.png"
          alt="Bottom cloud"
          width={1100}
          height={320}
          className="absolute right-0 bottom-0 z-30 h-auto w-[28%]"
        />
        <Image
          src="/how_it_works/Grass.png"
          alt="Grass"
          width={1600}
          height={250}
          className="absolute bottom-0 left-1/2 z-20 h-[18vh] w-screen max-w-none -translate-x-1/2 object-fill md:h-[14vh]"
        />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center">
        <div className="max-w-4xl text-center">
          <h1 className="font-fredoka text-4xl font-semibold tracking-tight text-[#3F80F4] md:text-6xl">
            How It Works
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[#35506A] md:text-lg">
            Support SF Schools is run by an{" "}
            <a
              href="https://www.sf.gov"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[#3F80F4] hover:underline"
            >
              all-volunteer team at SF Civic Tech
            </a>
            . We built this website to help San Francisco residents quickly and easily find ways to
            volunteer and donate to San Francisco public schools.
          </p>
          <div className="mt-6 flex flex-col items-center gap-2">
            <span className="text-xs font-semibold text-gray-600 md:text-sm">Start Here</span>
            <svg className="h-6 w-6 animate-bounce text-[#F5A623]" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a1 1 0 01-.707-.293l-7-7a1 1 0 111.414-1.414L10 15.586l6.293-6.293a1 1 0 111.414 1.414l-7 7A1 1 0 0110 18z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </div>
    </div>
    
  );
}

function StepSection({
  step,
  reverse,
}: {
  step: Step;
  reverse?: boolean;
}) {
  return (
    <section
      className={`mx-auto flex w-full max-w-6xl flex-col items-center gap-6 px-4 py-10 md:flex-row md:gap-10 md:px-8 ${reverse ? "md:flex-row-reverse" : ""}`}
    >
      <div className="flex-1">
        <div className="relative mx-auto flex min-h-[220px] w-full max-w-md items-center justify-center overflow-hidden rounded-[2rem] bg-white/80 p-6 shadow-[0_18px_50px_rgba(0,0,0,0.08)]">
          <div className="absolute left-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border-4 border-dotted border-[#F4C24E] bg-white text-lg font-bold text-[#F4A900]">
            {step.id}
          </div>
          <Image
            src={step.image}
            alt={step.title}
            width={420}
            height={320}
            className={`h-auto w-full max-w-[300px] object-contain ${step.imageClass}`}
          />
        </div>
      </div>

      <div className="flex-1 max-w-xl">
        <h2 className="text-2xl font-semibold text-[#3D7FE5] md:text-3xl">
          {step.title}
        </h2>
        <p className="mt-3 text-base leading-7 text-[#334155] md:text-lg">
          {step.description}
        </p>
        {step.button ? (
          <Link
            href="/map"
            className="mt-6 inline-flex rounded-full bg-[#3D7FE5] px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:opacity-95"
          >
            {step.button}
          </Link>
        ) : null}
      </div>
    </section>
  );
}

export default function HowItWorksClient() {
  return (
    <main className="min-h-screen bg-[#DDF6FF] text-[#1f2937]">
      <HeroIllustration />

      <section className="relative z-0 -mt-8 rounded-t-[2.5rem] bg-[#DDF6FF] px-4 pb-12 pt-10 md:-mt-12 md:rounded-t-[4rem] md:px-8">
        <StepSection step={steps[0]} />
        <StepSection step={steps[1]} reverse />

        <section className="mx-auto w-full max-w-6xl px-4 py-10 md:px-8">
          <h2 className="text-center text-2xl font-semibold text-[#3D7FE5] md:text-3xl">
            Partner Organizations
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {partners.map((partner) => (
              <article
                key={partner.name}
                className="rounded-2xl bg-white p-5 shadow-[0_16px_50px_rgba(0,0,0,0.08)]"
              >
                <div className="flex items-start gap-4">
                  <div className={`mt-1 h-12 w-12 rounded-full ${partner.tone}`} />
                  <div>
                    <h3 className="text-lg font-semibold text-[#17324D]">
                      {partner.name}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-[#475569]">
                      {partner.description}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <StepSection step={steps[2]} />
        <StepSection step={steps[3]} reverse />
      </section>
    </main>
  );
}

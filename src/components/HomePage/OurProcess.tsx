import Image from "next/image";
import Link from "next/link";

type ProcessStep = {
  number: number;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
};

const PROCESS_STEPS: ProcessStep[] = [
  {
    number: 1,
    title: "Take our Volunteer Survey",
    description: "to find the opportunity that matches your interests.",
    imageSrc: "/HomePage/our-process-left.png",
    imageAlt: "Volunteers filling out a survey",
  },
  {
    number: 2,
    title: "Based on your responses",
    description: "we will connect you with our recommendation.",
    imageSrc: "/HomePage/our-process-middle.png",
    imageAlt: "A schoolhouse representing matching opportunities",
  },
  {
    number: 3,
    title: "...from growing list of",
    description: "partner organizations, to set up a volunteer placement.",
    imageSrc: "/HomePage/our-process-right.png",
    imageAlt: "Community members and landmarks representing partner organizations",
  },
];

export default function OurProcess() {
  return (
    <section className="flex min-h-[50vh] w-full items-center bg-[#FDF6E8] px-4 py-10 md:py-12">
      <div className="mx-auto flex w-full max-w-[980px] flex-col items-center">
        <h2 className="text-center text-[38px] font-medium leading-none text-[#357BE8] md:text-[48px]">
          Our Process
        </h2>

        <div className="mt-8 grid w-full grid-cols-1 gap-8 md:grid-cols-3 md:gap-6">
          {PROCESS_STEPS.map((step) => (
            <article
              key={step.number}
              className="relative mx-auto w-full max-w-[240px] rounded-[10px] bg-white px-4 pb-4 pt-5 text-center shadow-[0_2px_8px_rgba(0,0,0,0.06)]"
            >
              <div className="absolute -top-3 left-1/2 flex h-6 w-6 -translate-x-1/2 items-center justify-center rounded-full bg-[#3A86FF] text-xs font-bold text-white">
                {step.number}
              </div>

              <div className="mx-auto flex h-[95px] w-full items-center justify-center">
                <Image
                  src={step.imageSrc}
                  alt={step.imageAlt}
                  width={140}
                  height={95}
                  className="h-[95px] w-auto object-contain"
                />
              </div>

              <p className="mt-3 text-[11px] leading-[1.3] text-[#2A2A2A]">
                <span className="font-semibold text-[#357BE8]">{step.title}</span>
                <span>{` ${step.description}`}</span>
              </p>
            </article>
          ))}
        </div>

        <Link
          href="/survey"
          className="mt-8 inline-flex items-center justify-center rounded-md bg-[#3A86FF] px-5 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
        >
          Find Your Volunteer Match
        </Link>
      </div>
    </section>
  );
}

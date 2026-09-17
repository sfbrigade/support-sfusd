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
    title: "Share Your Preferences",
    description:
      "Answer a few short questions so we understand the types of volunteer opportunities that interest you. (takes 2 min)",
    imageSrc: "/home-page/our-process-left.svg",
    imageAlt: "Volunteers filling out a survey",
  },
  {
    number: 2,
    title: "Get Recommendations",
    description:
      "We recommend organizations dedicated to supporting San Francisco public schools and students, who offer volunteer opportunities matching your specific interests and schedule.",
    imageSrc: "/home-page/our-process-middle.svg",
    imageAlt: "A schoolhouse representing matching opportunities",
  },
  {
    number: 3,
    title: "Connect and Make an Impact",
    description:
      "We'll connect you with the partner organization you choose, and they'll provide more detail about their specific opportunities and get you started making a meaningful impact. We will follow up with you to see if you have any questions, and we'd love to hear how it's going!",
    imageSrc: "/home-page/our-process-right.svg",
    imageAlt: "Community members and landmarks representing partner organizations",
  },
];

export default function OurProcess() {
  return (
    <section
      className="flex w-full items-center bg-[#FDF6E8] pb-[60px] min-[810px]:min-h-dvh-with-fallback min-[810px]:pb-[80px]"
      style={{
        paddingTop: "calc(var(--navbar-top-offset, 0px) + clamp(5.5rem, 12vh, 7.5rem))",
      }}
    >
      <div className="mx-auto flex w-full max-w-[1600px] flex-col items-center px-4 sm:px-6 lg:px-8 xl:px-10 max-[809px]:max-w-[350px] max-[809px]:px-0 min-[810px]:max-[1199px]:max-w-[730px] min-[810px]:max-[1199px]:px-0 min-[1440px]:px-[72px] min-[1920px]:px-[88px] min-[2560px]:px-[96px]">
        <h2 className="text-center text-[32px] font-medium leading-none text-[#357BE8] xl:text-[60px] min-[810px]:text-[56px] min-[1440px]:text-[64px] min-[1920px]:text-[72px] min-[2560px]:text-[80px]">
          Our Process
        </h2>

        <div className="mt-8 grid w-full grid-cols-1 gap-8 md:grid-cols-3 md:gap-8 lg:gap-10 xl:gap-14 lg:mt-10 xl:mt-12">
          {PROCESS_STEPS.map((step) => (
            <article
              key={step.number}
              className="relative mx-auto w-full max-w-[350px] rounded-[10px] bg-white px-4 pb-4 pt-5 text-center shadow-[0_2px_8px_rgba(0,0,0,0.06)] md:max-w-[320px] md:px-6 md:pb-6 md:pt-7 lg:max-w-[380px] lg:px-7 lg:pb-7 lg:pt-8 xl:max-w-[440px] xl:px-8 2xl:max-w-[480px]"
            >
              <div className="absolute -top-3 left-1/2 flex h-6 w-6 -translate-x-1/2 items-center justify-center rounded-full bg-[#3A86FF] text-xs font-bold text-white lg:h-7 lg:w-7 lg:text-sm xl:h-8 xl:w-8 min-[1440px]:text-[12px] min-[1920px]:text-[13px] min-[2560px]:text-[14px]">
                {step.number}
              </div>

              <div className="mx-auto flex h-[95px] w-full items-center justify-center md:h-[130px] lg:h-[160px] xl:h-[190px] 2xl:h-[210px]">
                <Image
                  src={step.imageSrc}
                  alt={step.imageAlt}
                  width={140}
                  height={95}
                  className="h-[95px] w-auto object-contain md:h-[130px] lg:h-[160px] xl:h-[190px] 2xl:h-[210px]"
                />
              </div>

              <p className="mt-3 text-[20px] font-semibold leading-[1.3] text-[#357BE8] md:mt-5 md:leading-[1.35] min-[1920px]:text-[22px] min-[2560px]:text-[24px]">
                {step.title}
              </p>

              <p className="mt-2 text-[14px] leading-[1.5] text-[#2A2A2A] md:mt-3 min-[1440px]:text-[20px] min-[1920px]:text-[22px] min-[2560px]:text-[24px]">
                {step.description}
              </p>
            </article>
          ))}
        </div>

        <Link
          href="/how-it-works"
          className="mt-8 inline-flex items-center justify-center rounded-md bg-[#3A86FF] px-5 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90 md:mt-10 md:px-8 md:py-3 md:text-base min-[1440px]:text-[16px] min-[1920px]:text-[18px] min-[2560px]:text-[20px]"
        >
          Volunteer Your Way
        </Link>
      </div>
    </section>
  );
}

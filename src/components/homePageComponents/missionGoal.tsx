import Image from "next/image";

type MissionGoalProps = {
  onVolunteerClick: () => void;
};

export default function MissionGoal({ onVolunteerClick }: MissionGoalProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#84d961] via-[#79c954] to-[#5ba73f] px-4 pb-16 pt-0 md:pb-24">
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 md:w-36">
        <div className="absolute -left-8 top-2 h-28 w-28 rounded-full bg-[#2f7b2a]" />
        <div className="absolute -left-6 top-24 h-24 w-24 rounded-full bg-[#2a6e26]" />
        <div className="absolute -left-10 bottom-24 h-32 w-32 rounded-full bg-[#326f2b]" />
      </div>

      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 md:w-36">
        <div className="absolute -right-8 top-4 h-28 w-28 rounded-full bg-[#2f7b2a]" />
        <div className="absolute -right-6 top-28 h-24 w-24 rounded-full bg-[#2a6e26]" />
        <div className="absolute -right-10 bottom-20 h-32 w-32 rounded-full bg-[#326f2b]" />
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-28 w-12 -translate-x-1/2 rounded-b-[999px] bg-[#dfb98d] shadow-[0_10px_25px_rgba(0,0,0,0.15)] md:h-36 md:w-16"
      />

      <div className="relative z-10 mx-auto mt-8 flex min-h-[84vh] w-full max-w-[1200px] flex-col items-center justify-center rounded-[48px] border-4 border-[#cfab82] bg-[#dfb98d] px-6 py-14 text-center shadow-[0_16px_32px_rgba(0,0,0,0.15)] md:px-16">
        <h2 className="text-3xl font-medium tracking-wider xl:text-5xl xl:leading-normal">
          Our goal is to place more neighborhood volunteers in local public
          schools in San Francisco and increase donations to San Francisco
          public schools.
        </h2>

        <button
          className="mt-10 flex items-center justify-center gap-3 rounded-lg bg-amber-400 px-4 py-4 lg:px-8"
          onClick={onVolunteerClick}
        >
          <span className="text-sm font-medium leading-7 tracking-wide text-zinc-950 sm:text-base md:text-lg lg:text-xl">
            Fill out the volunteer form to get started...
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
      </div>
    </section>
  );
}

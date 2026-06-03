import Image from "next/image";

type MissionGoalProps = {
  onVolunteerClick: () => void;
};

export default function MissionGoal({ onVolunteerClick }: MissionGoalProps) {
  return (
    <section className="relative overflow-hidden bg-[#7ecf5d] px-4 pb-16 pt-0 md:pb-24">
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

      <div className="relative z-10 mx-auto mt-8 flex min-h-[84vh] w-full max-w-[1200px] items-center justify-center px-2 md:px-10">
        <div className="relative w-full max-w-[980px] pt-24 md:pt-32">
          <div className="relative rounded-[20px] border-4 border-[#ca8d56] bg-[#dfad78] px-5 pb-12 pt-16 md:px-12 md:pb-14 md:pt-20">
            <div className="pointer-events-none absolute left-5 top-16 hidden h-[62%] w-14 flex-col justify-between md:flex">
              <div className="relative h-14 rounded-[8px] border-[3px] border-[#9d6f49] bg-[#9ecfe7]">
                <div className="absolute left-1/2 top-0 h-full w-[2px] -translate-x-1/2 bg-[#e4f3fb]/70" />
                <div className="absolute left-0 top-1/2 h-[2px] w-full -translate-y-1/2 bg-[#e4f3fb]/70" />
              </div>
              <div className="relative h-14 rounded-[8px] border-[3px] border-[#9d6f49] bg-[#9ecfe7]">
                <div className="absolute left-1/2 top-0 h-full w-[2px] -translate-x-1/2 bg-[#e4f3fb]/70" />
                <div className="absolute left-0 top-1/2 h-[2px] w-full -translate-y-1/2 bg-[#e4f3fb]/70" />
              </div>
              <div className="relative h-14 rounded-[8px] border-[3px] border-[#9d6f49] bg-[#9ecfe7]">
                <div className="absolute left-1/2 top-0 h-full w-[2px] -translate-x-1/2 bg-[#e4f3fb]/70" />
                <div className="absolute left-0 top-1/2 h-[2px] w-full -translate-y-1/2 bg-[#e4f3fb]/70" />
              </div>
            </div>

            <div className="pointer-events-none absolute right-5 top-16 hidden h-[62%] w-14 flex-col justify-between md:flex">
              <div className="relative h-14 rounded-[8px] border-[3px] border-[#9d6f49] bg-[#9ecfe7]">
                <div className="absolute left-1/2 top-0 h-full w-[2px] -translate-x-1/2 bg-[#e4f3fb]/70" />
                <div className="absolute left-0 top-1/2 h-[2px] w-full -translate-y-1/2 bg-[#e4f3fb]/70" />
              </div>
              <div className="relative h-14 rounded-[8px] border-[3px] border-[#9d6f49] bg-[#9ecfe7]">
                <div className="absolute left-1/2 top-0 h-full w-[2px] -translate-x-1/2 bg-[#e4f3fb]/70" />
                <div className="absolute left-0 top-1/2 h-[2px] w-full -translate-y-1/2 bg-[#e4f3fb]/70" />
              </div>
              <div className="relative h-14 rounded-[8px] border-[3px] border-[#9d6f49] bg-[#9ecfe7]">
                <div className="absolute left-1/2 top-0 h-full w-[2px] -translate-x-1/2 bg-[#e4f3fb]/70" />
                <div className="absolute left-0 top-1/2 h-[2px] w-full -translate-y-1/2 bg-[#e4f3fb]/70" />
              </div>
            </div>

            <div
              aria-hidden="true"
              className="pointer-events-none absolute bottom-6 left-9 hidden h-24 w-14 rounded-t-[8px] border-[3px] border-[#b53f2d] bg-[#ef3b39] md:block"
            >
              <div className="absolute right-2 top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-[#ffe08f]" />
              <div className="absolute left-1/2 top-0 h-full w-[2px] -translate-x-1/2 bg-[#f26a61]/70" />
              <div className="absolute left-0 top-1/2 h-[2px] w-full -translate-y-1/2 bg-[#f26a61]/70" />
            </div>

            <div className="relative mx-auto w-full max-w-[760px] rounded-[16px] border-[3px] border-[#cfab82] bg-white px-5 py-7 text-center shadow-[0_2px_0_rgba(173,111,67,0.35)] md:px-10 md:py-10">
              <h2 className="text-xl font-semibold leading-relaxed tracking-wide text-[#5f2d17] sm:text-2xl md:text-3xl lg:text-4xl lg:leading-[1.45] xl:text-[2.65rem]">
                Our goal is to place more neighborhood volunteers in local public
                schools in San Francisco and increase donations to San Francisco
                public schools.
              </h2>
            </div>

            <button
              className="mx-auto mt-8 flex items-center justify-center gap-3 rounded-xl border-2 border-[#c28d34] bg-amber-400 px-4 py-4 shadow-[0_4px_0_rgba(166,114,24,0.45)] lg:px-8"
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
        </div>
      </div>
    </section>
  );
}

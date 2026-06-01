import Image from "next/image";

type HeroProps = {
  onExplore: () => void;
};

export default function Hero({ onExplore }: HeroProps) {
  return (
    <section className="md:mt-50 relative z-10 mt-8 flex flex-1 flex-col items-center gap-8 md:justify-start lg:gap-11">
      <header className="text-center">
        <h1 className="text-3xl font-medium tracking-wider xl:text-5xl xl:leading-normal">
          Get <span className="text-[#F15437]">Involved</span> with <br />
          <span className="text-[#F15437]">San Francisco Public Schools</span>
        </h1>
      </header>

      <div className="max-w-[400px] text-center text-sm tracking-wide text-black sm:text-base md:text-lg lg:text-xl lg:leading-8">
        Find public schools near you that need support from the local community.
      </div>

      <button
        className="flex items-center justify-center gap-3 rounded-lg bg-amber-400 px-4 py-4 lg:px-8"
        onClick={onExplore}
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
  );
}

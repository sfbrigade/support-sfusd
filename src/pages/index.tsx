import Button from "@/components/shared/Button";
import Image from "next/image";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/map");
  };

  return (
    <>
      <main className="relative flex h-screen flex-row justify-between p-4">
        <section className="flex flex-1 flex-col items-center justify-center gap-8 lg:gap-11">
          <header className="text-center">
            <h1 className="text-3xl font-medium tracking-wider xl:text-5xl xl:leading-normal">
              Get <span style={{ color: "#F15437" }}>Involved</span> with <br />
              <span style={{ color: "#F15437" }}>SFUSD</span> Schools
            </h1>
          </header>

          <div className="max-w-[400px] text-center text-sm tracking-wide text-black sm:text-base md:text-lg lg:text-xl lg:leading-8">
            Discover how you can make a difference through volunteering and
            donating. Start exploring schools now.
          </div>

          <ul className="text-center text-sm tracking-wide text-black sm:text-base md:text-lg lg:text-xl lg:leading-8">
            <li>1. Explore Schools</li>
            <li>2. Discover Opportunities</li>
            <li>3. Volunteer/Donate</li>
          </ul>

          <button
            className="flex items-center justify-center gap-3 rounded-[10px] bg-amber-400 px-4 py-4 lg:px-8"
            onClick={handleClick}
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
          <Button text="test" style="Secondary" />
        </section>
      </main>
      {/* Image Container */}
      <div className="fixed inset-x-0 bottom-0 z-[-1]">
        {/* Homepage Background */}
        <img
          src="/homepage-background.png"
          alt="Homepage Background"
          className="w-full"
        />
      </div>
    </>
  );
}

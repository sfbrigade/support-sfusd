import Image from "next/image";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/map");
  };

  return (
    <>
      <main className="flex flex-row justify-between p-4 relative h-screen">
        <section className="flex-1 flex flex-col justify-center items-center gap-8 lg:gap-11">
          <header className="text-center">
            <h1 className="text-3xl xl:text-5xl xl:leading-normal font-medium tracking-wider">
              Get <span style={{ color: "#F15437" }}>Involved</span> with <br />
              <span style={{ color: "#F15437" }}>SFUSD</span> Schools
            </h1>
          </header>

          <div className="text-sm sm:text-base md:text-lg lg:text-xl text-center text-black lg:leading-8 tracking-wide max-w-[400px]">
            Discover how you can make a difference through volunteering and
            donating. Start exploring schools now.
          </div>

          <ul className="text-sm sm:text-base md:text-lg lg:text-xl text-center text-black lg:leading-8 tracking-wide">
            <li>1. Explore Schools</li>
            <li>2. Discover Opportunities</li>
            <li>3. Volunteer/Donate</li>
          </ul>

          <button
            className="px-4 lg:px-8 py-4 bg-amber-400 rounded-[10px] flex justify-center items-center gap-3"
            onClick={handleClick}
          >
            <span className="text-sm sm:text-base md:text-lg lg:text-xl text-zinc-950 font-medium leading-7 tracking-wide">
              Explore Schools
            </span>
            <div className="p-1 bg-orange-200 rounded-full flex justify-center items-center">
              <Image
                src="/right-arrow.png"
                alt="Arrow Icon"
                width={20}
                height={20}
              />
            </div>
          </button>
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

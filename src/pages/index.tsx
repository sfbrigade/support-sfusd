import Image from "next/image";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/map");
  };

  return (
    <>
      <main
        className="flex flex-row justify-between p-4 relative"
        style={{ minHeight: "calc(100vh - 64px)" }}
      >
        <section className="flex-1 flex flex-col justify-center items-center pr-4 gap-11">
          <header className="text-center">
            <h1 className="text-md sm:text-lg md:text-xl lg:text-2xl xl:text-[48px] xl:leading-[60px] tracking-wider">
              Get <span className="text-amber-400">Involved</span> with <br />
              <span className="text-amber-400">SFUSD</span> Schools
            </h1>
          </header>

          <div className="text-sm sm:text-base md:text-lg lg:text-xl w-[450px] text-center text-black leading-8 tracking-wide">
            Discover how you can make a difference through volunteering and
            donating. Start exploring schools now.
          </div>

          <ul className="text-sm sm:text-base md:text-lg lg:text-xl w-[534px] text-center text-black leading-8 tracking-wide">
            <li>1. Explore Schools</li>
            <li>2. Discover Opportunities</li>
            <li>3. Volunteer/Donate</li>
          </ul>

          <button
            className="w-[250px] h-[60px] px-4 py-2 bg-amber-400 rounded-[10px] flex justify-center items-center gap-3"
            onClick={handleClick}
          >
            <span className="text-sm sm:text-base md:text-lg lg:text-xl text-zinc-950 font-medium leading-7 tracking-wide">
              Explore Schools
            </span>
            <div className="w-[40px] h-[40px] p-1 bg-orange-200 rounded-full flex justify-center items-center">
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

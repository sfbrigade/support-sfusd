// import CounterComponent from "../components/counter"; // example for redux
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <main className="flex flex-row justify-between p-4">
        {/* Text Content */}
        <div className="flex-1 flex flex-col justify-center pr-4">
          <h1 className="text-4xl font-bold mb-4">Welcome to Support SFUSD</h1>
          <p className="text-lg mb-8">
            Discover schools, get involved, and make a difference today!
            Discover schools, get involved, and make a difference today!
          </p>
          <Link href="/map">
            <button className="bg-black text-white px-4 py-2 rounded-full font-bold hover:bg-gray-800 transition">
              Get Started
            </button>
          </Link>
        </div>
        {/* Image Container */}
        <div className="flex-1 relative">
          <Image
            src="/supportsfusd_hero.png"
            alt="School Image"
            width={1024} // original width of the image
            height={1024} // original height of the image
            sizes="100vw"
            priority={true}
          />
        </div>
      </main>
    </>
  );
}

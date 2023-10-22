import React from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/NavBar/NavBar";

export default function Home() {
  return (
    <div className="flex flex-col h-screen z-0">
      <Navbar />
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6 text-center md:text-left">
          {/* Text Content */}
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-4">
              Welcome to Support SFUSD
            </h1>
            <p className="text-lg mb-8">
              Discover schools, get involved, and make a difference today!
              Discover schools, get involved, and make a difference today!
            </p>
            <Link href="/map">
              <button className="bg-black text-white px-6 py-2 rounded-full font-bold hover:bg-gray-800 transition">
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
        </div>
      </main>
    </div>
  );
}

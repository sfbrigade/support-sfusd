import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { BiLogoFacebookCircle } from "react-icons/bi";
import { AiFillInstagram, AiOutlineTwitter } from "react-icons/ai";
import { Squeeze as Hamburger } from "hamburger-react";

const Navbar = () => {
  const [isOpen, setOpen] = useState(false);

  return (
    <div className="fixed w-full bg-white text-black p-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          {/* Home Icon */}
          <Link href="/">
            <span className="cursor-pointer">
              <Image
                src="/logo_placeholder.png"
                alt="Home"
                width={32}
                height={32}
              />
            </span>
          </Link>

          {/* About Link on desktop */}
          <div className="hidden md:block">
            <Link href="/about">About</Link>
          </div>

          {/* Hamburger Icon */}
          <div className="md:hidden">
            <Hamburger toggled={isOpen} toggle={setOpen} color="black" />
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`fixed top-16 left-0 w-full flex flex-col items-center justify-start bg-white text-black h-screen pt-4 transition-opacity duration-1000 ${
            isOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
        >
          <Link
            href="/about"
            className={`py-4 transform transition-all duration-1000 ${
              isOpen
                ? "translate-y-0 opacity-100 delay-200"
                : "translate-y-[-10px] opacity-0"
            }`}
          >
            About
          </Link>

          {/* Social Icons */}
          <div
            className={`flex space-x-4 mt-8 transform transition-all duration-1000 ${
              isOpen
                ? "translate-y-0 opacity-100 delay-800"
                : "translate-y-[-10px] opacity-0"
            }`}
          >
            <a
              href="https://www.instagram.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
            >
              <AiFillInstagram size={24} />
            </a>
            <a
              href="https://twitter.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
            >
              <AiOutlineTwitter size={24} />
            </a>
            <a
              href="https://www.facebook.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
            >
              <BiLogoFacebookCircle size={24} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

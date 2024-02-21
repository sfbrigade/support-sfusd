import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { BiLogoFacebookCircle } from "react-icons/bi";
import { AiFillInstagram, AiOutlineTwitter } from "react-icons/ai";
import { Squeeze as Hamburger } from "hamburger-react";
import Button from "../shared/Button";

const Navbar = () => {
  const [isOpen, setOpen] = useState(false);

  return (
    <div className="fixed z-50 w-full  p-4 text-black backdrop-blur">
      <div className="container mx-auto max-w-[1280px]">
        <div className="flex items-center justify-between">
          {/* Home Icon */}
          <Link href="/">
            <Image
              src="/logo_placeholder.png"
              alt="Home"
              width={32}
              height={32}
            />
          </Link>

          {/* Links on desktop */}
          <div className="hidden space-x-10 md:flex">
            <Button style="Tertiary" className="p-0 px-0">
              <Link href="/map">Schools</Link>
            </Button>
            <Button style="Tertiary" className="p-0 px-0">
              <Link href="/map">About</Link>
            </Button>
          </div>

          {/* Hamburger Icon */}
          <div className="md:hidden">
            <Hamburger toggled={isOpen} toggle={setOpen} color="black" />
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`fixed left-0 top-16 flex h-screen w-full flex-col items-center justify-start bg-[#F5F5F5] pt-4 text-black transition-opacity duration-1000 ${
            isOpen
              ? "pointer-events-auto opacity-100"
              : "pointer-events-none opacity-0"
          }`}
        >
          <Link href="/about">
            <div
              className={`transform py-4 transition-all duration-1000 ${
                isOpen
                  ? "translate-y-0 opacity-100 delay-200"
                  : "translate-y-[-10px] opacity-0"
              }`}
            >
              About
            </div>
          </Link>
          <Link href="/map">
            <div
              className={`transform py-4 transition-all duration-1000 ${
                isOpen
                  ? "delay-400 translate-y-0 opacity-100"
                  : "translate-y-[-10px] opacity-0"
              }`}
            >
              Schools
            </div>
          </Link>

          {/* Social Icons */}
          <div
            className={`flex transform space-x-4 py-4 transition-all duration-1000 ${
              isOpen
                ? "delay-800 translate-y-0 opacity-100"
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

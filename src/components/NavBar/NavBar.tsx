import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { BiLogoFacebookCircle } from "react-icons/bi";
import { AiFillInstagram, AiOutlineTwitter } from "react-icons/ai";
import { Squeeze as Hamburger } from "hamburger-react";

const Navbar = () => {
  const [isOpen, setOpen] = useState(false);

  return (
    <div className="fixed w-full bg-gray-800 text-white p-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          {/* Home Icon */}
          <Link href="/">
            <span className="cursor-pointer">
              <Image
                src="/logo_placeholder.png"
                alt="Home"
                width={24}
                height={24}
              />
            </span>
          </Link>

          {/* Hamburger Icon */}
          <Hamburger toggled={isOpen} toggle={setOpen} />
        </div>

        {/* Navigation Tabs */}
        <div
          className={`fixed top-16 left-0 w-full flex flex-col items-center justify-start bg-gray-800 text-white bg-opacity-90 h-screen pt-4 transition-opacity duration-1000 ${
            isOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
        >
          <Link
            href="/nav1"
            className={`py-4 transform transition-all duration-1000 ${
              isOpen
                ? "translate-y-0 opacity-100 delay-200"
                : "translate-y-[-10px] opacity-0"
            }`}
          >
            Nav 1
          </Link>
          <Link
            href="/nav2"
            className={`py-4 transform transition-all duration-1000 ${
              isOpen
                ? "translate-y-0 opacity-100 delay-400"
                : "translate-y-[-10px] opacity-0"
            }`}
          >
            Nav 2
          </Link>
          <Link
            href="/nav3"
            className={`py-4 transform transition-all duration-1000 ${
              isOpen
                ? "translate-y-0 opacity-100 delay-600"
                : "translate-y-[-10px] opacity-0"
            }`}
          >
            Nav 3
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

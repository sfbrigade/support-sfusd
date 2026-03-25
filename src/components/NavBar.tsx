"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [isOpen, setOpen] = useState(false);
  const pathname = usePathname();
  const [bg, setBg] = useState("");

  useEffect(() => {
    setOpen(false);

    if (pathname === "/map") {
      setBg("bg-[#D7F1FF]");
    } else if (pathname?.startsWith("/school") || pathname === "/about") {
      setBg("bg-white drop-shadow");
    } else {
      setBg("");
    }
  }, [pathname]);

  return (
    <nav className={"sticky top-0 z-40 w-full p-2 p-4 px-4 text-black " + bg}>
      <div className="container mx-auto max-w-[1280px] font-medium">
        <div className="flex items-center justify-between">
          {/* Home Icon */}
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.png" alt="Home" width={32} height={32} />
            <p className="h-fit max-md:hidden">Support SF Schools</p>
          </Link>

          {/* Links on desktop */}
          <div className="space-x-10 md:flex">
            <Link href="/about">About Us</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

const Navbar = () => {
  const [isOpen, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: any) => {
      setOpen(false);
    };

    router.events.on("routeChangeComplete", handleRouteChange);
  }, []);
  return (
    <nav className="sticky top-0 z-50 w-full p-2 p-4 px-4 text-black backdrop-blur">
      <div className="container mx-auto max-w-[1280px] font-medium">
        <div className="flex items-center justify-between">
          {/* Home Icon */}
          <Link href="/map" className="flex items-center gap-2">
            <Image src="/logo.png" alt="Home" width={32} height={32} />
            <p className="h-fit max-md:hidden">Support SFUSD</p>
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

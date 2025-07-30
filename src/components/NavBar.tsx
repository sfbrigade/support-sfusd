import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

const Navbar = () => {
  const [isOpen, setOpen] = useState(false);
  const router = useRouter();
  const [bg, setBg] = useState("");

  useEffect(() => {
    const handleRouteChange = (url: any) => {
      setOpen(false);
    };

    const { route } = router;

    switch (route) {
      case "/map":
        setBg("bg-[#D7F1FF]");
        break;
      case "/school":
      case "/about":
        setBg("bg-white drop-shadow");
        break;
      case "/":
        setBg("");
        break;
      default:
        setBg("");
        break;
    }

    router.events.on("routeChangeComplete", handleRouteChange);
  }, [router]);
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

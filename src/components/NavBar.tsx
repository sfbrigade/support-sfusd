"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import VolunteerSignupModal from "./schoolPageComponents/VolunteerSignupModal";
import { School } from "@/types/school";
import { sendVolunteerEmail } from "@/lib/emailjs";
import { useToast } from "./Toast/ToastContext";
import { usePostHog } from "posthog-js/react";

const Navbar = () => {
  const [isOpen, setOpen] = useState(false);
  const [isVolunteerModalOpen, setIsVolunteerModalOpen] = useState(false);
  const { showToast } = useToast();
  const posthog = usePostHog();
  const pathname = usePathname();

  const volunteerSignupSchool: School = {
    stub: "support-sf-schools",
    name: "Support SF Public Schools",
    address: null,
    neighborhood: null,
    priority: false,
    latitude: "0",
    longitude: "0",
    about: "",
    about_bp: [],
    volunteer_form_url: "",
    donation_url: null,
    donation_text: "",
    testimonial: null,
    testimonial_author: null,
    testimonial_video: null,
    testimonial_img: null,
    notable_video: null,
    principal: "",
    instagram_url: null,
    facebook_url: null,
    website_url: null,
    metrics: [],
    programs: [],
    zipcode: null,
    school_type: [],
  };

  const toggleMenu = () => {
    setOpen((previousState) => !previousState);
  };

  const closeMenu = () => {
    setOpen(false);
  };

  const sanitizeName = (nameInput: string): string => {
    return nameInput
      .replace(/[\x00-\x1F\x7F]/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 100);
  };

  const isEmail = (emailInput: string) => {
    const emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(emailInput);
  };

  const openVolunteerModal = () => {
    closeMenu();
    posthog?.capture?.("navbar_volunteer_match_clicked");
    setIsVolunteerModalOpen(true);
  };

  const closeVolunteerModal = () => {
    setIsVolunteerModalOpen(false);
  };

  const handleVolunteerFormSubmit = (data: { email: string; name: string }) => {
    if (!isEmail(data.email)) {
      showToast("Please enter a valid email address.");
      return;
    }

    const sanitized = {
      ...data,
      name: sanitizeName(data.name),
    };

    sendVolunteerEmail(sanitized, {
      onSuccess: () =>
        showToast("Volunteer form submitted successfully! Thank you!"),
      onError: (reason) => {
        showToast("Volunteer form submission failed.");
        console.error(
          "FAILED: error sending volunteer email to Support SF",
          reason,
        );
      },
      onFinally: closeVolunteerModal,
    });
  };

  return (
    <nav
      className={`sticky top-0 z-40 w-full px-0 py-0 text-black md:px-4 md:py-4 ${
        pathname === "/map" || pathname?.startsWith("/school")
          ? "md:bg-[#D7F1FF]"
          : pathname === "/about"
            ? "md:bg-[#88B6FF]"
            : ""
      }`}
    >
      <div className="mx-auto w-full max-w-[1280px] font-medium">
        {/* Desktop Navigation */}
        <div className="hidden items-center justify-between rounded-2xl bg-white px-4 py-2 md:flex">
          <Link href="/" className="flex items-center gap-3" onClick={closeMenu}>
            <Image src="/logo.png" alt="Home" width={28} height={28} />
            <p className="text-xl text-black">Support SF Schools</p>
          </Link>

          <div className="flex items-center gap-8 text-xl">
            <Link href="/map" className="hover:underline">
              Explore Schools
            </Link>
            {/* How It Works is intentionally hidden until that page is built. */}
            <Link href="/about" className="hover:underline">
              About Us
            </Link>
            <button
              type="button"
              onClick={openVolunteerModal}
              className="rounded-lg bg-[#252525] px-4 py-2 text-xl font-semibold text-white shadow-[0_6px_14px_rgba(0,0,0,0.25)]"
            >
              Find Your Volunteer Match
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="flex items-center justify-between bg-white px-4 py-3 md:hidden">
          <Link href="/" className="flex items-center gap-2" onClick={closeMenu}>
            <Image src="/logo.png" alt="Home" width={32} height={32} />
            <span className="text-black text-xl font-semibold">Support SF Schools</span>
          </Link>
          <button
            type="button"
            aria-label="Toggle navigation menu"
            aria-expanded={isOpen}
            onClick={toggleMenu}
            className="rounded p-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-10 w-10"
            >
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>
        </div>

        {isOpen && (
          <div className="border-b border-gray-200 bg-blue-50 px-4 py-3 md:hidden">
            <div className="flex flex-col gap-3 text-lg">
              <Link href="/map" onClick={closeMenu}>
                Explore Schools
              </Link>
              {/* How It Works is intentionally hidden until that page is built. */}
              <Link href="/about" onClick={closeMenu}>
                About Us
              </Link>
              <button
                type="button"
                onClick={openVolunteerModal}
                className="inline-flex w-fit self-center rounded-lg bg-[#252525] px-4 py-2 text-lg font-semibold text-white shadow-[0_6px_14px_rgba(0,0,0,0.25)]"
              >
                Find Your Volunteer Match
              </button>
            </div>
          </div>
        )}

        <VolunteerSignupModal
          isOpen={isVolunteerModalOpen}
          onClose={closeVolunteerModal}
          school={volunteerSignupSchool}
          onSubmit={handleVolunteerFormSubmit}
          showSchoolContext={false}
        />
      </div>
    </nav>
  );
};

export default Navbar;

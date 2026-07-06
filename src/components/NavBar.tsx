"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import VolunteerSignupModal from "./schoolPageComponents/VolunteerSignupModal";
import { School } from "@/types/school";
import { sendVolunteerEmail } from "@/lib/emailjs";
import { isStrictEmail, sanitizeName } from "@/lib/validation";
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

  const openVolunteerModal = () => {
    closeMenu();
    posthog?.capture?.("navbar_volunteer_match_clicked");
    setIsVolunteerModalOpen(true);
  };

  const closeVolunteerModal = () => {
    setIsVolunteerModalOpen(false);
  };

  const handleVolunteerFormSubmit = (data: { email: string; name: string }) => {
    if (!isStrictEmail(data.email)) {
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
      className={`sticky top-0 z-40 w-full px-4 py-4 text-black md:px-4 md:py-4 ${
        pathname === "/map" ||
        pathname?.startsWith("/school") ||
        pathname === "/how-it-works"
          ? "md:bg-[#D7F1FF]"
          : pathname === "/about"
            ? "md:bg-[#88B6FF]"
            : ""
      }`}
    >
      <div className="font-[family:var(--font-fredoka)] mx-auto w-full max-w-[1280px] font-medium">
        {/* Desktop Navigation */}
        <div className="hidden items-center justify-between rounded-2xl bg-white px-4 py-2 md:flex">
          <Link
            href="/"
            className="flex items-center gap-3"
            onClick={closeMenu}
          >
            <Image src="/logo.png" alt="Home" width={28} height={28} />
            <p className="text-xl text-black">Support SF Schools</p>
          </Link>

          <div className="flex items-center gap-8 text-xl">
            <Link href="/map" className="hover:underline">
              Explore Schools
            </Link>
            <Link href="/how-it-works" className="hover:underline">
              How It Works
            </Link>
            <Link href="/about" className="hover:underline">
              About Us
            </Link>
            <button
              type="button"
              onClick={openVolunteerModal}
              className="font-[family:var(--font-fredoka)] rounded-lg bg-[#252525] px-4 py-2 text-xl font-semibold text-white shadow-[0_6px_14px_rgba(0,0,0,0.25)]"
            >
              Volunteer Your Way
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="relative md:hidden">
          <div className="relative z-[60] flex items-center justify-between rounded-[24px] bg-white px-3.5 py-2 shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
            <Link href="/" className="flex items-center" onClick={closeMenu}>
              <Image src="/logo.png" alt="Home" width={38} height={38} />
              <p className="ml-2 text-xl text-black">Support SF Schools</p>
            </Link>
            <button
              type="button"
              aria-label={
                isOpen ? "Close navigation menu" : "Open navigation menu"
              }
              aria-expanded={isOpen}
              onClick={toggleMenu}
              className={`flex h-[38px] w-[38px] items-center justify-center rounded-full transition-colors ${
                isOpen ? "bg-[#F3F3F3]" : "bg-transparent"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                className="h-6 w-6 text-[#252525]"
              >
                {isOpen ? (
                  <path d="M6 6l12 12M18 6L6 18" />
                ) : (
                  <path d="M4 7h16M4 12h16M4 17h16" />
                )}
              </svg>
            </button>
          </div>

          {isOpen && (
            <>
              <button
                type="button"
                aria-label="Close navigation menu backdrop"
                onClick={closeMenu}
                className="fixed inset-0 z-40 bg-[#10263A]/40"
              />
              <div className="absolute inset-x-0 top-full z-[60] mt-4 px-3">
                <div className="font-[family:var(--font-fredoka)] ml-auto w-full max-w-[340px] rounded-[26px] bg-white px-7 py-6 shadow-[0_20px_50px_rgba(0,0,0,0.16)] ring-1 ring-black/5">
                  <div className="flex flex-col gap-6 text-[17px] font-semibold text-[#10263A]">
                    <Link href="/map" onClick={closeMenu}>
                      Explore Schools
                    </Link>
                    <Link href="/how-it-works" onClick={closeMenu}>
                      How It Works
                    </Link>
                    <Link href="/about" onClick={closeMenu}>
                      About Us
                    </Link>
                  </div>

                  <div className="my-5 h-px bg-[#D9D9D9]" />

                  <button
                    type="button"
                    onClick={openVolunteerModal}
                    className="font-[family:var(--font-fredoka)] flex w-full items-center justify-center rounded-2xl bg-[#252525] px-5 py-3.5 text-[17px] font-semibold text-white shadow-[0_10px_24px_rgba(0,0,0,0.22)]"
                  >
                    Volunteer Your Way
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

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

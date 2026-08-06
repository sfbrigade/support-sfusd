"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { usePostHog } from "posthog-js/react";

const ContactUs = dynamic(() => import("@/components/ContactUs"));

const SOCIAL_ICONS = [
  {
    src: "/icons/instagram-icon.svg",
    label: "Instagram",
    href: "https://www.instagram.com/supportsfschools/",
  },
  { src: "/icons/facebook-icon.svg", label: "Facebook", href: "" },
  {
    src: "/icons/globe-icon.svg",
    label: "Website",
    href: "https://www.supportsfschools.org/",
  },
];

const Footer = () => {
  const posthog = usePostHog();
  const [showContactForm, setShowContactForm] = useState(false);

  const handleOpen = () => {
    posthog?.capture?.("contact_us_form_opened");
    setShowContactForm(true);
  };
  const handleClose = () => setShowContactForm(false);

  return (
    <footer className="bg-[#FFC627] p-8 font-fredoka text-xl font-normal text-brand-raisin">
      <ul className="flex flex-col gap-0.5">
        <li>
          <a href="https://www.supportsfschools.org/">SupportSFschools.org</a>
        </li>
        <li>
          <a href="https://www.supportsfschools.org/about">About Us</a>
        </li>
        <li>
          <button type="button" onClick={handleOpen} className="text-left">
            Contact Us
          </button>
        </li>
        <li>
          <a href="">Sitemap</a>
        </li>
      </ul>
      <div className="mt-2 flex gap-2">
        {SOCIAL_ICONS.map((icon) => (
          <a
            key={icon.label}
            aria-label={icon.label}
            href={icon.href || undefined}
            target={icon.href ? "_blank" : undefined}
            rel={icon.href ? "noopener noreferrer" : undefined}
          >
            {/* CSS mask tints the (hardcoded-fill) SVG to raisin without editing the shared asset */}
            <span
              aria-hidden="true"
              className="block h-8 w-8 bg-brand-raisin"
              style={{
                maskImage: `url(${icon.src})`,
                WebkitMaskImage: `url(${icon.src})`,
                maskSize: "contain",
                WebkitMaskSize: "contain",
                maskRepeat: "no-repeat",
                WebkitMaskRepeat: "no-repeat",
                maskPosition: "center",
                WebkitMaskPosition: "center",
              }}
            />
          </a>
        ))}
      </div>

      {showContactForm && <ContactUs handleClose={handleClose} />}
    </footer>
  );
};

export default Footer;

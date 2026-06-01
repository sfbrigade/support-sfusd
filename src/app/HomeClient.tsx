"use client";

import Hero from "@/components/homePageComponents/Hero";
import PathConnector from "@/components/homePageComponents/PathConnector";
import MissionGoal from "@/components/homePageComponents/missionGoal";
import { useToast } from "@/components/Toast/ToastContext";
import VolunteerSignupModal from "@/components/schoolPageComponents/VolunteerSignupModal";
import { School } from "@/types/school";
import emailjs from "@emailjs/browser";
import { useRouter } from "next/navigation";
import { usePostHog } from "posthog-js/react";
import { useState } from "react";

const homeVolunteerSchool: School = {
  stub: "san-francisco-public-schools",
  name: "San Francisco Public Schools",
  address: null,
  neighborhood: "San Francisco",
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

function sanitizeName(nameInput: string): string {
  const withoutControlChars = Array.from(nameInput, (char) => {
    const code = char.charCodeAt(0);
    return code <= 31 || code === 127 ? " " : char;
  }).join("");

  return withoutControlChars.replace(/\s+/g, " ").trim().slice(0, 100);
}

function isEmail(emailInput: string) {
  const regEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regEmail.test(emailInput);
}

export default function HomeClient() {
  const router = useRouter();
  const posthog = usePostHog();
  const { showToast } = useToast();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleClick = () => {
    posthog?.capture("explore_schools_clicked");
    router.push("/map");
  };

  const openVolunteerModal = () => {
    posthog?.capture?.("volunteer_form_clicked", {
      school: homeVolunteerSchool.name,
      source: "homepage_mission_goal",
    });
    setModalIsOpen(true);
  };

  const closeVolunteerModal = () => setModalIsOpen(false);

  const handleVolunteerFormSubmit = (data: { email: string; name: string }) => {
    if (!isEmail(data.email)) {
      showToast("Please enter a valid email address.");
      return;
    }

    const sanitized = {
      ...data,
      name: sanitizeName(data.name),
    };

    emailjs
      .send("service_itlkzak", "template_ee6s74u", sanitized, {
        publicKey: "10-NnnxJFw9zLmYPf",
      })
      .then(() => {
        emailjs
          .send("service_xkteori", "template_ldjot9t", sanitized, {
            publicKey: "D8WCCvG0aRMjhfkml",
          })
          .catch((reason: unknown) => {
            console.error(
              "FAILED: error sending 'volunteer-confirmation-auto-reply' through EmailJS.",
              reason,
            );
          });
        showToast("Volunteer form submitted successfully! Thank you!");
      })
      .catch((reason: unknown) => {
        showToast("Volunteer form submission failed.");
        console.error(
          "FAILED: error sending volunteer email to Support SF",
          reason,
        );
      })
      .finally(closeVolunteerModal);
  };

  if (posthog) {
    posthog.capture("pageview", { page: "home" });
  }

  return (
    <>
      <main className="relative isolate box-border min-h-[calc(100dvh-var(--home-top-chrome-height,0px))] overflow-hidden bg-gradient-to-b from-[#7ce0ed] to-[#e3fcff] p-4">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[url('/homepage-background.png')] bg-cover bg-bottom bg-no-repeat"
        />
        <div className="relative z-10 flex min-h-[calc(100dvh-var(--home-top-chrome-height,0px))] items-start justify-center">
          <Hero onExplore={handleClick} />
        </div>
      </main>
      <PathConnector />
      <MissionGoal onVolunteerClick={openVolunteerModal} />
      <VolunteerSignupModal
        isOpen={modalIsOpen}
        onClose={closeVolunteerModal}
        school={homeVolunteerSchool}
        onSubmit={handleVolunteerFormSubmit}
      />
    </>
  );
}

import { School } from "@/types/school";
import Image from "next/image";
import BannerWrapper from "./BannerWrapper";
import Link from "next/link";
import { blurDataURL } from "@/lib/imageConfig";
import VolunteerList from "./VolunteerList";
import VolunteerSignupModal from "./VolunteerSignupModal";
import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import { useToast } from "../Toast/ToastContext";

const SchoolVolunteer: React.FC<{ school: School }> = ({ school }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { showToast } = useToast();

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const handleFormSubmit = (data: any) => {
    if (!isEmail(data.email)) {
      alert("Please enter a valid email address");
      return;
    }
    emailjs
      .send("service_itlkzak", "template_ee6s74u", data, {
        publicKey: "10-NnnxJFw9zLmYPf",
      })
      .then(
        () => {
          showToast("Volunteer form submitted successfully! Thank you!");
          closeModal();
        },
        (error) => {
          console.log("FAILED...", error.text);
        },
      );
  }

  function isEmail(emailInput: string) {
    let regEmail =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!regEmail.test(emailInput)) {
      return false;
    }
    return true;
  }

  return (
    <>
    <section id="volunteer" className="flex flex-col gap-10">
      {/* Main yellow box */}
      <div className="bg-[#FFF5DA] rounded-xl p-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Left panel */}
        <div className="flex flex-col gap-6 justify-start">
          <h1 className="text-4xl font-bold text-[#3A86FF] mb-2">Ways to Volunteer!</h1>
          <p className="text-md mb-2">
            <b>Help when it works best for you.</b> {school.name} values all community volunteers and we’ve got volunteer roles that match your skills and your schedule.
          </p>
          <p className="text-base mb-4">
            You can sign up as a short-term/after hours volunteer and we will help connect you with the school community, or sign up as a weekly school day volunteer through our partner the San Francisco Ed Fund.
          </p>
          <Image
            src="/volunteer-graphic.png"
            alt="volunteer graphic"
            width={320}
            height={220}
            className="mt-2"
          />
        </div>
        {/* Right panel: stacked cards */}
        <div className="flex flex-col gap-6 w-full md:items-end">
          {/* During The School Day */}
          <div className="bg-white rounded-xl p-6 shadow flex flex-col gap-4 md:w-[70%]">
            <div className="font-bold text-xl mb-1">During The School Day</div>
            <p className="text-base">
              A once-a-week volunteer commitment through the SF Education Fund to support classrooms, teachers, and students during the school day. You choose from their list of options.
            </p>
            <a
              href="https://sfedfund.org/become-a-volunteer/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 rounded-lg bg-[#3A86FF] px-4 py-3 text-white font-semibold text-center w-full"
            >
              Join the School Day Team
            </a>
          </div>
          {/* Beyond the Bell */}
          <div className="bg-white rounded-xl p-6 shadow flex flex-col gap-4 md:w-[70%]">
            <div className="font-bold text-xl mb-1">Beyond the Bell</div>
              <p className="text-base">
                Flexible opportunities outside school hours, from after-school programs to PTA events, community projects, and more.
              </p>
              <button
                className="mt-2 rounded-lg bg-[#3A86FF] px-4 py-3 text-white font-semibold text-center w-full"
                onClick={openModal}
              >
                Join the After Hours Team
              </button>
            </div>
          </div>
        </div>
      <VolunteerList school={school} fullCard={true} />
      <VolunteerSignupModal
        isOpen={modalIsOpen}
        onClose={closeModal}
        school={school}
        onSubmit={handleFormSubmit}
      />
    </section>
    </>
  );
};

export default SchoolVolunteer;

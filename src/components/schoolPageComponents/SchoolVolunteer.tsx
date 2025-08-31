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
import { usePostHog } from "posthog-js/react";

const SchoolVolunteer: React.FC<{ school: School }> = ({ school }) => {
  const posthog = usePostHog();

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
    <section id="volunteer" className="flex flex-col gap-10">
      <BannerWrapper
        className="gap-4 rounded-lg md:gap-8 bg-[#FFF5DA] p-4 px-6 md:p-12 md:px-12"
        left={
          <>
            <h1 className="text-2xl font-medium text-blue-500 md:text-5xl mb-4">
              Ways to Volunteer!
            </h1>
            <p className="mb-4"><b>Help where and when it works best for you.</b> {school.name} values
              all community volunteers and we’ve got volunteer roles that match
              your skills and your schedule.</p> 
             <p className="mb-4">You can sign up as a short-term/ after hours 
              volunteer and we will help connect you with the school community, or
              sign up as a recurring school day volunteer through the San Francisco Ed
              Fund.
            </p>
            <Image
              src="/volunteer-graphic.png"
              alt="volunteer graphic"
              width={500}
              height={1000}
              placeholder="blur"
              blurDataURL={blurDataURL} /></>
        }
        right={
          <div className="flex flex-col gap-6 w-full md:items-end">
            <div className="bg-white rounded-xl p-5 shadow flex flex-col gap-4 md:w-[85%]">
              <h1 className="font-fredoka font-medium text-l md:text-2xl mb-1">During The School Day</h1>
               <p className="text-base font-lato">
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
              <div className="bg-white rounded-xl p-5 shadow flex flex-col gap-4 md:w-[85%]">
                <h1 className="font-fredoka font-medium text-l md:text-2xl mb-1">Beyond the Bell</h1>
                <p className="text-base">
                  Flexible opportunities outside school hours, from after-school programs to PTA events, community projects, and more.
                </p>
                <button
                  className="mt-2 rounded-lg bg-[#3A86FF] px-4 py-3 text-white font-semibold text-center w-full"
                  onClick={() => {
                    posthog?.capture?.('volunteer_form_clicked', { school: school.name })
                    openModal()
                  }}
                >
                  Join the After Hours Team
                </button>
              </div>
            </div>
        }
      />
      <VolunteerList school={school} fullCard={true} />
      <VolunteerSignupModal
        isOpen={modalIsOpen}
        onClose={closeModal}
        school={school}
        onSubmit={handleFormSubmit}
      />
    </section>
  );
};

export default SchoolVolunteer;

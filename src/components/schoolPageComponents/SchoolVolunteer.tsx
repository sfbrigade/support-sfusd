import { School } from "@/types/school";
import Image from "next/image";
import BannerWrapper from "./BannerWrapper";
import Link from "next/link";
import { blurDataURL } from "@/lib/imageConfig";
import VolunteerList from "./VolunteerList";
import VolunteerSignupModal from "./VolunteerSignupModal";
import React, { useState } from "react";
import { useToast } from "../Toast/ToastContext";

const SchoolVolunteer: React.FC<{ school: School }> = ({ school }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { showToast } = useToast();

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const handleFormSubmit = (data: any) => {
    console.log("Form submitted:", data);
    showToast("Volunteer form submitted successfully! Thank you!");
    closeModal();
    // TODO: Add success Toast
  }

  return (
    <section id="volunteer" className="flex flex-col gap-10">
      <BannerWrapper
        className=" gap-4 rounded-lg md:gap-8 md:bg-[#FFF5DA] md:p-8 md:px-12 "
        left={
          <Image
            src="/volunteer-graphic.png"
            alt="volunteer graphic"
            width={500}
            height={1000}
            placeholder="blur"
            blurDataURL={blurDataURL}
          />
        }
        right={
          <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-medium text-blue-500 md:text-5xl">
              Ways to Volunteer
            </h1>
            <p>
              Help where and when it works best for you. {school.name} values
              all community volunteers and we’ve got volunteer roles that match
              your skills and your schedule. You can sign up as a short-term/ after hours 
              volunteer and we will help connect you with the school community, or
              sign up as a recurring school day volunteer through the San Francisco Ed
              Fund.
            </p>
            <div className="flex gap-2">
              <button
                onClick={openModal}
                className="rounded bg-blue-500 p-2 px-4 font-medium text-white md:px-8 text-center"
              >
                Short term/ After hours volunteer
              </button>
              <Link
                href="https://sfedfund.org/become-a-volunteer/"
                target="_blank"
                className={
                  "plausible-event-name=Clicked+EdFund+" +
                  school.name.replace(/\s/g, "+") +
                  " rounded border-2 border-blue-500 bg-white p-2 px-4 font-medium text-blue-500 md:px-8 text-center"
                }
              >
                Recurring school day volunteer
              </Link>
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

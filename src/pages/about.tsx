import React from "react";
import Image from "next/image";
import ContactUs from "../components/ContactUs";
import {useState} from "react";
import Navbar from "../components/NavBar";

const About = () => {

  const [showContactForm, setShowContactForm] = useState(false);
  const handleOpen = () => setShowContactForm(true);
  const handleClose = () => setShowContactForm(false);

  return (
    <div className="mx-auto flex h-[calc(100vh-64px)] max-md:px-8 md:w-3/5">
      <main className="flex flex-col items-center justify-center gap-4">
        <Image
          src="/about-graphic.png"
          alt="Arrow Icon"
          className="w-40 sm:w-48 md:w-60"
          width={240}
          height={240}
        />
        <div className="flex flex-col gap-4 max-md:text-sm">
          <h1 className="text-center text-4xl font-medium max-md:text-2xl">
            Hello!
          </h1>
          <p>
            Support SFUSD is run by an all-volunteer team at SF Civic Tech
            (formerly known as Code for San Francisco). Our diverse group of
            teachers, designers, engineers, researchers, and curious community
            members is building this website to make it easier for people who
            live, work, and play in San Francisco to support local public
            schools.
          </p>
          <p>
            We are always open for feedback and always looking for volunteers to
            join our effort. We meet Wednesday evenings on Zoom.
          </p>
          <p>
            Learn more about{" "}
            <a href="https://www.sfcivictech.org/about" className="underline">
              SF Civic Tech
            </a>
            .
          </p>
        </div>
        <button onClick={handleOpen}>Contact Us</button>
        {showContactForm && (
          <div className="modal-overlay inset-0 bg-gray-900 bg-opacity-50 flex
                        justify-center items-center fixed">
            <div className="modal md:w-full md:max-w-md mt-5 p-6 bg-white border
                        rounded-lg shadow-lg">
              <div className="modal-content">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl">Contact Us!</h2>
                  <button className="close-button text-2xl ml-auto self-start"
                          onClick={handleClose}>&times;</button>
                </div>
                <h6 className="text-gray-400">Questions or comments? Let us know!</h6>
                <ContactUs/>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default About;

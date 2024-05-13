import React from "react";
import Image from "next/image";
import ContactUs from "../components/ContactUs";
import { useState } from "react";
import Navbar from "../components/NavBar";

const About = () => {
  const [showContactForm, setShowContactForm] = useState(false);
  const handleOpen = () => setShowContactForm(true);
  const handleClose = () => setShowContactForm(false);

  return (
    <div className="mx-auto flex max-md:px-8 md:w-3/5">
      <main className="flex flex-col items-center gap-4 py-8 md:py-20">
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
            Support SFUSD is run by an all-volunteer team at{" "}
            <a
              href="https://www.sfcivictech.org/about"
              target="_blank"
              className="text-blue-500 hover:underline"
            >
              SF Civic Tech
            </a>{" "}
            (formerly known as Code for San Francisco). Our diverse group of
            teachers, designers, engineers, researchers, and curious community
            members is building this website to make it easier for people who
            live, work, and hang out in San Francisco to support our public
            schools.
          </p>
          <p>
            We are focused on building strong communities and neighborhoods,
            where people who live nearby a school can support and be part of the
            school community, even if they aren’t parents of current students.
            We have talked to hundreds of people who live in San Francisco, who
            are willing to volunteer and support local schools, and who wish
            they were more connected to the schools in their neighborhoods.
          </p>
          <p>
            People who work in tech and want to volunteer in STEM education.
            Former teachers who are trying out new careers but still looking to
            feel a connection to local schools. Parents who still live in the
            neighborhood after their kids graduated and have free time to
            volunteer. Alumni who are back in San Francisco and want to
            reconnect with schools. People from all backgrounds who believe in
            the power of education to change lives. Support SFUSD is designed to
            bring them closer to the schools in their neighborhood, while
            helping meet school needs.
          </p>
          <p>
            This website is in beta and is a work in progress. Our beta focuses
            on connecting folks to the seventeen public high schools in the
            school district. We are open to feedback and always looking for
            volunteers to join our effort. We meet Wednesday evenings on Zoom.
          </p>
        </div>
        <button onClick={handleOpen} className="text-blue-500 hover:underline">
          Contact Us
        </button>
        {showContactForm && <ContactUs handleClose={handleClose} />}
      </main>
    </div>
  );
};

export default About;

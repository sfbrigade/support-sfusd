import React from "react";
import Image from "next/image";
import ContactUs from "../components/ContactUs";
import { useState } from "react";
import { blurDataURL } from "@/lib/imageConfig";

const member_list = [
  {
    name: "Julia Gitis",
    role: "Product Manager",
    url: "https://www.linkedin.com/in/juliagoolia/",
    img: "/about/julia_gitis.png",
  },
  {
    name: "Emi Fogg",
    role: "UX Researcher",
    url: "https://www.linkedin.com/in/emi-fogg/",
    img: "/about/emi_fogg.png",
  },
  {
    name: "Melinda Kreuser",
    role: "Content Strategist",
    url: "https://www.linkedin.com/in/melindakreuser/",
    img: "/about/melinda_kreuser.png",
  },
  {
    name: "Amara Mir",
    role: "UX Researcher",
    url: "https://www.linkedin.com/in/amara-mir/",
    img: "/about/amara_mir.png",
  },
  {
    name: "Jesse Wang",
    role: "Product Designer",
    url: "https://www.linkedin.com/in/jesse-wang-/",
    img: "/about/jesse_wang.png",
  },
  {
    name: "James Davis",
    role: "Product Designer",
    url: "https://www.linkedin.com/in/james-davis-design/",
    img: "/about/james_davis.png",
  },
  {
    name: "Brandon Cruz-Youll",
    role: "Tech Project Manager, Software Developer",
    url: "https://www.linkedin.com/in/brandon-cruzyoull/",
    img: "/about/brandon_cruz_youll.png",
  },
  {
    name: "Nick Visutsithiwong",
    role: "Software Developer",
    url: "https://www.linkedin.com/in/nickvisut/",
    img: "/about/nick_visutsithiwong.png",
  },
  {
    name: "Iryna Trush",
    role: "Software Developer",
    url: "https://www.linkedin.com/in/trushmi/",
    img: "/about/iryna_trush.png",
  },
  {
    name: "Jackson Tran",
    role: "Software Developer",
    url: "https://www.linkedin.com/in/jacksontran1/",
    img: "/about/jackson_tran.png",
  },
];

const About = () => {
  const [showContactForm, setShowContactForm] = useState(false);
  const handleOpen = () => setShowContactForm(true);
  const handleClose = () => setShowContactForm(false);

  return (
    <main>
      <div className="flex flex-col items-center gap-8 bg-[#88B6FF] py-8 md:px-36">
        <h1 className="text-center text-4xl font-medium max-lg:text-3xl max-md:text-2xl">
          Hello! We&apos;re Support SF Schools
        </h1>
        <Image
          src="/about-graphic.png"
          alt="Arrow Icon"
          className="w-10/12 lg:w-6/12"
          width={240}
          height={240}
        />
      </div>
      <div className="mx-auto flex max-md:px-8 md:w-3/5">
        <div className="flex flex-col items-center gap-4 py-8 md:py-12">
          <div className="flex flex-col gap-4 max-md:text-sm">
            <p>
              Support SF Schools is run by an all-volunteer team at{" "}
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
              where people who live nearby a school can support and be part of
              the school community, even if they aren’t parents of current
              students. We have talked to hundreds of people who live in San
              Francisco, who are willing to volunteer and support local schools,
              and who wish they were more connected to the schools in their
              neighborhoods.
            </p>
            <p>
              People who work in tech and want to volunteer in STEM education.
              Former teachers who are trying out new careers but still looking
              to feel a connection to local schools. Parents who still live in
              the neighborhood after their kids graduated and have free time to
              volunteer. Alumni who are back in San Francisco and want to
              reconnect with schools. People from all backgrounds who believe in
              the power of education to change lives. Support SFUSD is designed
              to bring them closer to the schools in their neighborhood, while
              helping meet school needs.
            </p>
            <p>
              This website is in beta and is a work in progress. Our beta
              focuses on connecting folks to the seventeen public high schools
              in the school district. We are open to feedback and always looking
              for volunteers to join our effort. We meet Wednesday evenings on
              Zoom.
            </p>
          </div>

          <div className="grid w-full grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-8 xl:grid-cols-5">
            {member_list.map((member) => (
              <a
                href={member.url}
                target="_blank"
                className="group flex justify-center"
                key={member.name}
              >
                <div className="text-sm text-[#3A86FF]">
                  <Image
                    src={member.img}
                    alt={`${member.name} photo`}
                    className="mb-2 w-48 rounded-lg rounded-tl-[36px] outline-none outline-offset-[-4px] transition-all group-hover:outline-2 group-hover:outline-offset-2 group-hover:outline-[#3A86FF]"
                    width={1000}
                    height={1000}
                    placeholder="blur"
                    blurDataURL={blurDataURL}
                  />
                  <p className="font-bold group-hover:underline">
                    {member.name}
                  </p>
                  <p className="font-medium">{member.role}</p>
                </div>
              </a>
            ))}
          </div>
          <div>
            <h2 className="text-center text-lg font-medium text-[#8338EC] md:text-xl">
              With thanks to the following folks for their past contribution
            </h2>
            <p className="text-center font-bold text-[#3A86FF] max-md:text-sm">
              Hamilton Truong, Megan Vyenielo, Louis Kim, Joshua Lee, Bruna Lee,
              PJ Ekhator, Bai Pai, Liv Cornfield, Kimberly Kono
            </p>
          </div>
          <button
            onClick={handleOpen}
            className="text-blue-500 hover:underline"
          >
            Contact Us
          </button>
          {showContactForm && <ContactUs handleClose={handleClose} />}
        </div>
      </div>
    </main>
  );
};

export default About;

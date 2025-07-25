import React from "react";
import Image from "next/image";
import ContactUs from "../components/ContactUs";
import { useState } from "react";
import { blurDataURL } from "@/lib/imageConfig";
import SEO from "@/components/SEO";

const member_list = [
  {
    name: "Julia Gitis",
    role: "Project Lead",
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
    name: "Jackson Tran",
    role: "Software Developer",
    url: "https://www.linkedin.com/in/jacksontran1/",
    img: "/about/jackson_tran.png",
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
    name: "Pablo Gomez Echegaray",
    role: "Software Developer",
    url: "",
    img: "/about/pablo-gomez-echegaray.jpg",
  },
  {
    name: "Robby Taine",
    role: "Data Analyst",
    url: "",
    img: "",
  },
];

const About = () => {
  const [showContactForm, setShowContactForm] = useState(false);
  const handleOpen = () => setShowContactForm(true);
  const handleClose = () => setShowContactForm(false);

  return (
    <>
      <SEO
        title="Support SF Schools - About"
        description="Support SF Schools is a diverse group of
                teachers, designers, engineers, researchers, and curious
                community members dedicated to making it easier for
                people who live, work, and hang out in San Francisco to support
                our public schools."
      />
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
        <div className="mx-auto flex max-md:px-8 md:w-5/6 lg:w-4/6">
          <div className="flex flex-col items-center gap-4 py-8 md:py-12">
            <div className="flex flex-col gap-4 max-md:text-sm">
              <section>
                <h2 className="text-xl font-bold">About Support SF Schools</h2>
                <p>
                  Support SF Schools is a volunteer-run project by{" "}
                  <a
                    href="https://www.sfcivictech.org/about"
                    target="_blank"
                    className="text-blue-500 hover:underline"
                  >
                  SF Civic Tech
                  </a>{" "}(formerly Code for San Francisco). Our team includes 
                  teachers, designers, engineers, researchers, and community members, 
                  all working together to make it easier for San Francisco residents 
                  to support public schools.
                </p>
              </section>
              <section>
                <h2 className="text-xl font-bold">Our Mission</h2>
                <p>
                  We aim to build stronger communities by connecting people with their 
                  local schools. Even if you don&#39;t have children attending, you can 
                  still be a part of the school community if you live near one. We&#39;ve 
                  heard from many San Francisco residents who want to help but don&#39;t 
                  always feel connected to their neighborhood schools.
                </p>
              </section>
              <section>
                <h2 className="text-xl font-bold">Who Can Get Involved?</h2>
                <p className="pb-4">
                  We welcome volunteers from all backgrounds, including:
                </p>
                <ul className="list-disc flex flex-col pl-6 gap-4 max-md:text-sm">
                  <li><strong>Tech professionals</strong> who want to support STEM education.</li>                  
                  <li><strong>Former teachers</strong> who are transitioning to new careers 
                    but still want to stay connected.</li>    
                  <li><strong>Parents</strong> whose children have graduated but want to give 
                    back to local schools.</li>    
                  <li><strong>Alumni</strong> who have returned to San Francisco and want to 
                    reconnect with schools.</li>    
                  <li>Anyone who believes in the power of education to change lives.</li>                    
                </ul>
              </section>
              <section>
                <h2 className="text-xl font-bold">How We Help</h2>
                <p>
                  Support SF Schools is designed to bring you closer to your 
                  neighborhood schools while helping meet their needs. Our beta version 
                  currently focuses on connecting volunteers with 105 public elementary, middle, 
                  and high schools in San Francisco.
                </p>
              </section>
              <section>
                <h2 className="text-xl font-bold">Get Involved</h2>
                <p>
                  Our website is still in beta, and we&#39;re always open to feedback. If you&#39;re 
                  interested in joining us, we meet on Zoom every Wednesday evening and are always 
                  looking for more volunteers.
                </p>
              </section>
            </div>

            <section>
                <h2 className="text-xl font-bold">Meet our team:</h2>
            </section>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 lg:gap-8">
              {member_list.map((member) => (
                <a
                  href={member.url}
                  target="_blank"
                  className={
                    "group flex justify-center" +
                    (!member.url ? " cursor-default" : "")
                  }
                  key={member.name}
                  onClick={(e) => {
                    if (!member.url) {
                      e.preventDefault();
                    }
                  }}
                >
                  <div className="w-36 text-sm">
                    {member.img ? (
                      <Image
                        src={member.img}
                        alt={`${member.name} photo`}
                        className={
                          "mb-2 rounded-lg rounded-tl-[36px]" +
                          (member.url
                            ? " outline-none outline-offset-[-4px] transition-all group-hover:outline-2 group-hover:outline-offset-2 group-hover:outline-black"
                            : "")
                        }
                        width={1000}
                        height={1000}
                        placeholder="blur"
                        blurDataURL={blurDataURL}
                      />
                    ) : (
                      <div className="mb-2 aspect-square w-full rounded-lg rounded-tl-[36px] bg-black"></div>
                    )}

                    <p
                      className={
                        "font-bold " +
                        (member.url ? "group-hover:underline" : "")
                      }
                    >
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
                Hamilton Truong, Megan Vyenielo, Louis Kim, Joshua Lee, Bruna
                Lee, PJ Ekhator, Bai Pai, Liv Cornfield, Kimberly Kono
              </p>
            </div>
              <footer>
                <button
                  onClick={handleOpen}
                  className="text-blue-500 hover:underline"
                >
                  Contact Us
                </button>
                {showContactForm && <ContactUs handleClose={handleClose} />}
              </footer>
          </div>
        </div>
      </main>
    </>
  );
};

export default About;

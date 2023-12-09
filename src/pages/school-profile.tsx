import Navbar from "@/components/NavBar/NavBar";
import Image from "next/image";
import React from "react";
import { RiInstagramFill } from "react-icons/ri";
import { FaTwitter, FaFacebook } from "react-icons/fa";
import { CiGlobe } from "react-icons/ci"
import { FaHandPaper } from "react-icons/fa";
import { FaMoneyBill } from "react-icons/fa";

//const imageStyle = {
    
//}

const SchoolProfile = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            
            <div className="relative w-full h-1/6 mb-24">
               <img 
                    className="relative z-10 w-full h-84"
                    src="/img/june-jordan-top.jpg" 
                    alt="June Jordan header picture" 
                />

                <img 
                    className="absolute translate-x-32 -translate-y-48 z-20 w-56 h-56"
                    src="/img/june-jordan-logo.png"
                    alt="June Jordan logo"
                />
            </div>
            
            <main>
                <div className="container mx-auto">
                    <div className="w-full mb-4 flex items-center">
                        <h1 className="text-6xl mb-4 text-pink-600 font-semibold">
                            June Jordan School for Equity
                        </h1>
                        <button>
                            <RiInstagramFill className="text-blue-500 ml-32 mr-8" size={35} />
                        </button>
                        <button>
                            <FaTwitter className="text-blue-500 mr-8" size={35} />
                        </button>
                        <button>
                            <FaFacebook className="text-blue-500 mr-8" size={35} />
                        </button>
                        <button>
                            <CiGlobe className="text-blue-500 mr-8" size={35} />
                        </button>
                    </div>

                    <div className="w-full mb-4 flex items-center">
                        <h1 className="text-xl text-pink-600 font-semibold mr-2.5">Sunset District</h1>
                        <p className="font-semibold">325 La Grande Avenue, San Francisco, CA 94112</p>
                    </div>

                    <div className="w-full mb-12 flex items-center">
                        {/* Add scroll down function */}
                        <button className="flex mr-2 rounded-lg px-3 py-1 items-center text-white bg-blue-500 font-semibold hover:opacity-75">
                            <FaHandPaper className="mr-2" size={30} /> Volunteer
                        </button>
                        <button className="flex mr-2 rounded-lg px-4 py-1 items-center text-white bg-blue-500 font-semibold hover:opacity-75">
                            <FaMoneyBill className="mr-2" size={30} /> Donate
                        </button>
                    </div>

                    <div className="flex flex-col mb-12">
                        <h1 className="text-3xl text-blue-500 font-semibold py-1">About</h1>
                        <ul className="list-disc">
                            <li>Small high school in San Francisco&apos;s Excelsior neighborhood.</li>
                            <li>Named after activist June Jordan, praised by Alice Walker as &quot;universal poet&quot;.</li>
                            <li>Engages with southeast San Francisco communities, aligned with social justice movement.</li>
                            <li>Aims to prepare students for college whilepreserving community traditions.</li>
                            <li>Fosters next-generation leaders for a more equitable world.</li> 
                        </ul>
                    </div>

                    <div className="flex mb-8">
                        <div className="w-[75px] flex flex-col mr-20 text-center">
                            <h1 className="text-violet-700 text-5xl font-bold">215</h1>
                            <p className="text-pink-600 text-xs font-semibold">Students Enrolled</p>
                        </div>
                        <div className="w-[75px] flex flex-col mr-20 text-center">
                            <h1 className="text-violet-700 text-5xl font-bold">64%</h1>
                            <p className="text-pink-600 text-xs font-semibold">Free/Reduced Lunch</p>
                        </div>
                        <div className="w-[75px] flex flex-col mr-20 text-center">
                            <h1 className="text-violet-700 text-5xl font-bold">48%</h1>
                            <p className="text-pink-600 text-xs font-semibold">English Language Learners</p>
                        </div>
                        <div className="w-[75px] flex flex-col text-center">
                            <h1 className="text-violet-700 text-5xl font-bold">11%</h1>
                            <p className="text-pink-600 text-xs font-semibold">Students with Special Needs</p>
                        </div>
                    </div>

                    <div className="flex flex-col mb-12">
                        <h1 className="text-3xl text-blue-500 font-semibold py-1">Our Mission</h1>
                        <p className="w-[700px]">
                            As a school for Social Justice serving predominantly working class communities of color, the mission of JJSE is not just to prepare students for 
                            college but also to prepare our graduates to be agents of positive change in the world. Our mission and vision is to prepare young people in 
                            three key areas: community, social justice, and independent thinkers.
                        </p>
                    </div>

                    <div className="flex mb-6">
                        <div className="w-full">
                            <h1 className="text-3xl text-blue-500 font-semibold">Student Outcomes</h1>
                        </div>
                    </div>
                    <div className="flex mb-16">
                        <div className="w-[75px] flex flex-col text-center mr-20">
                            <h1 className="text-violet-700 text-5xl font-bold">83%</h1>
                            <p className="text-pink-600 text-xs font-semibold">High School Graduation Rate</p>
                        </div>
                        <div className="w-[75px] flex flex-col text-center mr-20">
                            <h1 className="text-violet-700 text-5xl font-bold">56%</h1>
                            <p className="text-pink-600 text-xs font-semibold">Accepted into 4-year colleges</p>
                        </div>
                        <div className="w-[75px] flex flex-col text-center mr-20">
                            <h1 className="text-violet-700 text-5xl font-bold">68%</h1>
                            <p className="text-pink-600 text-xs font-semibold">Accepted into 2-year colleges</p>
                        </div>
                        <div className="w-[75px] flex flex-col text-center mr-20">
                            <h1 className="text-violet-700 text-5xl font-bold">11%</h1>
                            <p className="text-pink-600 text-xs font-semibold">SBAC English proficiency</p>
                        </div>
                        <div className="w-[75px] flex flex-col text-center">
                            <h1 className="text-violet-700 text-5xl font-bold">0%</h1>
                            <p className="text-pink-600 text-xs font-semibold">SBAC Math proficiency</p>
                        </div>
                    </div>

                    <div className="flex w-full mb-20 items-center">
                        <img 
                            className="w-[550px] h-[350px] rounded-xl mr-8"
                            src="/img/group-pic.jpg"
                            alt="June Jordan Students"
                        />    
                        <div className="flex flex-col">
                            <h1 className="text-5xl text-blue-500 font-semibold py-2">Volunteering</h1>
                            {/* Add links */}
                            <p className="w-[600px]">
                                June Jordan values community volunteers and has volunteer needs and opportunities throughout the school year. 
                                You sign up to volunteer through the SF Ed Fund or fill out this form to connect directly with the school.
                            </p>
                        </div>
                    </div>

                    <div className="flex mb-6">
                        <div className="w-full">
                            <h1 className="text-blue-500 font-semibold text-2xl text-center">Opportunities to volunteer, short & long term</h1>
                        </div>
                    </div>
                    <div className="flex justify-around mb-16">
                        <div className="w-[300px] flex flex-col">
                            <img 
                                className="w-66 h-52"
                                src="/img/gratitude.png"
                                alt="Donation image"
                            />
                            <h1 className="text-pink-600 text-2xl font-semibold mt-2">Gratitude Day</h1>
                            <p>
                                Participate as a volunteer in this interactive community gathering which aims to cultivate joy 
                                and a positive school culture through the practice of gratitude. Learn more 
                            </p>
                        </div>
                        <div className="w-[300px] flex flex-col">
                            <img 
                                className="w-66 h-52"
                                src="/img/tutor.png"
                                alt="Donation image"
                            />
                            <h1 className="text-pink-600 text-2xl font-semibold mt-2">Math Tutors</h1>
                            <p>
                                Our students need help in this subject now more than ever before. A strong commitment 
                                can make a huge lifetime change. Learn more 
                            </p>
                        </div>
                        <div className="w-[300px] flex flex-col">
                            <img 
                                className="w-66 h-52"
                                src="/img/clean-up.png"
                                alt="Donation image"
                            />
                            <h1 className="text-pink-600 text-2xl font-semibold mt-2">School Clean Up</h1>
                            <p>
                                Be a force for good! Join us in transforming our school by volunteering for a Clean-Up Day, a 
                                small effort for a big impact. Let&apos;s come together to create a brighter, more vibrant space for learning and community pride.
                                Learn more 
                            </p>
                        </div>
                    </div>

                    <div className="flex w-full h-96 mb-16 justify-around bg-orange-200 rounded-lg items-center">
                        <div className="flex flex-col w-80">
                            <h1 className=" mb-4 text-5xl font-semibold text-blue-500">Donate</h1>
                            {/* add link */}
                            <p className="my-4">You can donate directly to June Jordan on the Small Schools for Equity website.</p>
                            <button className="flex w-32 rounded-lg px-4 py-1 items-center text-white bg-blue-500 font-semibold hover:opacity-75">
                                <FaMoneyBill className="mr-2" size={30} /> Donate
                            </button>
                        </div>

                        <img 
                            className="w-72 h-64"
                            src="/img/placeholder.png"
                            alt=""
                        />
                    </div>


                    <div className="flex mb-12">
                        <div className="rounded-xl mr-8">
                            <Image 
                                src="/img/june_jordan_school.png"
                                alt="June Jordan Students"
                                width={600}
                                height={300}
                            />    
                        </div>
                        <div className="flex flex-col mt-20">
                            <h1 className="text-xl text-pink-600 font-semibold py-1 mb-2">2023-2024 Principal</h1>
                            <p className="mb-2 font-semibold">Amanda Chui</p>
                            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">Contact</button>
                        </div>
                    </div>

                    <div className="flex mb-6">
                        <div className="w-full py-4 text-center">
                            <h1 className="text-4xl text-pink-600 font-semibold">Resources</h1>
                        </div>
                    </div>

                    <div className="flex mb-12 justify-center">
                        <div className="w-[350px] flex flex-col mr-12">
                            <Image
                                src="/img/june_jordan_school.png"
                                alt="June Jordan Students"
                                width={325}
                                height={150}
                            />
                            <h1 className="text-pink-600 font-semibold text-xl mt-4">School Resources</h1>
                            <p>College Counselors</p>
                            <p>Librarian</p>
                            <p>On-site nurse</p>
                        </div>
                        <div className="w-[350px] flex flex-col mr-12">
                            <Image
                                src="/img/june_jordan_school.png"
                                alt="June Jordan Students"
                                width={325}
                                height={150}
                            />
                            <h1 className="text-pink-600 font-semibold text-xl mt-4">Enrichment Opportunities</h1>
                            <p>Music</p>
                            <p>Arts</p>
                            <p>Sports: Jaguar Athletics</p>
                            <p>Programs: JJSE Motorcycle</p>
                            <p>Mechanics program</p>
                        </div>
                        <div className="w-[350px] flex flex-col">
                            <Image
                                src="/img/june_jordan_school.png"
                                alt="June Jordan Students"
                                width={325}
                                height={150}
                            />
                            <h1 className="text-pink-600 font-semibold text-xl mt-4">After School Program</h1>
                            <p>College Counselors</p>
                            <p>Librarian</p>
                            <p>On-site nurse</p>
                        </div>
                    </div>

                </div>

                <div className="w-full h-[200px] bg-amber-400 m-0">
                    <div className="flex flex-col px-8 py-8">
                        <h1 className="font-semibold">SupportSFSchools.org</h1>
                        <h1 className="font-semibold">About Us</h1>
                        <h1 className="font-semibold">Contact Us</h1>
                        <h1 className="font-semibold">Sitemap</h1>
                        <div className="flex">
                            <RiInstagramFill size={35} className="mr-4" />
                            <FaTwitter size={35} className="mr-4" />
                            <FaFacebook size={35} className="mr-4" />
                            <CiGlobe size={35} />
                        </div>
                    </div>

                </div>
            </main>
        </div>
    )
}

export default SchoolProfile;
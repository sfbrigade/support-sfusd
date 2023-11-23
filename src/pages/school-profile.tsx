import Navbar from "@/components/NavBar/NavBar";
import Image from "next/image";
import { RiInstagramFill } from "react-icons/ri";
import { FaTwitter, FaFacebook } from "react-icons/fa";
import { CiGlobe } from "react-icons/ci"
import { FaHandPaper } from "react-icons/fa";
import { FaMoneyBill } from "react-icons/fa";

const SchoolProfile = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            {/*<div className="container mx-auto w-full h-[100px]">
                <Image 
                    src='/img/june_jordan_school.png'
                    alt="June Jordan Image"
                    fill={true}
                /> 
            </div> */}
            <main className="flex-1 p-4">  
                <div className="container mx-auto">
                    <div className="w-full mb-4 flex items-center justify-between">
                        <h1 className="text-5xl mb-4 text-pink-600 font-bold">
                            June Jordan School for Equity
                        </h1>
                        {/* fix icons */}
                        <button>
                            <RiInstagramFill className="text-blue-600" size={35} />
                        </button>
                        <button>
                            <FaTwitter className="text-blue-600" size={35} />
                        </button>
                        <button>
                            <FaFacebook className="text-blue-600" size={35} />
                        </button>
                        <button>
                            <CiGlobe className="text-blue-600" size={35} />
                        </button>
                    </div>

                    <div className="w-full mb-4 flex items-center">
                        <h1 className="text-xl text-pink-600 font-semibold mr-2.5">Excelsior</h1>
                        <p>325 La Grande Avenue, San Francisco, CA 94112</p>
                    </div>

                    <div className="w-full mb-12 flex items-center">
                        {/* change black border for icons */}
                        <button className="flex mr-2 rounded-lg px-3 py-1 items-center text-white bg-blue-500 font-semibold">
                            <FaHandPaper className="mr-2" size={30} /> Volunteer
                        </button>
                        <button className="flex mr-2 rounded-lg px-4 py-1 items-center text-white bg-blue-500 font-semibold">
                            <FaMoneyBill className="mr-2" size={30} /> Donate
                        </button>
                    </div>

                    <div className="flex flex-col mb-12">
                        <h1 className="text-4xl text-pink-600 font-semibold py-1">About</h1>
                        {/* figure out bullet points */}
                        <ul>
                            <li>Small highschool in San Francisco&apos;s Excelsior neighborhood.</li>
                            <li>Named after activist June Jordan, praised by Alice Walker as &quot;universal poet&quot;.</li>
                            <li>Engages with southeast San Francisco communities, aligned with social justice movement.</li>
                            <li>Aims to prepare students for college whilepreserving community traditions.</li>
                            <li>Fosters next-generation leaders for a more equitable world.</li> 
                        </ul>
                    </div>

                    <div className="flex mb-8">
                        {/* fix p wording to center */}
                        <div className="w-[75px] flex flex-col mr-16 items-center">
                            <h1 className="text-violet-700 text-5xl font-bold">325</h1>
                            <p className="text-pink-600 text-xs">Students Enrolled</p>
                        </div>
                        <div className="w-[75px] flex flex-col mr-16 items-center">
                            <h1 className="text-violet-700 text-5xl font-bold">64%</h1>
                            <p className="text-pink-600 text-xs">Free/Reduced Lunch</p>
                        </div>
                        <div className="w-[75px] flex flex-col mr-16 items-center">
                            <h1 className="text-violet-700 text-5xl font-bold">48%</h1>
                            <p className="text-pink-600 text-xs">English Language Learners</p>
                        </div>
                    </div>

                    <div className="flex flex-col mb-24">
                        <h1 className="text-4xl text-pink-600 font-semibold py-1">Our Mission</h1>
                        <p className="w-[700px]">
                            As a school for Social Justice serving predominantly working class communities of color, the mission of JJSE is not just to prepare students for 
                            college but also to prepare our graduates to be agents of positive change in the world. Our mission and vision is to prepare young people in 
                            three key areas: community, social justice, and independent thinkers.
                        </p>
                    </div>

                    <div className="flex mb-12">
                        <div className="rounded-xl mr-8">
                            <Image 
                                src="/img/june_jordan_school.png"
                                alt="June Jordan Students"
                                width={600}
                                height={400}
                            />    
                        </div>
                        <div className="flex flex-col align-middle">
                            <h1 className="text-4xl text-pink-600 font-semibold py-1">Volunteering</h1>
                            {/* add links to sf ed fund and form*/}
                            <p className="w-[700px]">
                                June Jordan values community volunteers and has volunteer needs and opportunities throughout the school year. 
                                You sign up to volunteer through the SF Ed Fund or fill out this form to connect directly with the school.
                            </p>
                        </div>
                    </div>

                    <div className="flex mb-6">
                        <div className="flex flex-col align-middle">
                            <h1 className="text-4xl text-pink-600 font-semibold py-1">Donations</h1>
                            {/* add link to small schools for equity*/}
                            <p className="w-[700px]">
                                You can donate directly to June Jordan on the Small Schools for Equity website.
                            </p>
                        </div>
                        <div className="rounded-xl mr-8">
                            <Image 
                                src="/img/june_jordan_school.png"
                                alt="June Jordan Students"
                                width={600}
                                height={400}
                            />    
                        </div>
                    </div>

                </div>
            </main>
        </div>
    )
}

export default SchoolProfile;
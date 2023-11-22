import Navbar from "@/components/NavBar/NavBar";
import Image from "next/image";
import { RiInstagramFill } from "react-icons/ri";
import { FaTwitter, FaFacebook } from "react-icons/fa";
import { CiGlobe } from "react-icons/ci"

const SchoolProfile = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1 p-4">
                {/*<Image 
                    className="w-full h-1/5"
                    src='/img/june_jordan_school.png'
                    alt="June Jordan Image"
                    width={1440}
                    height={100}
                />*/}
                <div className="container mx-auto">
                    <div className="w-full mb-4 flex items-center justify-between">
                        <h1 className="text-4xl mb-4 text-pink-600 font-bold">
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
                </div>
            </main>
        </div>
    )
}

export default SchoolProfile;
import React from "react";
import schools from "@/data/schools";
import Header from "@/components/SchoolComponent/Header";
import { useRouter } from "next/router";
import About from "@/components/SchoolComponent/About";
import Mission from "@/components/SchoolComponent/Mission";
import StudentOutcomes from "@/components/SchoolComponent/StudentOutcomes";
import Volunteer from "@/components/SchoolComponent/Volunteer";

const School = () => {
  const router = useRouter();
  const { name } = router.query;

  const school = schools.find((school) => school.name == name);

  return (
    <>
      {school && (
        <div>
          <div className="relative w-full">
            <img
              className="relative w-full h-64 object-cover"
              src={school.img}
              alt={school.name + " image"}
            />

            <img
              className="absolute max-md:top-40 top-32 left-2/4 max-md:-translate-x-2/4 md:left-20 z-1 w-32 h-32 md:w-40 md:h-40 rounded drop-shadow-lg"
              src={school.img}
              alt={school.name + " logo"}
            />
          </div>
          <div className="p-8 max-md:mt-8 md:p-24 flex flex-col gap-10">
            <Header school={school} />
            <About school={school} />
            <Mission />
            <StudentOutcomes />
            <Volunteer />
          </div>
        </div>
      )}
    </>
  );
};

export default School;

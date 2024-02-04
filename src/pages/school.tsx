import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";

import schools from "@/data/schools";
import Header from "@/components/schoolPageComponents/Header";
import About from "@/components/schoolPageComponents/About";
import Mission from "@/components/schoolPageComponents/Mission";
import StudentOutcomes from "@/components/schoolPageComponents/StudentOutcomes";
import Volunteer from "@/components/schoolPageComponents/Volunteer";

const School = () => {
  const router = useRouter();
  const { name } = router.query;

  const school = schools.find((school) => school.name == name);

  return (
    <>
      {school && (
        <div>
          <div className="relative w-full">
            <Image
              className="relative w-full h-64 object-cover"
              src={school.img}
              alt={school.name + " image"}
              width={0}
              height={0}
            />

            <Image
              className="absolute max-md:top-40 top-32 left-2/4 max-md:-translate-x-2/4 md:left-20 z-1 w-32 h-32 md:w-40 md:h-40 rounded drop-shadow-lg"
              src={school.img}
              alt={school.name + " logo"}
              width={0}
              height={0}
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

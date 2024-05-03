import React from "react";
import { School } from "@/types/school";
import Link from "next/link";

interface SchoolCardProps {
  school: School;
}
/**
 * SchoolCard: Renders school image and details depending on school clicked on map
 *
 * Props:
 *  - school
 *    {
 *      name: "Balboa High School",
 *      address: "1000 Cayuga Ave,...
 *      ...
 *    }
 *
 * State: none
 *
 * Map => SchoolCardMap
 *
 */

const SchoolCard: React.FC<SchoolCardProps> = ({ school }) => {
  return (
    <div className="flex max-w-[400px] flex-col items-start justify-center rounded-[16px] shadow-lg bg-white ">
      <img
        src={school.img}
        alt={school.name}
        className=" h-40 w-full rounded-[16px] object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-medium">{school.name}</h2>
        <p className="text-sm">{school.sf_district}</p>
        <div className="items-left flex flex-col mb-2">
          <div className="mb-2 flex flex-row items-center">
            <img
              src="icons/student-icon.png"
              alt="student icon"
              className="mr-2 max-h-[35px] max-w-[35px]"
            />
            <h3 className="text-base">
              {school.students ? school.students : "N/A"} Students
            </h3>
          </div>
          <div className="mb-2 flex flex-row items-center">
            <img
              src="icons/lunch-icon.png"
              alt="lunch icon"
              className="mr-2 max-h-[30px] max-w-[30px]"
            />
            <h3 className="text-base">
              {school.free_reduced_lunch ? school.free_reduced_lunch : "N/A"}%
              Free and Reduced Lunch
            </h3>
          </div>
          <div className="mb-2 flex flex-row items-center">
            <img
              src="icons/language-icon.png"
              alt="language icon"
              className="mr-2 max-h-[30px] max-w-[30px]"
            />
            <h3 className="text-base">
              {school.ell ? school.ell : "N/A"}% English Language Learners
            </h3>
          </div>
        </div>
        <Link className="bg-blue-500 text-white text-sm w-40 rounded-lg py-2 tracking-wide inline-block text-center" href={"/school?name=" + school.name}>
          Learn more
        </Link>
      </div>
    </div>
  );
};

export default SchoolCard;

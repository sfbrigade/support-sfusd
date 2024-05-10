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
    <div className="flex max-w-[400px] flex-col items-start justify-center rounded-[16px] bg-white shadow-lg ">
      <img
        src={"/school_img/" + school.img}
        alt={school.name}
        className=" h-40 w-full rounded-[16px] object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-medium">{school.name}</h2>
        <p className="text-sm">{school.neighborhood}</p>
        <div className="items-left mb-2 flex flex-col">
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
              {school.frl ? school.frl : "N/A"}% Free and Reduced Lunch
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
        <Link
          className="inline-block w-40 rounded-lg bg-blue-500 py-2 text-center text-sm tracking-wide text-white"
          href={"/school?name=" + encodeURIComponent(school.name)}
        >
          Learn more
        </Link>
      </div>
    </div>
  );
};

export default SchoolCard;

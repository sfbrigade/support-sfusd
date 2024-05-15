import React from "react";
import { School } from "@/types/school";
import Image from "next/image";

interface SchoolCardProps {
  school: School;
  onClose: () => void;
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

const SchoolCard: React.FC<SchoolCardProps> = ({ school, onClose }) => {
  return (
    <div className="flex md:max-w-[400px] flex-row md:flex-col items-start justify-center rounded-[16px] bg-white shadow-lg">
      <button onClick={onClose} className="block md:hidden absolute top-2 left-2 z-10">
        <Image
          src={`/circle_close.svg`}
          alt="Close Icon"
          width={24}
          height={24}
        />
      </button>
      <div
        className={`transition-max-height relative col-span-4 rounded-l-2xl md:rounded-t-2xl md:rounded-b-lg bg-cover bg-center duration-[700ms] md:col-span-3 h-40 w-2/5
        md:w-full`}
      >
        <Image
          src={`/${school.img}`}
          alt={school.name}
          fill
          className=" h-40 w-full rounded-[16px] object-cover"
        />
      </div>
      <div className="p-2 md:p-4 w-3/5 md:w-full flex flex-col h-full">
        <div className="flex-grow-1">
          <h2 className="text-lg md:text-xl font-medium">{school.name}</h2>
          <p className="text-xs md:text-sm">{school.neighborhood}</p>
          <div className="items-left mb-2 flex flex-col hidden md:block">
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
        </div>
        <a href="#">
          <button className="hidden md:block w-full md:w-40 rounded-lg bg-blue-500 py-2 text-sm tracking-wide text-white">
            Learn more
          </button>
        </a>
      </div>
    </div>
  );
};

export default SchoolCard;

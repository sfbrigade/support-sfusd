import React from "react";
import { School } from "@/types/school";
import Image from "next/image";
import Link from "next/link";

interface SchoolCardProps {
  school: School;
  className?: string;
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

const SchoolCard: React.FC<SchoolCardProps> = ({
  school,
  onClose,
  className,
}) => {
  return (
    <div
      className={`flex flex-row items-start justify-center rounded-[16px] bg-white shadow-lg md:max-w-[400px] md:flex-col ${className}`}
    >
      <button
        onClick={onClose}
        className="absolute left-2 top-2 z-10 block md:hidden"
      >
        <Image
          src={`/circle_close.svg`}
          alt="Close Icon"
          width={24}
          height={24}
        />
      </button>
      <div
        className={`transition-max-height relative col-span-4 h-40 w-2/5 rounded-l-2xl bg-cover bg-center duration-[700ms] md:col-span-3 md:w-full md:rounded-b-lg
        md:rounded-t-2xl`}
      >
        <img
          src={`/${school.img}`}
          alt={school.name}
          className=" h-40 w-full rounded-l-2xl object-cover md:rounded-b-lg md:rounded-t-2xl"
        />
      </div>
      <div className="flex h-full w-3/5 flex-col p-2 md:w-full md:p-4">
        <div className="flex-grow-1">
          <h2 className="text-lg font-medium md:text-xl">{school.name}</h2>
          <p className="text-xs md:text-sm">{school.neighborhood}</p>
          <div className="items-left mb-2 flex hidden flex-col md:block">
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
        <Link href="#">
          <button className="hidden w-full rounded-lg bg-blue-500 py-2 text-sm tracking-wide text-white md:block md:w-40">
            Learn more
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SchoolCard;

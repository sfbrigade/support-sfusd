import React from "react";
import { Program, School } from "@/types/school";
import Image from "next/image";
import Link from "next/link";
import Tag from "./Tag";

interface SchoolCardProps {
  school: School;
  className?: string;
  onClose: (e: React.MouseEvent<HTMLElement>) => void;
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
const LearnMoreButton = () => {
  return (
    <button className="w-full rounded-lg bg-blue-500 py-2 text-sm tracking-wide text-white md:w-40">
      Learn more
    </button>
  );
};
const SchoolCard: React.FC<SchoolCardProps> = ({
  school,
  onClose,
  className,
}) => {
  const students = school.metrics.find(
    (metric) => metric.name == "Students Enrolled",
  );
  const frl = school.metrics.find(
    (metric) => metric.name == "Free/Reduced Lunch",
  );
  const ell = school.metrics.find(
    (metric) => metric.name == "English Language Learners",
  );

  /* TODO: look into whether or not creating a `WithLink` component can simplify this somehow */
  const SchoolImage = (props: any) => (
    <Image
      src={props.src}
      alt={props.alt}
      width={1000}
      height={500}
      className={`h-40 max-h-[20vh] rounded-l-2xl object-cover md:max-h-none md:rounded-b-lg md:rounded-t-2xl ${props.className ? props.className : ""}`}
    />
  );

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
        className={`transition-max-height relative col-span-4 h-auto w-2/5 rounded-l-2xl bg-cover bg-center duration-[700ms] md:col-span-3 md:h-40 md:w-full md:rounded-b-lg
        md:rounded-t-2xl`}
      >
        <Link
          href={"/school?name=" + encodeURIComponent(school.name)}
          className="hidden md:inline"
        >
          <SchoolImage src={`/school_img/${school.img}`} alt={school.name} />
        </Link>
        <SchoolImage
          src={`/school_img/${school.img}`}
          alt={school.name}
          className="inline-block md:hidden"
        />
      </div>
      <div className="flex h-full w-3/5 flex-col p-2 md:w-full md:p-4">
        <div className="flex-grow-1">
          {school.priority && <Tag />}
          <h2 className="font-medium md:text-xl">{school.name}</h2>
          <p className="text-sm max-md:text-xs">{school.neighborhood}</p>
          <div className="items-left mb-2 hidden flex-col md:block">
            <div className="mb-2 flex flex-row items-center">
              <img
                src="icons/student-icon.png"
                alt="student icon"
                className="mr-2 max-h-[35px] max-w-[35px]"
              />
              <h3 className="text-base">
                {students ? students.value : "N/A"} Students
              </h3>
            </div>
            <div className="mb-2 flex flex-row items-center">
              <img
                src="icons/lunch-icon.png"
                alt="lunch icon"
                className="mr-2 max-h-[30px] max-w-[30px]"
              />
              <h3 className="text-base">
                {frl ? frl.value : "N/A"}% Free and Reduced Lunch
              </h3>
            </div>
            <div className="mb-2 flex flex-row items-center">
              <img
                src="icons/language-icon.png"
                alt="language icon"
                className="mr-2 max-h-[30px] max-w-[30px]"
              />
              <h3 className="text-base">
                {ell ? ell.value : "N/A"}% English Language Learners
              </h3>
            </div>
          </div>
        </div>
        <Link
          className="hidden md:block"
          href={"/school?name=" + encodeURIComponent(school.name)}
        >
          <LearnMoreButton />
        </Link>
      </div>
    </div>
  );
};

export default SchoolCard;

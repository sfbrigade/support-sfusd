import React from "react";
import { Program, School } from "@/types/school";
import { blurDataURL } from "@/lib/imageConfig";
import Image from "next/image";
import Link from "next/link";
import Tag from "./Tag";
import VolunteerList from "./schoolPageComponents/VolunteerList";

interface SchoolCardProps {
  school: School;
  className?: string;
  onClose: (e: React.MouseEvent<HTMLElement>) => void;
  onModalOpen: () => void;
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
    <button className="w-24 md:w-40 rounded-lg bg-blue-500 py-2 text-sm tracking-wide text-white">
      Learn more  
    </button>
  );
};
const SchoolCard: React.FC<SchoolCardProps> = ({
  school,
  onClose,
  className,
  onModalOpen,
}) => {
  // const students = school.metrics.find(
  //   (metric) => metric.name == "Students Enrolled",
  // );
  // const frl = school.metrics.find(
  //   (metric) => metric.name == "Free/Reduced Lunch",
  // );
  // const ell = school.metrics.find(
  //   (metric) => metric.name == "English Language Learners",
  // );

  /* TODO: look into whether or not creating a `WithLink` component can simplify this somehow */
  const SchoolImage = (props: any) => (
    <Image
      src={props.src}
      alt={props.alt}
      placeholder="blur"
      blurDataURL={blurDataURL}
      width={1000}
      height={500}
      className={`h-40 rounded-l-2xl object-cover md:max-h-none md:rounded-b-lg md:rounded-t-2xl ${props.className ? props.className : ""}`}
    />
  );

  return (
    <div
      className={`flex flex-row items-start justify-center rounded-2xl bg-white md:shadow-lg md:max-w-[400px] md:flex-col ${className}`}
    >
      <button
        onClick={onClose}
        className="absolute left-2 top-2 z-10 block md:relative md:top-8"
      >
        <Image
          src={`/circle_close.svg`}
          alt="Close Icon"
          width={0}
          height={0}
        />
      </button>
      <div
        className={`h-40 transition-max-height relative col-span-4 h-auto w-2/5 rounded-l-2xl bg-cover bg-center duration-[700ms] md:col-span-3 md:h-40 md:w-full md:rounded-b-lg
        md:rounded-t-2xl `}
      >
        <Link
          href={"/school?name=" + encodeURIComponent(school.name) + "&stub=" + school.stub}
          className="hidden md:inline"
        >
          <SchoolImage
            src={`/school-images/full/${school.stub}.webp`}
            alt={school.name}
          />
        </Link>
        <SchoolImage
          src={`/school-images/full/${school.stub}.webp`}
          alt={school.name}
          className="inline-block md:hidden"
        />
      </div>
      <div className="flex flex-col h-full w-3/5 p-2 md:w-full md:p-4">
        <div className="flex-grow-1">
          {school.priority && (
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onModalOpen();
              }}
            >
              <Tag /> 
            </button>
          )}
          <h2 className="font-medium md:text-xl">{school.name}</h2>
          <p className="text-sm max-md:text-xs">{school.neighborhood}</p>

          <div className="mb-4 mt-3">
            <VolunteerList school={school} fullCard={false} />
          </div>
        </div>
        <Link
          className=" md:block"
          href={"/school?name=" + encodeURIComponent(school.name) +"&stub=" + school.stub}
        >
          <LearnMoreButton />
        </Link>
      </div>
    </div>
  );
};

export default SchoolCard;

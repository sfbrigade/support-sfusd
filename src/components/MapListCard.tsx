import React, { useState } from "react";
import { School } from "@/types/school";
import { blurDataURL } from "@/lib/imageConfig";
import Image from "next/image";
import Link from "next/link";
import Tag from "./Tag";

type MapListCardProps = {
  school: School;
  setSelectedSchool: (school: School | null) => void;
  isExpanded: Boolean;
  onModalOpen: () => void;
};

/**
 * MapListCard: Renders a card with school image and details.
 *
 * Props:
 *  - school
 *  - img
 *  - name
 *  - sf_district
 *  - students
 *  - frl
 *  - ell
 *
 * State: none
 *
 * MapList => MapListCard
 *
 */
const MapListCard: React.FC<MapListCardProps> = ({
  school,
  setSelectedSchool,
  isExpanded,
  onModalOpen,
}) => {
  const { img, name, neighborhood } = school;

  const students = school.metrics.find(
    (metric) => metric.name == "Students Enrolled",
  );
  const frl = school.metrics.find(
    (metric) => metric.name == "Free/Reduced Lunch",
  );
  const ell = school.metrics.find(
    (metric) => metric.name == "English Language Learners",
  );

  function onClick(e: React.MouseEvent<HTMLDivElement>) {
    if (isExpanded) {
      setSelectedSchool(null);
    } else {
      setSelectedSchool(school);
    }
  }
  return (
    <div
      className={`relative grid cursor-pointer grid-cols-10 rounded-lg border-2 bg-white max-md:overflow-hidden`}
      onClick={onClick}
      id={name}
    >
      <div className="col-span-6 justify-center overflow-hidden px-4 py-4 transition-all ease-in-out md:col-span-7">
        <div className="flex flex-col">
          {school.priority && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onModalOpen();
              }}
              className="w-fit"
            >
              <Tag />
            </button>
          )}
          <div className="flex grid-cols-6 flex-col md:grid md:items-center md:gap-2">
            <div className="col-span-4 font-bold md:text-xl">{name}</div>
            <div className="col-span-2 text-gray-600 max-md:text-sm">
              {neighborhood}
            </div>
          </div>
        </div>

        <div
          className={`flex flex-col gap-2 transition-all duration-[700ms] [transition-behavior:allow-discrete] max-md:text-sm ${isExpanded ? "visible mt-4 max-h-48" : "invisible mt-0 max-h-0"}`}
        >
          <div>
            <b>{students ? students.value : "N/A"}</b> Students
          </div>
          <div>
            <b>{frl ? frl.value : "N/A"}%</b> Free and Reduced Lunch
          </div>
          <div>
            <b>{ell ? ell.value : "N/A"}%</b> English Language Learners
          </div>
          <Link
            className="w-fit rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-700"
            href={"/school?name=" + encodeURIComponent(school.name)}
          >
            Learn More
          </Link>
        </div>
      </div>
      <div
        className={`transition-max-height relative col-span-4 max-h-none rounded-r-lg duration-[700ms] md:col-span-3`}
      >
        <Image
          src={`/school_img/${school.img}`}
          placeholder="blur"
          blurDataURL={blurDataURL}
          alt="School Image"
          fill
          className="rounded-r-lg object-cover"
        />

        <Image
          src="/icons/dropdown-icon.svg"
          alt="Arrow Icon"
          width={24}
          height={24}
          className={`absolute bottom-1.5 right-1.5 transition duration-[700ms] ${isExpanded ? "rotate-[-180deg]" : "rotate-0"}`}
        />
      </div>
    </div>
  );
};

export default MapListCard;

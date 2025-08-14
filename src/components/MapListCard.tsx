import React, { useRef, useEffect } from "react";
import { School } from "@/types/school";
import { blurDataURL } from "@/lib/imageConfig";
import Image from "next/image";
import Link from "next/link";
import Tag from "./Tag";
import { useMapContext } from "@/contexts/MapContext";
import VolunteerList from "./schoolPageComponents/VolunteerList";

type MapListCardProps = {
  school: School;
  setSelectedSchool: (school: School | null) => void;
  isExpanded: boolean;
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
const MapListCard = ({
  school,
  setSelectedSchool,
  isExpanded,
  onModalOpen,
}: MapListCardProps) => {
  const { selectedSchool } = useMapContext();
  const cardRef = useRef<HTMLDivElement>(null);

  const { stub, name, neighborhood } = school;

  // const students = school.metrics.find(
  //   (metric) => metric.name == "Students Enrolled",
  // );
  // const frl = school.metrics.find(
  //   (metric) => metric.name == "Free/Reduced Lunch",
  // );
  // const ell = school.metrics.find(
  //   (metric) => metric.name == "English Language Learners",
  // );

  const learnMoreRef = useRef<HTMLAnchorElement>(null);

  const handleTransitionEnd = (e: React.TransitionEvent<HTMLDivElement>) => {
    if (e.propertyName === "max-height" && isExpanded) {
      cardRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  };

  function onClick(e: React.MouseEvent<HTMLDivElement>) {
    if (
      learnMoreRef.current &&
      learnMoreRef.current.contains(e.target as Node)
    ) {
      return; // Do nothing if the click was on the "Learn More" link
    }

    if (isExpanded) {
      setSelectedSchool(null);
    } else {
      setSelectedSchool(school);
    }
  }

  useEffect(() => {
    if (selectedSchool && selectedSchool.stub === school.stub) {
      cardRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [selectedSchool, school.stub]);

  const schoolUrl = "/school?name=" + encodeURIComponent(school.name) + "&stub=" + school.stub;
  // console.log('Generated URL:', schoolUrl);
  // console.log('School data:', { name: school.name, stub: school.stub });

  return (
    <div
      ref={cardRef}
      className={`grid cursor-pointer grid-cols-10 rounded-lg border-2 bg-white max-md:overflow-hidden ${
        isExpanded ? "max-h-[300px]" : "max-h-[104px]"
      } transition-max-height relative duration-[700ms]`}
      onClick={onClick}
      onTransitionEnd={handleTransitionEnd}
    >
      <div className="col-span-6 justify-center overflow-hidden px-4 pb-4 transition-all ease-in-out md:col-span-7">
        <div className="flex h-[104px] flex-col justify-center">
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

        <div className="flex flex-col gap-5 max-md:text-sm">
          <VolunteerList school={school} fullCard={false} />
          <Link
            ref={learnMoreRef}
            className="w-fit rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-700"
            //href={"/school?name=" + encodeURIComponent(school.name)}
            href={schoolUrl}
          >
            Learn More
          </Link>
        </div>
      </div>
      <div
        className={`transition-max-height relative col-span-4 rounded-r-lg duration-[700ms] md:col-span-3 ${
          isExpanded ? "max-h-[300px]" : "max-h-[104px]"
        }`}
      >
        <Image
          src={`/school-images/full/${stub}.webp`}
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
          className={`absolute bottom-1.5 right-1.5 transition duration-[700ms] ${
            isExpanded ? "rotate-[-180deg]" : "rotate-0"
          }`}
        />
      </div>
    </div>
  );
};

export default MapListCard;

import React, { useState } from "react";
import Image from "next/image";

type MapListCardProps = {
  img: string;
  name: string;
  district: string;
  students: string;
  frl: string;
  ell: string;
};

/**
 * MapListCard: Renders a card with school image and details.
 *
 * Props:
 *  - img
 *  - name
 *  - district
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
  img,
  name,
  district,
  students,
  frl,
  ell,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  function onClick(e: React.MouseEvent<HTMLDivElement>) {
    setIsExpanded(!isExpanded);
  }
  return (
    <div
      className={`grid cursor-pointer grid-cols-10 rounded-lg border-2 bg-white max-md:overflow-hidden ${isExpanded ? "max-h-[300px]" : "max-h-[88px]"} transition-max-height duration-[700ms] `}
      onClick={onClick}
    >
      <div className="col-span-6 justify-center overflow-hidden px-4 pb-4 transition-all ease-in-out md:col-span-7">
        <div className="flex h-[88px] grid-cols-6 flex-col justify-center md:grid md:items-center md:gap-2">
          <div className="col-span-4 font-bold md:text-xl">{name}</div>
          <div className="col-span-2 text-gray-600 max-md:text-sm">
            {district}
          </div>
        </div>
        <div className="flex flex-col gap-2 max-md:text-sm">
          <div>
            <strong>{students ? students : "N/A"}</strong> Students
          </div>
          <div>
            <strong>{frl ? frl : "N/A"}%</strong> Free and Reduced Lunch
          </div>
          <div>
            <strong>{ell ? ell : "N/A"}%</strong> English Language Learners
          </div>
          <button className="w-fit rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-700">
            Learn More
          </button>
        </div>
      </div>
      <div
        className={`transition-max-height relative col-span-4 rounded-r-lg bg-cover bg-center duration-[700ms] md:col-span-3 ${isExpanded ? "max-h-[300px]" : "max-h-[88px]"}`}
        style={{ backgroundImage: `url(${img})` }}
      >
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

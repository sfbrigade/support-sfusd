import React, { useState } from "react";

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
      className={`grid cursor-pointer grid-cols-10 rounded-lg  border-2 bg-white max-md:overflow-hidden ${isExpanded ? "max-h-[300px]" : "max-h-[88px]"} transition-max-height duration-[700ms] `}
      onClick={onClick}
    >
      <div className="col-span-7 justify-center overflow-hidden px-4 pb-4 transition-all ease-in-out">
        <div className="grid h-[88px] grid-cols-6 items-center">
          <div className="col-span-4 font-bold md:text-xl">{name}</div>
          <div className="col-span-2 text-gray-600">{district}</div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="">{students ? `${students} Students` : "N/A"}</div>
          <div className="">
            {frl ? `${frl}% Free and Reduced Lunch` : "N/A"}
          </div>
          <div className="">
            {ell ? `${ell}% English Language Learners` : "N/A"}
          </div>
          <button className="w-fit rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-700">
            Learn More
          </button>
        </div>
      </div>
      <div
        className="col-span-3 rounded-r-lg bg-cover bg-center"
        style={{ backgroundImage: `url(${img})` }}
      ></div>
    </div>
  );
};

export default MapListCard;

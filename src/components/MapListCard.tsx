import React from "react";

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
  return (
    <div className="mb-4 flex rounded-lg border-2 bg-white">
      <div className="flex-grow p-4">
        <div className="flex justify-between">
          <div className="mb-2 text-xl font-bold">{name}</div>
          <div className="mb-4 mr-14 text-gray-600">{district}</div>
        </div>
        <div className="mt-2 flex items-center">
          {students ? `${students} Students` : "N/A"}
        </div>
        <div className="mt-2 flex items-center">
          {frl ? `${frl}% Free and Reduced Lunch` : "N/A"}
        </div>
        <div className="mt-2 flex items-center">
          {ell ? `${ell}% English Language Learners` : "N/A"}
        </div>
        <button className="mt-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-700">
          Learn More
        </button>
      </div>
      <div
        className="h-62 w-60 rounded-r-lg bg-cover bg-center"
        style={{ backgroundImage: `url(${img})` }}
      ></div>
    </div>
  );
};

export default MapListCard;

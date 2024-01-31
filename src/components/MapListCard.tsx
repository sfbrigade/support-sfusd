import React from 'react';
import Image from 'next/image';

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
  img, name, district, students, frl, ell
}) => {
  return (
    <div className="bg-white border-2 rounded-lg mb-4 flex">
      <div className="p-4 flex-grow">
        <div className="flex justify-between">
      <div className="font-bold text-xl mb-2">{name}</div>
      <div className="text-gray-600 mb-4 mr-14">{district}</div>
      </div>
      <div className="flex items-center mt-2">
          {students ? `${students} Students` : "N/A"}
        </div>
        <div className="flex items-center mt-2">
          {frl ? `${frl}% Free and Reduced Lunch` : "N/A"}
        </div>
        <div className="flex items-center mt-2">
          {ell ? `${ell}% English Language Learners` : "N/A"}
        </div>
        <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">
          Learn More
        </button>
      </div>
      <div
        className="bg-cover bg-center h-62 w-60 rounded-r-lg"
        style={{ backgroundImage: `url(${img})` }}>
      </div>
    </div>
  );
};

export default MapListCard;
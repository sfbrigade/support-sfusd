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
    <div className="bg-white border-2 rounded-lg mb-4">
      <div
        className="bg-cover bg-center h-40 rounded-t-lg"
        style={{ backgroundImage: `url(${img})` }}
      ></div>
      <div className="p-4">
        <div className="font-bold text-xl">{name}</div>
        <div className="text-gray-600">{district}</div>
        <div className="flex items-center mt-2">
          <Image
            src="/icons/student-icon.png"
            alt="Student Icon"
            className="w-5 h-5 mr-2"
          />
          {students ? `${students} Students` : "N/A"}
        </div>
        <div className="flex items-center mt-2">
          <Image
            src="/icons/lunch-icon.png"
            alt="Lunch Icon"
            className="w-5 h-5 mr-2"
          />
          {frl ? `${frl}% Free and Reduced Lunch` : "N/A"}
        </div>
        <div className="flex items-center mt-2">
          <Image
            src="/icons/language-icon.png"
            alt="ELL Icon"
            className="w-5 h-5 mr-2"
          />
          {ell ? `${ell}% English Language Learners` : "N/A"}
        </div>
      </div>
    </div>
  );
};

export default MapListCard;
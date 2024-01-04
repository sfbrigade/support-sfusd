import React from "react";

interface School {
  name: string;
  lat?: number;
  lng?: number;
  description?: string;
  img?: string;
  district?: string;
  students?: string;
  frl?: string;
  ell?: string;
}

interface SchoolCardProps {
  school: School;
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
const SchoolCard: React.FC<SchoolCardProps> = ({ school }) => {
  return (
    <div className="flex flex-col items-center justify-center p-4 bg-white border border-gray-300 rounded-lg max-w-[400px] max-h-[400px]">
      <img
        src={school.img}
        alt={school.name}
        className="w-full h-40 object-cover rounded-lg mb-4"
      />
      <h3 className="text-xl font-bold mb-2">{school.name}</h3>
      <h3 className="text-base mb-2 text-slate-400">{school.district} District</h3>
      <div className="flex flex-col items-left">
        <div className="flex flex-row items-center mb-2">
          <img
            src="icons/student-icon.png"
            alt="student icon"
            className="max-w-[35px] max-h-[35px] mr-2"
          />
          <h3 className="text-base">{school.students  ? school.students : "N/A"} Students</h3>
        </div>
        <div className="flex flex-row items-center mb-2">
          <img
            src="icons/lunch-icon.png"
            alt="lunch icon"
            className="max-w-[30px] max-h-[30px] mr-2"
          />
          <h3 className="text-base">{school.frl  ? school.frl : "N/A"}% Free and Reduced Lunch</h3>
        </div>
        <div className="flex flex-row items-center mb-2">
          <img
            src="icons/language-icon.png"
            alt="language icon"
            className="max-w-[30px] max-h-[30px] mr-2"
          />
          <h3 className="text-base">{school.ell  ? school.ell : "N/A"}% English Language Learners</h3>
        </div>
        <p>{school.description}</p>
      </div>
    </div>
  );
};

export default SchoolCard;

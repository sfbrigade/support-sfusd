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
    <div className="flex max-h-[400px] max-w-[400px] flex-col items-center justify-center rounded-lg border border-gray-300 bg-white p-4">
      <img
        src={school.img}
        alt={school.name}
        className="mb-4 h-40 w-full rounded-lg object-cover"
      />
      <h3 className="mb-2 text-xl font-bold">{school.name}</h3>
      <h3 className="mb-2 text-base text-slate-400">
        {school.district} District
      </h3>
      <div className="items-left flex flex-col">
        <div className="mb-2 flex flex-row items-center">
          <img
            src="icons/student-icon.png"
            alt="student icon"
            className="mr-2 max-h-[35px] max-w-[35px]"
          />
          <h3 className="text-base">
            {school.students ? school.students : "N/A"} Students
          </h3>
        </div>
        <div className="mb-2 flex flex-row items-center">
          <img
            src="icons/lunch-icon.png"
            alt="lunch icon"
            className="mr-2 max-h-[30px] max-w-[30px]"
          />
          <h3 className="text-base">
            {school.frl ? school.frl : "N/A"}% Free and Reduced Lunch
          </h3>
        </div>
        <div className="mb-2 flex flex-row items-center">
          <img
            src="icons/language-icon.png"
            alt="language icon"
            className="mr-2 max-h-[30px] max-w-[30px]"
          />
          <h3 className="text-base">
            {school.ell ? school.ell : "N/A"}% English Language Learners
          </h3>
        </div>
        <p>{school.description}</p>
      </div>
    </div>
  );
};

export default SchoolCard;

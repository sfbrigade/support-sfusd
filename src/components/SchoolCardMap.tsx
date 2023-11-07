import React from "react";

interface School {
  name: string;
  lat?: number;
  lng?: number;
  description?: string;
  img?: string;
}

interface SchoolCardProps {
  school: School;
}

const SchoolCard: React.FC<SchoolCardProps> = ({ school }) => {
  return (
    <div className="flex flex-col items-center justify-center p-4 bg-white border border-gray-300 rounded-lg max-w-[400px] max-h-[400px]">
      <img
        src={school.img}
        alt={school.name}
        className="w-full h-64 object-cover rounded-lg mb-4"
      />
      <h3 className="text-2xl font-bold mb-2">{school.name}</h3>
      <p>{school.description}</p>
    </div>
  );
};

export default SchoolCard;

import React from "react";
import { School } from "@/types/school";

interface SchoolCardProps {
  school: School;
}

const MapViewSchoolCard: React.FC<SchoolCardProps> = ({ school }) => {
  return(
    <div className="flex max-w-[400px] flex-col items-center justify-center rounded-[16px] border border-gray-300 bg-white">
      <img
        src={school.img}
        alt={school.name}
        className="mb-4 h-40 w-full rounded-[16px] object-cover"
      />
    </div>
  )
}

export default MapViewSchoolCard;
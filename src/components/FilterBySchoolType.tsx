import React from "react";
import { SchoolType } from "@prisma/client";

interface FilterBySchoolTypeProps {
  selectedSchoolTypes: SchoolType[];
  setSelectedSchoolTypes: React.Dispatch<React.SetStateAction<SchoolType[]>>;
  handleSchoolTypeSelection: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function FilterBySchoolType({
  selectedSchoolTypes,
  setSelectedSchoolTypes,
  handleSchoolTypeSelection,
}: FilterBySchoolTypeProps) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:gap-6">
      <div className="flex justify-between items-center">
        <label htmlFor="all">Show All</label>
        <input
          type="checkbox"
          id="all"
          name="all"
          value="all"
          onChange={() => setSelectedSchoolTypes([])}
          checked={selectedSchoolTypes.length === 0}
          className="accent-[#3A86FF]"
        />
      </div>
      <div className="flex justify-between items-center">
        <label htmlFor="elementary">Elementary</label>
        <input
          type="checkbox"
          id="elementary"
          name="elementary"
          value={SchoolType.elementary}
          onChange={handleSchoolTypeSelection}
          checked={selectedSchoolTypes.includes(SchoolType.elementary)}
          className="accent-[#3A86FF]"
        />
      </div>
      <div className="flex justify-between items-center">
        <label htmlFor="middle">Middle</label>
        <input
          type="checkbox"
          id="middle"
          name="middle"
          value={SchoolType.middle}
          onChange={handleSchoolTypeSelection}
          checked={selectedSchoolTypes.includes(SchoolType.middle)}
          className="accent-[#3A86FF]"
        />
      </div>
      <div className="flex justify-between items-center">
        <label htmlFor="high">High</label>
        <input
          type="checkbox"
          id="high"
          name="high"
          value={SchoolType.high}
          onChange={handleSchoolTypeSelection}
          checked={selectedSchoolTypes.includes(SchoolType.high)}
          className="accent-[#3A86FF]"
        />
      </div>
    </div>
  );
}
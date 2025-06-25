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
    <div className="flex justify-center gap-4">
      <div
        className={`flex justify-center gap-1 rounded-md p-1  ${selectedSchoolTypes.length === 0 ? "bg-[#D7F1FF]" : ""}`}
      >
        <label>Show All</label>
        <input
          type="checkbox"
          id="all"
          name="all"
          value="all"
          onChange={() => setSelectedSchoolTypes([])}
          checked={selectedSchoolTypes.length === 0}
          className="border-black bg-transparent "
        />
      </div>
      <div
        className={`flex justify-center gap-1 rounded-md p-1 ${selectedSchoolTypes.includes(SchoolType.elementary) ? "bg-[#D7F1FF]" : ""}`}
      >
        <label>Elementary</label>
        <input
          type="checkbox"
          id="elementary"
          name="elementary"
          value={SchoolType.elementary}
          onChange={handleSchoolTypeSelection}
          checked={selectedSchoolTypes.includes(SchoolType.elementary)}
          className="border-black bg-transparent "
        />
      </div>
      <div
        className={`flex justify-center gap-1 rounded-md p-1 ${selectedSchoolTypes.includes(SchoolType.middle) ? "bg-[#D7F1FF]" : ""}`}
      >
        <label>Middle</label>
        <input
          type="checkbox"
          id="middle"
          name="middle"
          value={SchoolType.middle}
          onChange={handleSchoolTypeSelection}
          checked={selectedSchoolTypes.includes(SchoolType.middle)}
          className="border-black bg-transparent "
        />
      </div>
      <div
        className={`flex justify-center gap-1 rounded-md p-1 ${selectedSchoolTypes.includes(SchoolType.high) ? "bg-[#D7F1FF]" : ""}`}
      >
        <label>High</label>
        <input
          type="checkbox"
          id="high"
          name="high"
          value={SchoolType.high}
          onChange={handleSchoolTypeSelection}
          checked={selectedSchoolTypes.includes(SchoolType.high)}
          className="border-black bg-transparent"
        />
      </div>
    </div>
  );
}

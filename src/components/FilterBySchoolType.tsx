import React from "react";
import { SchoolType } from "@prisma/client";

interface FilterBySchoolTypeProps {
  selectedSchoolTypes: SchoolType[];
  setSelectedSchoolTypes: React.Dispatch<React.SetStateAction<SchoolType[]>>;
  handleSchoolTypeSelection: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const schoolTypes = [
  { label: "Elementary", value: SchoolType.elementary},
  { label: "Middle", value: SchoolType.middle},
  { label: "High", value: SchoolType.high}
]

export default function FilterBySchoolType({
  selectedSchoolTypes,
  setSelectedSchoolTypes,
  handleSchoolTypeSelection,
}: FilterBySchoolTypeProps) {
  return (
    <div className="flex flex-col gap-4 md:flex-row">
      <div className="flex justify-between items-center gap-2">
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

      {schoolTypes.map(({ label, value }) => (
        <div key={value} className="flex justify-between items-center gap-2">
          <label htmlFor={value}>{label}</label>
          <input
            type="checkbox"
            id={value}
            name={value}
            value={value}
            onChange={handleSchoolTypeSelection}
            checked={selectedSchoolTypes.includes(value)}
            className="accent-[#3A86FF]"
          />
        </div>
      ))}
    </div>
  );
}
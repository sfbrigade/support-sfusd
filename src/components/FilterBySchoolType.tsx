import React from "react";
import Image from "next/image";
import { SchoolType } from "@prisma/client";

interface FilterBySchoolTypeProps {
  selectedSchoolTypes: SchoolType[];
  setSelectedSchoolTypes: React.Dispatch<React.SetStateAction<SchoolType[]>>;
  handleSchoolTypeSelection: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handlePriorityChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  priorityFilter: boolean;
  setPriorityFilter: React.Dispatch<React.SetStateAction<boolean>>;
}

const schoolTypes = [
  { label: "Elementary", value: SchoolType.elementary },
  { label: "Middle", value: SchoolType.middle },
  { label: "High", value: SchoolType.high },
];

export default function FilterBySchoolType({
  selectedSchoolTypes,
  setSelectedSchoolTypes,
  handleSchoolTypeSelection,
  setModalIsOpen,
  handlePriorityChange,
  priorityFilter,
  setPriorityFilter,
}: FilterBySchoolTypeProps) {
  return (
    <div className="flex flex-col flex-wrap justify-between gap-4 md:mt-4 md:flex-row">
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="flex items-center justify-between gap-2">
          <label htmlFor="all">Show All</label>
          <input
            type="checkbox"
            id="all"
            name="all"
            value="all"
            onChange={() => { setSelectedSchoolTypes([]); setPriorityFilter(false); }}
            checked={selectedSchoolTypes.length === 0 && !priorityFilter}
            className="accent-[#3A86FF]"
          />
        </div>

        {schoolTypes.map(({ label, value }) => (
          <div key={value} className="flex items-center justify-between gap-2">
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

      {/* Mobile Priority Filter - stacked below */}
      <div className="mt-4 flex flex-col md:hidden">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center">
            <Image
              alt="High priority icon"
              src="/circle_priority.svg"
              width={19}
              height={20}
              onClick={(e) => {
                e.stopPropagation();
                setModalIsOpen(true);
              }}
            />
            <label
              htmlFor="priority"
              className="text-base font-normal md:text-sm"
            >
              Priority
            </label>
          </div>
          <div>
            <input
              type="checkbox"
              id="priority"
              name="priority"
              onChange={handlePriorityChange}
              checked={priorityFilter}
              className="accent-orange-500"
            />
          </div>
        </div>
      </div>

      <div className="hidden items-center gap-2 md:flex">
        <Image
          alt="High priority icon"
          src="/circle_priority.svg"
          width={19}
          height={20}
          onClick={(e) => {
            e.stopPropagation();
            setModalIsOpen(true);
          }}
        />
        <label htmlFor="priority" className="text-sm">
          Priority
        </label>
        <input
          type="checkbox"
          id="priority"
          name="priority"
          onChange={handlePriorityChange}
          checked={priorityFilter}
          className="mr-4 border-black bg-transparent accent-orange-500"
        />
      </div>
    </div>
  );
}

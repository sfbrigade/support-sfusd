import React from "react";
import Image from "next/image";
import { SchoolType } from "@prisma/client";

interface FilterBySchoolTypeProps {
  selectedSchoolTypes: SchoolType[];
  setSelectedSchoolTypes: React.Dispatch<React.SetStateAction<SchoolType[]>>;
  handleSchoolTypeSelection: (e: React.ChangeEvent<HTMLInputElement>) => void;
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
  handlePriorityChange,
  priorityFilter,
  setPriorityFilter,
}: FilterBySchoolTypeProps) {

  const [showDesktopTooltip, setShowDesktopTooltip] = React.useState(false);
  const desktopCheckboxRef = React.useRef<HTMLInputElement>(null);

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

      <div 
        className="relative hidden items-center gap-2 md:flex"
        onMouseEnter={() => setShowDesktopTooltip(true)}
        onMouseLeave={() => setShowDesktopTooltip(false)}
      >
        <div
          className="flex cursor-pointer items-center gap-2"
          onClick={() => desktopCheckboxRef.current?.click()}
        >
          <Image
            alt="High priority icon"
            src="/circle_priority.svg"
            width={19}
            height={20}
          />
          <label className="cursor-pointer text-sm">
            Priority
          </label>
          <input
            ref={desktopCheckboxRef}
            type="checkbox"
            id="priority"
            name="priority"
            onChange={handlePriorityChange}
            checked={priorityFilter}
            className="pointer-events-none mr-4 border-black bg-transparent accent-orange-500"
          />
        </div>

        {/* Tooltip */}
        {showDesktopTooltip && (
          <div className="absolute left-0 top-full z-50 bg-white p-2 text-sm shadow-lg">
            <p>
              We are following the {" "}
              <a 
                href="https://sfedfund.org/who-we-serve"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#3A86FF] hover:underline"
                onClick={(e) => e.stopPropagation()}
              >
                SF Ed Fund&apos;s
              </a>{" "}
              definition of priority schools.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

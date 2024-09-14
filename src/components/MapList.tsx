import React, { useEffect, useRef, useState } from "react";
import MapListCard from "./MapListCard";
import { School } from "@/types/school";

type MapListProps = {
  schools: School[];
  setSelectedSchool: (school: School | false | null) => void;
  selectedSchool: School | false | null;
  onModalOpen: () => void;
};

/**
 * MapList: Renders a collection of expandable school cards in the map's list view.
 *
 * Props:
 *   - schools
 *
 * State: none
 *
 * map => MapList => MapListCard
 *
 */
const MapList = ({
  schools,
  setSelectedSchool,
  selectedSchool,
  onModalOpen,
}: MapListProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [expandedSchool, setExpandedSchool] = useState<string | null>(null);

  const handleExpansionComplete = (schoolId: string) => {
    if (containerRef.current) {
      const selectedElement = containerRef.current.querySelector(
        `[id="${schoolId}"]`,
      ) as HTMLElement;

      if (selectedElement) {
        selectedElement.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }
    }
  };

  return (
    <div className="flex h-full flex-col">
      <div
        className="flex h-full flex-col gap-2 overflow-auto max-md:mb-4 md:gap-4"
        ref={containerRef}
      >
        {schools
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((school) => (
            <MapListCard
              key={school.id}
              school={school}
              setSelectedSchool={setSelectedSchool}
              isExpanded={
                selectedSchool ? school.name === selectedSchool.name : false
              }
              onModalOpen={onModalOpen}
              onExpansionComplete={handleExpansionComplete}
            />
          ))}
      </div>
    </div>
  );
};

export default MapList;

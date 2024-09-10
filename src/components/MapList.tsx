import React, { useEffect, useRef } from "react";
import MapListCard from "./MapListCard";
import { School } from "@/types/school";

type MapListProps = {
  schools: School[];
  setSelectedSchool: (school: School | null) => void;
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
  // Create a ref for the container div
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll to selected school when it changes
  useEffect(() => {
    if (selectedSchool && containerRef.current) {
      const index = schools.findIndex(
        (school) => school.name == selectedSchool.name,
      );

      const scrollPosition = index * 88;
      if (window.innerWidth > 768) {
        containerRef.current.scrollTo({
          top: scrollPosition,
          behavior: "smooth",
        });
      } else {
        window.scrollTo({
          top: scrollPosition,
          behavior: "smooth",
        });
      }
    }
  }, [selectedSchool, schools]);

  return (
    <div className="flex h-full flex-col">
      <div
        className="flex h-full flex-col gap-2 overflow-auto max-md:mb-4 md:gap-4"
        ref={containerRef}
      >
        {schools
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((school, index) => (
            <MapListCard
              key={school.name} // @todo: add id to School type so we can use that as key
              school={school}
              setSelectedSchool={setSelectedSchool}
              isExpanded={
                selectedSchool ? school.name === selectedSchool.name : false
              }
              onModalOpen={onModalOpen}
            />
          ))}
      </div>
    </div>
  );
};

export default MapList;

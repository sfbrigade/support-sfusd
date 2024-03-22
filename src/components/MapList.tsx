import React, { useEffect, useRef } from "react";
import MapListCard from "./MapListCard";
import { School } from "@/pages/map";

type MapListProps = {
  schools: School[];
  setSelectedSchool: (school: School) => void;
  selectedSchool: School | null;
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
}: MapListProps) => {
  // Create a ref for the container div
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll to selected school when it changes
  useEffect(() => {
    if (selectedSchool && containerRef.current) {
      const index = schools.findIndex((school) => school === selectedSchool);
      const firstChild = containerRef.current.children[0] as HTMLElement | null;
      if (firstChild) {
        const scrollPosition = index * firstChild.offsetHeight;
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
    }
  }, [selectedSchool]);

  return (
    <div className="flex h-full flex-col">
      <div
        className="flex h-full flex-col gap-2 overflow-auto md:gap-4"
        ref={containerRef}
      >
        {schools.map((school, index) => (
          <MapListCard
            key={index}
            school={school}
            setSelectedSchool={setSelectedSchool}
            isExpanded={school == selectedSchool}
          />
        ))}
      </div>
    </div>
  );
};

export default MapList;

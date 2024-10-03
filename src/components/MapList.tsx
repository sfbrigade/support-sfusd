import React from "react";
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
  return (
    <div className="flex h-full flex-col">
      <div className="flex h-full flex-col gap-2 overflow-auto max-md:mb-4 md:gap-4">
        {schools
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((school) => (
            <MapListCard
              key={school.id}
              school={school}
              setSelectedSchool={setSelectedSchool}
              isExpanded={
                selectedSchool ? school.id === selectedSchool.id : false
              }
              onModalOpen={onModalOpen}
            />
          ))}
      </div>
    </div>
  );
};

export default MapList;

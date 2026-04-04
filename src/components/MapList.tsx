"use client";

import React from "react";
import MapListCard from "./MapListCard";
import { SchoolMapPin } from "@/types/school";

type MapListProps = {
  schools: SchoolMapPin[];
  setSelectedSchool: (school: SchoolMapPin | null) => void;
  selectedSchool: SchoolMapPin | null;
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
    <div className="flex flex-col overflow-auto">
      <div className="flex flex-col overflow-auto gap-2 max-md:mb-4 md:gap-4">
        {schools
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((school) => (
            <MapListCard
              key={school.stub}
              school={school}
              setSelectedSchool={setSelectedSchool}
              isExpanded={
                selectedSchool ? school.stub === selectedSchool.stub : false
              }
              onModalOpen={onModalOpen}
            />
          ))}
      </div>
    </div>
  );
};

export default MapList;

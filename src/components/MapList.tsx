import React from "react";
import MapListCard from "./MapListCard";
import schools from "../data/schools";
import { School } from "@/pages/map";

type MapListProps = {
  setSelectedSchool: (school: School) => void;
};

/**
 * MapList: Renders a collection of expandable school cards in the map's list view.
 *
 * Props:
 *   - setSelectedSchool
 *
 * State: none
 *
 * map => MapList => MapListCard
 *
 */
const MapList = ({ setSelectedSchool }: MapListProps) => {
  /* NOTE: Will need to create expandable card functionality in future version.
  Currently the MapListCard is the "expanded" design. */
  return (
    <div className="flex h-full flex-col p-4">
      <div className="mb-4 flex items-center justify-start">
        <h1 className="text-2xl font-bold">List of Schools</h1>
      </div>
      <div className="flex h-full flex-col gap-4 overflow-auto">
        {schools.map((school, index) => (
          <MapListCard
            key={index}
            img={school.img}
            name={school.name}
            district={school.district}
            students={school.students}
            frl={school.frl}
            ell={school.ell}
          />
        ))}
      </div>
    </div>
  );
};

export default MapList;

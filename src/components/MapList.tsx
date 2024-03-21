import React from "react";
import MapListCard from "./MapListCard";
import { School } from "@/pages/map";

type MapListProps = {
  schools: School[];
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
const MapList = ({ schools }: MapListProps) => {
  return (
    <div className="flex h-full flex-col p-4">
      <div className="mb-4 flex items-center justify-start max-md:hidden">
        <h1 className="text-2xl font-bold">List of Schools</h1>
      </div>
      <div className="flex h-full flex-col gap-2 overflow-auto md:gap-4">
        {schools.map((school, index) => (
          <MapListCard key={index} {...school} />
        ))}
      </div>
    </div>
  );
};

export default MapList;

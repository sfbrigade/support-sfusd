import React, { useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import SchoolCard from "../components/mapPageComponents/SchoolCardMap";
import MapList from "@/components/mapPageComponents/MapList";
import MapboxMap from "@/components/mapPageComponents/MapboxMap";
import ToggleButton from "@/components/mapPageComponents/ToggleButton";

export interface School {
  name: string;
  lat?: number;
  lng?: number;
  description?: string;
  img?: string;
}

const Map = () => {
  const [selectedSchool, setSelectedSchool] = useState<School | null>(null);
  const [isMap, setIsMap] = useState(true);

  const setToggle = () => {
    setIsMap(!isMap);
  };
  return (
    <div className="relative flex h-[calc(100vh-80px)] w-full flex-col">
      <div className="mt-16 flex justify-center">
        <ToggleButton isMapView={isMap} toggleView={setToggle} />
      </div>
      <div className="flex h-full flex-col md:flex-row">
        <div className="flex h-1/6 w-full items-center justify-center md:h-full md:w-1/2">
          {selectedSchool && (
            <div className="hidden md:block">
              {" "}
              {/* Hide SchoolCard on screens smaller than md */}
              <SchoolCard school={selectedSchool} />
            </div>
          )}
          {!selectedSchool && (
            <div className="flex flex-col items-center justify-center">
              <h1 className="mb-4 text-4xl font-bold">Select a School</h1>
              <p className="mb-4 text-lg">
                Click on a {isMap ? "school" : "marker "} to view more
                information.
              </p>
            </div>
          )}
        </div>
        {isMap ? (
          <MapboxMap setSelectedSchool={setSelectedSchool} />
        ) : (
          <MapList setSelectedSchool={setSelectedSchool} />
        )}
      </div>
    </div>
  );
};

export default Map;

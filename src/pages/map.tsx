import React, { useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import SchoolCard from "../components/SchoolCardMap";
import MapList from "@/components/MapList";
import MapboxMap from "@/components/MapboxMap";
import ToggleButton from "@/components/ToggleButton";

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
    <div
      className={
        "relative flex w-full flex-col gap-4 overflow-auto p-2 md:h-[calc(100vh-64px)] md:p-8 " +
        (isMap && " h-[calc(100vh-64px)]")
      }
    >
      <div className="flex justify-end">
        <ToggleButton isMapView={isMap} toggleView={setToggle} />
      </div>
      <div className="flex h-[90%] grid-cols-10 flex-col items-center gap-2 md:grid">
        <div className="col-span-4 flex justify-center">
          {isMap ? (
            <div>
              {selectedSchool && (
                <SchoolCard school={selectedSchool} />
              )}
              {!selectedSchool && (
                <div className="align-center flex flex-col items-center md:gap-4">
                  <h1 className="text-2xl font-bold md:text-4xl">
                    Select a School
                  </h1>
                  <p className="md:text-lg">
                    Click on a marker to view more information.
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="align-center flex flex-col items-center md:gap-4">
              <h1 className="text-2xl font-bold md:text-4xl">
                Select a School
              </h1>
              <p className="md:text-lg">
                Click on a school to view more information.
              </p>
            </div>
          )}
        </div>
        <div className="h-full w-full overflow-auto md:col-span-6">
          {isMap ? (
            <MapboxMap setSelectedSchool={setSelectedSchool} />
          ) : (
            <MapList setSelectedSchool={setSelectedSchool} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Map;

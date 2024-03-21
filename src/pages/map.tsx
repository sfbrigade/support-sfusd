import React, { useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import { School } from "@/types/school";
import SchoolCard from "../components/SchoolCardMap";
import MapList from "@/components/MapList";
import MapListCard from "@/components/MapListCard";
import MapboxMap from "@/components/MapboxMap";
import ToggleButton from "@/components/ToggleButton";
import { GetStaticProps } from "next";
import prisma from "@/lib/prisma";

export const getStaticProps: GetStaticProps = async () => {
  const schools = await prisma.schools.findMany()
  return {props: {schools}}
}

type Props = {
  schools: School[]
}

const Map: React.FC<Props> = (props) => {

  const [selectedSchool, setSelectedSchool] = useState<School | null>(null);
  const [isMap, setIsMap] = useState(true);

  const setToggle = () => {
    setIsMap(!isMap);
  };

  return (
    <div
      className={
        "relative mx-auto flex flex-col overflow-auto md:h-[calc(100vh-64px)] md:gap-4 md:p-8 lg:w-4/5 2xl:w-2/3 " +
        (isMap && " h-[calc(100vh-64px)]")
      }
    >
      <div className="flex justify-end max-md:p-4">
        <ToggleButton isMapView={isMap} toggleView={setToggle} />
      </div>
      <div className="flex h-[90%] grid-cols-10 flex-col items-center gap-2 max-md:h-full md:grid">
        <div className="col-span-4 flex justify-center">
          {isMap ? (
            <div>
              {selectedSchool && (
                <div className="hidden md:block">
                  {/* Hide SchoolCard on screens smaller than md */}
                  <SchoolCard school={selectedSchool} />
                </div>
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
        <div className="relative h-full w-full overflow-auto md:col-span-6">
          {isMap ? (
            <MapboxMap setSelectedSchool={setSelectedSchool} schools={props.schools}/>
          ) : (
            <MapList schools={props.schools}/>
          )}
        </div>
      </div>
    </div>
  );
};

export default Map;

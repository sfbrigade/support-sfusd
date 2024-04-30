import React, { useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import { School } from "@/types/school";
import SchoolCard from "../components/SchoolCardMap";
import MapList from "@/components/MapList";
import MapboxMap from "@/components/MapboxMap";
import ToggleButton from "@/components/ToggleButton";
import SearchBar from "@/components/SearchBar";
import { GetStaticProps } from "next";
import prisma from "@/lib/prisma";

interface DropdownItem<ItemType> {
  label: string;
  value: string;
  item: ItemType;
}

export const getStaticProps: GetStaticProps = async () => {
  const schools = await prisma.school.findMany();
  return { props: { schools } };
};

type Props = {
  schools: School[];
};

const Map: React.FC<Props> = (props) => {
  const [selectedSchool, setSelectedSchool] = useState<School | null>(null);
  const [isMap, setIsMap] = useState(true);

  const setToggle = () => {
    setIsMap(!isMap);
  };

  const handleSchoolSearch = async (searchTerm: string) => {
    const response = await fetch(
      `/api/searchSchools?searchTerm=${searchTerm}`,
    ).then((res) => res.json() as Promise<{ schools: School[] }>);

    return response.schools.map((school) => ({
      label: school.name,
      value: school.name,
      item: school,
    }));
  };

  const itemSelect = (selection: DropdownItem<School>) => {
    setSelectedSchool(selection.item);
  };

  return (
    <div
      className={
        "relative mx-auto flex flex-col overflow-auto md:h-[calc(100vh-64px)] md:gap-4 md:p-8 lg:w-4/5 2xl:w-2/3 " +
        (isMap && " h-[calc(100vh-64px)]")
      }
    >
      <div className="flex justify-end space-x-20">
        <SearchBar onItemSelect={itemSelect} onSearch={handleSchoolSearch} />

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
            <MapboxMap
              setSelectedSchool={setSelectedSchool}
              schools={props.schools}
            />
          ) : (
            <MapList schools={props.schools} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Map;

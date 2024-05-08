import React, { useEffect, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import { School } from "@/types/school";
import SchoolCard from "../components/SchoolCardMap";
import MapList from "@/components/MapList";
import MapboxMap from "@/components/MapboxMap";
import ToggleButton from "@/components/ToggleButton";
import SearchBar from "@/components/SearchBar";
import { GetStaticProps } from "next";
import prisma from "@/lib/prisma";
import Image from "next/image";

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

  useEffect(() => {
    if (isMap && window.innerWidth <= 768) {
      window.scrollTo({
        top: 0,
      });
    }
  }, [isMap]);
  return (
    <div id="map" className="bg-[#D7F1FF] --mobile-new-- flex flex-col h-full">
      <div className="top-16 z-10 flex justify-center gap-2 bg-[#D7F1FF] max-md:sticky w-full md:w-auto max-md:flex-col max-md:px-4 max-md:pb-4 md:hidden md:justify-end --mobile-new-- flex grow-0 h-auto">
        <SearchBar
          onItemSelect={function (item: DropdownItem<any>): void {
            throw new Error("Function not implemented.");
          }}
          onSearch={function (
            searchTerm: string,
          ): Promise<DropdownItem<any>[]> {
            throw new Error("Function not implemented.");
          }}
        />
        <ToggleButton isMapView={isMap} toggleView={setToggle} />
      </div>
      <div
        className={
          `mx-auto flex flex-col overflow-auto md:h-[calc(100vh-64px)] md:gap-4 md:p-8 lg:w-4/5 2xl:w-2/3 ${(isMap && " h-[calc(100vh-64px)]")} --mobile-new-- grow-1 w-full h-full`
        }
      >
        {/* TODO: for above, if map, use the calculation for desktop and the other stuff as mobile */}
        <div className="flex h-4/6 md:h-full grid-cols-10 items-center gap-4 md:grid flex-row-reverse md:flex-col --mobile-new-- w-full height-full">
          {/* TODO: only use hidden for mobile web view */}
          <div className={ `col-span-4 p-4 md:p-0 m-4 md:m-0 ${ isMap ? 'flex' : 'hidden' } md:flex h-fit md:w-full md:h-full absolute md:static bottom-0 z-50 left-0 right-0 items-center justify-center rounded-2xl bg-white --mobile-new-- hidden` }>
            {isMap ? (
              selectedSchool ? (
                <div className="hidden md:block">
                  {/* Hide SchoolCard on screens smaller than md */}
                  <SchoolCard school={selectedSchool} />
                </div>
              ) : (
                <div className="gap flex w-3/4 flex-col items-center gap-12">
                  <Image
                    src="/map-school-logo.png"
                    alt="Homepage Background"
                    className="w-1/2 hidden md:inline-block"
                    width={200}
                    height={200}
                  />
                  <div className="align-center flex flex-col items-center gap-4 text-center">
                    <h1 className="text-2xl font-medium">Select a School</h1>
                    <p className="md:text-lg">
                      All schools are currently looking for volunteers, click on
                      the school closest to you to learn more.
                    </p>
                  </div>
                </div>
              )
            ) : (
              <div className="gap flex w-3/4 flex-col items-center gap-12">
                <Image
                  src="/map-school-logo.png"
                  alt="Homepage Background"
                  className="w-1/2"
                  width={200}
                  height={200}
                />
                <div className="align-center flex flex-col items-center gap-4 text-center">
                  <h1 className="text-2xl font-medium">Select a School</h1>
                  <p className="md:text-lg">
                    All schools are currently looking for volunteers, click on
                    the school closest to you to learn more.
                  </p>
                </div>
              </div>
            )}
          </div>
          <div className="relative flex h-full w-full flex-col gap-2 overflow-auto md:col-span-6 md:gap-4 --mobile-new-- w-full">
            <div className="flex justify-center gap-2 bg-[#D7F1FF] max-md:hidden md:justify-end">
              <SearchBar
                onItemSelect={function (item: DropdownItem<any>): void {
                  throw new Error("Function not implemented.");
                }}
                onSearch={function (
                  searchTerm: string,
                ): Promise<DropdownItem<any>[]> {
                  throw new Error("Function not implemented.");
                }}
              />
              <ToggleButton isMapView={isMap} toggleView={setToggle} />
            </div>
            <div className="h-full w-full overflow-auto ">
              {isMap ? (
                <MapboxMap
                  setSelectedSchool={setSelectedSchool}
                  selectedSchool={selectedSchool}
                  schools={props.schools}
                />
              ) : (
                <MapList
                  setSelectedSchool={setSelectedSchool}
                  selectedSchool={selectedSchool}
                  schools={props.schools}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Map;

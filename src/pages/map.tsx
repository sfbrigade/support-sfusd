import React, { useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import SchoolCard from "../components/SchoolCardMap";
import MapList from "@/components/MapList";
import MapListCard from "@/components/MapListCard";
import MapboxMap from "@/components/MapboxMap";
import ToggleButton from "@/components/ToggleButton";
import { GetStaticProps } from "next";
import prisma from "@/lib/prisma";
import Image from "next/image";

export interface School {
  name: string;
  latitude: string;
  longitude: string;
  description?: string;
  img: string;
  students: string;
  district: string;
  frl: string;
  ell: string;
}

export const getStaticProps: GetStaticProps = async () => {
  const schools = await prisma.schools.findMany();
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

  return (
    <div className="bg-[#D7F1FF]">
      <div
        className={
          "relative mx-auto flex flex-col overflow-auto pt-[64px] md:h-screen md:w-5/6 md:gap-4 md:pb-8 lg:w-4/5 2xl:w-2/3 " +
          (isMap ? " h-screen" : "max-md:px-2 max-md:pb-2")
        }
      >
        <div className="flex h-full grid-cols-10 flex-col items-center gap-4 max-md:h-full md:grid">
          <div className="flex h-full w-full flex-col gap-2 overflow-auto md:col-span-6 md:gap-4">
            <div className="flex justify-end">
              <ToggleButton isMapView={isMap} toggleView={setToggle} />
            </div>
            <div className="h-full w-full overflow-auto">
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
          <div className="col-span-4 flex h-full items-center justify-center rounded-2xl bg-white max-md:hidden">
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
        </div>
      </div>
    </div>
  );
};

export default Map;

import React from "react";
import MapListCard from "./MapListCard";
import schools from "../../data/schools";

const MapList = () => {
  return (
    <div className="block md:hidden flex flex-col p-4 mt-24">
      <div className="flex justify-start items-center mb-4">
        <h1 className="text-2xl font-bold">List of Schools</h1>
      </div>
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
  );
};

export default MapList;

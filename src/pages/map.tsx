import React, { useState } from "react";
import MapComponent from "../components/Map";
import MapList from "../components/MapList/MapList";
import Navbar from "../components/NavBar/NavBar";
import { MdMap, MdViewList } from "react-icons/md";

const MapView = () => {
  const [isMapView, setIsMapView] = useState(true);

  const toggleView = () => {
    setIsMapView(!isMapView);
  };

  return (
    <div className="relative h-screen flex flex-col">
      <Navbar />
      <div
        className={`flex-1 ${isMapView ? "overflow-hidden" : "overflow-auto"}`}
      >
        {isMapView ? <MapComponent /> : <MapList />}
      </div>
      <div
        onClick={toggleView}
        className={`fixed right-4 p-1 rounded-full bg-black flex items-center md:hidden top-24 ${
          isMapView ? "" : "md:flex md:items-end md:justify-end md:bottom-4"
        }`}
      >
        <div
          className={`flex items-center justify-center w-8 h-8 ${
            isMapView ? "bg-white" : ""
          } rounded-full`}
        >
          <MdMap className="text-white text-lg" />
        </div>
        <div
          className={`flex items-center justify-center w-8 h-8 ${
            isMapView ? "" : "bg-white"
          } rounded-full`}
        >
          <MdViewList className="text-white text-lg" />
        </div>
      </div>
    </div>
  );
};

export default MapView;

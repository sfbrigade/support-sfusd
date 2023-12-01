import React, { useState } from "react";
import MapComponent from "../components/Map";
import MapList from "../components/MapList/MapList";
import Navbar from "../components/NavBar/NavBar";
import ToggleButton from "../components/ToggleButton/ToggleButton";

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
      <ToggleButton isMapView={isMapView} toggleView={toggleView}  />
    </div>
  );
};

export default MapView;

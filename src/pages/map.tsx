import React, { useEffect, useRef, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";
import schools from "../data/schools";
import SchoolCard from "../components/SchoolCardMap";

interface School {
  name: string;
  lat?: number;
  lng?: number;
  description?: string;
  img?: string;
}

const Map = () => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const [selectedSchool, setSelectedSchool] = useState<School | null>(null);

  useEffect(() => {
    const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
    if (!accessToken || !mapContainer.current) {
      console.error("Mapbox access token or container is not set!");
      return;
    }

    mapboxgl.accessToken = accessToken;
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/hamiltontruong/clomceri8002i01rbfzt1hrdm",
      center: [-122.437, 37.75],
      zoom: 11,
    });

    mapRef.current = map;

    map.on("load", () => {
      schools.forEach((school) => {
        // create an HTML element for each school
        const el = document.createElement("div");
        el.className = "marker";
        el.addEventListener("click", () => setSelectedSchool(school));

        if (school.lat && school.lng) {
          new mapboxgl.Marker(el)
            .setLngLat([school.lng, school.lat])
            .setPopup(
              new mapboxgl.Popup({ offset: 25 }).setHTML(
                `<h3>${school.name}</h3>`
              )
            )
            .addTo(map);
        } else {
          console.error(`Coordinates are missing for ${school.name}`);
        }
      });
    });
  }, []);

  return (
    <div className="flex flex-row relative w-full h-[calc(100vh-64px)] px-4">
      <div className="w-1/2 h-full flex justify-center items-center">
        {selectedSchool ? (
          <SchoolCard school={selectedSchool} />
        ) : (
          <div className="flex flex-col justify-center items-center h-full">
            <h1 className="text-4xl font-bold mb-4">Select a School</h1>
            <p className="text-lg mb-4">
              Click on a marker to view more information.
            </p>
          </div>
        )}
      </div>
      <div
        ref={mapContainer}
        className="relative w-1/2 flex justify-center items-center max-h-[600px] rounded-xl border-2 border-gray-300"
      />
    </div>
  );
};

export default Map;

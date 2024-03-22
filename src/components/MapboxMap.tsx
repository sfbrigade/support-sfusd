import { School } from "@/pages/map";
import mapboxgl from "mapbox-gl";
import { useEffect, useRef } from "react";

type MapboxMapProps = {
  setSelectedSchool: (school: School) => void;
  schools: School[];
  selectedSchool: School | null;
};

const MapboxMap = ({
  setSelectedSchool,
  schools,
  selectedSchool,
}: MapboxMapProps) => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  useEffect(() => {
    console.log(selectedSchool);
    const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
    if (!accessToken || !mapContainer.current) {
      console.error("Mapbox access token or container is not set!");
      return;
    }
    if (mapRef.current) return;

    mapboxgl.accessToken = accessToken;
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/hamiltontruong/clomceri8002i01rbfzt1hrdm",
      center: [-122.437, 37.75],
      zoom: 11, // Start with more zoomed-out view but not too far
      minZoom: 10.5, // Allow users to zoom out more
      maxZoom: 15, // Increase max zoom to allow closer inspection
      maxBounds: [
        [-122.6, 37.65], // Southwest coordinates
        [-122.25, 37.85], // Northeast coordinates
      ],
    });

    mapRef.current = map;

    map.on("load", () => {
      schools.forEach((school) => {
        // create an HTML element for each school
        const el = document.createElement("div");
        el.className = "marker";
        el.id = school.name;
        el.addEventListener("click", () => setSelectedSchool(school));
        if (school.latitude && school.longitude) {
          const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
            `<h3>${school.name}</h3>`,
          );

          const secondpopup = new mapboxgl.Popup({ offset: 25 }).setHTML(
            `<h3>${school.name}</h3>`,
          );

          el.addEventListener("mouseenter", () => {
            popup.addTo(map);
          });

          el.addEventListener("mouseleave", () => {
            console.log(selectedSchool);

            popup.remove();
          });

          const marker = new mapboxgl.Marker(el)
            .setLngLat([Number(school.longitude), Number(school.latitude)])
            .setPopup(popup)
            .addTo(map);
        } else {
          console.error(`Coordinates are missing for ${school.name}`);
        }
      });

      // Golden Gate Bridge Marker
      const goldenGateEl = document.createElement("div");
      goldenGateEl.className = "golden-gate-marker";
      new mapboxgl.Marker(goldenGateEl)
        .setLngLat([-122.4783, 37.8199])
        .addTo(map);

      // Bay Bridge Marker
      const bayBridgeEl = document.createElement("div");
      bayBridgeEl.className = "bay-bridge-marker";
      new mapboxgl.Marker(bayBridgeEl)
        .setLngLat([-122.3778, 37.7983])
        .addTo(map);
    });
  }, []);

  useEffect(() => {
    const markers = document.getElementsByClassName("marker");
    // Array.from(markers).forEach((marker) => {
    //   const new_marker = marker.cloneNode(true);
    //   marker.parentNode?.replaceChild(new_marker, marker);
    // });
  }, [selectedSchool]);

  return (
    <>
      <div className="flex h-full w-full items-center justify-center">
        <div
          ref={mapContainer}
          className="h-full w-full rounded-t-3xl md:rounded-3xl md:border-2 md:border-gray-300"
        />
      </div>
    </>
  );
};

export default MapboxMap;

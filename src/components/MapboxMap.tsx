import { School } from "@/pages/map";
import mapboxgl from "mapbox-gl";
import { useEffect, useRef } from "react";

type MapboxMapProps = {
  setSelectedSchool: (school: School) => void;
  schools: School[]
};

const MapboxMap = ({ setSelectedSchool, schools }: MapboxMapProps) => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  useEffect(() => {
    const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
    if (!accessToken || !mapContainer.current) {
      console.error("Mapbox access token or container is not set!");
      return;
    }
    // prevents rerender
    // if (mapRef.current) return

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
        el.addEventListener("click", () => setSelectedSchool(school));
        if (school.latitude && school.longitude) {
          new mapboxgl.Marker(el)
            .setLngLat([Number(school.longitude), Number(school.latitude)])
            .setPopup(
              new mapboxgl.Popup({ offset: 25 }).setHTML(
                `<h3>${school.name}</h3>`,
              ),
            )
            .addTo(map);
        } else {
          console.error(`Coordinates are missing for ${school.name}`);
        }
      });

      const geolocate = new mapboxgl.GeolocateControl({
        positionOptions: {
            enableHighAccuracy: true
        },
        trackUserLocation: true,
        // fitBoundsOptions: {maxZoom: 0}
      })
      map.addControl(geolocate);
      geolocate.on('outofmaxbounds', () => {
        console.log('An outofmaxbounds event has occurred.');
      })
    

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
  });
  return (
    <>
      <div className="flex h-full w-full items-center justify-center">
        <div
          ref={mapContainer}
          className="h-full w-full rounded-t-3xl border-2 border-gray-300 md:rounded-3xl"
        />
      </div>
    </>
  );
};

export default MapboxMap;

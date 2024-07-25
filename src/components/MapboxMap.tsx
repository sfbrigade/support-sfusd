import { School } from "@/types/school";
import mapboxgl from "mapbox-gl";
import { useEffect, useRef } from "react";

type MapboxMapProps = {
  setSelectedSchool: (school: School | false | null) => void;
  selectedSchool: School | false | null;
  schools: School[];
};

const MapboxMap = ({
  setSelectedSchool,
  selectedSchool,
  schools,
}: MapboxMapProps) => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  useEffect(() => {
    const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
    if (!accessToken || !mapContainer.current) {
      console.error("Mapbox access token or container is not set!");
      return;
    }
    if (mapRef.current) return;

    mapboxgl.accessToken = accessToken;
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/beeseewhy/cltjd5mzb011601ra4fnl3o4b",
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
    map.on("click", () => {
      setSelectedSchool(false);
    });
    map.on("load", () => {
      schools.sort((a, b) => {
        const aLat = a.latitude;
        const aLong = a.longitude;
        const bLat = b.latitude;
        const bLong = b.longitude;

        // NOTE: comparison only works for US
        if (aLat > bLat || (aLat === bLat && aLong < bLong)) return -1;
        else if (aLat === bLat && aLong === bLong) return 0;
        else return 1;
      });
      schools.forEach((school, index) => {
        // create an HTML element for each school
        const el = document.createElement("button");
        el.className = "marker";
        el.tabIndex = index;
        el.addEventListener("click", (e) => {
          setSelectedSchool(school);
          e.preventDefault();
          e.stopPropagation();
        });
        if (school.latitude && school.longitude) {
          const popup = new mapboxgl.Popup({
            offset: 25,
            closeButton: false,
            className: "map-popup",
          }).setHTML(`<h3>${school.name}</h3>`);
          const schoolMarker = new mapboxgl.Marker(el)
            .setLngLat([Number(school.longitude), Number(school.latitude)])
            .setPopup(popup)
            .addTo(map);
          schoolMarker.getElement().addEventListener("click", () => {
            var marker_array =
              document.getElementsByClassName("marker-selected");
            var i;
            for (i = 0; i < marker_array.length; i++) {
              // TODO: refactor in case we add more classes
              marker_array[i].className =
                "marker mapboxgl-marker mapboxgl-marker-anchor-center";
            }
            // TODO: refactor in case we add more classes
            el.className =
              "marker-selected mapboxgl-marker mapboxgl-marker-anchor-center";
            el.focus();
          });
          el.addEventListener("mouseover", () => {
            if (!schoolMarker.getPopup().isOpen()) {
              schoolMarker.togglePopup();
            }
          });
          el.addEventListener("mouseout", () => {
            if (schoolMarker.getPopup().isOpen()) {
              schoolMarker.togglePopup();
            }
          });
          el.addEventListener("blur", () => {
            if (schoolMarker.getPopup().isOpen()) {
              schoolMarker.togglePopup();
            }
          });
        } else {
          console.error(`Coordinates are missing for ${school.name}`);
        }
      });

      const geolocate = new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        showUserLocation: true,
      });
      map.addControl(geolocate);

      // disables geolocation icon if user is out of bounds
      navigator.geolocation.getCurrentPosition((position) => {
        const bounds = map.getBounds();
        const { _ne: ne, _sw: sw } = bounds;
        const lng = position.coords.longitude;
        const lat = position.coords.latitude;
        let isInMapBounds =
          lng >= sw.lng && lng <= ne.lng && lat >= sw.lat && lat <= ne.lat;
        if (isInMapBounds === false) {
          map.removeControl(geolocate);
        }
      });

      // Golden Gate Bridge Marker
      const goldenGateEl = document.createElement("button");
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
        <div ref={mapContainer} className="h-full w-full md:rounded-2xl" />
        {/* <div
          ref={mapContainer}
          className="h-full w-full rounded-t-3xl md:rounded-3xl md:border-2 md:border-gray-300"
        /> */}
      </div>
    </>
  );
};

export default MapboxMap;

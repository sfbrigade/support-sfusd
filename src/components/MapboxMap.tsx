import { School } from "@/types/school";
import mapboxgl from "mapbox-gl";
import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { useMapContext } from "@/contexts/MapContext";
import { usePostHog } from "posthog-js/react";
import Supercluster from "supercluster";
import {
  SchoolProperties,
  ClusterProperties,
  MapPoint,
  schoolsToGeoJSON,
  isCluster,
} from "@/lib/clustering";

type MapboxMapProps = {
  setSelectedSchool: (school: School | null) => void;
  selectedSchool: School | false | null;
  schools: School[];
};

const isVisible = (marker: mapboxgl.Marker, map: mapboxgl.Map) => {
  // check if marker within bounds of map
  const lngLat = marker.getLngLat();
  const bounds = map.getBounds();
  const isInsideMap = bounds.contains(lngLat);

  // check if marker is obscured by other elements
  const markerEl = marker.getElement();
  const { top, right, bottom, left } = markerEl.getBoundingClientRect();
  // find center of marker
  const [cX, cY] = [
    left + Math.round(right - left) / 2,
    top + Math.round(bottom - top) / 2,
  ];

  // assume points on top, bottom, right, left edges are within the bounding rect and test what the topmost element is at each point
  const topEls = [
    [cX, top + 1],
    [right - 1, cY],
    [cX, bottom - 1],
    [left + 1, cY],
  ].map(([x, y]) => document.elementFromPoint(x, y));

  // determine if all chosen marker points are visible
  const isOnTop = topEls.reduce((acc, topEl) => {
    return acc && markerEl.isSameNode(topEl);
  }, true);

  return isInsideMap && isOnTop;
};

const MapboxMap = ({ schools }: MapboxMapProps) => {
  const { selectedSchool, setSelectedSchool } = useMapContext();
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<{ [key: string]: mapboxgl.Marker }>({});
  const clusterMarkersRef = useRef<{ [key: string]: mapboxgl.Marker }>({});
  const clusterIndexRef = useRef<Supercluster<
    SchoolProperties,
    ClusterProperties
  > | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const userHasInteracted = useRef(false);
  const posthog = usePostHog();
  const flyToOptions = useMemo(
    () => ({
      speed: 1.2, // speed of animation .. slowing things down a bit.
      curve: 1, // smoothness of animation
      easing: (t: number) => t, // linear easing
    }),
    [],
  );

  const updateMarkerAppearance = (
    marker: mapboxgl.Marker,
    isSelected: boolean,
  ) => {
    const element = marker.getElement();

    if (isSelected) {
      element.className =
        "marker-selected mapboxgl-marker mapboxgl-marker-anchor-center";
    } else {
      element.className =
        "marker mapboxgl-marker mapboxgl-marker-anchor-center";
    }
  };

  // Function to update marker sizes based on zoom level
  // (keeps them from getting too small)
  const updateMarkerSizes = useCallback((zoom: number) => {
    const referenceZoom = 11; // Base zoom level where sizes are 20px and 30px
    const growthFactor = 1.2; // How much to grow the markers per zoom level (1 is no growth)
    const scaleFactor = Math.pow(growthFactor, zoom - referenceZoom); // Inverse scale

    const baseMarkerSize = 24; // Base size for .marker at referenceZoom (in pixels)
    const baseSelectedMarkerSize = 30; // Base size for .marker-selected at referenceZoom (in pixels)
    const baseClusterSize = 36; // Base size for cluster markers

    const markerSize = baseMarkerSize * scaleFactor;
    const selectedMarkerSize = baseSelectedMarkerSize * scaleFactor;
    const clusterSize = baseClusterSize * scaleFactor;

    // Update CSS custom properties
    if (mapContainer.current) {
      mapContainer.current.style.setProperty(
        "--marker-size",
        `${markerSize}px`,
      );
      mapContainer.current.style.setProperty(
        "--marker-selected-size",
        `${selectedMarkerSize}px`,
      );
      mapContainer.current.style.setProperty(
        "--cluster-size",
        `${clusterSize}px`,
      );
    }
  }, []);

  // Update clusters based on current map view
  const updateClusters = useCallback(() => {
    const map = mapRef.current;
    const clusterIndex = clusterIndexRef.current;
    if (!map || !clusterIndex) return;

    const bounds = map.getBounds();
    const zoom = Math.floor(map.getZoom());

    // Get clusters for current bounds
    const clusters = clusterIndex.getClusters(
      [
        bounds.getWest(),
        bounds.getSouth(),
        bounds.getEast(),
        bounds.getNorth(),
      ],
      zoom,
    ) as MapPoint[];

    const visibleSchoolKeys = new Set<string>();
    const visibleClusterKeys = new Set<string>();

    clusters.forEach((point) => {
      if (isCluster(point)) {
        const clusterId = point.properties.cluster_id;
        const key = `cluster-${clusterId}`;
        visibleClusterKeys.add(key);

        // Create cluster marker if it doesn't exist
        if (!clusterMarkersRef.current[key]) {
          const [lng, lat] = point.geometry.coordinates;
          const count = point.properties.point_count;

          const el = document.createElement("button");
          el.className = "cluster-marker";
          el.innerHTML = `${count}`;
          el.ariaLabel = `Cluster of ${count} schools. Click to zoom in.`;

          el.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            userHasInteracted.current = true;

            // Zoom to expand the cluster
            const expansionZoom =
              clusterIndex.getClusterExpansionZoom(clusterId);
            map.flyTo({
              center: [lng, lat],
              zoom: expansionZoom,
              ...flyToOptions,
            });
          });

          const marker = new mapboxgl.Marker(el)
            .setLngLat([lng, lat])
            .addTo(map);

          clusterMarkersRef.current[key] = marker;
        }
      } else {
        // Individual school point
        const school = point.properties.school;
        visibleSchoolKeys.add(school.name);

        // Show existing marker or it will be created in the initial load
        const existingMarker = markersRef.current[school.name];
        if (existingMarker) {
          existingMarker.addTo(map);
        }
      }
    });

    // Hide school markers that are now clustered
    Object.entries(markersRef.current).forEach(([name, marker]) => {
      if (!visibleSchoolKeys.has(name)) {
        marker.remove();
      }
    });

    // Remove cluster markers that are no longer needed
    Object.entries(clusterMarkersRef.current).forEach(([key, marker]) => {
      if (!visibleClusterKeys.has(key)) {
        marker.remove();
        delete clusterMarkersRef.current[key];
      }
    });
  }, [flyToOptions]);

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
      dragRotate: false, // turn off rotation on drag
      touchPitch: false, // turn off pitch change w/touch
      touchZoomRotate: true, // turn on zoom/rotate w/touch
      keyboard: true, // turn on keyboard shortcuts
    });
    map.touchZoomRotate.disableRotation(); // turn off rotate w/touch

    mapRef.current = map;

    // Initialize cluster index
    const geoJson = schoolsToGeoJSON(schools);
    const clusterIndex = new Supercluster<SchoolProperties, ClusterProperties>({
      radius: 50,
      maxZoom: 13,
      minPoints: 2,
    });
    clusterIndex.load(geoJson.features);
    clusterIndexRef.current = clusterIndex;

    map.on("click", () => {
      setSelectedSchool(null);
      userHasInteracted.current = true;
    });

    map.on("load", () => {
      const geolocate = new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        showUserLocation: true,
      });
      map.addControl(geolocate);
      map.addControl(new mapboxgl.NavigationControl({ showCompass: false }));

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

      schools.sort((a, b) => {
        const aLat = a.latitude;
        const aLong = a.longitude;
        const bLat = b.latitude;
        const bLong = b.longitude;

        // NOTE: comparison only works for US and assumes North at top (should be fine so long as reasonable max bounds is specified)
        if (aLat > bLat || (aLat === bLat && aLong < bLong)) return -1;
        else if (aLat === bLat && aLong === bLong) return 0;
        else return 1;
      });

      // Create all school markers (they'll be shown/hidden by updateClusters)
      schools.forEach((school) => {
        // create an HTML element for each school
        const el = document.createElement("button");
        el.className = "marker";
        el.ariaLabel = `School marker: ${school.name}`;
        el.addEventListener("click", (e) => {
          setSelectedSchool(school);
          posthog?.capture?.("map_marker_clicked", { school: school.name });
          userHasInteracted.current = true;
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
            .setPopup(popup);
          // Don't add to map yet - updateClusters will handle visibility
          markersRef.current[school.name] = schoolMarker;
          const elRef = schoolMarker.getElement();
          elRef.addEventListener("click", () => {
            elRef.focus();
            if (!schoolMarker.getPopup().isOpen()) {
              schoolMarker.togglePopup();
            }
          });
          elRef.addEventListener("mouseover", () => {
            if (!schoolMarker.getPopup().isOpen()) {
              schoolMarker.togglePopup();
            }
          });
          elRef.addEventListener("mouseout", () => {
            if (schoolMarker.getPopup().isOpen()) {
              schoolMarker.togglePopup();
            }
          });
          elRef.addEventListener("blur", () => {
            if (schoolMarker.getPopup().isOpen()) {
              schoolMarker.togglePopup();
            }
          });
          elRef.addEventListener("focus", () => {
            // show popup on focus
            if (!schoolMarker.getPopup().isOpen()) {
              schoolMarker.togglePopup();
            }
            const lngLat = schoolMarker.getLngLat();

            // if we have focused on a school that's not visible, recenter (e.g., via filter or keyboard navigation)
            if (!isVisible(schoolMarker, map)) {
              // pan to school marker
              map.flyTo({
                center: [lngLat.lng, lngLat.lat],
                ...flyToOptions,
              });
            }
          });
        } else {
          console.error(`Coordinates are missing for ${school.name}`);
        }
      });

      // Golden Gate Bridge Marker
      const goldenGateEl = document.createElement("div");
      goldenGateEl.className = "golden-gate-marker";
      goldenGateEl.ariaLabel = "Map marker: Golden Gate Bridge";
      new mapboxgl.Marker(goldenGateEl)
        .setLngLat([-122.4783, 37.8199])
        .addTo(map);

      // Bay Bridge Marker
      const bayBridgeEl = document.createElement("div");
      bayBridgeEl.className = "bay-bridge-marker";
      bayBridgeEl.ariaLabel = "Map marker: Bay Bridge";
      new mapboxgl.Marker(bayBridgeEl)
        .setLngLat([-122.3778, 37.7983])
        .addTo(map);

      // Initial cluster update
      updateClusters();
      setMapLoaded(true);
    });

    const handleZoom = () => {
      if (mapRef.current) {
        const zoom = mapRef.current.getZoom();
        updateMarkerSizes(zoom);
        updateClusters();
      }
    };

    const handleMove = () => {
      updateClusters();
    };

    map.on("zoom", handleZoom);
    map.on("moveend", handleMove);

    return () => {
      if (mapRef.current) {
        mapRef.current.off("zoom", handleZoom);
        mapRef.current.off("moveend", handleMove);
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [
    schools,
    setSelectedSchool,
    flyToOptions,
    posthog,
    updateMarkerSizes,
    updateClusters,
  ]);

  // Update marker appearance when selectedSchool changes and map is loaded
  useEffect(() => {
    // check mapLoaded to avoid race condition where markersRef is not yet initialized
    if (mapLoaded && mapRef.current) {
      // set all markers to default appearance
      Object.values(markersRef.current).forEach((marker) => {
        updateMarkerAppearance(marker, false);
      });
      if (selectedSchool) {
        const selectedMarker = markersRef.current[selectedSchool.name];
        if (selectedMarker) {
          // Ensure selected school marker is visible (not hidden by clustering)
          selectedMarker.addTo(mapRef.current);
          updateMarkerAppearance(selectedMarker, true);
          const lngLat = selectedMarker.getLngLat();

          if (!userHasInteracted.current) {
            // Use jumpTo when returning from detail page. it's less dizzying.

            // if we have focused on a school that's not visible, recenter (e.g., via filter or keyboard navigation)
            if (!isVisible(selectedMarker, mapRef.current)) {
              // jump to marker
              mapRef.current.jumpTo({
                center: [lngLat.lng, lngLat.lat],
              });
              userHasInteracted.current = true;
            }
          } else {
            // Use flyTo for all other cases

            // if we have focused on a school that's not visible, recenter (e.g., via filter or keyboard navigation)
            if (!isVisible(selectedMarker, mapRef.current)) {
              // pan to marker
              mapRef.current.flyTo({
                center: [lngLat.lng, lngLat.lat],
                ...flyToOptions,
              });
            }
          }
        }
      }
    }
  }, [selectedSchool, mapLoaded, flyToOptions, userHasInteracted]);

  return (
    <>
      <div className="flex h-full w-full items-center justify-center">
        <div ref={mapContainer} className="h-full w-full md:rounded-2xl" />
      </div>
    </>
  );
};

export default MapboxMap;

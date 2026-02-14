import { School } from "@/types/school";
import Supercluster from "supercluster";

export interface SchoolProperties {
  school: School;
}

export interface ClusterProperties {
  cluster: true;
  cluster_id: number;
  point_count: number;
  point_count_abbreviated: number | string;
}

export type SchoolPoint = GeoJSON.Feature<GeoJSON.Point, SchoolProperties>;
export type ClusterPoint = GeoJSON.Feature<GeoJSON.Point, ClusterProperties>;
export type MapPoint = SchoolPoint | ClusterPoint;

export function schoolsToGeoJSON(
  schools: School[],
): GeoJSON.FeatureCollection<GeoJSON.Point, SchoolProperties> {
  return {
    type: "FeatureCollection",
    features: schools
      .filter((school) => school.latitude && school.longitude)
      .map((school) => ({
        type: "Feature",
        properties: { school },
        geometry: {
          type: "Point",
          coordinates: [Number(school.longitude), Number(school.latitude)],
        },
      })),
  };
}

export function isCluster(point: MapPoint): point is ClusterPoint {
  return (point.properties as ClusterProperties).cluster === true;
}

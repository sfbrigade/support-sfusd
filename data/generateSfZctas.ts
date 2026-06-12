// One-off maintenance script for regenerating the static ZCTA overlay used by
// the map ZIP search. Keep this in the repo so the Census source endpoint,
// SFUSD ZIP filtering, and property normalization are reproducible.

import fs from "fs";
import path from "path";
import type {
  Feature,
  FeatureCollection,
  MultiPolygon,
  Polygon,
} from "geojson";

import schools from "../prisma/schools.json";

type SchoolWithZipcode = {
  zipcode?: string | null;
};

type CensusZctaProperties = {
  ZCTA5?: string;
};

type CensusZctaFeature = Feature<Polygon | MultiPolygon, CensusZctaProperties>;

type CensusZctaFeatureCollection = FeatureCollection<
  Polygon | MultiPolygon,
  CensusZctaProperties
>;

type SfZctaFeature = Feature<Polygon | MultiPolygon, { zipcode: string }>;

type SfZctaFeatureCollection = FeatureCollection<
  Polygon | MultiPolygon,
  { zipcode: string }
>;

const CENSUS_ZCTA_QUERY_URL =
  "https://tigerweb.geo.census.gov/arcgis/rest/services/TIGERweb/PUMA_TAD_TAZ_UGA_ZCTA/MapServer/1/query";
const ZIPCODE_PATTERN = /^\d{5}$/;
const OUTPUT_FILE_PATH = path.join(
  process.cwd(),
  "public",
  "geo",
  "sf-zctas.geojson",
);

const getSchoolZipcodes = () => {
  return Array.from(
    new Set(
      (schools as SchoolWithZipcode[])
        .map((school) => school.zipcode)
        .filter((zipcode): zipcode is string =>
          Boolean(zipcode && ZIPCODE_PATTERN.test(zipcode)),
        ),
    ),
  ).sort();
};

const buildCensusQueryUrl = (zipcodes: string[]) => {
  const url = new URL(CENSUS_ZCTA_QUERY_URL);
  const quotedZipcodes = zipcodes.map((zipcode) => `'${zipcode}'`).join(",");

  url.searchParams.set("where", `ZCTA5 IN (${quotedZipcodes})`);
  url.searchParams.set("outFields", "ZCTA5");
  url.searchParams.set("returnGeometry", "true");
  url.searchParams.set("f", "geojson");
  url.searchParams.set("outSR", "4326");

  return url;
};

const normalizeZctaFeature = (feature: CensusZctaFeature): SfZctaFeature => {
  const zipcode = feature.properties?.ZCTA5;

  if (!zipcode) {
    throw new Error("Census ZCTA feature is missing the ZCTA5 property.");
  }

  return {
    type: "Feature",
    properties: { zipcode },
    geometry: feature.geometry,
  };
};

async function fetchZctaGeoJson(
  zipcodes: string[],
): Promise<SfZctaFeatureCollection> {
  const response = await fetch(buildCensusQueryUrl(zipcodes));

  if (!response.ok) {
    throw new Error(
      `Unable to fetch Census ZCTA boundaries: ${response.status} ${response.statusText}`,
    );
  }

  const censusGeoJson = (await response.json()) as CensusZctaFeatureCollection;
  const features = censusGeoJson.features
    .map(normalizeZctaFeature)
    .sort((a, b) => a.properties.zipcode.localeCompare(b.properties.zipcode));

  return {
    type: "FeatureCollection",
    features,
  };
}

async function main() {
  const zipcodes = getSchoolZipcodes();
  const zctaGeoJson = await fetchZctaGeoJson(zipcodes);
  const generatedZipcodes = new Set(
    zctaGeoJson.features.map((feature) => feature.properties.zipcode),
  );
  const missingZipcodes = zipcodes.filter(
    (zipcode) => !generatedZipcodes.has(zipcode),
  );

  if (missingZipcodes.length > 0) {
    throw new Error(
      `Census response did not include ZCTA boundaries for: ${missingZipcodes.join(
        ", ",
      )}`,
    );
  }

  fs.mkdirSync(path.dirname(OUTPUT_FILE_PATH), { recursive: true });
  fs.writeFileSync(OUTPUT_FILE_PATH, JSON.stringify(zctaGeoJson), {
    encoding: "utf-8",
  });

  console.log(
    `Generated ${OUTPUT_FILE_PATH} with ${zctaGeoJson.features.length} ZCTA features.`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

// fetchLatLong.ts
// Description: Fetches the latitude and longitude and updates the school list file with the geolocations.
// Depends on the AWS_GEO_KEY environment variable being set to the AWS API key enabled with location services access.

import { readSchoolList, writeSchoolList } from "./shared";

async function awsGeoLocate(address: string, cached: boolean = false) {
  try {
    const response = await fetch(
      `https://places.geo.us-west-2.amazonaws.com/v2/geocode?key=${process.env.AWS_GEO_KEY}${cached ? "&intended-use=Storage" : ""}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          QueryText: address,
          QueryComponents: { Locality: "San Francisco", Country: "US" },
        }),
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    const item = result.ResultItems[0];

    return {
      addressString: item?.Title,
      addressDetails: item?.Address,
      geo: item?.Position,
      geoBounds: item?.MapView,
    };
  } catch (error) {
    console.error("Error posting data:", error);
    return null;
  }
}

async function awsGeoLocateArray(addresses: string[], cached: boolean = false) {
  return await Promise.all(
    addresses.map(async (address) => {
      return await awsGeoLocate(address, cached);
    }),
  );
}

function main() {
  const schoolList = readSchoolList();

  console.log("Geolocating schools...");
  Promise.all(
    schoolList.map(async (school) => {
      const geolocations = await awsGeoLocateArray(school.locations);
      console.log(`Geolocated ${school.schoolStub}.`);
      return { ...school, geolocations };
    }),
  ).then((results) => {
    writeSchoolList(results);
    console.log("Geolocations updated.");
  });
}

main();

import * as fs from "fs";

const schoolListFileName = "./data/schoolList.json";
const geoSchoolListFileName = "./data/schoolList.json";

type SchoolRecord = {
  schoolStub: string;
  schoolUrl: string;
  schoolLabel: string;
  image?: {
    src: string;
    width: string;
    height: string;
  };
  gradesLabel: string;
  gradeCodes: string[];
  neighborhood: string;
  principal: string;
  locations: string[];
  phone: string;
  lat?: number;
  long?: number;
  geolocations?: any;
};

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

function readSchoolList(): SchoolRecord[] {
  const buffer = fs.readFileSync(schoolListFileName, { encoding: "utf-8" });
  const schoolList = JSON.parse(buffer);
  return schoolList;
}

const schoolList = readSchoolList();

Promise.all(
  schoolList.map(async (school) => {
    const geolocations = await awsGeoLocateArray(school.locations);
    return { ...school, geolocations };
  }),
).then((results) => {
  fs.writeFileSync(geoSchoolListFileName, JSON.stringify(results, null, 2), {
    encoding: "utf-8",
  });
  console.log(JSON.stringify(results, null, 2));
});

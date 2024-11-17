import * as https from "https";
import * as fs from "fs";

export const defaultSleepDelay = 3000; // mercy mode - 3 second delay between fetches
export async function sleep(sleepDelay = defaultSleepDelay, salty = false) {
  const salt = salty
    ? sleepDelay + (sleepDelay / 10) * Math.random() - sleepDelay / 20
    : 0;
  return new Promise((resolve) => setTimeout(resolve, sleepDelay + salt));
}

export const schoolListFilePath = "./data/schoolList.json";

export type SchoolProfile = {
  enrollment?: string;
  schoolCode?: string;
  ytLinks?: string[];
  ytCodes?: string[];
  generatedProfile?: {
    model: string;
    overview: string;
    bullets: string[];
    programs: {
      name: string;
      description: string;
    };
  };
};
export type SchoolLogo = {
  logoUrl: string;
  logoAltText: string;
  filePath: string;
};
export type SchoolRecord = {
  schoolStub: string;
  schoolUrl: string;
  schoolLabel: string;
  image?: {
    src: string;
    filePath?: string;
    width: string;
    height: string;
  };
  logo?: SchoolLogo;
  gradesLabel: string;
  gradeCodes: string[];
  neighborhood: string;
  principal: string;
  locations: string[];
  phone: string;
  lat?: number;
  long?: number;
  geolocations?: any;
} & SchoolProfile;

export function downloadImage(url: string, filePath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    https
      .get(url, (response) => {
        if (response.statusCode !== 200) {
          reject(new Error(`Failed to get '${url}' (${response.statusCode})`));
          return;
        }

        const fileStream = fs.createWriteStream(filePath);
        response.pipe(fileStream);

        fileStream.on("finish", () => {
          fileStream.close();
          // console.log(`Image downloaded and saved to ${filePath}`);
          resolve();
        });

        fileStream.on("error", (err) => {
          fs.unlink(filePath, () => reject(err)); // Delete the file on error
        });
      })
      .on("error", (err) => {
        reject(err);
      });
  });
}

export function extractExtensionFromUrl(url: string): string {
  // example: https://www.sfusd.edu/sites/default/files/styles/image_quarter/public/ORCHESTRA%201.jpg?itok=pWm52hvh
  // returns: "jpg"
  const [base] = url.split("?");
  const parts = base.split(".");
  return parts.length > 1 ? parts.at(-1)?.toLowerCase() || "" : "";
}

export function readSchoolList(): SchoolRecord[] {
  const buffer = fs.readFileSync(schoolListFilePath, { encoding: "utf-8" });
  const schoolList = JSON.parse(buffer);
  return schoolList;
}

export function writeSchoolList(schoolList: SchoolRecord[]) {
  fs.writeFileSync(schoolListFilePath, JSON.stringify(schoolList, null, 2), {
    encoding: "utf-8",
  });
}

// create a school stub from a URL stub
// ex. /schools/abraham-lincoln-high-school => abraham-lincoln-high-school
export function schoolStubFromUrlStub(urlStub: string): string | undefined {
  if (urlStub) {
    const parts = urlStub.split("/");
    return parts[parts.length - 1].trim();
  } else return undefined;
}

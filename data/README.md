> **NOTE:** This README is a work in progress and will be updated as the project evolves.

# Extraction for Scaling SupportSF  

This folder contains various scripts designed to extract data from [SFUSD](https://www.sfusd.edu/). This collection was assembled for the one-time purpose of scaling from the original list of 13 SF high schools to the full list of 100+ SFUSD public schools.  

Additional steps are required to transform and load this data into the SupportSF structure, but the primary focus of this folder is extraction. Think of this part as the **E** in the ETL (Extract, Transform, Load) process.  

## Overview of Extraction  

The extraction process is broken down into a series of scripts that must be executed in order. The execution order is summarized below. Each summary includes the fields produced by the script and whether the field is extracted, calculated, or generated.  

- **Extracted** fields are pulled directly from the source.  
- **Calculated** fields are *derived* from the source data.  
- **Generated** fields are created by the script using external services such as ChatGPT or AWS.  

OpenAI's API is used parse addresses from the SFUSD school directory and to generate school profiles from the school descriptions. This requires an API key to be set in the environment as `OPENAI_API_KEY`.

AWS is used to geolocate schools to determine long & lat for the map. This requires an AWS account and `AWS_GEO_KEY` to be set in the environment with an AWS API key enabled with location services access.

### **Scripts and Field Outputs**  

#### **`scrapeSchoolPage.ts`**  
Generates a full school list from the [SFUSD primary directory page](https://www.sfusd.edu/schools/directory).  

- **Extracted:** `schoolUrl`, `schoolLabel`, `image`, `gradesLabel`, `gradeCodes`, `neighborhood`, `principal`, `phone`.  
- **Calculated:** `schoolStub`.  
- **Generated:** `locations`.  

 Run this script first to generate the full list of schools extracted from the [SFUSD Directory of Schools](https://www.sfusd.edu/schools/directory). It creates a file called `schoolList.json` that is used and amended by subsequent scripts.

 > OpenAI is used in this step to extract the address from the school directory due to the complexity of the various address formats used by SFUSD.

 Example usage:
 ```bash
 # OPENAI_API_KEY must be set in the environment
 npx tsx data/scrapeSchoolPage.ts
 ```

#### **`scrapeSchoolDetails.ts`**  
Extracts details and uses OpenAI to generate profiles for each school from school pages at SFUSD (e.g., [AP Giannini Middle School](https://www.sfusd.edu/school/ap-giannini-middle-school)).  

- **Extracted:** `enrollment`, `schoolCode`, `ytLinks`, `ytCodes`.  
- **Generated:** `generatedProfile`.  

 Example usage:
 ```bash
 # OPENAI_API_KEY must be set in the environment
 npx tsx data/scrapeSchoolDetails.ts
 ```

#### **`fetchLatLong.ts`**  
Uses AWS' geolocation service to determine latitude, longitude, and formal address details for each school.  

- **Generated:** `addressString`, `addressDetails`, `geo`, `geoBounds`.

> `AWS_GEO_KEY` to be set in the environment with an AWS API key enabled with location services access.

Example usage:
 ```bash
 npx tsx data/fetchLatLong.ts
 ```


#### **`fetchFullImages.ts`**  
Downloads images for each school, calculates a filename based on the school's stub name, and stores the image file under `/public/school_img/full`.  

- **Downloads:** *&lt;full school images&gt;*.  
- **Calculated:** `school.image.filePath`.  

Example usage:
 ```bash
 npx tsx data/fetchFullImages.ts
 ```


#### **`fetchLogos.ts`**  
Downloads logo images for each school, calculates a filename based on the school's stub name, and stores the image file under `/public/school_img/logo`.  

- **Downloads:** *&lt;logo images&gt;*.  
- **Extracted:** `logoUrl`, `logoAltText`.  
- **Calculated:** `school.image.filePath`.  

Example usage:
 ```bash
 npx tsx data/fetchLogos.ts
 ```

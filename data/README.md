> **NOTE:** This README is a work in progress and will be updated as the project evolves.

# Extraction for Scaling SupportSF  

This folder contains various scripts designed to **extract** data from [SFUSD](https://www.sfusd.edu/). This collection was assembled for the **one-time** purpose of scaling from the original list of 13 SF high schools to the full list of 100+ SFUSD public schools.  

Additional steps are required to transform and load this data into the SupportSF structure, but the primary focus of this folder is extraction. Think of this part as the **E** in the ETL (Extract, Transform, Load) process.  

## Overview of Extraction  

The extraction process is broken down into a series of scripts that must be executed in order. The execution order is summarized below. Each summary includes the fields produced by the script and whether the field is extracted, calculated, or generated.  

- **Extracted** fields are pulled directly from the source.  
- **Calculated** fields are *derived* from the source data.  
- **Generated** fields are created by the script using external services such as ChatGPT or AWS.  

### **Scripts and Field Outputs**  

#### **`scrapeSchoolPage.ts`**  
Generates a full school list from the [SFUSD primary directory page](https://www.sfusd.edu/schools/directory).  

- **Extracted:** `schoolUrl`, `schoolLabel`, `image`, `gradesLabel`, `gradeCodes`, `neighborhood`, `principal`, `phone`.  
- **Calculated:** `schoolStub`.  
- **Generated:** `locations`.  

#### **`scrapeSchoolDetails.ts`**  
Extracts details and generates profiles for each school from individual school pages (e.g., [AP Giannini Middle School](https://www.sfusd.edu/school/ap-giannini-middle-school)).  

- **Extracted:** `enrollment`, `schoolCode`, `ytLinks`, `ytCodes`.  
- **Generated:** `generatedProfile`.  

#### **`fetchLatLong.ts`**  
Uses AWS' geolocation service to determine latitude, longitude, and formal address details for each school.  

- **Generated:** `addressString`, `addressDetails`, `geo`, `geoBounds`.  

#### **`fetchFullImages.ts`**  
Downloads images for each school, calculates a filename based on the school's stub name, and stores the image file under `/public/school_img/full`.  

- **Downloads:** *&lt;full school images&gt;*.  
- **Calculated:** `school.image.filePath`.  

#### **`fetchLogos.ts`**  
Downloads logo images for each school, calculates a filename based on the school's stub name, and stores the image file under `/public/school_img/logos`.  

- **Downloads:** *&lt;logo images&gt;*.  
- **Extracted:** `logoUrl`, `logoAltText`.  
- **Calculated:** `school.image.filePath`.  

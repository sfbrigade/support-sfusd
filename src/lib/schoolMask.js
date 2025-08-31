/* this file is the source code for the custom functions used in the Google Sheets */

/**
 * Extracts a slug from a URL (the last path segment).
 *
 * @param {string} url The full URL
 * @return {string} The slug part of the URL
 * @customfunction
 */
function createSlugFromUrl(url) {
  if (typeof url !== "string") return "";

  try {
    const parts = url.split("/").filter((part) => part.trim() !== "");
    return parts[parts.length - 1] || "";
  } catch (e) {
    return "";
  }
}

/**
 * Converts a single grade level string to its corresponding bitmask value.
 * PreK, TK, K and grades 1-13 are represented as bits in positions 0-15.
 *
 * @param {string} sinput - Grade level string (e.g., "PreK", "TK", "K", "1", "1-5")
 * @return {number} Bitmask representing the grade level(s)
 */
function calculateSchoolBitmaskFromLine(sinput) {
  // Return 0 if input is empty or undefined
  if (!sinput) return 0;

  // Handle special named grades using specific bit positions
  // PreK uses bit position 0 (value 1)
  if (sinput.toUpperCase() === "PREK") return 1; // basically 1 << 0
  // TK (Transitional Kindergarten) uses bit position 1 (value 2)
  if (sinput.toUpperCase() === "TK") return 1 << 1;
  // K (Kindergarten) uses bit position 2 (value 4)
  if (sinput.toUpperCase() === "K") return 1 << 2;

  // Handle single numeric grade (e.g., "1", "2", etc.)
  // Regex tests if input is a 1 or 2-digit number
  if (/^\d{1,2}$/.test(sinput)) return 1 << (parseInt(sinput) + 2);

  // Handle grade ranges (e.g., "1-5")
  // Regex tests if input is in format number-number
  if (!/^\d{1,2}-\d{1,2}/.test(sinput)) return 0;
  // Split range into start and end grades
  const [start, end] = sinput.split("-").map((s) => parseInt(s));

  // Validate range is within acceptable limits (1-13)
  if (start < 1 || start > 13 || end < 1 || end > 13) return 0;
  if (start > end) return 0;

  // Create bitmask representing all grades in the range
  let mask = 0;
  for (let i = start; i <= end; i++) {
    mask |= 1 << (i + 2); // shift by 2 to account for PreK, TK, K
  }
  return mask;
}

/**
 * Calculate a combined bitmask for multiple grade levels from a multi-line string.
 * Each line is treated as a separate grade level entry.
 *
 * @param {string} sinput - Multi-line string with grade levels
 * @return {number} Combined bitmask representing all grade levels
 */
function calculateSchoolBitmaskFromString(sinput) {
  const mask = sinput
    .split("\n")
    .reduce((acc, line) => acc | calculateSchoolBitmaskFromLine(line), 0);
  return mask;
}

/**
 * Checks if the given bitmask includes elementary school grades (PreK-5).
 *
 * @param {number} mask - School grade bitmask to check
 * @return {boolean} True if mask includes any elementary school grades
 */
function isElementary(mask) {
  const elementaryMask = calculateSchoolBitmaskFromString("PreK\nTK\nK\n1-5");
  return (mask & elementaryMask) > 0;
}

/**
 * Checks if the given bitmask includes middle school grades (6-8).
 *
 * @param {number} mask - School grade bitmask to check
 * @return {boolean} True if mask includes any middle school grades
 */
function isMiddle(mask) {
  const middleMask = calculateSchoolBitmaskFromString("6-8");
  return (mask & middleMask) > 0;
}

/**
 * Checks if the given bitmask includes high school grades (9-13).
 *
 * @param {number} mask - School grade bitmask to check
 * @return {boolean} True if mask includes any high school grades
 */
function isHigh(mask) {
  const highMask = calculateSchoolBitmaskFromString("9-13");
  return (mask & highMask) > 0;
}

/**
 * Returns a random image pathname based on the provided key.
 * (WIP - HS has to be added)
 *
 * @param {string} key - image key, e.g., "MS-TUTORING", "K5-CLASSROOM"
 * @return {string} Random image pathname from the corresponding category
 */
function randomImage(key) {
  if (!key) return "";
  const images = {
    "MS-TUTORING": [
      "/stock-images/MS/tutoring/pexels-august-de-richelieu-4261789.webp",
      "/stock-images/MS/tutoring/pexels-ivan-samkov-4624881.webp",
      "/stock-images/MS/tutoring/pexels-julia-m-cameron-4145354.webp",
      "/stock-images/MS/tutoring/pexels-katerina-holmes-5905492.webp",
      "/stock-images/MS/tutoring/pexels-max-fischer-5212666.webp",
      "/stock-images/MS/tutoring/pexels-mikhail-nilov-8923039.webp",
    ],
    "MS-EVENT": [
      "/stock-images/MS/event/pexels-cottonbro-7568547.webp",
      "/stock-images/MS/event/pexels-filirovska-8250359.webp",
      "/stock-images/MS/event/pexels-freestockpro-2831794.webp",
      "/stock-images/MS/event/pexels-jmark-301987.webp",
      "/stock-images/MS/event/pexels-rdne-8500302.webp",
      "/stock-images/MS/event/pexels-saulo-leite-1491182-14937046.webp",
    ],
    "MS-MENTORING": [
      "/stock-images/MS/mentoring/pexels-max-fischer-5212700.webp",
      "/stock-images/MS/mentoring/pexels-pavel-danilyuk-6925431.webp",
      "/stock-images/MS/mentoring/pexels-pavel-danilyuk-8382268.webp",
      "/stock-images/MS/mentoring/pexels-rdne-7606209.webp",
      "/stock-images/MS/mentoring/pexels-tima-miroshnichenko-5427682.webp",
      "/stock-images/MS/mentoring/pexels-tima-miroshnichenko-5428146.webp",
      "/stock-images/MS/mentoring/pexels-vanessa-loring-7869086.webp",
    ],
    "K5-CLASSROOM": [
      "/stock-images/K5/classroom/pexels-anastasia-shuraeva-8465506.webp",
      "/stock-images/K5/classroom/pexels-anastasia-shuraeva-8466774.webp",
      "/stock-images/K5/classroom/pexels-artempodrez-8087860.webp",
      "/stock-images/K5/classroom/pexels-ivan-samkov-6816531.webp",
      "/stock-images/K5/classroom/pexels-mikhail-nilov-8923073.webp",
      "/stock-images/K5/classroom/pexels-rdne-7606202.webp",
      "/stock-images/K5/classroom/pexels-rdne-8363087.webp",
      "/stock-images/K5/classroom/pexels-rdne-8363576.webp",
      "/stock-images/K5/classroom/pexels-rdne-8363771.webp",
      "/stock-images/K5/classroom/pexels-rdne-8364052.webp",
      "/stock-images/K5/classroom/pexels-yankrukov-8612992.webp",
      "/stock-images/K5/classroom/pexels-yankrukov-8613059.webp",
      "/stock-images/K5/classroom/pexels-yankrukov-8613088.webp",
      "/stock-images/K5/classroom/pexels-yankrukov-8613089.webp",
      "/stock-images/K5/classroom/pexels-yankrukov-8613091.webp",
      "/stock-images/K5/classroom/pexels-yankrukov-8613094.webp",
    ],
    "K5-EVENT": [
      "/stock-images/K5/event/pexels-anastasiia-63323218-20100145.webp",
      "/stock-images/K5/event/pexels-artempodrez-8088096.webp",
      "/stock-images/K5/event/pexels-cottonbro-9643922.webp",
      "/stock-images/K5/event/pexels-filirovska-8250359.webp",
      "/stock-images/K5/event/pexels-freestockpro-2831794.webp",
      "/stock-images/K5/event/pexels-karolina-grabowska-7692509.webp",
      "/stock-images/K5/event/pexels-mccutcheon-1148998.webp",
      "/stock-images/K5/event/pexels-monica-713149.webp",
    ],
    "K5-TUTORING": [
      "/stock-images/K5/tutoring/pexels-august-de-richelieu-4260314.webp",
      "/stock-images/K5/tutoring/pexels-gabby-k-7352915.webp",
      "/stock-images/K5/tutoring/pexels-kamaji-ogino-5094676.webp",
      "/stock-images/K5/tutoring/pexels-kampus-6248433.webp",
      "/stock-images/K5/tutoring/pexels-mikhail-nilov-8342274.webp",
      "/stock-images/K5/tutoring/pexels-mikhail-nilov-8923040.webp",
      "/stock-images/K5/tutoring/pexels-mikhail-nilov-8923043.webp",
      "/stock-images/K5/tutoring/pexels-mikhail-nilov-8923075.webp",
      "/stock-images/K5/tutoring/pexels-mikhail-nilov-8923083.webp",
      "/stock-images/K5/tutoring/pexels-mikhail-nilov-8923251.webp",
      "/stock-images/K5/tutoring/pexels-yankrukov-8192096.webp",
    ],
  };
  return images[key][Math.floor(Math.random() * images.length)];
}

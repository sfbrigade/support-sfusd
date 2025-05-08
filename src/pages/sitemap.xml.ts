import { GetServerSideProps } from "next";
import prisma from "@/lib/prisma";

const SITE_URL = "https://www.supportsfschools.org";

/**
 * Generates an XML sitemap for the website with the provided pages.
 *
 * This function takes an array of page paths and creates a complete XML sitemap
 * that follows the sitemap protocol (http://www.sitemaps.org/schemas/sitemap/0.9).
 * Each page is transformed into a sitemap URL entry with the current date as lastmod
 * and a monthly changefreq.
 *
 * @param pages - An array of page paths relative to the site root (e.g., ["/", "/about", "/contact"])
 * @returns A string containing the complete XML sitemap
 * @example
 * // Returns a complete XML sitemap for the specified pages
 * const sitemap = generateSiteMap(["/", "/about", "/contact"]);
 */
function generateSiteMap(pages: string[]) {
  const generateUrl = (page: string) => `
  <url>
    <loc>${`${SITE_URL}${page}`}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
  </url>
`;

  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${pages.map(generateUrl).join("")}
    </urlset>`;
}

// This component is a placeholder and will not render anything.
// The sitemap is generated server-side.
function SiteMap() {
  return null;
}

/**
 * Server-side props function for generating a dynamic sitemap.xml
 *
 * This function:
 * 1. Fetches all school names from the database
 * 2. Creates URLs for each school page
 * 3. Generates an XML sitemap containing home, map, about, and all school pages
 * 4. Returns the sitemap as XML content
 *
 * @param context - GetServerSideProps context containing the response object
 * @returns Empty props object as the response is handled directly
 */
export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const schools = await prisma.school.findMany({
    select: { name: true },
  });

  const schoolPages = schools.map((school) => {
    return "/school?name=" + encodeURIComponent(school.name);
  });

  const sitemap = generateSiteMap(["/", "/map", "/about", ...schoolPages]);

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return { props: {} };
};

export default SiteMap;

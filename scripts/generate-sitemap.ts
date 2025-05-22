import { writeFileSync } from "fs";
import { join } from "path";
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

/**
 * Generates a static sitemap.xml file at build time.
 *
 * This function:
 * 1. Fetches all school names from the database
 * 2. Creates URLs for each school page
 * 3. Generates an XML sitemap containing home, map, about, and all school pages
 * 4. Writes the sitemap to public/sitemap.xml
 */
async function generateStaticSitemap() {
  try {
    // Fetch school names from the database
    const schools = await prisma.school.findMany({
      select: { name: true },
    });

    // Generate school page URLs
    const schoolPages = schools.map((school) => {
      return "/school?name=" + encodeURIComponent(school.name);
    });

    // Combine static and dynamic pages
    const pages = ["/", "/map", "/about", ...schoolPages];

    // Generate the sitemap XML
    const sitemap = generateSiteMap(pages);

    // Write the sitemap to public/sitemap.xml
    const sitemapPath = join(process.cwd(), "public", "sitemap.xml");
    writeFileSync(sitemapPath, sitemap, "utf8");

    console.log("Sitemap generated successfully at public/sitemap.xml");
  } catch (error) {
    console.error("Error generating sitemap:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the sitemap generation
generateStaticSitemap();

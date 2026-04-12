import type { MetadataRoute } from "next";
import prisma from "@/lib/prisma";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const schools = await prisma.school.findMany({
    select: { stub: true },
  });

  const schoolEntries: MetadataRoute.Sitemap = schools.map((school) => ({
    url: `https://supportsfschools.org/school/${school.stub}`,
    changeFrequency: "monthly",
    // Potentially scrapped feature? This adds extra sorting time, which could be bad?
    priority: 0.8,
  }));

  return [
    {
      url: "https://supportsfschools.org",
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://supportsfschools.org/map",
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: "https://supportsfschools.org/about",
      changeFrequency: "monthly",
      priority: 0.5,
    },
    ...schoolEntries,
  ];
}
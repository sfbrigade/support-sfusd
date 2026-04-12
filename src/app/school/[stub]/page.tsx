import type { Metadata } from "next";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import SchoolPageClient from "@/components/SchoolPageClient";

export async function generateStaticParams() {
  const schools = await prisma.school.findMany({
    select: { stub: true },
  });
  return schools.map((school) => ({ stub: school.stub }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ stub: string }>;
}): Promise<Metadata> {
  const { stub } = await params;
  const school = await prisma.school.findUnique({
    where: { stub },
    select: { name: true, about: true },
  });

  if (!school) return { title: "School Not Found" };

  return {
    title: `Support SF Schools - ${school.name} Profile`,
    description: `Support SF Schools encourages the community to support ${school.name}. ${school.about} Learn more about ${school.name} and their available donation and volunteer opportunities.`,
  };
}

export default async function SchoolPage({
  params,
}: {
  params: Promise<{ stub: string }>;
}) {
  const { stub } = await params;

  const school = await prisma.school.findUnique({
    where: { stub },
    // Potentially use one query here instead of twice? Ask Claude? Maybe calls are conflicting
    include: {
      metrics: true,
      programs: true,
    },
  });

  if (!school) notFound();

  // Conflict between donation_url data types, will be handled in other PR
  return <SchoolPageClient school={school} />;
}
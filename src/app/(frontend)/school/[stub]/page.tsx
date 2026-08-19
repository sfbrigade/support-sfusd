import { cache } from "react";
import type { Metadata } from "next";
import type { School } from "@/types/school";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import SchoolPageClient from "@/components/SchoolPageClient";

const getSchoolByStub = cache(async (stub: string): Promise<School | null> => {
  return prisma.school.findUnique({
    where: { stub },
    include: {
      metrics: true,
      programs: true,
    },
  });
});

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
  const school = await getSchoolByStub(stub);

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
  const school = await getSchoolByStub(stub);

  if (!school) notFound();

  return <SchoolPageClient school={school} />;
}
import type { Metadata } from "next";
import prisma from "@/lib/prisma";
import MapPageClient from "@/components/MapPageClient";

export const metadata: Metadata = {
  title: "Support SF Schools - School Map",
};

export default async function MapPage() {
  const schools = await prisma.school.findMany({
    include: {
      metrics: true,
      programs: true,
    },
  });

  return <MapPageClient schools={schools} />;
}
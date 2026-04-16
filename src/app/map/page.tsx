import { Metadata } from "next";
import prisma from "@/lib/prisma";
import { schoolMapPinSelect } from "@/lib/schoolMapPinSelect";
import MapPageClient from "./MapPageClient";

export const metadata: Metadata = {
  title: "Support SF Schools - School Map",
};

export default async function MapPage() {
  const schools = await prisma.school.findMany({
    select: schoolMapPinSelect,
  });

  return <MapPageClient schools={schools} />;
}

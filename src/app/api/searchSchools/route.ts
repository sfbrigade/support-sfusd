import { NextRequest, NextResponse } from "next/server";
import type { School } from "@prisma/client";
import prisma from "@/lib/prisma";

type ResponseData = { schools: School[] };

export async function GET(request: NextRequest) {
  const searchTerm = request.nextUrl.searchParams.get("searchTerm") ?? "";

  const schools = await prisma.school.findMany({
    where: {
      name: {
        contains: searchTerm,
        mode: "insensitive",
      },
    },
    include: {
      metrics: true,
    },
  });

  return NextResponse.json<ResponseData>({ schools });
}
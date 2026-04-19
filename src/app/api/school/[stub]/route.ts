import { NextRequest, NextResponse } from "next/server";
import type { School } from "@prisma/client";
import prisma from "@/lib/prisma";

type ResponseData = { school: School } | { error: string };

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ stub: string }> },
) {
  try {
    const { stub } = await params;

    const school = await prisma.school.findUnique({
      where: { stub },
      include: {
        metrics: true,
        programs: true,
      },
    });

    if (!school) {
      return NextResponse.json<ResponseData>({ error: "School not found" }, { status: 404 });
    }

    return NextResponse.json<ResponseData>({ school });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json<ResponseData>(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
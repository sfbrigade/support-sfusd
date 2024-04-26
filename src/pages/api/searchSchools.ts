import { School } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

interface ResponseData {
  schools: School[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  const schools: School[] = await prisma.school.findMany({
    where: {
      name: {
        contains: req.query.searchTerm as string,
        mode: "insensitive",
      },
    },
  });

  res.status(200).json({ schools });
}

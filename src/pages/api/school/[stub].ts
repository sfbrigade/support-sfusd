import { School } from "@prisma/client"
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from "@/lib/prisma";

interface ResponseData {
    school?: School;
    error?: string;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>,
) {
    try {

        //console.log('API called with query:', req.query);

        const { stub } = req.query;

        if (!stub || typeof stub !== 'string') {
            console.log('Invalid stub:', stub);
            return res.status(400).json({ error: "School stub is required" });
        }

        //console.log('Looking for school with stub:', stub);
        
        const school: School | null = await prisma.school.findUnique({
            where: {
                stub: stub,
            },
            include: {
                metrics: true,
                programs: true,
            },
        });

        //console.log('School found:', !!school);

        if (!school) {
            return res.status(404).json({ error: "School not found" })
        }

        res.status(200).json({ school });
    } catch (error) {
        console.error('API Error:', error);
        res.status(500).json({ error: "Internal server error" })
    }
}
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prisma"; // Mengikuti path import Anda

// Wajib: Agar Next.js tidak men-cache hasil query ini selamanya
export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const posts = await prisma.instagramPost.findMany({
            take: 3,
            orderBy: {
                id: 'asc',
            },
            select: {
                url: true
            }
        });

        console.log(posts);
        
        const formattedData = posts.map((item) => item.url);

        if (formattedData.length == 0) {
            return NextResponse.json({
                error: false,
                message: "Data instagram posts not found",
                data: []
            }, { status: 404 })
        }

        return NextResponse.json({
            error: false,
            message: "Success get instagram posts",
            data: formattedData
        }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({
            error: true,
            message: "Internal server error",
            errMessage: error.message
        }, { status: 500 });
    }
}
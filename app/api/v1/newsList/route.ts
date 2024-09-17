import { NextResponse } from "next/server";
import prisma from "@/app/libs/prisma";

export async function GET() {
    try {

        const listNews = await prisma.news.findMany({
            orderBy: {
                date: 'desc',
            },
            select: {
                id: true,
                title: true,
                description: true,
                date: true,
                note: true,
                path: true,
            }
        })

        if (listNews.length == 0) {
            return NextResponse.json({
                error: false,
                message: "Data news not found",
                data: []
            }, { status: 200 })
        }

        return NextResponse.json({
            error: false,
            message: "Success get list news",
            data: listNews
        }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({
            error: true,
            message: "Internal server error",
            errMessage: error.message
        }, { status: 500 });
    }
}
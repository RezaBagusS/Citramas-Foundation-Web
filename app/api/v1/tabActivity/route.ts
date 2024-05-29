import { NextResponse } from "next/server";
import prisma from "@/app/libs/prisma";

export async function GET() {
    try {

        const dataTab = await prisma.activity.findMany({
            select: {
                id: true,
                name: true,
            }
        });

        if (dataTab.length == 0) {
            return NextResponse.json({
                error: false,
                message: "Data tab activity not found",
                data: []
            }, { status: 404 })
        }

        return NextResponse.json({
            error: false,
            message: "Success get data tab activity",
            data: dataTab
        }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({
            error: true,
            message: "Internal server error",
            errMessage: error.message
        }, { status: 500 });
    }
}
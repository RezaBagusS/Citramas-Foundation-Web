import { NextResponse } from "next/server";
import prisma from "@/app/libs/prisma";

export async function GET() {
    try {

        const dataActivityList = await prisma.listActivity.findMany({
            select: {
                id: true,
                id_activity: true,
                description: true,
                name: true,
            }
        });

        if (dataActivityList.length == 0) {
            return NextResponse.json({
                error: false,
                message: "Data activity list not found",
                data: []
            }, { status: 404 })
        }

        return NextResponse.json({
            error: false,
            message: "Success get data activity list",
            data: dataActivityList
        }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({
            error: true,
            message: "Internal server error",
            errMessage: error.message
        }, { status: 500 });
    }
}
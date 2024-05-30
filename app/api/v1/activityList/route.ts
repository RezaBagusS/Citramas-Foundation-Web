import { NextResponse } from "next/server";
import prisma from "@/app/libs/prisma";
import { get } from "https";

export async function POST(request: Request) {
    try {

        const { active } = await request.json();

        const tabActivity = await prisma.activity.findMany({
            select: {
                id: true,
                name: true,
            }
        });

        const getTab = tabActivity.filter((item) => {
            return item.name.toLowerCase() == active.split("-").join(" ").toLowerCase();
        });

        if (getTab.length == 0) {
            return NextResponse.json({
                error: false,
                message: "Data activity not found",
                data: []
            }, { status: 404 })
        }

        const dataActivityList = await prisma.listActivity.findMany({
            select: {
                id: true,
                id_activity: true,
                description: true,
                name: true,
            }, 
            where: {
                id_activity: getTab[0].id
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
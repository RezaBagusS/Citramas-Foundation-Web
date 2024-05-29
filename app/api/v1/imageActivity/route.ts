import { NextResponse } from "next/server";
import prisma from "@/app/libs/prisma";

export async function POST(request: Request) {
    try {

        const { item } = await request.json();

        const getActivityList = await prisma.listActivity.findMany({
            select: {
                id: true,
                name: true,
                description: true,
            }
        });

        const activityList = getActivityList.filter((data) => {
            return data.name.replace(/ /g, "-").toLowerCase() == item;
        })

        const imageActivityList = await prisma.storageImage.findMany({
            select: {
                id: true,
                id_listActivity: true,
                url: true,
            }, 
            where: {
                listActivity: {
                    id: activityList[0]?.id
                }
            }
        });

        if (imageActivityList.length == 0) {
            return NextResponse.json({
                error: false,
                message: "Image activity list not found",
                data: []
            }, { status: 404 })
        }

        return NextResponse.json({
            error: false,
            message: "Success get data image activity list",
            data: imageActivityList,
            desc: activityList[0]?.description
        }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({
            error: true,
            message: "Internal server error",
            errMessage: error.message
        }, { status: 500 });
    }
}
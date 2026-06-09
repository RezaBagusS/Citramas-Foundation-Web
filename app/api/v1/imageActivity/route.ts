import { NextResponse } from "next/server";
import prisma from "@/app/libs/prisma";

export async function POST(request: Request) {
    try {

        const body = await request.json();
        const item = body?.item;

        if (!item || typeof item !== "string") {
            return NextResponse.json({
                error: true,
                message: "Parameter 'item' is required and must be a string",
                data: []
            }, { status: 400 });
        }

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
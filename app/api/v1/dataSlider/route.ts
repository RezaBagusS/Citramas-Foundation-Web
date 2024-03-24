import { NextResponse } from "next/server";
import prisma from "@/app/libs/prisma";

export async function GET () {

    try {

        const listImage = await prisma.storageImage.findMany({
            select: {
                id: true,
                id_listActivity: true,
                url: true,
                listActivity: {
                    select: {
                        description: true,
                        name: true, // Nama List Activity
                        activity: {
                            select: {
                                name: true, // Nama Activity
                            }
                        }
                    }
                }
            }
        })

        if (!listImage) {
            return NextResponse.json({ 
                error: true,
                message: "Unsuccessful get data image" 
            }, { status: 500 });
        }

        const data = listImage.map((item) => {
            return {
                id: item.id,
                id_listActivity: item.id_listActivity,
                url: item.url,
                name: item.listActivity.name,
                description: item.listActivity.description,
                activity: item.listActivity.activity.name
            }
        })

        const getUnique = data.filter((v, i, a) => a.findIndex(t => (t.id_listActivity === v.id_listActivity)) === i);

        if (getUnique.length === 0) {
            return NextResponse.json({ 
                error: true,
                message: "Unsuccessful get data image" 
            }, { status: 500 });
        }

        return NextResponse.json({
            error: false,
            message: "Success get data image",
            data: getUnique
        }, { status: 200 });

    } catch (error:any) {
      return NextResponse.json({ error: error.message }, { status: 500 });  
    }
}
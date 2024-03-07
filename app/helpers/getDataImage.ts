'use server'

import prisma from "../libs/prisma";

export default async function getDataImage(id_listActivity: number) {
    
    const dataImage = await prisma.storageImage.findMany({
        where: {
            id_listActivity: id_listActivity
        }
    });

    return dataImage;
}
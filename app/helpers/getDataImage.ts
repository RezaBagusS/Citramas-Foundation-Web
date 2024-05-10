'use server'

import prisma from "../libs/prisma";

export default async function getDataImage(id: number) {
    
    const dataImage = await prisma.storageImage.findMany(
        {
          where: {
            id_listActivity: id,
          }
        }
    );

    return dataImage;
}
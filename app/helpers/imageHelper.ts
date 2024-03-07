'use server';

import prisma from "../libs/prisma";

export default async function imageHelper(url: string) {

  try {
     
    const response = await prisma.storageImage.create({
      data: {
        id_listActivity: 1,
        url: url,
      }
    });

    return response;

  } catch (error:any) {
    console.error('Error:', error);
    return { error: true, message: error.message || 'Unknown error during image upload.' }; // Handle errors gracefully
  }
}

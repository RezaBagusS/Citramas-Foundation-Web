import prisma from "../libs/prisma";

interface DataImage {
    id: number,
    id_listActivity: number,
    url: string,
    name: string,
    description: string,
    activity: string
}

export default async function activitySlider() {

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
        return {
            error: true,
            message: "Unsuccessful get data image",
        }
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

    const getUnique: DataImage[] = data.filter((v, i, a) => a.findIndex(t => (t.id_listActivity === v.id_listActivity)) === i);

    if (getUnique.length === 0) {
        return {
            error: true,
            message: "Unsuccessful get data image",
        }
        
    }

    return {
        error: false,
        message: "Successful get data image",
        data: getUnique
    };

}
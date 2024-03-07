import { NextResponse } from "next/server";

export async function POST (request: Request) {

    try {
        
        const formData = await request.formData();

        console.log("FORM DATA : ", formData.get("image"));
        console.log("FORM DATA : ", formData.get("image"));

        return NextResponse.json({
            message: "SUCCESS",
            data: formData
         }, { status: 200 });

    } catch (error:any) {
      return NextResponse.json({ error: error.message }, { status: 500 });  
    }
}


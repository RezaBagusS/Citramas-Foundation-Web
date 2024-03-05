import { transport, mailOptions } from "@/app/libs/nodemailer";
import { NextResponse } from "next/server";

export async function POST (request: Request) {

    try {
        
        const { email, name, subject, message } = await request.json();

        await transport.sendMail({
            ... mailOptions,
            from: email,
            subject: subject,
            text: `Testing Nodemailer`,
            html: `<h1>Name: ${name}</h1><p>From Email: ${email}</p><p>${message}</p>`
        })

        return NextResponse.json({ email, name, subject, message }, { status: 200 });

    } catch (error:any) {
      return NextResponse.json({ error: error.message }, { status: 500 });  
    }
}


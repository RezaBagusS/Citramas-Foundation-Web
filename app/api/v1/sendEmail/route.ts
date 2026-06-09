import { transport, mailOptions } from "@/app/libs/nodemailer";
import { NextResponse } from "next/server";

// HTML escaping helper function to protect against HTML injection / XSS
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST (request: Request) {
    try {
        const body = await request.json();
        
        if (!body) {
            return NextResponse.json({ error: "Empty request body" }, { status: 400 });
        }

        const { email, name, subject, message } = body;

        // Verify properties exist and are strings
        if (
            typeof email !== "string" ||
            typeof name !== "string" ||
            typeof subject !== "string" ||
            typeof message !== "string"
        ) {
            return NextResponse.json({ error: "Invalid input types" }, { status: 400 });
        }

        // Validate text lengths
        if (email.length > 320 || name.length > 100 || subject.length > 200 || message.length > 5000) {
            return NextResponse.json({ error: "Input text exceeds size limit" }, { status: 400 });
        }

        // Email address formatting check
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
        }

        // Escape variables for HTML delivery
        const safeName = escapeHtml(name);
        const safeEmail = escapeHtml(email);
        const safeSubject = escapeHtml(subject);
        const safeMessage = escapeHtml(message);

        // Send mail with safe HTML content and plain text fallback
        await transport.sendMail({
            ...mailOptions,
            from: email,
            subject: `Contact Form Message: ${safeSubject}`,
            text: `Contact Form Submission\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`,
            html: `
              <h1>Contact Form Submission</h1>
              <p><strong>Name:</strong> ${safeName}</p>
              <p><strong>From Email:</strong> ${safeEmail}</p>
              <p><strong>Subject:</strong> ${safeSubject}</p>
              <hr />
              <p><strong>Message:</strong></p>
              <p style="white-space: pre-wrap;">${safeMessage.replace(/\n/g, "<br />")}</p>
            `
        });

        return NextResponse.json({ email, name, subject, message }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });  
    }
}


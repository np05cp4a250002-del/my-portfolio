import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, email, message } = body;

        // Validation
        if (!name || !email || !message) {
            return NextResponse.json(
                { error: "All fields are required" },
                { status: 400 }
            );
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return NextResponse.json(
                { error: "Invalid email address" },
                { status: 400 }
            );
        }

        if (message.length < 10) {
            return NextResponse.json(
                { error: "Message must be at least 10 characters" },
                { status: 400 }
            );
        }

        let dbSaved = false;
        // Try to store in database if available
        try {
            const { prisma } = await import("@/lib/prisma");
            await prisma.message.create({
                data: { name, email, message },
            });
            dbSaved = true;
        } catch (dbError) {
            console.error("Database storage failed:", dbError);
            // We do not fail the request yet, fallback is the email notification
        }

        let emailSent = false;
        // Proceed to send email notification via Resend
        try {
            const resendApiKey = process.env.RESEND_API_KEY;
            if (!resendApiKey) {
                console.error("Missing RESEND_API_KEY in environment variables.");
            } else {
                const resend = new Resend(resendApiKey);
                const { data, error } = await resend.emails.send({
                from: "onboarding@resend.dev",
                to: process.env.NOTIFICATION_EMAIL as string,
                replyTo: email,
                subject: `New Contact Form Submission from ${name}`,
                html: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 10px;">
                        <h2 style="color: #333;">New Contact Message</h2>
                        <p><strong>Name:</strong> ${name}</p>
                        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
                        <div style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #d4af37; margin-top: 20px;">
                            <p style="white-space: pre-wrap; margin: 0; color: #555;">${message}</p>
                        </div>
                    </div>
                `,
            });

                if (error) {
                    console.error("Resend error:", error);
                } else {
                    console.log("Email sent successfully via Resend:", data);
                    emailSent = true;
                }
            }
        } catch (emailError) {
            console.error("Email notification failed:", emailError);
        }

        if (!dbSaved && !emailSent) {
            // Both failed
            return NextResponse.json(
                { error: "Failed to process message. Please try again later." },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { success: true, message: "Message received successfully" },
            { status: 200 }
        );
    } catch {
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

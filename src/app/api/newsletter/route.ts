import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { email } = body;

        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return NextResponse.json(
                { error: "Valid email is required" },
                { status: 400 }
            );
        }

        // Try to store in database if available
        try {
            const { prisma } = await import("@/lib/prisma");
            await prisma.newsletterSubscriber.create({
                data: { email },
            });
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : "";
            if (errorMessage.includes("Unique constraint")) {
                return NextResponse.json(
                    { success: true, message: "Already subscribed" },
                    { status: 200 }
                );
            }
            console.log("Database skip or error for newsletter subscriber:", err);
        }

        // Send a notification email to the admin/author
        try {
            const resendApiKey = process.env.RESEND_API_KEY;
            
            if (process.env.NOTIFICATION_EMAIL && resendApiKey) {
                const resend = new Resend(resendApiKey);
                await resend.emails.send({
                    from: "onboarding@resend.dev",
                    to: process.env.NOTIFICATION_EMAIL,
                    subject: "New Newsletter Subscriber!",
                    html: `
                        <div style="font-family: Arial, sans-serif; padding: 20px;">
                            <h2>New Subscriber 📬</h2>
                            <p>Good news! Someone just subscribed to your newsletter.</p>
                            <p><strong>Subscriber Email:</strong> <a href="mailto:${email}">${email}</a></p>
                        </div>
                    `,
                });
            }
        } catch (emailError) {
            console.error("Failed to notify admin via Resend:", emailError);
        }

        return NextResponse.json(
            { success: true, message: "Successfully subscribed" },
            { status: 200 }
        );
    } catch {
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

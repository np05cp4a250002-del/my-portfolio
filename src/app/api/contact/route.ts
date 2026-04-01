import { NextRequest, NextResponse } from "next/server";

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

        // Try to store in database if available
        try {
            const { prisma } = await import("@/lib/prisma");
            await prisma.message.create({
                data: { name, email, message },
            });
        } catch {
            // Database not configured — log to console as fallback
            console.log("📩 New contact message:", { name, email, message });
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

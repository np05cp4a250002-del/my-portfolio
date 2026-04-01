import { NextRequest, NextResponse } from "next/server";

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
            console.log("📮 New newsletter subscriber:", email);
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

import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(request: NextRequest) {
    try {
        const authHeader = request.headers.get("authorization");
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const token = authHeader.split(" ")[1];
        try {
            jwt.verify(token, process.env.JWT_SECRET || "default_secret_for_development_only");
        } catch {
            return NextResponse.json({ error: "Invalid token" }, { status: 401 });
        }

        const { prisma } = await import("@/lib/prisma");
        const messages = await prisma.message.findMany({
            orderBy: {
                createdAt: "desc"
            }
        });

        return NextResponse.json({ messages }, { status: 200 });
    } catch (error) {
        console.error("Failed to fetch messages:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

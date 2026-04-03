import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

export async function GET() {
    try {
        const { prisma } = await import("@/lib/prisma");
        const settings = await prisma.setting.findMany();
        
        // Convert array of {key, value} to object format {key: value}
        const settingsObject = settings.reduce((acc: Record<string, string>, curr) => {
            acc[curr.key] = curr.value;
            return acc;
        }, {});
        
        return NextResponse.json(settingsObject);
    } catch {
        return NextResponse.json({});
    }
}

export async function POST(request: NextRequest) {
    try {
        const authHeader = request.headers.get("authorization");
        if (!authHeader?.startsWith("Bearer ")) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const token = authHeader.split(" ")[1];
        const decoded = verifyToken(token);
        if (!decoded || decoded.role !== "admin") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json();
        
        if (typeof body !== "object" || body === null) {
            return NextResponse.json({ error: "Invalid data format" }, { status: 400 });
        }

        const { prisma } = await import("@/lib/prisma");
        
        // Use a transaction to perform all upserts
        const transaction = Object.entries(body).map(([key, value]) => {
            return prisma.setting.upsert({
                where: { key },
                update: { value: String(value) },
                create: { key, value: String(value) }
            });
        });
        
        await prisma.$transaction(transaction);
        
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Settings save error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

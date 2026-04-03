import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ type: string }> }
) {
    try {
        const { type } = await params;
        const { prisma } = await import("@/lib/prisma");
        
        let data = [];
        if (type === "education") {
            data = await prisma.education.findMany({ orderBy: { order: "asc" } });
        } else if (type === "experience") {
            data = await prisma.experience.findMany({ orderBy: { order: "asc" } });
        } else if (type === "skills") {
            data = await prisma.skill.findMany({ orderBy: { order: "asc" } });
        } else {
            return NextResponse.json({ error: "Invalid type" }, { status: 400 });
        }
        
        return NextResponse.json(data);
    } catch {
        return NextResponse.json([]);
    }
}

export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ type: string }> }
) {
    try {
        const authHeader = request.headers.get("authorization");
        if (!authHeader?.startsWith("Bearer ")) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const decoded = verifyToken(authHeader.split(" ")[1]);
        if (!decoded || decoded.role !== "admin") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const { type } = await params;
        const body = await request.json();
        const { prisma } = await import("@/lib/prisma");
        
        let created;
        if (type === "education") {
            created = await prisma.education.create({ data: body });
        } else if (type === "experience") {
            created = await prisma.experience.create({ data: body });
        } else if (type === "skills") {
            created = await prisma.skill.create({ data: body });
        } else {
            return NextResponse.json({ error: "Invalid type" }, { status: 400 });
        }
        
        return NextResponse.json(created, { status: 201 });
    } catch {
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

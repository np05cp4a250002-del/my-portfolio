import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ type: string, id: string }> }
) {
    try {
        const authHeader = request.headers.get("authorization");
        if (!authHeader?.startsWith("Bearer ")) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const decoded = verifyToken(authHeader.split(" ")[1]);
        if (!decoded || decoded.role !== "admin") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const { type, id } = await params;
        const body = await request.json();
        const { prisma } = await import("@/lib/prisma");
        
        let updated;
        if (type === "education") {
            updated = await prisma.education.update({ where: { id }, data: body });
        } else if (type === "experience") {
            updated = await prisma.experience.update({ where: { id }, data: body });
        } else if (type === "skills") {
            updated = await prisma.skill.update({ where: { id }, data: body });
        } else {
            return NextResponse.json({ error: "Invalid type" }, { status: 400 });
        }
        
        return NextResponse.json(updated);
    } catch {
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ type: string, id: string }> }
) {
    try {
        const authHeader = request.headers.get("authorization");
        if (!authHeader?.startsWith("Bearer ")) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const decoded = verifyToken(authHeader.split(" ")[1]);
        if (!decoded || decoded.role !== "admin") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const { type, id } = await params;
        const { prisma } = await import("@/lib/prisma");
        
        if (type === "education") {
            await prisma.education.delete({ where: { id } });
        } else if (type === "experience") {
            await prisma.experience.delete({ where: { id } });
        } else if (type === "skills") {
            await prisma.skill.delete({ where: { id } });
        } else {
            return NextResponse.json({ error: "Invalid type" }, { status: 400 });
        }
        
        return NextResponse.json({ success: true });
    } catch {
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

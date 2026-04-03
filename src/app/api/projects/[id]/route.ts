import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const { prisma } = await import("@/lib/prisma");
        const project = await prisma.project.findUnique({
            where: { id },
        });
        
        if (!project) return NextResponse.json({ error: "Not found" }, { status: 404 });
        return NextResponse.json(project);
    } catch {
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const authHeader = request.headers.get("authorization");
        if (!authHeader?.startsWith("Bearer ")) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const decoded = verifyToken(authHeader.split(" ")[1]);
        if (!decoded || decoded.role !== "admin") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const { id } = await params;
        const body = await request.json();
        const { prisma } = await import("@/lib/prisma");
        
        const project = await prisma.project.update({
            where: { id },
            data: body,
        });
        
        return NextResponse.json(project);
    } catch {
        return NextResponse.json({ error: "Internal error" }, { status: 500 });
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const authHeader = request.headers.get("authorization");
        if (!authHeader?.startsWith("Bearer ")) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const decoded = verifyToken(authHeader.split(" ")[1]);
        if (!decoded || decoded.role !== "admin") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const { id } = await params;
        const { prisma } = await import("@/lib/prisma");
        
        await prisma.project.delete({ where: { id } });
        return NextResponse.json({ success: true });
    } catch {
        return NextResponse.json({ error: "Internal error" }, { status: 500 });
    }
}

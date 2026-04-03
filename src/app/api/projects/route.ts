import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

export async function GET() {
    try {
        const { prisma } = await import("@/lib/prisma");
        const projects = await prisma.project.findMany({
            orderBy: { createdAt: "desc" },
        });
        return NextResponse.json(projects);
    } catch {
        return NextResponse.json([]);
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
        const { title, slug, description, content, category, featured, imageUrl, githubUrl, liveUrl } = body;

        if (!title || !slug || !description || !category) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const { prisma } = await import("@/lib/prisma");
        const project = await prisma.project.create({
            data: {
                title,
                slug,
                description,
                content: content || "",
                category,
                featured: featured ?? false,
                imageUrl,
                githubUrl,
                liveUrl
            },
        });

        return NextResponse.json(project, { status: 201 });
    } catch {
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

// GET: List all blog posts (public endpoint)
export async function GET() {
    try {
        const { prisma } = await import("@/lib/prisma");
        const posts = await prisma.blogPost.findMany({
            where: { published: true },
            orderBy: { createdAt: "desc" },
            select: {
                id: true,
                title: true,
                slug: true,
                excerpt: true,
                category: true,
                createdAt: true,
            },
        });
        return NextResponse.json(posts);
    } catch {
        // Return empty array if DB not configured
        return NextResponse.json([]);
    }
}

// POST: Create a new blog post (admin only)
export async function POST(request: NextRequest) {
    try {
        // Auth check
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
        const { title, slug, excerpt, content, category, published } = body;

        if (!title || !slug || !excerpt || !content || !category) {
            return NextResponse.json(
                { error: "All fields are required" },
                { status: 400 }
            );
        }

        const { prisma } = await import("@/lib/prisma");
        const post = await prisma.blogPost.create({
            data: {
                title,
                slug,
                excerpt,
                content,
                category,
                published: published ?? false,
            },
        });

        return NextResponse.json(post, { status: 201 });
    } catch {
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

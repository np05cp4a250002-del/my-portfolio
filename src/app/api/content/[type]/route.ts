import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

function requireAdmin(request: NextRequest): { ok: true } | { ok: false; response: NextResponse } {
  const authHeader = request.headers.get("authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return { ok: false, response: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) };
  }
  const decoded = verifyToken(authHeader.split(" ")[1]);
  if (!decoded || decoded.role !== "admin") {
    return { ok: false, response: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) };
  }
  return { ok: true };
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ type: string }> }
) {
  try {
    const { type } = await params;
    const { prisma } = await import("@/lib/prisma");

    if (type === "home-highlights") {
      return NextResponse.json(await prisma.homeHighlight.findMany({ orderBy: { order: "asc" } }));
    }
    if (type === "about-values") {
      return NextResponse.json(await prisma.aboutValue.findMany({ orderBy: { order: "asc" } }));
    }
    if (type === "about-leadership") {
      return NextResponse.json(await prisma.aboutLeadershipItem.findMany({ orderBy: { order: "asc" } }));
    }
    if (type === "resume-certifications") {
      return NextResponse.json(await prisma.resumeCertification.findMany({ orderBy: { order: "asc" } }));
    }
    if (type === "navigation-links") {
      return NextResponse.json(await prisma.navigationLink.findMany({ orderBy: { order: "asc" } }));
    }
    if (type === "contact-items") {
      return NextResponse.json(await prisma.contactItem.findMany({ orderBy: { order: "asc" } }));
    }

    return NextResponse.json({ error: "Invalid type" }, { status: 400 });
  } catch {
    return NextResponse.json([]);
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ type: string }> }
) {
  const auth = requireAdmin(request);
  if (!auth.ok) return auth.response;

  try {
    const { type } = await params;
    const body = await request.json();
    const { prisma } = await import("@/lib/prisma");

    if (type === "home-highlights") {
      return NextResponse.json(await prisma.homeHighlight.create({ data: body }), { status: 201 });
    }
    if (type === "about-values") {
      return NextResponse.json(await prisma.aboutValue.create({ data: body }), { status: 201 });
    }
    if (type === "about-leadership") {
      return NextResponse.json(await prisma.aboutLeadershipItem.create({ data: body }), { status: 201 });
    }
    if (type === "resume-certifications") {
      return NextResponse.json(await prisma.resumeCertification.create({ data: body }), { status: 201 });
    }
    if (type === "navigation-links") {
      return NextResponse.json(await prisma.navigationLink.create({ data: body }), { status: 201 });
    }
    if (type === "contact-items") {
      return NextResponse.json(await prisma.contactItem.create({ data: body }), { status: 201 });
    }

    return NextResponse.json({ error: "Invalid type" }, { status: 400 });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}


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

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ type: string; id: string }> }
) {
  const auth = requireAdmin(request);
  if (!auth.ok) return auth.response;

  try {
    const { type, id } = await params;
    const body = await request.json();
    const { prisma } = await import("@/lib/prisma");

    if (type === "home-highlights") {
      return NextResponse.json(await prisma.homeHighlight.update({ where: { id }, data: body }));
    }
    if (type === "about-values") {
      return NextResponse.json(await prisma.aboutValue.update({ where: { id }, data: body }));
    }
    if (type === "about-leadership") {
      return NextResponse.json(await prisma.aboutLeadershipItem.update({ where: { id }, data: body }));
    }
    if (type === "resume-certifications") {
      return NextResponse.json(await prisma.resumeCertification.update({ where: { id }, data: body }));
    }
    if (type === "navigation-links") {
      return NextResponse.json(await prisma.navigationLink.update({ where: { id }, data: body }));
    }
    if (type === "contact-items") {
      return NextResponse.json(await prisma.contactItem.update({ where: { id }, data: body }));
    }

    return NextResponse.json({ error: "Invalid type" }, { status: 400 });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ type: string; id: string }> }
) {
  const auth = requireAdmin(request);
  if (!auth.ok) return auth.response;

  try {
    const { type, id } = await params;
    const { prisma } = await import("@/lib/prisma");

    if (type === "home-highlights") {
      await prisma.homeHighlight.delete({ where: { id } });
      return NextResponse.json({ success: true });
    }
    if (type === "about-values") {
      await prisma.aboutValue.delete({ where: { id } });
      return NextResponse.json({ success: true });
    }
    if (type === "about-leadership") {
      await prisma.aboutLeadershipItem.delete({ where: { id } });
      return NextResponse.json({ success: true });
    }
    if (type === "resume-certifications") {
      await prisma.resumeCertification.delete({ where: { id } });
      return NextResponse.json({ success: true });
    }
    if (type === "navigation-links") {
      await prisma.navigationLink.delete({ where: { id } });
      return NextResponse.json({ success: true });
    }
    if (type === "contact-items") {
      await prisma.contactItem.delete({ where: { id } });
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Invalid type" }, { status: 400 });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}


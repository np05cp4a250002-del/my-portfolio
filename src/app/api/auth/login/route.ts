import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { signToken } from "@/lib/auth";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { email, password } = body;

        if (!email || !password) {
            return NextResponse.json(
                { error: "Email and password are required" },
                { status: 400 }
            );
        }

        try {
            const { prisma } = await import("@/lib/prisma");
            const user = await prisma.user.findUnique({
                where: { email },
            });

            if (!user) {
                return NextResponse.json(
                    { error: "Invalid credentials" },
                    { status: 401 }
                );
            }

            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) {
                return NextResponse.json(
                    { error: "Invalid credentials" },
                    { status: 401 }
                );
            }

            const token = signToken({
                userId: user.id,
                email: user.email,
                role: user.role,
            });

            return NextResponse.json({
                success: true,
                token,
                user: { id: user.id, name: user.name, email: user.email },
            });
        } catch {
            return NextResponse.json(
                { error: "Database not configured. Set DATABASE_URL to enable authentication." },
                { status: 503 }
            );
        }
    } catch {
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

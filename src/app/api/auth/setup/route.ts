import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { email, password, name } = body;

        if (!email || !password || !name) {
            return NextResponse.json(
                { error: "Email, password, and name are required" },
                { status: 400 }
            );
        }

        try {
            const { prisma } = await import("@/lib/prisma");
            
            // SECURITY CHECK: Only allow this route to work if NO users exist yet
            // This prevents anyone from creating another admin account after you've set yours up!
            const userCount = await prisma.user.count();
            if (userCount > 0) {
                return NextResponse.json(
                    { error: "Setup has already been completed. An admin user currently exists." },
                    { status: 403 }
                );
            }

            // Hash the password securely
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create the first admin user
            const user = await prisma.user.create({
                data: {
                    email,
                    password: hashedPassword,
                    name,
                    role: "admin",
                },
            });

            return NextResponse.json({
                success: true,
                message: "Admin account successfully created!",
                user: { id: user.id, name: user.name, email: user.email },
            });
        } catch (dbError) {
            console.error("Database error in setup route:", dbError);
            return NextResponse.json(
                { error: "Database not configured or error creating user. Ensure DATABASE_URL is set." },
                { status: 503 }
            );
        }
    } catch (error) {
        console.error("Server error in setup route:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

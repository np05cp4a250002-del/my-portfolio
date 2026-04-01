import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "pramesh-portfolio-secret-key-change-in-production";

export function signToken(payload: { userId: string; email: string; role: string }): string {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string): { userId: string; email: string; role: string } | null {
    try {
        return jwt.verify(token, JWT_SECRET) as { userId: string; email: string; role: string };
    } catch {
        return null;
    }
}

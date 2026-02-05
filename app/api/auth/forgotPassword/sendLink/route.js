export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { SendResetPasswordEmail } from "@/lib/email/sendResetPasswordEmail";
import crypto from "crypto";

export async function POST(req) {
    try {
        // ✅ Lazy import Prisma (build-safe)
        const { default: prisma } = await import("@/lib/prisma");

        const email = await req.json();

        // ✅ Validation
        if (!email) {
            return NextResponse.json(
                { error: "Email is required" },
                { status: 400 }
            );
        }

        // ✅ Find user (do NOT expose result)
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (user) {
            // ✅ Generate secure token
            const token = crypto.randomBytes(32).toString("hex");
            const tokenHash = crypto
                .createHash("sha256")
                .update(token)
                .digest("hex");

            const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 min

            // ✅ Remove old tokens for same email
            await prisma.passwordReset.deleteMany({
                where: { userId: email },
            });

            // ✅ Store new token
            await prisma.passwordReset.create({
                data: {
                    userId: email,
                    tokenHash,
                    expiresAt,
                },
            });

            // ✅ Reset URL (email integration later)
            const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${token}`;

            await SendResetPasswordEmail({
                email,
                resetLink: resetUrl,
            });

        }

        // ✅ Always return same response (security)
        return NextResponse.json(
            {
                success: true,
            },
            { status: 200 }
        );

    } catch (err) {
        console.error("[forgot password error]", err);
        return NextResponse.json(
            { error: "Server error" },
            { status: 500 }
        );
    }
}

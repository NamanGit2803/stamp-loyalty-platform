export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import crypto from "crypto";
import bcrypt from "bcryptjs";

export async function POST(req) {
    try {
        // lazy prisma import (build-safe)
        const { default: prisma } = await import("@/lib/prisma");

        const body = await req.json();
        const { token, password } = body;


        // Validation
        if (!token || !password) {
            return NextResponse.json(
                { error: "Token and new password are required" },
                { status: 400 }
            );
        }

        // hash incoming token to match stored one
        const tokenHash = crypto
            .createHash("sha256")
            .update(token)
            .digest("hex");

        // find reset token
        const reset = await prisma.passwordReset.findUnique({
            where: { tokenHash },
        });


        if (!reset) {
            return NextResponse.json(
                { error: "Invalid or expired token" },
                { status: 400 }
            );
        }



        // check expiry
        if (reset.expiresAt.getTime() < Date.now()) {
            return NextResponse.json(
                { error: "Reset link has expired" },
                { status: 400 }
            );
        }

        // find user with email
        const user = await prisma.user.findUnique({
            where: { email: reset.userId },
        });

        if (!user) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        // hash new password with bcrypt
        const hashedPassword = await bcrypt.hash(password, 10);

        // update password
        await prisma.user.update({
            where: { email: reset.userId },
            data: { password: hashedPassword },
        });

        // delete ALL reset tokens for this email
        await prisma.passwordReset.deleteMany({
            where: { userId: reset.userId },
        });

        return NextResponse.json(
            {
                success: true,
                message: "Password has been reset successfully.",
            },
            { status: 200 }
        );
    } catch (err) {
        console.error("[reset password error]", err);
        return NextResponse.json(
            { error: "Server error" },
            { status: 500 }
        );
    }
}

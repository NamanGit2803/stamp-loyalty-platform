export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req) {
    try {
        // ✅ Lazy import Prisma (build-safe)
        const { default: prisma } = await import("@/lib/prisma");

        const body = await req.json();
        const { email, password } = body;

        // ✅ same validation
        if (!email || !password) {
            return NextResponse.json(
                { error: "Email and password are required" },
                { status: 400 }
            );
        }

        // ✅ same user lookup
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            return NextResponse.json(
                { error: "User not found. Please sign up." },
                { status: 401 }
            );
        }

        // ✅ same shop lookup
        const shop = await prisma.shop.findFirst({
            where: { ownerId: user.email },
        });

        if (!shop) {
            return NextResponse.json(
                { error: "Shop not registered." },
                { status: 401 }
            );
        }

        // ✅ same password check
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return NextResponse.json(
                { error: "Incorrect password" },
                { status: 401 }
            );
        }

        // ✅ env guard
        if (!process.env.JWT_SECRET) {
            return NextResponse.json(
                { error: "Server misconfiguration" },
                { status: 500 }
            );
        }

        // ✅ runtime-only JWT import
        const jwt = (await import("jsonwebtoken")).default;

        // ✅ same token payload & expiry
        const token = jwt.sign(
            { email: user.email, name: user.name, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        const response = NextResponse.json(
            {
                success: true,
                user,
                shopId: shop.id,
            },
            { status: 201 }
        );

        // ✅ cookies are sync
        response.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production" && !!process.env.VERCEL,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60,
            path: "/",
        });

        return response;

    } catch (err) {
        console.error("[login error]", err);
        return NextResponse.json(
            { error: "Server error" },
            { status: 500 }
        );
    }
}

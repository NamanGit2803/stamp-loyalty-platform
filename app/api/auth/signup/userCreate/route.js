export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    // ✅ Lazy import Prisma (build-safe)
    const { default: prisma } = await import("@/lib/prisma");

    const body = await req.json();
    const { name, email, password, checkOnly } = body;

    // ✅ SAME: check if user exists
    const existing = await prisma.user.findUnique({
      where: { email },
    });

    const shop = await prisma.shop.findFirst({
      where: { ownerId: email },
    });

    if (existing) {
      if (!shop) {
        return NextResponse.json(
          { error: "Shop not registered" },
          { status: 400 }
        );
      }
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // ✅ SAME: only checking availability
    if (checkOnly) {
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    // ---------- CREATE USER ----------
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: "SHOP",
      },
    });

    if (!process.env.JWT_SECRET) {
      return NextResponse.json(
        { error: "Server misconfiguration" },
        { status: 500 }
      );
    }

    // ✅ Runtime-only JWT import
    const jwt = (await import("jsonwebtoken")).default;

    const token = jwt.sign(
      {
        email: newUser.email,
        name: newUser.name,
        role: newUser.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    const { password: _, ...userWithoutPassword } = newUser;

    const response = NextResponse.json(
      { success: true, user: userWithoutPassword },
      { status: 201 }
    );

    // ✅ cookies.set is synchronous (NO await)
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production" && !!process.env.VERCEL,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    });

    return response;

  } catch (err) {
    console.error("[signup error]", err);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}

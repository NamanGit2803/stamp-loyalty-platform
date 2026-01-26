export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { sendOtpEmail } from "@/lib/email/sendOtpEmail";
import { rateLimit } from "@/lib/rateLimit";

export async function POST(req) {
  try {
    // Lazy import Prisma (build-safe)
    const { default: prisma } = await import("@/lib/prisma");

    const { email, purpose } = await req.json();

    if (!email) {
      return NextResponse.json(
        { error: "Email required" },
        { status: 400 }
      );
    }

    // Rate limit OTP requests
    if (!rateLimit(email)) {
      return NextResponse.json(
        { error: "Too many OTP requests. Please try again later." },
        { status: 429 }
      );
    }

    // Generate 6-digit OTP
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    // Save OTP to DB
    await prisma.otp.upsert({
      where: { email },
      update: {
        code,
        purpose,
        expiresAt,
      },
      create: {
        email,
        code,
        purpose,
        expiresAt,
      },
    });

    // ✅ Send OTP via AWS SES
    await sendOtpEmail({
      to: email,
      otp: code,
    });

    return NextResponse.json({ success: true });

  } catch (err) {
    console.error("[otp send error]", err);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}

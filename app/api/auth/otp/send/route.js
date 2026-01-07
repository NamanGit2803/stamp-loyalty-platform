export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req) {
  try {
    const { email, purpose } = await req.json();

    if (!email) {
      return NextResponse.json(
        { error: "Email required" },
        { status: 400 }
      );
    }

    // generate 6-digit OTP
    const code = Math.floor(100000 + Math.random() * 900000).toString();

    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    // save OTP to DB
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

    // TODO: send email or SMS
    console.log("OTP for", email, "=", code);

    return NextResponse.json({ success: true });

  } catch (err) {
    console.error("[otp send error]", err);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}

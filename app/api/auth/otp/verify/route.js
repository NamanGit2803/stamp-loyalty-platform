export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import { NextResponse } from "next/server";


export async function POST(req) {
  try {
    // ✅ Lazy import Prisma (build-safe)
    const { default: prisma } = await import("@/lib/prisma");

    const { email, code, purpose } = await req.json();

    const otpRecord = await prisma.otp.findUnique({
      where: { email },
    });

    if (!otpRecord)
      return NextResponse.json({ error: "OTP not found" }, { status: 400 });

    if (otpRecord.code !== code)
      return NextResponse.json({ error: "Incorrect OTP" }, { status: 400 });

    if (otpRecord.purpose !== purpose)
      return NextResponse.json({ error: "OTP purpose mismatch" }, { status: 400 });

    if (otpRecord.expiresAt < new Date())
      return NextResponse.json({ error: "OTP expired" }, { status: 400 });


    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

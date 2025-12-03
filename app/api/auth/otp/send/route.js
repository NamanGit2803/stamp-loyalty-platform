import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function POST(req) {
  try {
    const { email, purpose } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email required" }, { status: 400 });
    }

    // generate 6-digit OTP
    const code = Math.floor(100000 + Math.random() * 900000).toString();

    // save OTP to DB
    await prisma.otp.upsert({
      where: { email },
      update: {
        code,
        purpose,
        expiresAt: new Date(Date.now() + 5 * 60 * 1000), // 5 min
      },
      create: {
        email,
        code,
        purpose,
        expiresAt: new Date(Date.now() + 5 * 60 * 1000),
      },
    });

    // TODO: send email or SMS here  
    console.log("OTP for", email, "=", code);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

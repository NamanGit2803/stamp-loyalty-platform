export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { sendWelcomeEmail } from "@/lib/email/sendWelcomeEmail";

export async function POST(req) {
  try {
    const { email, name, shopName, trialEndDate, dashboardUrl } = await req.json();

    // SEND WELCOME EMAIL (server-side)
    await sendWelcomeEmail({
      to: email,
      name,
      shopName,
      trialEndDate,
      dashboardUrl,
    });

    return NextResponse.json({ success: true });

  } catch (err) {
    console.error("[send-welcome error]", err);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}

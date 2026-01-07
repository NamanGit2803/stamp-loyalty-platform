export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    // ✅ Lazy import Prisma (build-safe)
    const { default: prisma } = await import("@/lib/prisma");

    const user = await verifyJwt(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { shopId } = await req.json();
    if (!shopId) {
      return NextResponse.json({ error: "shopId is required" }, { status: 400 });
    }

    const updated = await prisma.subscription.updateMany({
      where: { shopId },
      data: {
        status: "cancelled",
        endDate: new Date()
      }
    });

    return NextResponse.json({ success: true });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

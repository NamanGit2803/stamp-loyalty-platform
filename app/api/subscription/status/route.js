export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import { NextResponse } from "next/server";


export async function POST(req) {
  try {
    // ✅ Lazy import Prisma (build-safe)
    const { default: prisma } = await import("@/lib/prisma");

    const { shopId } = await req.json();
    if (!shopId) {
      return NextResponse.json({ error: "shopId required" }, { status: 400 });
    }

    const subscription = await prisma.subscription.findFirst({
      where: { shopId }
    });

    return NextResponse.json({ subscription });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

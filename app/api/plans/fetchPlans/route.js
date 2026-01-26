export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Lazy import Prisma (build-safe)
    const { default: prisma } = await import("@/lib/prisma");

    const plans = await prisma.plan.findMany({
      orderBy: { price: "asc" }, // optional: lowest first
    });

    return NextResponse.json(
      { success: true, plans },
      { status: 200 }
    );

  } catch (err) {
    console.error("fetch plans error:", err);

    return NextResponse.json(
      { success: false, message: "Failed to load plans" },
      { status: 500 }
    );
  }
}

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    // ✅ Lazy import Prisma (build-safe)
    const { default: prisma } = await import("@/lib/prisma");

    const body = await req.json();
    const { shopId } = body;

    if (!shopId) {
      return NextResponse.json(
        { error: "Missing shopId" },
        { status: 400 }
      );
    }

    const shop = await prisma.shop.findUnique({
      where: { id: shopId },
      select: {
        id: true,
        shopName: true,
      },
    });

    if (!shop) {
      return NextResponse.json(
        { exists: false, error: "Invalid shopId" },
        { status: 404 }
      );
    }

    if (!shop.loyaltyEnabled) {
      return NextResponse.json(
        { exists: false, error: "pauseLoyalty" },
        { status: 423 }
      );
    }

    return NextResponse.json({
      exists: true,
      shop
    });

  } catch (err) {
    console.error("CheckShop API Error:", err);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}

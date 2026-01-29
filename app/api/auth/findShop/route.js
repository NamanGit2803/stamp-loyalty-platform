export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    // ✅ Lazy import Prisma (build-safe)
    const { default: prisma } = await import("@/lib/prisma");

    const token = req.cookies.get("token")?.value;

    if (!token || !process.env.JWT_SECRET) {
      return NextResponse.json({ shop: null }, { status: 200 });
    }

    const jwt = (await import("jsonwebtoken")).default;

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch {
      return NextResponse.json({ shop: null }, { status: 200 });
    }

    const shop = await prisma.shop.findFirst({
      where: { ownerId: decoded.email },
    });

    if(!shop){
      return NextResponse.json(
        { error: "Shop not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ shop: shop }, {status: 200});

  } catch (err) {
    console.error("findShop error:", err);
    return NextResponse.json({ shop: null }, { status: 200 });
  }
}

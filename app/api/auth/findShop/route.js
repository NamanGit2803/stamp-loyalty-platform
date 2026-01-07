export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const cookieStore =await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token || !process.env.JWT_SECRET) {
      return NextResponse.json({ shop: null }, { status: 200 });
    }

    // ✅ Import JWT ONLY at runtime
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

    return NextResponse.json({ shop: shop ?? null });

  } catch (err) {
    console.error("findShop error:", err);
    return NextResponse.json({ shop: null }, { status: 200 });
  }
}

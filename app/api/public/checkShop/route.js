import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req) {
  try {
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

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import { NextResponse } from "next/server"
import { nanoid } from "nanoid"



export async function POST(req) {
  try {
    // ✅ Lazy import Prisma (build-safe)
    const { default: prisma } = await import("@/lib/prisma");

    const body = await req.json()
    const { shopName, phone, upiId, businessType, address, minAmount, targetStamp, reward, ownerId } = body


    //  CHECK IF SHOP ALREADY EXISTS FOR THIS OWNER
    const existingShop = await prisma.shop.findFirst({
      where: { ownerId },
    })

    if (existingShop) {
      return NextResponse.json(
        { error: "Shop already exists for this user." },
        { status: 400 }
      )
    }

    const customId = `shop_${nanoid(8)}`


    // Create new shop
    const newShop = await prisma.shop.create({
      data: {
        id: customId,
        ownerId,
        shopName,
        phone,
        upiId,
        businessType,
        address,
        minAmount,
        targetStamps: targetStamp,
        reward
      },
    })

    // Create response
    return NextResponse.json({ newShop }, { status: 201 })

  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}

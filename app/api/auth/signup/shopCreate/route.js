import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { NextResponse } from "next/server"
import { nanoid } from "nanoid"

const prisma = new PrismaClient()

export async function POST(req) {
  try {
    const body = await req.json()
    const { shopName, phone, businessType, address, minAmount, targetStamp, reward } = body

    const customId = `shop_${nanoid(8)}`


    // Create new shop
    const newShop = await prisma.shop.create({
      data: {
        id: customId,
        ownerId: 
        shopName,
        phone,
        businessType,
        address,
        minAmount,
        targetStamp,
        reward
      },
    })

    // Create response
    const response = NextResponse.json(
      { success: true, user: userWithoutPassword, token },
      { status: 201 }
    )

    return response
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}

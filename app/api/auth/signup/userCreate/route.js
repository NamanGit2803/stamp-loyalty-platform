import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { NextResponse } from "next/server"

const prisma = new PrismaClient()

export async function POST(req) {
  try {
    const body = await req.json()
    const { name, email, password, checkOnly } = body

    // Check if user exists
    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) {

      // If not checkOnly — still return same error
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      )
    }

    // If request is only checking, return positive response
    if (checkOnly) {
      return NextResponse.json({ ok: true }, { status: 200 })
    }

    // ---------- CREATE USER BELOW ----------
    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: "SHOP",
      },
    })

    const token = jwt.sign(
      { email: newUser.email, name: newUser.name, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    )

    const { password: _, ...userWithoutPassword } = newUser

    const response = NextResponse.json(
      { success: true, user: userWithoutPassword },
      { status: 201 }
    )

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    })

    return response
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}

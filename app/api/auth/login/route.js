import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { NextResponse } from "next/server"

const prisma = new PrismaClient()

export async function POST(req) {
    try {
        const body = await req.json()
        const { email, password } = body

        // check for email & password 
        if (!email || !password) {
            return NextResponse.json(
                { error: "Email and password are required" },
                { status: 400 }
            );
        }

        // Check if user exists
        const user = await prisma.user.findUnique({ where: { email } })
        if (!user) {
            return NextResponse.json(
                { error: "User not found. Please sign up." },
                { status: 401 }
            )
        }


        // finding shop with this email
        const shop = await prisma.shop.findFirst({
            where: { ownerId: user.email }
        });
        if (!shop) {
            return NextResponse.json(
                { error: "Shop not registered." },
                { status: 401 }
            )
        }


        // password match 
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return NextResponse.json(
                { error: "Incorrect password" },
                { status: 401 }
            );
        }

        // token create 
        const token = jwt.sign(
            { email: user.email, name: user.name, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        )



        const response = NextResponse.json(
            { success: true, user: user, shopId: shop.id},
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

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const prisma = new PrismaClient();

export async function GET(req) {
    try {
        // Reads JWT from cookies automatically
        const token = cookies().get("token")?.value;

        if (!token) {
            return NextResponse.json(
                { error: "Not authenticated" },
                { status: 401 }
            );
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);


        const shop = await prisma.shop.findFirst({
            where: { ownerId: decoded.email }
        });

        if (!shop) {
            return NextResponse.json({ shop: null }, { status: 200 });

        }

        return NextResponse.json({ shop });

    } catch (err) {
        console.error(err);
        return NextResponse.json({ shop: null }, { status: 200 });
    }
}

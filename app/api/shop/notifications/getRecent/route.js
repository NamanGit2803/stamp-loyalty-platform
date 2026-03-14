export const dynamic = "force-dynamic"
export const runtime = "nodejs"

import { NextResponse } from "next/server"

export async function POST(req) {
    try {
        const body = await req.json()
        const shopId = body.shopId

        if (!shopId) {
            return NextResponse.json(
                { error: "shopId missing", notifications: [] },
                { status: 400 }
            )
        }

        const { default: prisma } = await import("@/lib/prisma")

        // Fetch last 5 notifications
        const notifications = await prisma.notification.findMany({
            where: { shopId },
            orderBy: { createdAt: "desc" },
            take: 5,
        })

        return NextResponse.json(
            {
                notifications,
            },
            { status: 200 }
        )
    } catch (err) {
        console.error("findShop error:", err)
        return NextResponse.json(
            { notifications: [] },
            { status: 500 }
        )
    }
}
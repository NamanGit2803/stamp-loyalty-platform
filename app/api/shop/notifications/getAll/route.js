export const dynamic = "force-dynamic"
export const runtime = "nodejs"

import { NextResponse } from "next/server"

export async function POST(req) {
    try {

        const body = await req.json()

        const { shopId, cursor, search } = body

        if (!shopId) {
            return NextResponse.json(
                { error: "shopId missing", notifications: [] },
                { status: 400 }
            )
        }

        const { default: prisma } = await import("@/lib/prisma")

        const notifications = await prisma.notification.findMany({
            where: {
                shopId,
                ...(search && {
                    OR: [
                        {
                            title: {
                                contains: search,
                                mode: "insensitive",
                            },
                        },
                        {
                            message: {
                                contains: search,
                                mode: "insensitive",
                            },
                        },
                    ],
                }),
            },

            orderBy: {
                createdAt: "desc",
            },

            take: 10,

            ...(cursor && {
                cursor: { id: cursor },
                skip: 1,
            }),
        })


        const nextCursor =
            notifications.length > 0
                ? notifications[notifications.length - 1].id
                : null


        return NextResponse.json(
            {
                notifications,
                nextCursor,
            },
            { status: 200 }
        )

    } catch (err) {

        console.error("notifications error:", err)

        return NextResponse.json(
            { notifications: [] },
            { status: 500 }
        )

    }
}
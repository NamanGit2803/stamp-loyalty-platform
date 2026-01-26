export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { default: prisma } = await import("@/lib/prisma");

        const body = await req.json();
        const {
            shopId,
            page = 1,
            limit = 10,
            search = "",
            date = ""
        } = body;

        if (!shopId) {
            return NextResponse.json(
                { error: "shopId is required" },
                { status: 400 }
            );
        }

        const skip = (page - 1) * limit;

        // WHERE FILTER
        const where = {
            shopId,
            AND: []
        };

        // SEARCH → customer.name / customer.phone
        if (search) {
            where.AND.push({
                customer: {
                    OR: [
                        { name: { contains: search} },
                        { phone: { contains: search } }
                    ]
                }
            });
        }

        // DATE FILTER
        if (date) {
            where.AND.push({
                createdAt: {
                    gte: new Date(date + "T00:00:00"),
                    lte: new Date(date + "T23:59:59")
                }
            });
        }

        // FETCH DATA
        const rewards = await prisma.reward.findMany({
            where,
            skip,
            take: limit,
            orderBy: { createdAt: "desc" },
            include: {
                customer: true // so we can show name/phone in table
            }
        });

        // TOTAL COUNT
        const total = await prisma.reward.count({ where });

        return NextResponse.json({
            success: true,
            data: rewards,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit)
            }
        });

    } catch (err) {
        console.error("Rewards API error:", err);
        return NextResponse.json(
            { error: "Server Error" },
            { status: 500 }
        );
    }
}

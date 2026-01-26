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
            date = "",
            status = "all"
        } = body;

        if (!shopId) {
            return NextResponse.json(
                { error: "shopId is required" },
                { status: 400 }
            );
        }

        const skip = (page - 1) * limit;

        // -------------------------
        // BUILD WHERE CONDITION
        // -------------------------

        const where = { shopId };

        // Status filter
        if (status !== "all") {
            where.status = status;
        }

        // Date filter (full day)
        if (date) {
            const startUTC = new Date(date + "T00:00:00.000Z");
            const endUTC = new Date(date + "T23:59:59.999Z");

            where.createdAt = { gte: startUTC, lte: endUTC };
        }


        // Search filter
        if (search.trim()) {
            where.OR = [
                { utr: { contains: search } },
                { phone: { contains: search } },

                // amount search (numeric)
                !isNaN(Number(search))
                    ? { amount: Number(search) }
                    : undefined
            ].filter(Boolean);
        }

        // -------------------------
        // QUERY DB
        // -------------------------
        const items = await prisma.scanVerification.findMany({
            where,
            skip,
            take: limit,
            orderBy: { createdAt: "desc" },
            include: {
                customer: true
            }
        });

        const total = await prisma.scanVerification.count({
            where,
        });

        // -------------------------
        // RESPONSE
        // -------------------------
        return NextResponse.json({
            success: true,
            data: items,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        });

    } catch (err) {
        console.error("Scan Verification API error:", err);
        return NextResponse.json(
            { error: "Server Error" },
            { status: 500 }
        );
    }
}

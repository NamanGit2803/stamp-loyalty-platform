export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import { NextResponse } from "next/server";

// Convert UTC → IST
function toIST(date) {
    const d = new Date(date);
    const utc = d.getTime() + d.getTimezoneOffset() * 60000;
    return new Date(utc + 5.5 * 60 * 60 * 1000);
}

export async function POST(req) {
    try {
        const { default: prisma } = await import("@/lib/prisma");

        const body = await req.json();
        const { shopId } = body;

        if (!shopId) {
            return NextResponse.json(
                { error: "Shop ID is required" },
                { status: 400 }
            );
        }

        /* ---------------------------------------------
           📌 Generate correct IST month boundaries
        ---------------------------------------------- */
        const nowIST = toIST(new Date());

        const monthStartIST = new Date(
            nowIST.getFullYear(),
            nowIST.getMonth(),
            1
        );

        const nextMonthIST = new Date(
            nowIST.getFullYear(),
            nowIST.getMonth() + 1,
            1
        );

        /* ---------------------------------------------
           1️⃣ Revenue (This IST Month)
        ---------------------------------------------- */
        const revenueData = await prisma.scanVerification.aggregate({
            where: {
                shopId,
                status: 'success',
                createdAt: {
                    gte: monthStartIST,
                    lt: nextMonthIST
                }
            },
            _sum: { amount: true },
            _count: { id: true },
        });

        const revenue = revenueData._sum.amount || 0;

        /* ---------------------------------------------
          2️⃣ Stamps Given (This IST Month)
       ---------------------------------------------- */
        const stampsGiven = revenueData._count.id || 0;

        /* ---------------------------------------------
           3️⃣ Rewards Redeemed (This IST Month)
        ---------------------------------------------- */
        const rewardsRedeemed = await prisma.reward.count({
            where: {
                shopId,
                createdAt: {
                    gte: monthStartIST,
                    lt: nextMonthIST
                }
            }
        });

        /* ---------------------------------------------
           4️⃣ Repeat Customer Rate (IST Month)
        ---------------------------------------------- */
        const visits = await prisma.scanVerification.groupBy({
            by: ["customerId"],
            where: {
                shopId,
                status: 'success',
                createdAt: {
                    gte: monthStartIST,
                    lt: nextMonthIST
                }
            },
            _count: { id: true }
        });

        const allVisitors = visits.length;
        const returning = visits.filter(v => v._count.id > 1).length;

        const repeatRate =
            allVisitors > 0
                ? Math.round((returning / allVisitors) * 100)
                : 0;

        /* ---------------------------------------------
           5️⃣ Best Customers (Lifetime)
        ---------------------------------------------- */
        const bestCustomers = await prisma.customer.findMany({
            where: { shopId },
            orderBy: { totalStampCount: "desc" },
            take: 5
        });

        /* ---------------------------------------------
           6️⃣ Close To Reward
        ---------------------------------------------- */
        const shop = await prisma.shop.findUnique({
            where: { id: shopId },
            select: { targetStamps: true }
        });

        const target = shop?.targetStamps || 0;

        const closeToReward = await prisma.customer.findMany({
            where: {
                shopId,
                stampCount: {
                    gte: Number(target) - 4,
                    lt: Number(target)
                }
            },
            take: 5
        });

        return NextResponse.json({
            revenue,
            stampsGiven,
            rewardsRedeemed,
            repeatRate,
            bestCustomers,
            closeToReward,
            monthStartIST,
            nextMonthIST
        });

    } catch (error) {
        console.error("Dashboard Stats Error:", error);
        return NextResponse.json(
            { error: error.message || "Something went wrong" },
            { status: 500 }
        );
    }
}

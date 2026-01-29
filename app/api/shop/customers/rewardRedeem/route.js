
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { nanoid } from "nanoid"

export async function POST(req) {
    try {
        const { default: prisma } = await import("@/lib/prisma");

        const body = await req.json();
        const { customerId, shopId, requiredStamps = 10, rewardText } = body;

        if (!customerId || !shopId) {
            return NextResponse.json(
                { error: "CustomerId and shopId are required." },
                { status: 400 }
            );
        }

        // FETCH CUSTOMER
        const customer = await prisma.customer.findUnique({
            where: { id: customerId }
        });

        if (!customer) {
            return NextResponse.json(
                { error: "Customer not found" },
                { status: 404 }
            );
        }

        // CHECK IF ENOUGH STAMPS
        if (customer.stampCount < requiredStamps) {
            return NextResponse.json(
                { error: "Not enough stamps to redeem" },
                { status: 400 }
            );
        }

        // DEDUCT STAMPS
        const updated = await prisma.customer.update({
            where: { id: customerId },
            data: {
                stampCount: customer.stampCount - requiredStamps,
                lastVisit: new Date()
            }
        });


        // make reward entry 
        const reward = await prisma.reward.create({
            data: {
                id: `reward_${nanoid(8)}`,
                shopId,
                customerId,
                rewardText,
            },
        });

        return NextResponse.json({
            success: true,
            message: "Reward redeemed successfully!",
            data: updated
        });

    } catch (err) {
        console.error("Redeem API Error:", err);
        return NextResponse.json(
            { error: "Server Error" },
            { status: 500 }
        );
    }
}

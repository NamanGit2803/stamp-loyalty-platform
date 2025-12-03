import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyJwt } from "@/lib/auth";

export async function POST(req) {
    try {
        const user = await verifyJwt(req);
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { shopId } = await req.json();
        if (!shopId) {
            return NextResponse.json({ error: "shopId is required" }, { status: 400 });
        }

        // Prevent duplicate subscription creation
        const existing = await prisma.subscription.findFirst({
            where: { shopId }
        });

        if (existing) {
            return NextResponse.json(
                { error: "Subscription already exists", subscription: existing },
                { status: 409 }
            );
        }

        const now = new Date();
        const trialEndsAt = new Date(Date.now() + 15 * 24 * 60 * 60 * 1000);

        const subscription = await prisma.subscription.create({
            data: {
                shopId,
                planId: "PRO",
                amount: 299,
                startDate: now,
                trialEndsAt,
                nextBillingAt: trialEndsAt,
                status: "active"
            }
        });

        return NextResponse.json({ success: true, subscription });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}

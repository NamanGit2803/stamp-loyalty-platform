import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { nanoid } from "nanoid"


export async function POST(req) {
    try {

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
                { error: "You are subscribed already.", subscription: true },
                { status: 409 }
            );
        }

        const now = new Date();
        const trialEndsAt = new Date(Date.now() + 15 * 24 * 60 * 60 * 1000);
        const customId = `subs_${nanoid(8)}`

        const subscription = await prisma.subscription.create({
            data: {
                id: customId,
                shopId,
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

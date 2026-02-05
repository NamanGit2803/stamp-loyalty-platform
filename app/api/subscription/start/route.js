export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { nanoid } from "nanoid"


export async function POST(req) {
    try {
        // ✅ Lazy import Prisma (build-safe)
        const { default: prisma } = await import("@/lib/prisma");

        const { shopId, planId } = await req.json();

        if(!planId){
            return NextResponse.json({ error: "Server error." }, { status: 500 });
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
                planId,
                startDate: now,
                trialEndsAt,
                nextBillingAt: trialEndsAt,
                status: "trialing"
            }
        });

        return NextResponse.json({ success: true, subscription });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}

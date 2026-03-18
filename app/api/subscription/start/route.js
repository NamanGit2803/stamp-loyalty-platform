export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { nanoid } from "nanoid"
import { FormatToIST } from "@/lib/dateFormat";


export async function POST(req) {
    try {
        // ✅ Lazy import Prisma (build-safe)
        const { default: prisma } = await import("@/lib/prisma");

        const { shopId, planId, shopName } = await req.json();

        if (!planId) {
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

        await prisma.notification.create({
            data: {
                shopId,
                title: "Welcome to Stampi! 🎉",
                message: `Your shop "${shopName}" has been successfully created. You are now on a free trial plan valid until ${FormatToIST(trialEndsAt)}. View complete plan details on the billing page.`,
                type: "success",
                channel: "IN_APP",
                link: `/shop/${shopId}/billing`,
                metadata: {
                    trialEndsAt: FormatToIST(trialEndsAt),
                },
                isSent: true,
            }
        });

        return NextResponse.json({ success: true, subscription });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}

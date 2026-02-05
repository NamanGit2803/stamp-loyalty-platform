export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { default: prisma } = await import("@/lib/prisma");
        const body = await req.json();

        console.log("CASHFREE WEBHOOK:", body);

        const event = body.event;
        const data = body.data;

        if (!event || !data) {
            return NextResponse.json({ error: "Invalid webhook" }, { status: 400 });
        }

        const subId = data.subscription_id;
        const subscription = await prisma.subscription.findFirst({
            where: { cashfreeSubscriptionId: subId }
        });

        if (!subscription) {
            return NextResponse.json({ error: "Subscription not found" });
        }

        // -------------------------------------------------------------
        // 1️⃣ Mandate Authorization Completed
        // -------------------------------------------------------------
        if (event === "subscription.mandate.authorization_completed") {
            const mandateId =
                data.mandate_id ||
                data?.upi_si_details?.umrn ||
                null;

            await prisma.subscription.update({
                where: { id: subscription.id },
                data: {
                    cashfreeMandateId: mandateId,
                    status: "pending"
                }
            });
        }

        // -------------------------------------------------------------
        // 2️⃣ Subscription Status Events
        // -------------------------------------------------------------
        if (event === "subscription.status.active") {
            await prisma.subscription.update({
                where: { id: subscription.id },
                data: {
                    status: "active",
                    nextBillingAt: new Date(data.next_charge_date)
                }
            });
        }

        if (event === "subscription.status.cancelled") {
            await prisma.subscription.update({
                where: { id: subscription.id },
                data: { status: "cancelled" }
            });
        }

        if (event === "subscription.status.failed") {
            await prisma.subscription.update({
                where: { id: subscription.id },
                data: { status: "failed" }
            });
        }

        // -------------------------------------------------------------
        // 3️⃣ Payment Success
        // -------------------------------------------------------------
        if (event === "subscription.payment.success") {
            const pd = data.payment_details;

            await prisma.payment.create({
                data: {
                    shopId: subscription.shopId,
                    subscriptionId: subscription.id,
                    amount: pd.amount,
                    currency: pd.currency,
                    status: "success",
                    method: pd.method
                }
            });

            await prisma.subscription.update({
                where: { id: subscription.id },
                data: {
                    nextBillingAt: new Date(data.next_charge_date)
                }
            });
        }

        // -------------------------------------------------------------
        // 4️⃣ Payment Failed
        // -------------------------------------------------------------
        if (event === "subscription.payment.failed") {
            const pd = data.payment_details;

            await prisma.payment.create({
                data: {
                    shopId: subscription.shopId,
                    subscriptionId: subscription.id,
                    amount: pd.amount,
                    currency: pd.currency,
                    status: "failed",
                    method: pd.method
                }
            });
        }

        return NextResponse.json({ success: true });

    } catch (err) {
        console.error("WEBHOOK ERROR:", err);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}

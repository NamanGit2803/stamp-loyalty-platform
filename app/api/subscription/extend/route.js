export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { nanoid } from "nanoid";

export async function POST(req) {
  try {
    const { default: prisma } = await import("@/lib/prisma");

    const { shopId } = await req.json();
    if (!shopId) {
      return NextResponse.json({ error: "shopId required" }, { status: 400 });
    }

    // Fetch shop + owner
    const shop = await prisma.shop.findFirst({
      where: { id: shopId },
      include: { owner: true }
    });

    if (!shop) {
      return NextResponse.json({ error: "Shop not found" }, { status: 404 });
    }

    // Fetch subscription + plan
    const subscription = await prisma.subscription.findFirst({
      where: { shopId },
      include: { plan: true }
    });

    if (!subscription) {
      return NextResponse.json({ error: "Subscription not found" }, { status: 404 });
    }

    const plan = subscription.plan;

    if (!plan) {
      return NextResponse.json({ error: "Plan not found" }, { status: 404 });
    }

    if (!plan.cashfreePlanId) {
      return NextResponse.json(
        { error: "cashfreePlanId missing in DB plan" },
        { status: 400 }
      );
    }

    // Already active?
    if (subscription.status === "active") {
      return NextResponse.json({
        alreadyActive: true,
        message: "Subscription already active",
      });
    }

    // --------------------------------------------------------
    // 1️⃣ Create Cashfree Subscription ID
    // --------------------------------------------------------
    const cashfreeSubId = `cSub_${nanoid(8)}`;

    await prisma.subscription.update({
      where: { id: subscription.id },
      data: {
        status: "pending",
        cashfreeSubscriptionId: cashfreeSubId
      }
    });


    // --------------------------------------------------------
    // 2️⃣ Create Cashfree Subscription (Mandatory plan_id from dashboard)
    // --------------------------------------------------------
    const createRes = await fetch(
      "https://sandbox.cashfree.com/pg/subscriptions",
      {
        method: "POST",
        headers: {
          "x-client-id": process.env.CF_APP_ID,
          "x-client-secret": process.env.CF_SECRET,
          "x-api-version": "2023-08-01",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          subscription_id: cashfreeSubId,

          plan_details: {
            plan_id: plan.cashfreePlanId,         // 👈 CORRECT VALUE
            plan_name: plan.name,
            plan_type: "PERIODIC",
            plan_currency: "INR",
            plan_recurring_amount: plan.price,
            plan_interval_type: "MONTH",
            plan_intervals: 1
          },

          customer_details: {
            customer_id: shopId,
            customer_email: shop.owner.email,
            customer_phone: shop.phone
          },

          subscription_meta: {
            return_url: process.env.CASHFREE_RETURN_URL
          }
        })
      }
    );

    const createData = await createRes.json();
    console.log("CREATE SUBSCRIPTION:", createData);


    // --------------------------------------------------------
    // 3️⃣ Mandate Authorization Link
    // --------------------------------------------------------
    const mandateLink =
      createData?.authorization_details?.authorization_link ||
      createData?.authorization_link ||
      null;

    if (!mandateLink) {
      return NextResponse.json(
        {
          error: "Authorization link not returned by Cashfree",
          details: createData
        },
        { status: 500 }
      );
    }


    // --------------------------------------------------------
    // 4️⃣ Return Mandate Link
    // --------------------------------------------------------
    return NextResponse.json({
      success: true,
      mandateLink
    });

  } catch (err) {
    console.error("EXTEND API ERROR:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

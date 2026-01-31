export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { default: prisma } = await import("@/lib/prisma");
    const { shopId, userEmail } = await req.json();

    let shop;
    if (shopId != null) {
      shop = await prisma.shop.findUnique({
        where: { id: shopId },
      });
    } else {
      shop = await prisma.shop.findFirst({
        where: { ownerId: userEmail },
      });
    }

    if (!shop) return NextResponse.json({ status: "NO_SHOP" });

    if (shop.ownerId !== userEmail)
      return NextResponse.json({ status: "NOT_OWNER" });

    const subscription = await prisma.subscription.findFirst({
      where: { shopId },
    });

    if (!subscription)
      return NextResponse.json({ status: "NO_SUBSCRIPTION" });

    const now = new Date();
    const trialEnds = subscription.trialEndsAt
      ? new Date(subscription.trialEndsAt)
      : null;

    const nextBilling = subscription.nextBillingAt
      ? new Date(subscription.nextBillingAt)
      : null;


    // ⭐ 1️⃣ Trial ended -> update status
    if (subscription.status === "trialing" && trialEnds && now > trialEnds) {
      await prisma.subscription.update({
        where: { id: subscription.id },
        data: { status: "trial_end" },
      });

      return NextResponse.json({ status: "TRIAL_END" });
    }

    if (subscription.status === 'trial_end') {
      return NextResponse.json({ status: "TRIAL_END" })
    }

    // 2️⃣ Trial still active
    if (subscription.status === "trialing" && trialEnds && now <= trialEnds) {
      return NextResponse.json({ status: "TRIAL_ACTIVE" });
    }

    // 3️⃣ Explicit canceled
    if (subscription.status === "canceled") {
      return NextResponse.json({ status: "EXPIRED" });
    }

    // 4️⃣ Paid and valid
    if (nextBilling && now <= nextBilling && subscription.status == 'active') {
      return NextResponse.json({ status: "PAID_ACTIVE" });
    }

    // 5️⃣ Billing date passed
    return NextResponse.json({ status: "EXPIRED" });

  } catch (err) {
    console.error("[subscription check error]", err);
    return NextResponse.json({ status: "ERROR" });
  }
}



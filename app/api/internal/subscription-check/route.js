export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { default: prisma } = await import("@/lib/prisma");
    const { shopId, userEmail } = await req.json();

    const shop = await prisma.shop.findUnique({
      where: { id: shopId },
    });

    if (!shop) {
      return NextResponse.json({ status: "NO_SHOP" });
    }

    if (shop.ownerId !== userEmail) {
      return NextResponse.json({ status: "NOT_OWNER" });
    }

    const subscription = await prisma.subscription.findFirst({
      where: { shopId },
    });

    if (!subscription) {
      return NextResponse.json({ status: "NO_SUBSCRIPTION" });
    }

    const now = new Date();
    const trialEnds = subscription.trialEndsAt
      ? new Date(subscription.trialEndsAt)
      : null;

    const nextBilling = subscription.nextBillingAt
      ? new Date(subscription.nextBillingAt)
      : null;

    // 1️⃣ Trial still active
    if (trialEnds && now <= trialEnds) {
      return NextResponse.json({ status: "TRIAL_ACTIVE" });
    }

    // 2️⃣ Explicit canceled or expired
    if (subscription.status === "canceled") {
      return NextResponse.json({ status: "EXPIRED" });
    }

    // 3️⃣ Paid and valid
    if (nextBilling && now <= nextBilling) {
      return NextResponse.json({ status: "PAID_ACTIVE" });
    }

    // 4️⃣ Billing date passed
    return NextResponse.json({ status: "EXPIRED" });

  } catch (err) {
    console.error("[subscription check error]", err);
    return NextResponse.json({ status: "ERROR" });
  }
}


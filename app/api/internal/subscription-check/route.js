export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    // ✅ Lazy import Prisma (build-safe)
    const { default: prisma } = await import("@/lib/prisma");

    const { shopId, userEmail } = await req.json();

    // Validate shop ownership
    const shop = await prisma.shop.findUnique({
      where: { id: shopId },
    });

    if (!shop) {
      return NextResponse.json({ status: "NO_SHOP" });
    }

    if (shop.ownerId !== userEmail) {
      return NextResponse.json({ status: "NOT_OWNER" });
    }

    // Fetch subscription
    const subscription = await prisma.subscription.findFirst({
      where: { shopId },
    });

    if (!subscription) {
      return NextResponse.json({ status: "NO_SUBSCRIPTION" });
    }

    const now = new Date();
    const trialEnds = new Date(subscription.trialEndsAt);
    const nextBilling = new Date(subscription.nextBillingAt);

    if (now <= trialEnds) {
      return NextResponse.json({ status: "TRIAL_ACTIVE" });
    }

    if (now > trialEnds && now > nextBilling) {
      return NextResponse.json({ status: "EXPIRED" });
    }

    return NextResponse.json({ status: "PAID_ACTIVE" });

  } catch (err) {
    console.error("[subscription check error]", err);
    return NextResponse.json({ status: "ERROR" });
  }
}

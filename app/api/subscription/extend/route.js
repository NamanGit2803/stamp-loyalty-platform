import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req) {
  try {
    const user = await verifyJwt(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { shopId } = await req.json();
    if (!shopId) {
      return NextResponse.json({ error: "shopId required" }, { status: 400 });
    }

    const subscription = await prisma.subscription.findFirst({
      where: { shopId }
    });

    if (!subscription) {
      return NextResponse.json({ error: "Subscription not found" }, { status: 404 });
    }

    const nextBillingAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

    const updated = await prisma.subscription.update({
      where: { srNo: subscription.srNo },
      data: {
        nextBillingAt,
        status: "active",
        endDate: null
      }
    });

    return NextResponse.json({ success: true, subscription: updated });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

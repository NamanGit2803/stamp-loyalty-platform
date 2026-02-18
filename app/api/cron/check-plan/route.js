export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { sendPlanExpiresTomorrowEmail } from "@/lib/email/sendPlanExpiresTomorrowEmail";
import { sendPlanExpiredEmail } from "@/lib/email/sendPlanExpiredEmail";

export async function GET() {
    try {
        const { default: prisma } = await import("@/lib/prisma");

        // -----------------------------------------
        // IST TIME SUPPORT
        // -----------------------------------------
        const IST_OFFSET = 5.5 * 60 * 60 * 1000;
        const nowUTC = new Date();
        const nowIST = new Date(nowUTC.getTime() + IST_OFFSET);

        // TODAY IST 00:00
        const startTodayIST = new Date(
            nowIST.getFullYear(),
            nowIST.getMonth(),
            nowIST.getDate()
        );

        // TOMORROW IST 00:00
        const startTomorrowIST = new Date(
            nowIST.getFullYear(),
            nowIST.getMonth(),
            nowIST.getDate() + 1
        );

        // DAY AFTER TOMORROW IST 00:00
        const startDayAfterIST = new Date(
            nowIST.getFullYear(),
            nowIST.getMonth(),
            nowIST.getDate() + 2
        );

        // Convert IST boundaries back to UTC for DB comparison
        const startTodayUTC = new Date(startTodayIST.getTime() - IST_OFFSET);
        const startTomorrowUTC = new Date(startTomorrowIST.getTime() - IST_OFFSET);
        const startDayAfterUTC = new Date(startDayAfterIST.getTime() - IST_OFFSET);

        // -----------------------------------------
        // 1️⃣ EXPIRING TODAY (Send Expired Email)
        // -----------------------------------------
        const subsExpiringToday = await prisma.subscription.findMany({
            where: {
                nextBillingAt: {
                    gte: startTodayUTC,
                    lt: startTomorrowUTC,
                }
            },
            include: { shop: true }
        });

        for (const s of subsExpiringToday) {
            await sendPlanExpiredEmail({
                to: s.shop?.ownerId,
                shopName: s.shop?.shopName,
                expiryDate: s.nextBillingAt + IST_OFFSET,
                dashboardUrl: `https://stampi.in/shop/${s.shop?.id}/billing`,
            });
        }

        // -----------------------------------------
        // 2️⃣ EXPIRING TOMORROW (Send Reminder Email)
        // -----------------------------------------
        const subsExpiringTomorrow = await prisma.subscription.findMany({
            where: {
                nextBillingAt: {
                    gte: startTomorrowUTC,
                    lt: startDayAfterUTC,
                }
            },
            include: { shop: true }
        });

        for (const s of subsExpiringTomorrow) {
            await sendPlanExpiresTomorrowEmail({
                to: s.shop?.ownerId,
                shopName: s.shop?.shopName,
                expiryDate: s.nextBillingAt + IST_OFFSET,
                dashboardUrl: `https://stampi.in/shop/${s.shop?.id}/billing`,
            });
        }

        return NextResponse.json({ status: "CRON_RAN_SUCCESSFULLY" });

    } catch (err) {
        console.error("[CRON ERROR]", err);
        return NextResponse.json({ status: "ERROR" }, { status: 500 });
    }
}

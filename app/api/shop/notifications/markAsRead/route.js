export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { notificationId } = await req.json();

        if (!notificationId) {
            return NextResponse.json(
                { error: "notificationId is required" },
                { status: 400 }
            );
        }

        const { default: prisma } = await import("@/lib/prisma");

        await prisma.notification.update({
            where: { id: notificationId },
            data: { isRead: true },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("MARK_ONE_ERROR:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}

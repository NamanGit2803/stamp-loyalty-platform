export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        // ✅ Lazy import Prisma (build-safe)
        const { default: prisma } = await import("@/lib/prisma");

        const body = await req.json();
        const { scanId } = body;

        if (!scanId) {
            return NextResponse.json(
                { error: "Missing Scan Id" },
                { status: 400 }
            );
        }

        const scan = await prisma.scanVerification.findUnique({
            where: { id: scanId },
            select: {
                status: true,
                customerId: true,
            },
        });

        if (!scan) {
            return NextResponse.json(
                { exists: false, error: "Invalid Scan Id" },
                { status: 404 }
            );
        }

        let customer = null

        if (scan.customerId && scan.status === 'success') {
            customer = await prisma.customer.findUnique({
                where: { id: scan.customerId },
            })
        }

        return NextResponse.json({
            status: scan.status,
            customer: customer,
        });

    } catch (err) {
        console.error("CheckShop API Error:", err);
        return NextResponse.json(
            { error: "Server error" },
            { status: 500 }
        );
    }
}

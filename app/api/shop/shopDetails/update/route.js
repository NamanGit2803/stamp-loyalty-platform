export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import { NextResponse } from "next/server";

export async function PUT(req) {
    try {
        //  Lazy import prisma (build-safe)
        const { default: prisma } = await import("@/lib/prisma");

        const body = await req.json();
        const { shopId, details, enable } = body;

        if (!shopId) {
            return NextResponse.json(
                { error: "Shop not exist!" },
                { status: 400 }
            );
        }

        //  Get shop
        const shop = await prisma.shop.findUnique({
            where: { id: shopId },
        });

        if (!shop) {
            return NextResponse.json(
                { error: "Shop not found" },
                { status: 404 }
            );
        }

        let updatedShop

        if (enable) {
            updatedShop = await prisma.shop.update({
                where: { id: shopId },
                data: {
                    loyaltyEnabled: !shop.loyaltyEnabled,
                }
            });

            return NextResponse.json({
                message: "Shop updated successfully",
                shop: updatedShop,
            });
        }


        // update details 
        updatedShop = await prisma.shop.update({
            where: { id: shopId },
            data: details,
        });


        return NextResponse.json({
            message: "Shop updated successfully",
            shop: updatedShop,
        });

    } catch (err) {
        console.error("[update shop error]", err);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

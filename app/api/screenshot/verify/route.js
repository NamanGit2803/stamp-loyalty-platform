export const runtime = "nodejs";

import { NextResponse } from "next/server";
import crypto from "crypto";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// SHA256
function sha256(buffer) {
    return crypto.createHash("sha256").update(buffer).digest("hex");
}

export async function POST(req) {
    try {
        const formData = await req.formData();
        const file = formData.get("file"); // optional file for hash only
        const shopId = formData.get("shopId");
        const phone = formData.get("phone");
        const ocrJson = formData.get("ocrResult");  // <-- CLIENT OCR DATA

        if (!file || !shopId || !ocrJson || !phone) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const ocr = JSON.parse(ocrJson);
        const { text, amount, upiId, utr, status: paymentStatus, appDetected } = ocr;

        // Convert file buffer → hash
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const screenshotHash = sha256(buffer);

        // --------------------------------------
        // 1️⃣ FETCH SHOP
        // --------------------------------------
        const shop = await prisma.shop.findUnique({ where: { id: shopId } });
        if (!shop) return NextResponse.json({ error: "Invalid shopId" }, { status: 404 });

        // --------------------------------------
        // 2️⃣ PREVENT DUPLICATE SCREENSHOT
        // --------------------------------------
        const duplicate = await prisma.scanVerification.findFirst({
            where: { shopId, screenshotHash }
        });

        if (duplicate) {
            return NextResponse.json(
                { error: "Screenshot already used", rejectReason: "duplicate_screenshot" },
                { status: 400 }
            );
        }

        // --------------------------------------
        // 3️⃣ ENSURE CUSTOMER EXISTS
        // --------------------------------------
        let customer = await prisma.customer.findFirst({ where: { shopId, phone } });
        if (!customer) {
            customer = await prisma.customer.create({
                data: {
                    id: `cus_${crypto.randomUUID()}`,
                    shopId,
                    phone
                }
            });
        }

        // --------------------------------------
        // 4️⃣ APPLY FRAUD CHECKS
        // --------------------------------------
        let rejectReason = null;

        //  UPI mismatch
        if (shop.upiId && upiId && shop.upiId !== upiId) {
            rejectReason = "upi_mismatch";
        }

        // Minimum amount
        if (!rejectReason && amount < Number(shop.minAmount || 0)) {
            rejectReason = "below_minimum";
        }

        // Payment status
        if (!rejectReason && paymentStatus !== "success") {
            rejectReason = "payment_not_success";
        }

        // Duplicate UTR
        if (!rejectReason && utr) {
            const utrExists = await prisma.scanVerification.findFirst({
                where: { shopId, utr }
            });
            if (utrExists) rejectReason = "duplicate_utr";
        }

        // DAILY LIMIT
        if (!rejectReason) {
            const todayCount = await prisma.scanVerification.count({
                where: {
                    shopId,
                    customerId: customer.id,
                    status: "success",
                    createdAt: { gte: new Date(new Date().setHours(0, 0, 0, 0)) }
                }
            });

            if (todayCount >= shop.maxStampsPerCustomerPerDay) {
                rejectReason = "daily_limit_reached";
            }
        }

        // --------------------------------------
        // 5️⃣ SAVE SCAN VERIFICATION ENTRY
        // --------------------------------------
        const scan = await prisma.scanVerification.create({
            data: {
                shopId,
                customerId: customer.id,
                amount,
                currency: "INR",
                upiId,
                utr,
                paidAt: new Date(),
                status: rejectReason ? "rejected" : "success",
                rejectReason,
                screenshotHash,
                appDetected,
                ocrText: text
            }
        });

        if (rejectReason) {
            return NextResponse.json(
                { success: false, rejectReason },
                { status: 400 }
            );
        }

        // --------------------------------------
        // 6️⃣ UPDATE CUSTOMER STAMPS
        // --------------------------------------
        await prisma.customer.update({
            where: { id: customer.id },
            data: {
                stampCount: { increment: 1 },
                totalVisits: { increment: 1 },
                lastVisit: new Date()
            }
        });

        // --------------------------------------
        // 7️⃣ CREATE TRANSACTION
        // --------------------------------------
        await prisma.transaction.create({
            data: {
                id: `txn_${crypto.randomUUID()}`,
                shopId,
                customerId: customer.id,
                amount,
                status: "success",
                upiId,
                method: "UPI_SCREENSHOT"
            }
        });

        return NextResponse.json({
            success: true,
            message: "Stamp added!",
            scanId: scan.id
        });

    } catch (err) {
        console.error("VERIFY ERROR →", err);
        return NextResponse.json({ error: "Server Error" }, { status: 500 });
    }
}

export const runtime = "nodejs";

import { NextResponse } from "next/server";
import crypto from "crypto";
import { PrismaClient } from "@prisma/client";
import { parsePaymentOCR } from "@/lib/aiParser";

const prisma = new PrismaClient();

/** SHA256 hash generator */
function sha256(buffer) {
    return crypto.createHash("sha256").update(buffer).digest("hex");
}

export async function POST(req) {
    try {
        const formData = await req.formData();

        const file = formData.get("file");
        const shopId = formData.get("shopId");
        const phone = formData.get("phone");
        const ocrJson = formData.get("ocrResult");

        if (!file || !shopId || !ocrJson || !phone) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        const clientOCR = JSON.parse(ocrJson);
        const { text: rawText } = clientOCR;

        // --------------------------------------
        // 1️⃣ AI OCR FIX PROCESSING
        // --------------------------------------
        const ai = await parsePaymentOCR(rawText);

        if (ai.aiError) {
            console.log("⚠ AI unavailable — continuing with client OCR only");
        }


        console.log("AI FIXED OCR →", ai);

        // AI corrected values (fallback to client OCR)
        const amount = ai.amount ?? clientOCR.amount ?? null;
        const upiId = ai.upiId ?? clientOCR.upiId ?? null;
        const utr = ai.utr ?? clientOCR.utr ?? null;
        const appDetected = ai.appDetected ?? "UNKNOWN";
        const isLikelyFake = ai.isLikelyFake ?? false;

        // Validate amount
        if (!amount || isNaN(amount)) {
            return NextResponse.json(
                { success: false, rejectReason: "ocr_failed_amount" },
                { status: 400 }
            );
        }

        // --------------------------------------
        // 2️⃣ HASH ORIGINAL IMAGE (True Duplicate Prevention)
        // --------------------------------------
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const screenshotHash = sha256(buffer);

        // --------------------------------------
        // 3️⃣ FETCH SHOP
        // --------------------------------------
        const shop = await prisma.shop.findUnique({ where: { id: shopId } });
        if (!shop) {
            return NextResponse.json(
                { error: "Invalid shopId" },
                { status: 404 }
            );
        }

        // --------------------------------------
        // 4️⃣ CHECK DUPLICATE SCREENSHOT
        // --------------------------------------
        const duplicate = await prisma.scanVerification.findFirst({
            where: { shopId, screenshotHash },
        });

        if (duplicate) {
            return NextResponse.json(
                { success: false, rejectReason: "duplicate_screenshot" },
                { status: 400 }
            );
        }

        // --------------------------------------
        // 5️⃣ CREATE / FETCH CUSTOMER
        // --------------------------------------
        let customer = await prisma.customer.findFirst({
            where: { shopId, phone },
        });

        if (!customer) {
            customer = await prisma.customer.create({
                data: {
                    id: `cus_${crypto.randomUUID()}`,
                    shopId,
                    phone,
                },
            });
        }

        // --------------------------------------
        // 6️⃣ FRAUD CHECKS
        // --------------------------------------
        let rejectReason = null;

        // AI flagged fake
        if (isLikelyFake) {
            rejectReason = "suspicious_screenshot";
        }

        // UPI mismatch
        if (!rejectReason && shop.upiId && upiId && shop.upiId !== upiId) {
            rejectReason = "upi_mismatch";
        }

        // Minimum amount check
        if (!rejectReason && amount < Number(shop.minAmount || 0)) {
            rejectReason = "below_minimum";
        }

        // Payment status from client OCR (not AI)
        if (!rejectReason && clientOCR.status !== "success") {
            rejectReason = "payment_not_success";
        }

        // Duplicate UTR
        if (!rejectReason && utr) {
            const utrExists = await prisma.scanVerification.findFirst({
                where: { shopId, utr },
            });
            if (utrExists) rejectReason = "duplicate_utr";
        }

        // Daily Limit
        if (!rejectReason) {
            const todayCount = await prisma.scanVerification.count({
                where: {
                    shopId,
                    customerId: customer.id,
                    status: "success",
                    createdAt: {
                        gte: new Date(new Date().setHours(0, 0, 0, 0)),
                    },
                },
            });

            if (todayCount >= shop.maxStampsPerCustomerPerDay) {
                rejectReason = "daily_limit_reached";
            }
        }

        // --------------------------------------
        // 7️⃣ SAVE THE VERIFICATION RECORD
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
                ocrText: rawText,
            },
        });

        // If failed fraud check → return here
        if (rejectReason) {
            return NextResponse.json(
                { success: false, rejectReason },
                { status: 400 }
            );
        }

        // --------------------------------------
        // 8️⃣ AWARD STAMP
        // --------------------------------------
        await prisma.customer.update({
            where: { id: customer.id },
            data: {
                stampCount: { increment: 1 },
                totalVisits: { increment: 1 },
                lastVisit: new Date(),
            },
        });

        // --------------------------------------
        // 9️⃣ TRANSACTION LOG
        // --------------------------------------
        await prisma.transaction.create({
            data: {
                id: `txn_${crypto.randomUUID()}`,
                shopId,
                customerId: customer.id,
                amount,
                status: "success",
                upiId,
                method: "UPI_SCREENSHOT",
            },
        });

        return NextResponse.json({
            success: true,
            message: "Stamp added!",
            scanId: scan.id,
        });
    } catch (err) {
        console.error("VERIFY ERROR →", err);
        return NextResponse.json(
            { error: "Server Error" },
            { status: 500 }
        );
    }
}

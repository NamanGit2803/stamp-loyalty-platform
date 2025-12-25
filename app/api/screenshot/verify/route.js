export const runtime = "nodejs";

import { NextResponse } from "next/server";
import crypto from "crypto";
import { PrismaClient } from "@prisma/client";
import { parsePaymentScreenshot } from "@/lib/aiParser";
import { validateScreenshotBeforeAI } from "@/lib/tools";
import { detectPaymentDirection } from "@/lib/tools";
import { validateUPIScreenshotTime } from "@/lib/upiTime";

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

        console.log('text', rawText)

        // --------------------------------------
        // 1️⃣ HASH ORIGINAL IMAGE (True Duplicate Prevention) and checksum
        // --------------------------------------
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const screenshotHash = sha256(buffer);
        // base 64 image 
        const imageBase64 = buffer.toString("base64");

        // checksum 
        const checksum = crypto
            .createHash("sha256")
            .update(
                rawText
                    ?.toLowerCase()
                    .replace(/\s+/g, " ")
                    .replace(/[^\x20-\x7E]/g, "")
                    .trim()
            )
            .digest("hex");





        // --------------------------------------
        // 2️⃣ FETCH SHOP
        // --------------------------------------
        const shop = await prisma.shop.findUnique({ where: { id: shopId } });
        if (!shop) {
            return NextResponse.json(
                { error: "Invalid shopId" },
                { status: 404 }
            );
        }


        // 3️⃣ Detect payment direction (paid / received / unknown)
        const paymentDirection = detectPaymentDirection(rawText);

        if (paymentDirection == 'RECEIVED') {
            return NextResponse.json(
                { success: false, rejectReason: 'Received payment not valid.' },
                { status: 400 }
            )
        }



        // --------------------------------------
        // 4️⃣ PRE-VALIDATION BEFORE AI (cost saving)
        // --------------------------------------
        const preFail = await validateScreenshotBeforeAI(buffer, clientOCR);

        if (preFail) {
            return NextResponse.json(
                { success: false, rejectReason: 'Screenshot is not valid..' },
                { status: 400 }
            );
        }


        // --------------------------------------
        // 5️⃣ CHECK DUPLICATE SCREENSHOT
        // --------------------------------------
        const duplicateHash = await prisma.scanVerification.findFirst({
            where: {
                shopId,
                screenshotHash,
                status: "success"
            },
        });

        if (duplicateHash) {
            return NextResponse.json(
                { success: false, rejectReason: "Duplicate Screenshot" },
                { status: 400 }
            );
        }


        //  Check duplicate OCR checksum
        const duplicateChecksum = await prisma.scanVerification.findFirst({
            where: {
                shopId,
                checksum,
                status: "success"
            }
        });

        if (duplicateChecksum) {
            return NextResponse.json(
                { success: false, rejectReason: "Duplicate Screenshot" },
                { status: 400 }
            );
        }


        // --------------------------------------
        // 6️⃣ AI OCR FIX PROCESSING
        // --------------------------------------
        const ai = await parsePaymentScreenshot(imageBase64);

        if (ai.aiError) {
            console.log("⚠ AI unavailable — continuing with client OCR only");
        }


        console.log("AI FIXED OCR →", ai);

        // AI corrected values (fallback to client OCR)
        const amount = ai.amount ?? null;
        const upiId = ai.upiId ?? clientOCR.upiId ?? null;
        const utr = ai.utr ?? clientOCR.utr ?? null;
        const date = ai.date ?? clientOCR.date ?? null;
        const time = ai.time ?? clientOCR.time ?? null;
        const appDetected = ai.appDetected ?? "UNKNOWN";
        const isLikelyFake = ai.isLikelyFake ?? false;
        const confidence = ai.confidence ?? null;
        const status = ai.status ?? false


        const timeCheck2 = validateUPIScreenshotTime(date, time);
        console.log("time", timeCheck2)



        // if payment status not success 
        if (!ai || status !== "success") {
            return NextResponse.json(
                { success: false, rejectReason: "Payment is not successful." },
                { status: 400 }
            )
        }


        // check utr 
        if (utr) {
            const utrRegex = /^[0-9A-Za-z]{12,18}$/;

            const utrExists = await prisma.scanVerification.findFirst({
                where: { shopId, utr, status: 'success' },
            });

            if (!utrRegex.test(utr)) {
                return NextResponse.json(
                    { success: false, rejectReason: "Screenshot is not valid." },
                    { status: 400 }
                );
            }

            // duplicate utr 
            if (utrExists) {
                return NextResponse.json(
                    { success: false, rejectReason: "Duplicate Screenshot" },
                    { status: 400 }
                )
            }
        }


        // Validate amount
        if (!amount) {
            return NextResponse.json(
                { success: false, rejectReason: "Amount is invalid" },
                { status: 400 }
            );
        }

        // amount limit 
        if (amount) {
            if (amount < shop.minAmount) {
                return NextResponse.json(
                    { success: false, rejectReason: "Payment amount is below the minimum required." },
                    { status: 400 }
                );
            }
        }


        // time and date validation 
        const timeCheck = validateUPIScreenshotTime(date, time);
        if (!timeCheck.valid) {
            return NextResponse.json(
                {
                    success: false,
                    rejectReason: "Invalid date and time.",
                },
                { status: 400 }
            );
        }


        // AI flagged fake
        if (isLikelyFake) {
            rejectReason = "suspicious_screenshot";
        }









        
        



        // UPI mismatch
        if (!rejectReason && shop.upiId && upiId && shop.upiId !== upiId) {
            rejectReason = "upi_mismatch";
        }

        // Payment status from client OCR (not AI)
        if (!rejectReason && clientOCR.status !== "success") {
            rejectReason = "payment_not_success";
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
                customerId: phone,
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
        //  CREATE / FETCH CUSTOMER
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

export const runtime = "nodejs";

import { NextResponse } from "next/server";
import crypto from "crypto";
import { PrismaClient } from "@prisma/client";
import { parsePaymentScreenshot } from "@/lib/aiParser";
import { validateScreenshotBeforeAI } from "@/lib/tools";
import { detectPaymentDirection } from "@/lib/tools";
import { validateUPIScreenshotTime } from "@/lib/upiTime";
import { nanoid } from "nanoid"

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

        let rejectReason = null;



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
        // 2️⃣ FETCH SHOP and subscription details 
        // --------------------------------------
        const shop = await prisma.shop.findUnique({ where: { id: shopId } });
        if (!shop) {
            return NextResponse.json(
                { error: "Invalid shopId." },
                { status: 404 }
            );
        }

        // Shop active check
        if (!shop.isActive) {
            return NextResponse.json(
                { success: false, error: "Shop is inactive." },
                { status: 403 }
            );
        }

        // get shop subscription details 
        const subscription = await prisma.subscription.findFirst({
            where: { shopId }
        });
        if (!subscription) {
            return NextResponse.json(
                { success: false, error: "Shop is not subscribed." },
                { status: 403 }
            );
        }

        // subscription status 
        if (subscription.status !== 'active' || subscription.nextBillingAt < new Date()) {
            return NextResponse.json(
                { success: false, error: "Subscription expired." },
                { status: 403 }
            );
        }


        // --------------------------------------
        // 4️⃣ daily upload limit
        // --------------------------------------
        const todayStart = new Date();
        todayStart.setHours(0, 0, 0, 0);
        const dailyUploads = await prisma.scanVerification.count({
            where: {
                shopId,
                customerId: phone,
                createdAt: { gte: todayStart },
                status: "success"
            },
        });


        if (dailyUploads >= shop.maxStampsPerCustomerPerDay) {
            return NextResponse.json(
                {
                    success: false,
                    error: "daily_upload_limit_reached",
                },
                { status: 429 }
            );
        }


        // 3️⃣ Detect payment direction (paid / received / unknown)
        if (!rejectReason) {
            const paymentDirection = detectPaymentDirection(rawText);

            if (paymentDirection == 'RECEIVED') {
                rejectReason = 'received_payment_direction.'
            }
        }



        // --------------------------------------
        // 4️⃣ PRE-VALIDATION BEFORE AI (cost saving)
        // --------------------------------------
        if (!rejectReason) {
            const preFail = await validateScreenshotBeforeAI(buffer, clientOCR);

            if (preFail) {
                rejectReason = preFail;
            }
        }


        // --------------------------------------
        // 5️⃣ CHECK DUPLICATE SCREENSHOT
        // --------------------------------------
        if (!rejectReason) {
            const duplicateHash = await prisma.scanVerification.findFirst({
                where: {
                    shopId,
                    screenshotHash,
                    status: "success"
                },
            });

            if (duplicateHash) {
                rejectReason = 'duplicate_image_hash'
            }
        }


        //  Check duplicate OCR checksum
        if (!rejectReason) {
            const duplicateChecksum = await prisma.scanVerification.findFirst({
                where: {
                    shopId,
                    checksum,
                    status: "success"
                }
            });

            if (duplicateChecksum) {
                rejectReason = 'duplicate_image_ocr'
            }
        }


        // pre ai verification scan save
        if (rejectReason) {
            const scan = await prisma.scanVerification.create({
                data: {
                    shopId,
                    customerId: phone,
                    amount: null,
                    currency: "INR",
                    upiId: clientOCR.upiId ?? null,
                    utr: clientOCR.utr ?? null,
                    paidAt: new Date(),
                    status: "rejected",
                    rejectReason,
                    screenshotHash,
                    appDetected: 'UNKNOWN',
                    ocrText: rawText,
                    checksum,
                },
            });

            return NextResponse.json(
                { success: false, rejectReason },
                { status: 400 }
            );
        }


        // --------------------------------------
        // 6️⃣ AI OCR FIX PROCESSING
        // --------------------------------------
        const ai = await parsePaymentScreenshot(imageBase64);

        if (ai.aiError) {
            console.log("⚠ AI unavailable — continuing with client OCR only");

            return NextResponse.json(
                { success: false, error: 'Server error' },
                { status: 400 }
            );

        }

        console.log("AI FIXED OCR →", ai);

        // AI corrected values (fallback to client OCR)
        const amount = ai.amount ?? null;
        let upiId = ai.upiId ?? clientOCR.upiId ?? null;
        const utr = ai.utr ?? clientOCR.utr ?? null;
        const date = ai.date ?? clientOCR.date ?? null;
        const time = ai.time ?? clientOCR.time ?? null;
        const appDetected = ai.appDetected ?? "UNKNOWN";
        const isLikelyFake = ai.isLikelyFake ?? false;
        const confidence = ai.confidence ?? null;
        const status = ai.status ?? false



        // if payment status not success 
        if (!rejectReason) {
            if (status !== "success") {
                rejectReason = 'status_not_success'
            }
        }

        // check utr 
        if (!rejectReason) {
            if (utr) {
                const utrRegex = /^[0-9A-Za-z]{12,18}$/;

                const utrExists = await prisma.scanVerification.findFirst({
                    where: { shopId, utr, status: 'success' },
                });

                if (!utrRegex.test(utr)) {
                    rejectReason = 'invalid_utr'
                }

                // duplicate utr 
                if (utrExists) {
                    rejectReason = 'utr_already_exist'
                }
            }
        }


        // Validate amount
        if (!rejectReason) {
            if (!amount) {
                rejectReason = 'amount_not_existed'
            }
        }

        // amount limit 
        if (!rejectReason) {
            if (amount) {
                if (amount < shop.minAmount) {
                    rejectReason = 'amount_below_mimimum'
                }
            }
        }


        // time and date validation 
        if (!rejectReason) {
            const timeCheck = validateUPIScreenshotTime(date, time);
            if (!timeCheck.valid) {
                rejectReason = timeCheck.reason
            }
        }


        // AI flagged fake
        if (!rejectReason) {
            if (isLikelyFake) {
                rejectReason = "suspicious_screenshot";
            }
        }

        // check confidance 
        if (!rejectReason) {
            if (confidence) {
                if (confidence < 0.80) {
                    rejectReason = 'low_confidence'
                }
            }
        }

        // normaize text 
        function normalizeText(text) {
            return text
                ?.toLowerCase()
                .replace(/[^a-z0-9@]/g, "");
        }

        const normalizedRaw = normalizeText(rawText);


        // upi mismatch 
        if (!rejectReason && !upiId) {
            rejectReason = 'upi_not_exist'

            if (normalizedRaw.includes(shop.upiId)) {
                upiId = shop.upiId
                rejectReason = null
            }
        }

        if (!rejectReason && upiId) {
            if (upiId !== shop.upiId) {
                rejectReason = 'upi_mismatch'
            }

            if (normalizedRaw.includes(shop.upiId)) {
                upiId = shop.upiId
                rejectReason = null
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
                status: rejectReason ? rejectReason === 'upi_mismatch' || rejectReason === 'upi_not_exist' ? 'pending' : "rejected" : "success",
                rejectReason,
                screenshotHash,
                appDetected,
                ocrText: rawText,
                checksum,
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
                    id: `cus_${nanoid(10)}`,
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
                customerId: phone,
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

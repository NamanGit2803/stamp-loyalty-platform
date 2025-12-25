module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/@prisma/client [external] (@prisma/client, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("@prisma/client", () => require("@prisma/client"));

module.exports = mod;
}),
"[project]/lib/aiParser.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "parsePaymentScreenshot",
    ()=>parsePaymentScreenshot
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$openai$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/openai/index.mjs [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$openai$2f$client$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__OpenAI__as__default$3e$__ = __turbopack_context__.i("[project]/node_modules/openai/client.mjs [app-route] (ecmascript) <export OpenAI as default>");
;
const client = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$openai$2f$client$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__OpenAI__as__default$3e$__["default"]({
    apiKey: process.env.OPENAI_API_KEY
});
/**
 * Safely extract + repair JSON from LLM output
 */ function parseLLMJson(raw) {
    if (!raw) throw new Error("Empty AI response");
    let text = raw.trim().replace(/^```json/i, "").replace(/^```/, "").replace(/```$/, "").trim();
    const start = text.indexOf("{");
    const end = text.lastIndexOf("}");
    if (start === -1 || end === -1) {
        throw new Error("No JSON object found");
    }
    text = text.slice(start, end + 1);
    return JSON.parse(text.replace(/,\s*}/g, "}").replace(/,\s*]/g, "]").replace(/\n/g, " ").replace(/\t/g, " "));
}
async function parsePaymentScreenshot(imageBase64) {
    if (!imageBase64) throw new Error("Image base64 is required");
    try {
        const systemPrompt = "You are an OCR + extraction system. Output ONLY valid minified JSON. No text, no explanations.";
        const userPrompt = `
Extract payment info from the screenshot.

Rules:
- amount: number or null
- upiId: must contain "@"
- utr: alphanumeric 8-25 chars or null
- date: YYYY-MM-DD or null
- app: GPay | PhonePe | Paytm | AmazonPay | UNKNOWN
- fake: true if screenshot looks edited/blurred/cropped
- confidence: 0 to 1

Output ONLY:
{"amount":null,"upiId":null,"utr":null,"date":null,"app":"UNKNOWN","fake":false,"confidence":0.5}
`;
        // ChatGPT-4.1-mini Vision request
        const res = await client.chat.completions.create({
            model: "gpt-4.1-mini",
            messages: [
                {
                    role: "system",
                    content: systemPrompt
                },
                {
                    role: "user",
                    content: [
                        {
                            type: "input_text",
                            text: userPrompt
                        },
                        {
                            type: "input_image",
                            image_url: `data:image/jpeg;base64,${imageBase64}`
                        }
                    ]
                }
            ],
            temperature: 0,
            max_tokens: 120
        });
        const raw = res.choices[0].message.content;
        const parsed = parseLLMJson(raw);
        // FINAL NORMALIZED OUTPUT
        return {
            amount: typeof parsed.amount === "number" ? parsed.amount : null,
            upiId: typeof parsed.upiId === "string" && parsed.upiId.includes("@") ? parsed.upiId : null,
            utr: typeof parsed.utr === "string" && /^[a-zA-Z0-9]{8,25}$/.test(parsed.utr) ? parsed.utr : null,
            date: typeof parsed.date === "string" && /^\d{4}-\d{2}-\d{2}$/.test(parsed.date) ? parsed.date : null,
            appDetected: parsed.app || "UNKNOWN",
            isLikelyFake: Boolean(parsed.fake),
            confidence: Math.min(Math.max(typeof parsed.confidence === "number" ? parsed.confidence : 0.5, 0), 1)
        };
    } catch (err) {
        console.error("ChatGPT OCR ERROR →", err);
        return {
            amount: null,
            upiId: null,
            utr: null,
            date: null,
            appDetected: "UNKNOWN",
            isLikelyFake: false,
            confidence: 0,
            aiError: true
        };
    }
}
}),
"[project]/app/api/screenshot/verify/route.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST,
    "runtime",
    ()=>runtime
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/crypto [external] (crypto, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/@prisma/client [external] (@prisma/client, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$aiParser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/aiParser.js [app-route] (ecmascript)");
const runtime = "nodejs";
;
;
;
;
const prisma = new __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$29$__["PrismaClient"]();
/** SHA256 hash generator */ function sha256(buffer) {
    return __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["default"].createHash("sha256").update(buffer).digest("hex");
}
async function POST(req) {
    try {
        const formData = await req.formData();
        const file = formData.get("file");
        const shopId = formData.get("shopId");
        const phone = formData.get("phone");
        const ocrJson = formData.get("ocrResult");
        if (!file || !shopId || !ocrJson || !phone) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Missing required fields"
            }, {
                status: 400
            });
        }
        const clientOCR = JSON.parse(ocrJson);
        const { text: rawText } = clientOCR;
        // --------------------------------------
        // 2️⃣ HASH ORIGINAL IMAGE (True Duplicate Prevention)
        // --------------------------------------
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const screenshotHash = sha256(buffer);
        // --------------------------------------
        // 3️⃣ FETCH SHOP
        // --------------------------------------
        const shop = await prisma.shop.findUnique({
            where: {
                id: shopId
            }
        });
        if (!shop) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Invalid shopId"
            }, {
                status: 404
            });
        }
        // --------------------------------------
        // 4️⃣ CHECK DUPLICATE SCREENSHOT
        // --------------------------------------
        const duplicate = await prisma.scanVerification.findFirst({
            where: {
                shopId,
                screenshotHash
            }
        });
        if (duplicate) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                rejectReason: "Duplicate Screenshot"
            }, {
                status: 400
            });
        }
        // --------------------------------------
        // 1️⃣ AI OCR FIX PROCESSING
        // --------------------------------------
        const ai = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$aiParser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parsePaymentScreenshot"])(file);
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
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                rejectReason: "ocr_failed_amount"
            }, {
                status: 400
            });
        }
        // --------------------------------------
        // 5️⃣ CREATE / FETCH CUSTOMER
        // --------------------------------------
        let customer = await prisma.customer.findFirst({
            where: {
                shopId,
                phone
            }
        });
        if (!customer) {
            customer = await prisma.customer.create({
                data: {
                    id: `cus_${__TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["default"].randomUUID()}`,
                    shopId,
                    phone
                }
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
                where: {
                    shopId,
                    utr
                }
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
                        gte: new Date(new Date().setHours(0, 0, 0, 0))
                    }
                }
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
                ocrText: rawText
            }
        });
        // If failed fraud check → return here
        if (rejectReason) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                rejectReason
            }, {
                status: 400
            });
        }
        // --------------------------------------
        // 8️⃣ AWARD STAMP
        // --------------------------------------
        await prisma.customer.update({
            where: {
                id: customer.id
            },
            data: {
                stampCount: {
                    increment: 1
                },
                totalVisits: {
                    increment: 1
                },
                lastVisit: new Date()
            }
        });
        // --------------------------------------
        // 9️⃣ TRANSACTION LOG
        // --------------------------------------
        await prisma.transaction.create({
            data: {
                id: `txn_${__TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["default"].randomUUID()}`,
                shopId,
                customerId: customer.id,
                amount,
                status: "success",
                upiId,
                method: "UPI_SCREENSHOT"
            }
        });
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            message: "Stamp added!",
            scanId: scan.id
        });
    } catch (err) {
        console.error("VERIFY ERROR →", err);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Server Error"
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__a8d3f8ca._.js.map
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
const runtime = "nodejs";
;
;
;
const prisma = new __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$29$__["PrismaClient"]();
// SHA256
function sha256(buffer) {
    return __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["default"].createHash("sha256").update(buffer).digest("hex");
}
async function POST(req) {
    try {
        const formData = await req.formData();
        const file = formData.get("file"); // optional file for hash only
        const shopId = formData.get("shopId");
        const phone = formData.get("phone");
        const ocrJson = formData.get("ocrResult"); // <-- CLIENT OCR DATA
        if (!file || !shopId || !ocrJson || !phone) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Missing required fields"
            }, {
                status: 400
            });
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
        const shop = await prisma.shop.findUnique({
            where: {
                id: shopId
            }
        });
        if (!shop) return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Invalid shopId"
        }, {
            status: 404
        });
        // --------------------------------------
        // 2️⃣ PREVENT DUPLICATE SCREENSHOT
        // --------------------------------------
        const duplicate = await prisma.scanVerification.findFirst({
            where: {
                shopId,
                screenshotHash
            }
        });
        if (duplicate) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Screenshot already used",
                rejectReason: "duplicate_screenshot"
            }, {
                status: 400
            });
        }
        // --------------------------------------
        // 3️⃣ ENSURE CUSTOMER EXISTS
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
                where: {
                    shopId,
                    utr
                }
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
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                rejectReason
            }, {
                status: 400
            });
        }
        // --------------------------------------
        // 6️⃣ UPDATE CUSTOMER STAMPS
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
        // 7️⃣ CREATE TRANSACTION
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

//# sourceMappingURL=%5Broot-of-the-server%5D__14ff52d6._.js.map
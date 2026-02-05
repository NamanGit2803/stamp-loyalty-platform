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
"[project]/app/api/cashfree/webhook/route.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST,
    "dynamic",
    ()=>dynamic,
    "runtime",
    ()=>runtime
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
const dynamic = "force-dynamic";
const runtime = "nodejs";
;
async function POST(req) {
    try {
        const { default: prisma } = await __turbopack_context__.A("[project]/lib/prisma.js [app-route] (ecmascript, async loader)");
        const body = await req.json();
        console.log("CASHFREE WEBHOOK RAW:", body);
        // Cashfree sends event types as string like:
        // "subscription.status.changed"
        // "subscription.payment.success"
        // "subscription.payment.failed"
        // "subscription.authorization.completed"
        const event = body.event;
        const data = body.data; // PG Subscriptions uses "data", not "content"
        // Accept Cashfree test webhook
        if (event === "PING" || event === "ping") {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                message: "pong"
            }, {
                status: 200
            });
        }
        if (!event || !data) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Invalid webhook format"
            }, {
                status: 400
            });
        }
        const cashfreeSubId = data.subscription_id;
        const mandateId = data.mandate_id || data?.upi_si_details?.umrn;
        // Check subscription
        const subscription = await prisma.subscription.findFirst({
            where: {
                cashfreeSubscriptionId: cashfreeSubId
            }
        });
        if (!subscription) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Subscription not found"
            }, {
                status: 404
            });
        }
        console.log("MATCHED SUB:", subscription.id);
        // -------------------------------------------------------------
        // 1️⃣ Mandate Authorization Completed
        // -------------------------------------------------------------
        if (event === "subscription.authorization.completed") {
            await prisma.subscription.update({
                where: {
                    id: subscription.id
                },
                data: {
                    cashfreeMandateId: mandateId,
                    status: "pending"
                }
            });
        }
        // -------------------------------------------------------------
        // 2️⃣ Subscription Status Changed
        // -------------------------------------------------------------
        if (event === "subscription.status.changed") {
            if (data.status === "ACTIVE") {
                await prisma.subscription.update({
                    where: {
                        id: subscription.id
                    },
                    data: {
                        status: "active",
                        nextBillingAt: new Date(data.next_billing_at),
                        cashfreeMandateId: mandateId || subscription.cashfreeMandateId
                    }
                });
            }
            if (data.status === "CANCELLED") {
                await prisma.subscription.update({
                    where: {
                        id: subscription.id
                    },
                    data: {
                        status: "cancelled"
                    }
                });
            }
        }
        // -------------------------------------------------------------
        // 3️⃣ Payment Success (AutoPay)
        // -------------------------------------------------------------
        if (event === "subscription.payment.success") {
            await prisma.subscription.update({
                where: {
                    id: subscription.id
                },
                data: {
                    nextBillingAt: new Date(data.next_billing_at)
                }
            });
            await prisma.payment.create({
                data: {
                    shopId: subscription.shopId,
                    subscriptionId: subscription.id,
                    amount: data.amount,
                    currency: "INR",
                    status: "success",
                    method: "UPI"
                }
            });
        }
        // -------------------------------------------------------------
        // 4️⃣ Payment Failed
        // -------------------------------------------------------------
        if (event === "subscription.payment.failed") {
            await prisma.payment.create({
                data: {
                    shopId: subscription.shopId,
                    subscriptionId: subscription.id,
                    amount: data.amount,
                    currency: "INR",
                    status: "failed",
                    method: "UPI"
                }
            });
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true
        });
    } catch (err) {
        console.error("WEBHOOK ERROR:", err);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Server error"
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__ebcf8b10._.js.map
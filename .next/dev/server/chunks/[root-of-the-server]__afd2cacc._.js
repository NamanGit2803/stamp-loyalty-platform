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
"[externals]/node:crypto [external] (node:crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:crypto", () => require("node:crypto"));

module.exports = mod;
}),
"[project]/lib/dateFormat.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FormatLastVisit",
    ()=>FormatLastVisit,
    "FormatToIST",
    ()=>FormatToIST
]);
function FormatLastVisit(dateString, normal = false) {
    if (!dateString) return "-";
    const istDate = new Date(dateString); // auto converts to IST on your system
    const now = new Date();
    // Normalize times to midnight for day comparisons
    const dateOnly = new Date(istDate.getFullYear(), istDate.getMonth(), istDate.getDate());
    const nowOnly = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const diffTime = nowOnly - dateOnly;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    if (normal == false) {
        if (diffDays === 0) return "Today";
        if (diffDays === 1) return "Yesterday";
        if (diffDays > 1 && diffDays < 7) return `${diffDays} days ago`;
    }
    return istDate.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric"
    });
}
function FormatToIST(dateString) {
    const date = new Date(dateString);
    const options = {
        timeZone: "Asia/Kolkata",
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true
    };
    const formatted = date.toLocaleString("en-IN", options);
    // Replace comma with bullet "•"
    return formatted.replace(",", " •").toUpperCase();
}
}),
"[project]/app/api/subscription/start/route.js [app-route] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$nanoid$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/nanoid/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$dateFormat$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/dateFormat.js [app-route] (ecmascript)");
const dynamic = "force-dynamic";
const runtime = "nodejs";
;
;
;
async function POST(req) {
    try {
        // ✅ Lazy import Prisma (build-safe)
        const { default: prisma } = await __turbopack_context__.A("[project]/lib/prisma.js [app-route] (ecmascript, async loader)");
        const { shopId, planId, shopName } = await req.json();
        if (!planId) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Server error."
            }, {
                status: 500
            });
        }
        // Prevent duplicate subscription creation
        const existing = await prisma.subscription.findFirst({
            where: {
                shopId
            }
        });
        if (existing) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "You are subscribed already.",
                subscription: true
            }, {
                status: 409
            });
        }
        const now = new Date();
        const trialEndsAt = new Date(Date.now() + 15 * 24 * 60 * 60 * 1000);
        const customId = `subs_${(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$nanoid$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["nanoid"])(8)}`;
        const subscription = await prisma.subscription.create({
            data: {
                id: customId,
                shopId,
                planId,
                startDate: now,
                trialEndsAt,
                nextBillingAt: trialEndsAt,
                status: "trialing"
            }
        });
        await prisma.notification.create({
            data: {
                shopId,
                title: "🎉 Welcome to Stampi!",
                message: `Your shop "${shopName}" has been successfully created. You are now on a free trial plan valid until ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$dateFormat$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["FormatToIST"])(trialEndsAt)}.`,
                type: "system",
                channel: "IN_APP",
                metadata: {
                    trialEndsAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$dateFormat$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["FormatToIST"])(trialEndsAt)
                },
                isSent: true
            }
        });
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            subscription
        });
    } catch (err) {
        console.error(err);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Server error"
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__afd2cacc._.js.map
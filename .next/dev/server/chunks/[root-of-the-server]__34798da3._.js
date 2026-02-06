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
"[project]/app/api/shop/dashboardStats/route.js [app-route] (ecmascript)", ((__turbopack_context__) => {
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
// Convert UTC → IST
function toIST(date) {
    const d = new Date(date);
    const utc = d.getTime() + d.getTimezoneOffset() * 60000;
    return new Date(utc + 5.5 * 60 * 60 * 1000);
}
async function POST(req) {
    try {
        const { default: prisma } = await __turbopack_context__.A("[project]/lib/prisma.js [app-route] (ecmascript, async loader)");
        const body = await req.json();
        const { shopId } = body;
        if (!shopId) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Shop ID is required"
            }, {
                status: 400
            });
        }
        /* ---------------------------------------------
           📌 Generate correct IST month boundaries
        ---------------------------------------------- */ const nowIST = toIST(new Date());
        const monthStartIST = new Date(nowIST.getFullYear(), nowIST.getMonth(), 1);
        const nextMonthIST = new Date(nowIST.getFullYear(), nowIST.getMonth() + 1, 1);
        /* ---------------------------------------------
           1️⃣ Revenue (This IST Month)
        ---------------------------------------------- */ const revenueData = await prisma.scanVerification.aggregate({
            where: {
                shopId,
                status: 'success',
                createdAt: {
                    gte: monthStartIST,
                    lt: nextMonthIST
                }
            },
            _sum: {
                amount: true
            },
            _count: {
                id: true
            }
        });
        const revenue = revenueData._sum.amount || 0;
        /* ---------------------------------------------
          2️⃣ Stamps Given (This IST Month)
       ---------------------------------------------- */ const stampsGiven = revenueData._count.id || 0;
        /* ---------------------------------------------
           3️⃣ Rewards Redeemed (This IST Month)
        ---------------------------------------------- */ const rewardsRedeemed = await prisma.reward.count({
            where: {
                shopId,
                createdAt: {
                    gte: monthStartIST,
                    lt: nextMonthIST
                }
            }
        });
        /* ---------------------------------------------
           4️⃣ Repeat Customer Rate (IST Month)
        ---------------------------------------------- */ const visits = await prisma.scanVerification.groupBy({
            by: [
                "customerId"
            ],
            where: {
                shopId,
                status: 'success',
                createdAt: {
                    gte: monthStartIST,
                    lt: nextMonthIST
                }
            },
            _count: {
                id: true
            }
        });
        const allVisitors = visits.length;
        const returning = visits.filter((v)=>v._count.id > 1).length;
        const repeatRate = allVisitors > 0 ? Math.round(returning / allVisitors * 100) : 0;
        /* ---------------------------------------------
           5️⃣ Best Customers (Lifetime)
        ---------------------------------------------- */ const bestCustomers = await prisma.customer.findMany({
            where: {
                shopId
            },
            orderBy: {
                totalStampCount: "desc"
            },
            take: 5
        });
        /* ---------------------------------------------
           6️⃣ Close To Reward
        ---------------------------------------------- */ const shop = await prisma.shop.findUnique({
            where: {
                id: shopId
            },
            select: {
                targetStamps: true
            }
        });
        const target = shop?.targetStamps || 0;
        const closeToReward = await prisma.customer.findMany({
            where: {
                shopId,
                stampCount: {
                    gte: Number(target) - 4,
                    lt: Number(target)
                }
            },
            take: 5
        });
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            revenue,
            stampsGiven,
            rewardsRedeemed,
            repeatRate,
            bestCustomers,
            closeToReward,
            monthStartIST,
            nextMonthIST
        });
    } catch (error) {
        console.error("Dashboard Stats Error:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: error.message || "Something went wrong"
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__34798da3._.js.map
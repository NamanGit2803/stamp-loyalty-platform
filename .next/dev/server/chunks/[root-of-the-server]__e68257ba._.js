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
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[externals]/node:buffer [external] (node:buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:buffer", () => require("node:buffer"));

module.exports = mod;
}),
"[externals]/buffer [external] (buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("buffer", () => require("buffer"));

module.exports = mod;
}),
"[externals]/string_decoder [external] (string_decoder, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("string_decoder", () => require("string_decoder"));

module.exports = mod;
}),
"[externals]/node:stream [external] (node:stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:stream", () => require("node:stream"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/node:crypto [external] (node:crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:crypto", () => require("node:crypto"));

module.exports = mod;
}),
"[project]/lib/resend.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "resend",
    ()=>resend
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$resend$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/resend/dist/index.mjs [app-route] (ecmascript)");
;
const resend = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$resend$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Resend"](process.env.RESEND_API_KEY);
}),
"[project]/lib/sendEmail.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "sendEmail",
    ()=>sendEmail
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$resend$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/resend.js [app-route] (ecmascript)");
;
async function sendEmail({ to, subject, html }) {
    try {
        return await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$resend$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["resend"].emails.send({
            from: "Stampi <no-reply@stampi.in>",
            to,
            subject,
            html
        });
    } catch (error) {
        console.error("Email error:", error);
        throw error;
    }
}
}),
"[project]/lib/templates/baseEmail.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "baseEmailTemplate",
    ()=>baseEmailTemplate
]);
function baseEmailTemplate({ title, content }) {
    return `
  <!DOCTYPE html>
  <html>
    <body style="margin:0;font-family:Arial;background:#f6f9fc;padding:20px">
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td align="center">
            <table width="600" style="background:#ffffff;border-radius:8px;padding:24px">
              <tr>
                <td style="text-align:center;font-size:24px;font-weight:bold;color:#6247AA">
                  Stampi
                </td>
              </tr>

              <tr><td style="padding:20px 0;font-size:18px;font-weight:bold">
                ${title}
              </td></tr>

              <tr><td style="font-size:15px;color:#444">
                ${content}
              </td></tr>

              <tr><td style="padding-top:30px;font-size:12px;color:#999;text-align:center">
                © ${new Date().getFullYear()} Stampi · All rights reserved
              </td></tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
  </html>
  `;
}
}),
"[project]/lib/templates/tomorrowPlanExpire.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PlanExpiresTomorrowEmail",
    ()=>PlanExpiresTomorrowEmail
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$templates$2f$baseEmail$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/templates/baseEmail.js [app-route] (ecmascript)");
;
function PlanExpiresTomorrowEmail({ shopName, expiryDate, dashboardUrl }) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$templates$2f$baseEmail$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["baseEmailTemplate"])({
        title: "Your Plan Expires Tomorrow ⚠️",
        content: `
      <p>Hi <strong>${shopName}</strong>,</p>

      <p>
        This is a friendly reminder that your subscription plan will expire <strong>tomorrow</strong>.
      </p>

      <p>
        To avoid any interruption in your services, please renew your plan 
        before it expires. Renewing on time ensures that you continue to enjoy:
      </p>

      <ul style="padding-left:18px; line-height:1.6;">
        <li>Unlimited stamp & reward management</li>
        <li>Customer visit & loyalty tracking</li>
        <li>Automated notifications</li>
        <li>Advanced analytics & insights</li>
      </ul>

      <p style="margin-top:20px;">
        Your plan expires on: <strong>${expiryDate}</strong>
      </p>

      <a href="${dashboardUrl}"
         style="
           display:inline-block;
           padding:12px 24px;
           background:#c9a7ff;
           color:#000;
           border-radius:8px;
           text-decoration:none;
           font-weight:600;
           margin:25px 0;
         ">
        Renew Your Plan
      </a>

      <p>
        If you already renewed, you can safely ignore this message.
        If you need help, reply to this email anytime!
      </p>
    `
    });
}
}),
"[project]/lib/email/sendPlanExpiresTomorrowEmail.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "sendPlanExpiresTomorrowEmail",
    ()=>sendPlanExpiresTomorrowEmail
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$sendEmail$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/sendEmail.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$templates$2f$tomorrowPlanExpire$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/templates/tomorrowPlanExpire.js [app-route] (ecmascript)");
;
;
async function sendPlanExpiresTomorrowEmail({ to, shopName, expiryDate, dashboardUrl }) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$sendEmail$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sendEmail"])({
        to,
        subject: "Your Plan Expires Tomorrow ⚠️",
        html: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$templates$2f$tomorrowPlanExpire$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PlanExpiresTomorrowEmail"])({
            shopName,
            expiryDate,
            dashboardUrl
        })
    });
}
}),
"[project]/lib/templates/planExpired.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PlanExpiredEmailTemplate",
    ()=>PlanExpiredEmailTemplate
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$templates$2f$baseEmail$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/templates/baseEmail.js [app-route] (ecmascript)");
;
function PlanExpiredEmailTemplate({ shopName, expiryDate, dashboardUrl }) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$templates$2f$baseEmail$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["baseEmailTemplate"])({
        title: "Your Plan Has Expired",
        content: `
      <p>Hi <strong>${shopName}</strong>,</p>

      <p>
        Your subscription plan has 
        <strong>expired</strong>.
      </p>

      <p>
        Since your plan is no longer active, certain features such as 
        stamp management, customer tracking, rewards, and analytics may become 
        unavailable.
      </p>

      <p style="margin-top: 16px;">
        <strong>Expired on:</strong> ${expiryDate}
      </p>

      <a href="${dashboardUrl}"
         style="
           display:inline-block;
           padding:12px 24px;
           background:#ff6f6f;
           color:#fff;
           border-radius:8px;
           text-decoration:none;
           font-weight:600;
           margin:25px 0;
         "
      >
        Renew Your Plan
      </a>

      <p>
        Renew your subscription anytime to instantly regain access to all premium features.
      </p>

      <p>
        Need help? Just reply to this email—we’re always here.
      </p>
    `
    });
}
}),
"[project]/lib/email/sendPlanExpiredEmail.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "sendPlanExpiredEmail",
    ()=>sendPlanExpiredEmail
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$sendEmail$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/sendEmail.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$templates$2f$planExpired$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/templates/planExpired.js [app-route] (ecmascript)");
;
;
async function sendPlanExpiredEmail({ to, shopName, expiryDate, dashboardUrl }) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$sendEmail$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sendEmail"])({
        to,
        subject: "Your Plan Has Expired",
        html: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$templates$2f$planExpired$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PlanExpiredEmailTemplate"])({
            shopName,
            expiryDate,
            dashboardUrl
        })
    });
}
}),
"[project]/app/api/cron/check-plan/route.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "dynamic",
    ()=>dynamic,
    "runtime",
    ()=>runtime
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$email$2f$sendPlanExpiresTomorrowEmail$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/email/sendPlanExpiresTomorrowEmail.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$email$2f$sendPlanExpiredEmail$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/email/sendPlanExpiredEmail.js [app-route] (ecmascript)");
const dynamic = "force-dynamic";
const runtime = "nodejs";
;
;
;
async function GET() {
    try {
        const { default: prisma } = await __turbopack_context__.A("[project]/lib/prisma.js [app-route] (ecmascript, async loader)");
        // -----------------------------------------
        //  IST TIME SUPPORT
        // -----------------------------------------
        const IST_OFFSET = 5.5 * 60 * 60 * 1000;
        const nowUTC = new Date();
        const nowIST = new Date(nowUTC.getTime() + IST_OFFSET);
        // TODAY IST 00:00
        const startTodayIST = new Date(nowIST.getFullYear(), nowIST.getMonth(), nowIST.getDate());
        // TOMORROW IST 00:00
        const startTomorrowIST = new Date(nowIST.getFullYear(), nowIST.getMonth(), nowIST.getDate() + 1);
        // DAY AFTER TOMORROW IST 00:00
        const startDayAfterIST = new Date(nowIST.getFullYear(), nowIST.getMonth(), nowIST.getDate() + 2);
        // Convert to UTC for DB
        const startTodayUTC = new Date(startTodayIST.getTime() - IST_OFFSET);
        const startTomorrowUTC = new Date(startTomorrowIST.getTime() - IST_OFFSET);
        const startDayAfterUTC = new Date(startDayAfterIST.getTime() - IST_OFFSET);
        // -----------------------------------------
        // 1️⃣ EXPIRING TODAY (for expired email)
        // -----------------------------------------
        const subsExpiringToday = await prisma.subscription.findMany({
            where: {
                nextBillingAt: {
                    gte: startTodayUTC,
                    lt: startTomorrowUTC
                }
            },
            include: {
                shop: true
            }
        });
        // -----------------------------------------
        // 2️⃣ EXPIRING TOMORROW (for 24h-before email)
        // -----------------------------------------
        const subsExpiringTomorrow = await prisma.subscription.findMany({
            where: {
                nextBillingAt: {
                    gte: startTomorrowUTC,
                    lt: startDayAfterUTC
                }
            },
            include: {
                shop: true
            }
        });
        const oneDayMs = 24 * 60 * 60 * 1000;
        // ---------------------------------------------------
        // ⭐ EXPIRED EMAIL (Expiry Today)
        // ---------------------------------------------------
        for (const s of subsExpiringToday){
            const expiryUTC = new Date(s.nextBillingAt);
            const expiryIST = new Date(expiryUTC.getTime() + IST_OFFSET);
            if (expiryIST <= nowIST) {
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$email$2f$sendPlanExpiredEmail$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sendPlanExpiredEmail"])({
                    to: s.shop?.ownerId,
                    shopName: s.shop?.shopName,
                    expiryDate: expiryIST,
                    dashboardUrl: `https://stampi.in/shop/${s.shop?.id}/billing`
                });
            }
        }
        // ---------------------------------------------------
        // ⭐ 24 HOURS BEFORE EMAIL (Expiry Tomorrow)
        // ---------------------------------------------------
        for (const s of subsExpiringTomorrow){
            const expiryUTC = new Date(s.nextBillingAt);
            const expiryIST = new Date(expiryUTC.getTime() + IST_OFFSET);
            const diff = expiryIST - nowIST;
            console.log(subsExpiringTomorrow, expiryIST, nowIST);
            // 10-minute cron window around 24 hours
            if (diff <= oneDayMs && diff > oneDayMs - 10 * 60 * 1000) {
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$email$2f$sendPlanExpiresTomorrowEmail$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sendPlanExpiresTomorrowEmail"])({
                    to: s.shop?.ownerId,
                    shopName: s.shop?.shopName,
                    expiryDate: expiryIST,
                    dashboardUrl: `https://stampi.in/shop/${s.shop?.id}/billing`
                });
            }
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            status: "CRON_RAN"
        });
    } catch (err) {
        console.error("[CRON ERROR]", err);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            status: "ERROR"
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__e68257ba._.js.map
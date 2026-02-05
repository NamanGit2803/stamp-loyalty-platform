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
"[project]/lib/templates/otpEmail.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "otpEmailTemplate",
    ()=>otpEmailTemplate
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$templates$2f$baseEmail$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/templates/baseEmail.js [app-route] (ecmascript)");
;
function otpEmailTemplate({ otp }) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$templates$2f$baseEmail$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["baseEmailTemplate"])({
        title: "Your OTP Code",
        content: `
      <p>Your one-time password (OTP) is:</p>

      <div style="
        font-size:32px;
        font-weight:bold;
        letter-spacing:6px;
        background:#f3f0ff;
        padding:16px;
        text-align:center;
        border-radius:6px;
        margin:20px 0;
      ">
        ${otp}
      </div>

      <p>This OTP is valid for <b>5 minutes</b>.</p>
      <p>If you didn’t request this, you can safely ignore this email.</p>
    `
    });
}
}),
"[project]/lib/email/sendOtpEmail.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "sendOtpEmail",
    ()=>sendOtpEmail
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$sendEmail$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/sendEmail.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$templates$2f$otpEmail$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/templates/otpEmail.js [app-route] (ecmascript)");
;
;
async function sendOtpEmail({ to, otp }) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$sendEmail$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sendEmail"])({
        to,
        subject: "Your Stampi OTP Code",
        html: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$templates$2f$otpEmail$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["otpEmailTemplate"])({
            otp
        })
    });
}
}),
"[project]/lib/rateLimit.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// lib/rateLimit.js
__turbopack_context__.s([
    "rateLimit",
    ()=>rateLimit
]);
const rateLimitMap = new Map();
function rateLimit(key, limit = 5, windowMs = 5 * 60 * 1000 // 5 minutes
) {
    const now = Date.now();
    const record = rateLimitMap.get(key);
    // First request or window expired
    if (!record || now - record.startTime > windowMs) {
        rateLimitMap.set(key, {
            count: 1,
            startTime: now
        });
        return true;
    }
    // Exceeded limit
    if (record.count >= limit) {
        return false;
    }
    // Increase count
    record.count += 1;
    rateLimitMap.set(key, record);
    return true;
}
}),
"[project]/app/api/auth/otp/send/route.js [app-route] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$email$2f$sendOtpEmail$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/email/sendOtpEmail.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$rateLimit$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/rateLimit.js [app-route] (ecmascript)");
const dynamic = "force-dynamic";
const runtime = "nodejs";
;
;
;
async function POST(req) {
    try {
        const { default: prisma } = await __turbopack_context__.A("[project]/lib/prisma.js [app-route] (ecmascript, async loader)");
        const { email, purpose } = await req.json();
        if (!email) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Email required"
            }, {
                status: 400
            });
        }
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$rateLimit$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["rateLimit"])(email)) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Too many OTP requests. Please try again later."
            }, {
                status: 429
            });
        }
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        const expiresAt = new Date(Date.now() + 5 * 60 * 1000);
        await prisma.otp.upsert({
            where: {
                email
            },
            update: {
                code,
                purpose,
                expiresAt
            },
            create: {
                email,
                code,
                purpose,
                expiresAt
            }
        });
        // ⬇️ IMPORTANT: this now uses RESEND automatically
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$email$2f$sendOtpEmail$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sendOtpEmail"])({
            to: email,
            otp: code
        });
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true
        });
    } catch (err) {
        console.error("[otp send error]", err);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Server error"
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__c54b7e7b._.js.map
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
"[project]/lib/templates/resetPasswordEmail.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ResetPasswordEmailTemplate",
    ()=>ResetPasswordEmailTemplate
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$templates$2f$baseEmail$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/templates/baseEmail.js [app-route] (ecmascript)");
;
function ResetPasswordEmailTemplate({ resetLink }) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$templates$2f$baseEmail$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["baseEmailTemplate"])({
        title: "Reset Your Password",
        content: `
      <p>We received a request to reset your Stampi account password.</p>

      <p>Click the button below to reset it:</p>

      <a href="${resetLink}"
         style="
          display:inline-block;
          padding:12px 24px;
          background:#c9a7ff;
          color:#000;
          border-radius:8px;
          text-decoration:none;
          font-weight:600;
          margin:20px 0;
        ">
        Reset Password
      </a>

      <p>If you didn't request this, you can safely ignore this email.</p>
    `
    });
}
}),
"[project]/lib/email/sendResetPasswordEmail.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SendResetPasswordEmail",
    ()=>SendResetPasswordEmail
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$sendEmail$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/sendEmail.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$templates$2f$resetPasswordEmail$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/templates/resetPasswordEmail.js [app-route] (ecmascript)");
;
;
async function SendResetPasswordEmail({ email, resetLink }) {
    try {
        return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$sendEmail$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sendEmail"])({
            to: email,
            subject: "Reset Your Stampi Password",
            html: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$templates$2f$resetPasswordEmail$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ResetPasswordEmailTemplate"])({
                resetLink
            })
        });
    } catch (error) {
        console.error("[Reset Password Email Error]:", error);
        throw error;
    }
}
}),
"[project]/app/api/auth/forgotPassword/sendLink/route.js [app-route] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$email$2f$sendResetPasswordEmail$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/email/sendResetPasswordEmail.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/crypto [external] (crypto, cjs)");
const dynamic = "force-dynamic";
const runtime = "nodejs";
;
;
;
async function POST(req) {
    try {
        // ✅ Lazy import Prisma (build-safe)
        const { default: prisma } = await __turbopack_context__.A("[project]/lib/prisma.js [app-route] (ecmascript, async loader)");
        const email = await req.json();
        // ✅ Validation
        if (!email) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Email is required"
            }, {
                status: 400
            });
        }
        // ✅ Find user (do NOT expose result)
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        });
        if (user) {
            // ✅ Generate secure token
            const token = __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["default"].randomBytes(32).toString("hex");
            const tokenHash = __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["default"].createHash("sha256").update(token).digest("hex");
            const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 min
            // ✅ Remove old tokens for same email
            await prisma.passwordReset.deleteMany({
                where: {
                    userId: email
                }
            });
            // ✅ Store new token
            await prisma.passwordReset.create({
                data: {
                    userId: email,
                    tokenHash,
                    expiresAt
                }
            });
            console.log('token', token);
            // ✅ Reset URL (email integration later)
            const resetUrl = `${("TURBOPACK compile-time value", "https://stampi.in")}/reset-password?token=${token}`;
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$email$2f$sendResetPasswordEmail$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SendResetPasswordEmail"])({
                email,
                resetLink: resetUrl
            });
        }
        // ✅ Always return same response (security)
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true
        }, {
            status: 200
        });
    } catch (err) {
        console.error("[forgot password error]", err);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Server error"
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__3bf4c3fb._.js.map
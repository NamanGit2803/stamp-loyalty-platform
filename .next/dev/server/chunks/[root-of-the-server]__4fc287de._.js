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
// --------------------
// Helper: robust JSON extraction
// --------------------
function parseLLMJson(raw) {
    if (!raw) throw new Error("Empty AI response");
    let text = raw.trim().replace(/^```json/i, "").replace(/^```/, "").replace(/```$/, "").trim();
    const start = text.indexOf("{");
    const end = text.lastIndexOf("}");
    if (start === -1 || end === -1) {
        throw new Error("No JSON object found in AI output");
    }
    return JSON.parse(text.slice(start, end + 1).replace(/,\s*}/g, "}").replace(/,\s*]/g, "]").replace(/\n/g, " ").replace(/\t/g, " "));
}
// --------------------
// Helper: reject hallucinated dates
// --------------------
function isReasonableDate(dateStr) {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return false;
    const now = new Date();
    // ❌ reject future dates (+1 day buffer)
    if (d > new Date(now.getTime() + 24 * 60 * 60 * 1000)) return false;
    // ❌ reject very old dates (>7 days)
    if (d < new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)) return false;
    return true;
}
async function parsePaymentScreenshot(imageBase64) {
    try {
        const system = "You are an OCR extraction system. Output ONLY valid JSON.";
        const userPrompt = `
Extract payment info from the UPI payment screenshot.

Rules:
- amount: number | null
- upiId: string | null (must contain '@')
- utr: string | null (12–18 alphanumeric characters)
- date: YYYY-MM-DD | null
- time: HH:MM or HH:MM:SS | null
- status: success | failed | pending | unknown
- app: GPay | PhonePe | Paytm | AmazonPay | UNKNOWN
- fake: boolean
- confidence: number between 0 and 1

CRITICAL DATE RULES:
- Extract date ONLY if the YEAR is clearly visible in the image.
- If the year is missing, unclear, or inferred → return date = null.
- Do NOT guess or infer year from context or current date.
- Time may be extracted even if date is null.

OTHER RULES:
- Do NOT guess any value.
- If unclear or unreadable, return null.
- Output ONLY JSON.
`;
        const res = await client.chat.completions.create({
            model: "gpt-4.1-mini",
            temperature: 0,
            max_tokens: 180,
            messages: [
                {
                    role: "system",
                    content: system
                },
                {
                    role: "user",
                    content: [
                        {
                            type: "text",
                            text: userPrompt
                        },
                        {
                            type: "image_url",
                            image_url: {
                                url: `data:image/jpeg;base64,${imageBase64}`
                            }
                        }
                    ]
                }
            ]
        });
        const raw = res.choices[0]?.message?.content;
        const parsed = parseLLMJson(raw);
        return {
            // ---------- Amount ----------
            amount: typeof parsed.amount === "number" && !isNaN(parsed.amount) ? parsed.amount : null,
            // ---------- UPI ID ----------
            upiId: typeof parsed.upiId === "string" && parsed.upiId.includes("@") ? parsed.upiId : null,
            // ---------- UTR ----------
            utr: typeof parsed.utr === "string" && /^[A-Za-z0-9]{12,18}$/.test(parsed.utr) ? parsed.utr : null,
            // ---------- Date (STRICT) ----------
            date: typeof parsed.date === "string" && /^\d{4}-\d{2}-\d{2}$/.test(parsed.date) && isReasonableDate(parsed.date) ? parsed.date : null,
            // ---------- Time ----------
            time: typeof parsed.time === "string" && /^(\d{2}:\d{2}|\d{2}:\d{2}:\d{2})$/.test(parsed.time) ? parsed.time : null,
            // ---------- Status ----------
            status: typeof parsed.status === "string" && [
                "success",
                "failed",
                "pending",
                "unknown"
            ].includes(parsed.status.toLowerCase()) ? parsed.status.toLowerCase() : "unknown",
            // ---------- App ----------
            appDetected: typeof parsed.app === "string" ? parsed.app : "UNKNOWN",
            // ---------- Fraud ----------
            isLikelyFake: Boolean(parsed.fake),
            // ---------- Confidence ----------
            confidence: typeof parsed.confidence === "number" ? Math.min(Math.max(parsed.confidence, 0), 1) : 0
        };
    } catch (err) {
        console.error("AI OCR ERROR →", err);
        return {
            amount: null,
            upiId: null,
            utr: null,
            date: null,
            time: null,
            status: "unknown",
            appDetected: "UNKNOWN",
            isLikelyFake: false,
            confidence: 0,
            aiError: true
        };
    }
}
}),
"[externals]/sharp [external] (sharp, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("sharp", () => require("sharp"));

module.exports = mod;
}),
"[project]/lib/tools.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// image resize 
__turbopack_context__.s([
    "ISTMidnightToUTC",
    ()=>ISTMidnightToUTC,
    "detectPaymentDirection",
    ()=>detectPaymentDirection,
    "extractDate",
    ()=>extractDate,
    "validateScreenshotBeforeAI",
    ()=>validateScreenshotBeforeAI
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$sharp__$5b$external$5d$__$28$sharp$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/sharp [external] (sharp, cjs)"); // for metadata + brightness
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$exifr$2f$dist$2f$full$2e$esm$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/exifr/dist/full.esm.mjs [app-route] (ecmascript)"); // for screenshot EXIF check
;
;
// Helper function — simple variance check
async function computeNoiseVariance(buffer) {
    const raw = await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$sharp__$5b$external$5d$__$28$sharp$2c$__cjs$29$__["default"])(buffer).greyscale().raw().toBuffer();
    const mean = raw.reduce((a, b)=>a + b, 0) / raw.length;
    let sumSq = 0;
    for(let i = 0; i < raw.length; i++){
        sumSq += Math.pow(raw[i] - mean, 2);
    }
    return {
        variance: sumSq / raw.length
    };
}
// Simple edge detection using Sobel
async function computeEdgeScore(buffer) {
    const img = await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$sharp__$5b$external$5d$__$28$sharp$2c$__cjs$29$__["default"])(buffer).greyscale().raw().toBuffer({
        resolveWithObject: true
    });
    let edges = 0;
    let transitions = 0;
    for(let i = 1; i < img.data.length; i++){
        if (Math.abs(img.data[i] - img.data[i - 1]) > 30) {
            edges++;
        }
        transitions++;
    }
    return edges / transitions; // 0–1 score
}
async function validateScreenshotBeforeAI(buffer, clientOCR) {
    const meta = await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$sharp__$5b$external$5d$__$28$sharp$2c$__cjs$29$__["default"])(buffer).metadata();
    // 1️⃣ Resolution
    if (meta.width < 400 || meta.height < 600) {
        return "low_resolution";
    }
    // 2️⃣ Aspect ratio (UPI screenshots are tall)
    const ratio = meta.height / meta.width;
    if (ratio < 1.6 || ratio > 2.7) {
        return "invalid_aspect_ratio";
    }
    // 3️⃣ Brightness (SAFE for all formats)
    const raw = await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$sharp__$5b$external$5d$__$28$sharp$2c$__cjs$29$__["default"])(buffer).greyscale().raw().toBuffer();
    let total = 0;
    for(let i = 0; i < raw.length; i++)total += raw[i];
    const brightness = total / raw.length;
    if (brightness < 15) {
        return "bad_brightness"; // too dark or too bright
    }
    // 4️⃣ Screenshot vs Photo detection (EXIF)
    let exif = null;
    try {
        exif = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$exifr$2f$dist$2f$full$2e$esm$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].parse(buffer);
    } catch (_) {}
    if (exif && (exif.LensModel || exif.ExposureTime || exif.ISO || exif.FNumber)) {
        return "not_a_screenshot"; // it's a camera photo
    }
    // 5️⃣ Client OCR strength
    const clientText = typeof clientOCR?.text === "string" ? clientOCR.text.toLowerCase() : "";
    if (clientText.length < 10) {
        return "text_too_short";
    }
    // 6️⃣ UPI Detection (Advanced)
    const keywords = [
        // Generic UPI terms
        "upi",
        "unified payments",
        "transaction",
        "ref no",
        "reference",
        "paid to",
        "credited",
        "debited",
        "₹",
        "rs",
        "amount",
        "received",
        "txn",
        "upi ref",
        "transaction id",
        // Google Pay
        "gpay",
        "google pay",
        // PhonePe
        "phonepe",
        "phone pe",
        // Paytm
        "paytm",
        // BHIM
        "bhim",
        "bharat interface for money",
        // WhatsApp Pay
        "whatsapp pay",
        "wa pay",
        // Amazon Pay
        "amazon pay",
        "amazon upi",
        // Bank UPI Apps
        "sbi upi",
        "icici upi",
        "hdfc upi",
        "axis upi",
        "kotak upi",
        // VPA keywords
        "upi id",
        "vpa",
        "@ok",
        "@upi",
        "@oksbi",
        "@okaxis",
        "@okhdfcbank",
        "@ybl",
        "@ibl",
        "@axl",
        "@idfcbank"
    ];
    // 🔍 Fuzzy search to handle OCR mistakes
    function fuzzyIncludes(text, keyword) {
        return text.replace(/\s+/g, "").includes(keyword.replace(/\s+/g, ""));
    }
    let found = keywords.some((k)=>fuzzyIncludes(clientText, k));
    // 6.1️⃣ Success phrases (GPay / PhonePe / Paytm)
    const successPhrases = [
        "payment successful",
        "money sent",
        "you paid",
        "transaction successful",
        "paid successfully",
        "credited to your account",
        "debited from your account",
        "sent to",
        "received from"
    ];
    if (!found) {
        found = successPhrases.some((p)=>fuzzyIncludes(clientText, p));
    }
    // 6.2️⃣ UPI handle detection (regex)
    const upiHandleRegex = /[a-z0-9._%+-]+@([a-z]+|[a-z]+bank|okaxis|oksbi|ybl|ibl|axl)/i;
    if (!found && upiHandleRegex.test(clientText)) {
        found = true;
    }
    // 6.3️⃣ Amount pattern detection
    const amountRegex = /(₹|rs\.?)\s?\d+(\.\d{1,2})?/i;
    if (!found && amountRegex.test(clientText)) {
        found = true;
    }
    // 6.4️⃣ Transaction layout keywords
    const layoutKeywords = [
        "to",
        "from",
        "via upi",
        "scan & pay",
        "scan and pay"
    ];
    if (!found) {
        found = layoutKeywords.some((k)=>fuzzyIncludes(clientText, k));
    }
    // 7.1 Noise Analysis — detect overly smooth areas (edited or AI)
    const { variance } = await computeNoiseVariance(buffer);
    if (variance < 5) return "suspiciously_smooth"; // edited / AI look
    // 7.2 Edge Detection — high edge discontinuity means edits
    const edgeScore = await computeEdgeScore(buffer);
    if (edgeScore > 0.35) return "edge_artifacts_detected";
    // 7.3 Compression Pattern Consistency
    if (meta.format === "jpeg" && meta.density && meta.density < 50) {
        return "weird_compression_pattern";
    }
    // 7.4 Metadata inconsistencies
    if (exif && exif.Software && exif.Software.includes("Photoshop")) {
        return "edited_metadata";
    }
    // ❌ final fail if NOTHING matched
    if (!found) return "not_upi_keywords";
    return null; // VALID
}
function detectPaymentDirection(text = "") {
    const t = text.toLowerCase();
    const paidWords = [
        "paid successfully",
        "paid",
        "payment successful",
        "you paid",
        "sent",
        "debited",
        "paid to"
    ];
    const receivedWords = [
        "received",
        "payment received",
        "credited",
        "you received",
        "received from",
        "money received"
    ];
    const paid = paidWords.some((w)=>t.includes(w));
    const received = receivedWords.some((w)=>t.includes(w));
    if (paid && !received) return "PAID";
    if (!paid && received) return "RECEIVED";
    // If both appear → pick strongest match
    if (paid && received) {
        // Usually amount is closer to paid area
        return "PAID";
    }
    return "UNKNOWN";
}
function extractDate(text) {
    if (!text) return null;
    text = text.replace(/,/g, "").trim();
    // Supported formats:
    // 24/01/2025
    // 24-01-2025
    // 24.01.2025
    // 2025/01/24
    // 24 Jan 2025
    // Jan 24 2025
    const patterns = [
        /\b(\d{2})\/(\d{2})\/(\d{4})\b/,
        /\b(\d{2})-(\d{2})-(\d{4})\b/,
        /\b(\d{2})\.(\d{2})\.(\d{4})\b/,
        /\b(\d{4})\/(\d{2})\/(\d{2})\b/,
        /\b(\d{2})\s([A-Za-z]+)\s(\d{4})\b/,
        /\b([A-Za-z]+)\s(\d{2})\s(\d{4})\b/ // Jan 24 2025
    ];
    for (let regex of patterns){
        const match = text.match(regex);
        if (match) return match[0]; // Return exact date string found
    }
    return null;
}
function ISTMidnightToUTC() {
    const now = new Date();
    const istOffset = 5.5 * 60 * 60 * 1000;
    const istDate = new Date(now.getTime() + istOffset);
    const istMidnight = new Date(istDate.getFullYear(), istDate.getMonth(), istDate.getDate(), 0, 0, 0, 0);
    return new Date(istMidnight.getTime() - istOffset);
}
}),
"[project]/lib/upiTime.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Validate screenshot date + time independently,
 * supporting all UPI app variations.
 */ __turbopack_context__.s([
    "validateUPIScreenshotTime",
    ()=>validateUPIScreenshotTime
]);
function validateUPIScreenshotTime(dateStr, timeStr) {
    if (!dateStr || !timeStr) {
        return {
            valid: false,
            reason: "invalid_date_or_time"
        };
    }
    // Normalize input
    dateStr = dateStr.trim().replace(/,/g, "");
    timeStr = timeStr.trim().replace(/\./g, ":").replace(/-/g, ":");
    const parsedTime = parseUPITime(timeStr);
    if (!parsedTime) {
        return {
            valid: false,
            reason: "invalid_time_format"
        };
    }
    const now = new Date();
    // ---- DATE VALIDATION (DATE ONLY) ----
    const screenshotDate = stripTime(new Date(dateStr));
    const today = stripTime(now);
    if (screenshotDate < today) {
        return {
            valid: false,
            reason: "old_screenshot_date"
        };
    }
    if (screenshotDate > today) {
        return {
            valid: false,
            reason: "future_screenshot_date"
        };
    }
    // ---- TIME VALIDATION (PAST 15 MIN ONLY) ----
    if (!isWithinLast15Minutes(parsedTime)) {
        return {
            valid: false,
            reason: "time_limit_end"
        };
    }
    // ---- COMBINE DATE + TIME ----
    const finalDateTime = new Date(today.getFullYear(), today.getMonth(), today.getDate(), parsedTime.hour, parsedTime.minute, parsedTime.second || 0, 0);
    return {
        valid: true,
        dateTime: finalDateTime
    };
}
/** -------------------------------
 * Remove time from date
 ----------------------------------*/ function stripTime(d) {
    return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}
/** -------------------------------
 * UPI TIME PARSER (ALL FORMATS)
 ----------------------------------*/ function parseUPITime(timeStr) {
    let str = timeStr.toLowerCase();
    str = str.replace(/-/g, ":").replace(/\./g, ":");
    // HH:MM(:SS) AM/PM
    let m = str.match(/^(\d{1,2}):(\d{2})(?:\:(\d{2}))?\s?(am|pm)$/);
    if (m) {
        let h = +m[1];
        const min = +m[2];
        const sec = m[3] ? +m[3] : 0;
        if (m[4] === "pm" && h !== 12) h += 12;
        if (m[4] === "am" && h === 12) h = 0;
        return {
            hour: h,
            minute: min,
            second: sec
        };
    }
    // 24-hour HH:MM(:SS)
    m = str.match(/^(\d{1,2}):(\d{2})(?:\:(\d{2}))?$/);
    if (m) {
        return {
            hour: +m[1],
            minute: +m[2],
            second: m[3] ? +m[3] : 0
        };
    }
    return null;
}
/** -------------------------------
 * Check past 15 minutes only
 ----------------------------------*/ function isWithinLast15Minutes(time) {
    const now = new Date();
    const nowSeconds = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
    const givenSeconds = time.hour * 3600 + time.minute * 60 + (time.second || 0);
    const secondsInDay = 24 * 3600;
    let diff = nowSeconds - givenSeconds;
    // midnight crossing
    if (diff < 0) diff += secondsInDay;
    return diff >= 0 && diff <= 15 * 60;
}
}),
"[externals]/node:crypto [external] (node:crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:crypto", () => require("node:crypto"));

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
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$aiParser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/aiParser.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tools$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/tools.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$upiTime$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/upiTime.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$nanoid$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/nanoid/index.js [app-route] (ecmascript) <locals>");
const runtime = "nodejs";
;
;
;
;
;
;
;
/** SHA256 hash generator */ function sha256(buffer) {
    return __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["default"].createHash("sha256").update(buffer).digest("hex");
}
async function POST(req) {
    try {
        // ✅ Lazy import Prisma (build-safe)
        const { default: prisma } = await __turbopack_context__.A("[project]/lib/prisma.js [app-route] (ecmascript, async loader)");
        const formData = await req.formData();
        const file = formData.get("file");
        const shopId = formData.get("shopId");
        const phone = formData.get("phone");
        const ocrJson = formData.get("ocrResult");
        let rejectReason = null;
        let newCustomer = false;
        if (!file || !shopId || !ocrJson || !phone) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Missing required fields"
            }, {
                status: 400
            });
        }
        // FETCH CUSTOMER 
        let customer = await prisma.customer.findFirst({
            where: {
                shopId,
                phone
            }
        });
        const clientOCR = JSON.parse(ocrJson);
        const { text: rawText } = clientOCR;
        // --------------------------------------
        // 1️⃣ HASH ORIGINAL IMAGE (True Duplicate Prevention) and checksum
        // --------------------------------------
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const screenshotHash = sha256(buffer);
        // base 64 image 
        const imageBase64 = buffer.toString("base64");
        // checksum 
        const checksum = __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["default"].createHash("sha256").update(rawText?.toLowerCase().replace(/\s+/g, " ").replace(/[^\x20-\x7E]/g, "").trim()).digest("hex");
        // --------------------------------------
        // 2️⃣ FETCH SHOP and subscription details 
        // --------------------------------------
        const shop = await prisma.shop.findUnique({
            where: {
                id: shopId
            }
        });
        if (!shop) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Invalid shopId."
            }, {
                status: 404
            });
        }
        if (!shop.loyaltyEnabled) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "pauseLoaylty"
            }, {
                status: 423
            });
        }
        // Shop active check
        if (!shop.isActive) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                error: "Shop is inactive."
            }, {
                status: 403
            });
        }
        // get shop subscription details 
        const subscription = await prisma.subscription.findFirst({
            where: {
                shopId
            }
        });
        if (!subscription) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                error: "Shop is not subscribed."
            }, {
                status: 403
            });
        }
        const now = new Date();
        const validStatuses = [
            "active",
            "trialing"
        ];
        // STATUS VALIDATION
        const isStatusValid = validStatuses.includes(subscription.status);
        // DATE VALIDATION (UTC-safe)
        const isExpired = new Date(subscription.nextBillingAt) < now;
        // subscription status 
        if (!isStatusValid || isExpired) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                error: "Subscription expired."
            }, {
                status: 403
            });
        }
        // --------------------------------------
        // 4️⃣ daily upload limit
        // --------------------------------------
        const utcStart = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tools$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ISTMidnightToUTC"])();
        const dailyUploads = await prisma.scanVerification.count({
            where: {
                shopId,
                phone,
                createdAt: {
                    gte: utcStart
                },
                status: "success"
            }
        });
        if (dailyUploads >= shop.maxStampsPerCustomerPerDay) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                error: "daily_upload_limit_reached"
            }, {
                status: 429
            });
        }
        // 3️⃣ Detect payment direction (paid / received / unknown)
        if (!rejectReason) {
            const paymentDirection = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tools$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["detectPaymentDirection"])(rawText);
            if (paymentDirection == 'RECEIVED') {
                rejectReason = 'received_payment_direction.';
            }
        }
        // --------------------------------------
        // 4️⃣ PRE-VALIDATION BEFORE AI (cost saving)
        // --------------------------------------
        if (!rejectReason) {
            const preFail = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tools$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["validateScreenshotBeforeAI"])(buffer, clientOCR);
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
                }
            });
            if (duplicateHash) {
                rejectReason = 'duplicate_image_hash';
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
                rejectReason = 'duplicate_image_ocr';
            }
        }
        // pre ai verification scan save
        if (rejectReason) {
            const scan = await prisma.scanVerification.create({
                data: {
                    shopId,
                    phone: phone,
                    customerId: customer ? customer.id : null,
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
                    verifiedAt: new Date()
                }
            });
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                rejectReason
            }, {
                status: 400
            });
        }
        // --------------------------------------
        // 6️⃣ AI OCR FIX PROCESSING
        // --------------------------------------
        const ai = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$aiParser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parsePaymentScreenshot"])(imageBase64);
        if (ai.aiError) {
            console.log("⚠ AI unavailable — continuing with client OCR only");
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                error: 'Server error'
            }, {
                status: 400
            });
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
        const status = ai.status ?? false;
        // if payment status not success 
        if (!rejectReason) {
            if (status !== "success") {
                rejectReason = 'status_not_success';
            }
        }
        // check utr 
        if (!rejectReason) {
            if (utr) {
                const utrRegex = /^[0-9A-Za-z]{12,18}$/;
                const utrExists = await prisma.scanVerification.findFirst({
                    where: {
                        shopId,
                        utr,
                        status: 'success'
                    }
                });
                if (!utrRegex.test(utr)) {
                    rejectReason = 'invalid_utr';
                }
                // duplicate utr 
                if (utrExists) {
                    rejectReason = 'utr_already_exist';
                }
            }
        }
        // Validate amount
        if (!rejectReason) {
            if (!amount) {
                rejectReason = 'amount_not_existed';
            }
        }
        // amount limit 
        if (!rejectReason) {
            if (amount) {
                if (amount < shop.minAmount) {
                    rejectReason = 'amount_below_mimimum';
                }
            }
        }
        // time and date validation 
        if (!rejectReason) {
            const timeCheck = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$upiTime$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["validateUPIScreenshotTime"])(date, time);
            if (!timeCheck.valid) {
                rejectReason = timeCheck.reason;
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
                    rejectReason = 'low_confidence';
                }
            }
        }
        // normaize text 
        function normalizeText(text) {
            return text?.toLowerCase().replace(/[^a-z0-9@]/g, "");
        }
        const normalizedRaw = normalizeText(rawText);
        // upi mismatch 
        if (!rejectReason && !upiId) {
            rejectReason = 'upi_not_exist';
            if (normalizedRaw.includes(shop.upiId)) {
                upiId = shop.upiId;
                rejectReason = null;
            }
        }
        if (!rejectReason && upiId) {
            if (upiId !== shop.upiId) {
                rejectReason = 'upi_mismatch';
            }
            if (normalizedRaw.includes(shop.upiId)) {
                upiId = shop.upiId;
                rejectReason = null;
            }
        }
        // --------------------------------------
        //  CREATE CUSTOMER
        // --------------------------------------
        if (!customer && !rejectReason) {
            customer = await prisma.customer.create({
                data: {
                    id: `cust_${(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$nanoid$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["nanoid"])(10)}`,
                    shopId,
                    phone
                }
            });
            newCustomer = true;
        }
        // --------------------------------------
        // 7️⃣ SAVE THE VERIFICATION RECORD
        // --------------------------------------
        const scan = await prisma.scanVerification.create({
            data: {
                shopId,
                phone: phone,
                customerId: customer ? customer.id : null,
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
                verifiedAt: rejectReason ? rejectReason === 'upi_mismatch' || rejectReason === 'upi_not_exist' ? null : new Date() : new Date()
            }
        });
        // If failed fraud check → return here
        if (rejectReason) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                rejectReason,
                newCustomer
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
                totalStampCount: {
                    increment: 1
                },
                lastVisit: new Date()
            }
        });
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            message: "Stamp added!",
            scanId: scan.id,
            newCustomer
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

//# sourceMappingURL=%5Broot-of-the-server%5D__4fc287de._.js.map
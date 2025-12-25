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
function parseLLMJson(raw) {
    if (!raw) throw new Error("Empty AI response");
    let text = raw.trim().replace(/^```json/i, "").replace(/^```/, "").replace(/```$/, "").trim();
    const start = text.indexOf("{");
    const end = text.lastIndexOf("}");
    if (start === -1 || end === -1) throw new Error("No JSON object found");
    return JSON.parse(text.slice(start, end + 1).replace(/,\s*}/g, "}").replace(/,\s*]/g, "]").replace(/\n/g, " ").replace(/\t/g, " "));
}
async function parsePaymentScreenshot(imageBase64) {
    try {
        const system = "You are an OCR extraction system. Output ONLY valid JSON.";
        const user = `
Extract payment info from screenshot.

Rules:
amount: number | null
upiId: string | null  (must contain '@')
utr: string | null (8–25 chars)
date: YYYY-MM-DD | null
time: HH:MM or HH:MM:SS | null
status: success | failed | pending | unknown
app: GPay | PhonePe | Paytm | AmazonPay | UNKNOWN
fake: boolean
confidence: 0–1

Output JSON only.
`;
        const res = await client.chat.completions.create({
            model: "gpt-4.1-mini",
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
                            text: user
                        },
                        {
                            type: "image",
                            image_url: `data:image/jpeg;base64,${imageBase64}`
                        }
                    ]
                }
            ],
            temperature: 0,
            max_tokens: 180
        });
        const raw = res.choices[0].message.content;
        const parsed = parseLLMJson(raw);
        return {
            amount: typeof parsed.amount === "number" ? parsed.amount : null,
            upiId: typeof parsed.upiId === "string" && parsed.upiId.includes("@") ? parsed.upiId : null,
            utr: typeof parsed.utr === "string" && /^[a-zA-Z0-9]{8,25}$/.test(parsed.utr) ? parsed.utr : null,
            date: typeof parsed.date === "string" && /^\d{4}-\d{2}-\d{2}$/.test(parsed.date) ? parsed.date : null,
            time: typeof parsed.time === "string" && /^(\d{2}:\d{2}|\d{2}:\d{2}:\d{2})$/.test(parsed.time) ? parsed.time : null,
            // ⭐ STATUS extraction added here
            status: typeof parsed.status === "string" && [
                "success",
                "failed",
                "pending",
                "unknown"
            ].includes(parsed.status.toLowerCase()) ? parsed.status.toLowerCase() : "unknown",
            appDetected: parsed.app || "UNKNOWN",
            isLikelyFake: Boolean(parsed.fake),
            confidence: typeof parsed.confidence === "number" ? Math.min(Math.max(parsed.confidence, 0), 1) : 0.5
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
} // extract time for ocr 
}),
"[project]/lib/upiTime.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Validate screenshot date + time independently,
 * supporting all UPI app variations.
 *
 * @param {string|null} dateStr
 * @param {string|null} timeStr
 */ __turbopack_context__.s([
    "validateUPIScreenshotTime",
    ()=>validateUPIScreenshotTime
]);
function validateUPIScreenshotTime(dateStr, timeStr) {
    if (!dateStr || !timeStr) {
        return {
            valid: false,
            reason: "Invalid date and time."
        };
    }
    // Normalize input first
    dateStr = dateStr.trim().replace(/,/g, "");
    timeStr = timeStr.trim().replace(/\./g, ":").replace(/-/g, ":");
    let parsedDate = parseUPIDate(dateStr);
    let parsedTime = parseUPITime(timeStr);
    if (!parsedDate) {
        return {
            valid: false,
            reason: "Invalid date and time"
        };
    }
    if (!parsedTime) {
        return {
            valid: false,
            reason: "Invalid date and time"
        };
    }
    // Merge date + time into a real Date object safely
    const finalDateTime = new Date(parsedDate.year, parsedDate.month - 1, parsedDate.day, parsedTime.hour, parsedTime.minute, parsedTime.second);
    if (isNaN(finalDateTime.getTime())) {
        return {
            valid: false,
            reason: "failed_datetime_merge"
        };
    }
    const now = new Date();
    // Screenshot cannot be from the future
    if (finalDateTime > now) {
        return {
            valid: false,
            reason: "future_screenshot_time"
        };
    }
    // Check maximum allowed age: 15 minutes
    const diffMinutes = (now - finalDateTime) / (1000 * 60);
    if (diffMinutes > 15) {
        return {
            valid: false,
            reason: "screenshot_too_old"
        };
    }
    return {
        valid: true,
        dateTime: finalDateTime
    };
}
/** -------------------------------
 * UPI DATE PARSER
 * Supports:
 *  - 24/01/2025
 *  - 24-01-2025
 *  - 24.01.2025
 *  - 2025/01/24
 *  - Jan 24, 2025
 *  - 24 Jan 2025
 ----------------------------------*/ function parseUPIDate(dateStr) {
    const formats = [
        /^(\d{2})\/(\d{2})\/(\d{4})$/,
        /^(\d{2})-(\d{2})-(\d{4})$/,
        /^(\d{2})\.(\d{2})\.(\d{4})$/,
        /^(\d{4})\/(\d{2})\/(\d{2})$/,
        /^(\d{2})\s([A-Za-z]+)\s(\d{4})$/,
        /^([A-Za-z]+)\s(\d{2}),\s?(\d{4})$/ // Jan 24, 2025
    ];
    for (let f of formats){
        const match = dateStr.match(f);
        if (!match) continue;
        // Format types
        if (f === formats[0] || f === formats[1] || f === formats[2]) {
            return {
                day: +match[1],
                month: +match[2],
                year: +match[3]
            };
        }
        if (f === formats[3]) {
            return {
                year: +match[1],
                month: +match[2],
                day: +match[3]
            };
        }
        if (f === formats[4]) {
            return {
                day: +match[1],
                month: monthToNumber(match[2]),
                year: +match[3]
            };
        }
        if (f === formats[5]) {
            return {
                month: monthToNumber(match[1]),
                day: +match[2],
                year: +match[3]
            };
        }
    }
    return null;
}
/** Convert "Jan", "January" → 1 */ function monthToNumber(m) {
    const months = {
        jan: 1,
        january: 1,
        feb: 2,
        february: 2,
        mar: 3,
        march: 3,
        apr: 4,
        april: 4,
        may: 5,
        jun: 6,
        june: 6,
        jul: 7,
        july: 7,
        aug: 8,
        august: 8,
        sep: 9,
        sept: 9,
        september: 9,
        oct: 10,
        october: 10,
        nov: 11,
        november: 11,
        dec: 12,
        december: 12
    };
    return months[m.toLowerCase()] || null;
}
/** -------------------------------
 * UPI TIME PARSER (ALL FORMATS)
 * Supports:
 *  - 10:42 AM
 *  - 10:42AM
 *  - 22:30
 *  - 10.42 PM
 *  - 10-42 am
 *  - 10:42:10
 ----------------------------------*/ function parseUPITime(timeStr) {
    let str = timeStr.toLowerCase();
    // Replace separators
    str = str.replace(/-/g, ":").replace(/\./g, ":");
    // Format 1: HH:MM AM/PM
    let m = str.match(/^(\d{1,2}):(\d{2})(?:\:(\d{2}))?\s?(am|pm)$/);
    if (m) {
        let h = +m[1];
        let min = +m[2];
        let sec = m[3] ? +m[3] : 0;
        if (m[4] === "pm" && h !== 12) h += 12;
        if (m[4] === "am" && h === 12) h = 0;
        return {
            hour: h,
            minute: min,
            second: sec
        };
    }
    // Format 2: 24-hour HH:MM(:SS)
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
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tools$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/tools.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$upiTime$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/upiTime.js [app-route] (ecmascript)");
const runtime = "nodejs";
;
;
;
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
        console.log('text', rawText);
        // --------------------------------------
        // 1️⃣ HASH ORIGINAL IMAGE (True Duplicate Prevention)
        // --------------------------------------
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const screenshotHash = sha256(buffer);
        // base 64 image 
        const imageBase64 = buffer.toString("base64");
        // --------------------------------------
        // 2️⃣ FETCH SHOP
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
        // 3️⃣ Detect payment direction (paid / received / unknown)
        const paymentDirection = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tools$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["detectPaymentDirection"])(rawText);
        if (paymentDirection == 'RECEIVED') {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                rejectReason: 'Received payment not valid.'
            }, {
                status: 400
            });
        }
        // --------------------------------------
        // 4️⃣ PRE-VALIDATION BEFORE AI (cost saving)
        // --------------------------------------
        const preFail = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tools$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["validateScreenshotBeforeAI"])(buffer, clientOCR);
        if (preFail) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                rejectReason: 'Screenshot is not valid..'
            }, {
                status: 400
            });
        }
        // --------------------------------------
        // 5️⃣ CHECK DUPLICATE SCREENSHOT
        // --------------------------------------
        const duplicate = await prisma.scanVerification.findFirst({
            where: {
                shopId,
                screenshotHash,
                status: "success"
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
        // 6️⃣ AI OCR FIX PROCESSING
        // --------------------------------------
        const ai = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$aiParser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parsePaymentScreenshot"])(imageBase64);
        if (ai.aiError) {
            console.log("⚠ AI unavailable — continuing with client OCR only");
        }
        console.log("AI FIXED OCR →", ai);
        // AI corrected values (fallback to client OCR)
        const amount = ai.amount ?? null;
        const upiId = ai.upiId ?? clientOCR.upiId ?? null;
        const utr = ai.utr ?? clientOCR.utr ?? null;
        const date = ai.date ?? clientOCR.date ?? null;
        const time = ai.time ?? clientOCR.time ?? null;
        const appDetected = ai.appDetected ?? "UNKNOWN";
        const isLikelyFake = ai.isLikelyFake ?? false;
        const confidence = ai.confidence ?? null;
        const status = ai.status ?? false;
        const timeCheck2 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$upiTime$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["validateUPIScreenshotTime"])(date, time);
        console.log("time", timeCheck2);
        // if payment status not success 
        if (!ai || ai.status !== "success") {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                rejectReason: "Payment is not successful."
            }, {
                status: 400
            });
        }
        // check utr 
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
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    success: false,
                    rejectReason: "Screenshot is not valid."
                }, {
                    status: 400
                });
            }
            // duplicate utr 
            if (utrExists) {
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    success: false,
                    rejectReason: "Duplicate Screenshot"
                }, {
                    status: 400
                });
            }
        }
        // Validate amount
        if (!amount) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                rejectReason: "Amount is invalid"
            }, {
                status: 400
            });
        }
        // amount limit 
        if (amount) {
            if (amount < shop.minAmount) {
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    success: false,
                    rejectReason: "Payment amount is below the minimum required."
                }, {
                    status: 400
                });
            }
        }
        // time and date validation 
        const timeCheck = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$upiTime$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["validateUPIScreenshotTime"])(date, time);
        if (!timeCheck.valid) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                rejectReason: timeCheck.reason
            }, {
                status: 400
            });
        }
        // --------------------------------------
        //  CREATE / FETCH CUSTOMER
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
        //  FRAUD CHECKS
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
        // Payment status from client OCR (not AI)
        if (!rejectReason && clientOCR.status !== "success") {
            rejectReason = "payment_not_success";
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

//# sourceMappingURL=%5Broot-of-the-server%5D__fe6a2376._.js.map
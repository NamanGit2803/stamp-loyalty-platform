import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// --------------------
// Helper: robust JSON extraction
// --------------------
function parseLLMJson(raw) {
  if (!raw) throw new Error("Empty AI response");

  let text = raw
    .trim()
    .replace(/^```json/i, "")
    .replace(/^```/, "")
    .replace(/```$/, "")
    .trim();

  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start === -1 || end === -1) {
    throw new Error("No JSON object found in AI output");
  }

  return JSON.parse(
    text
      .slice(start, end + 1)
      .replace(/,\s*}/g, "}")
      .replace(/,\s*]/g, "]")
      .replace(/\n/g, " ")
      .replace(/\t/g, " ")
  );
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

// --------------------
// MAIN AI OCR FUNCTION
// --------------------
export async function parsePaymentScreenshot(imageBase64) {
  try {
    const system =
      "You are an OCR extraction system. Output ONLY valid JSON.";

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
        { role: "system", content: system },
        {
          role: "user",
          content: [
            { type: "text", text: userPrompt },
            {
              type: "image_url",
              image_url: {
                url: `data:image/jpeg;base64,${imageBase64}`,
              },
            },
          ],
        },
      ],
    });

    const raw = res.choices[0]?.message?.content;
    const parsed = parseLLMJson(raw);

    return {
      // ---------- Amount ----------
      amount:
        typeof parsed.amount === "number" && !isNaN(parsed.amount)
          ? parsed.amount
          : null,

      // ---------- UPI ID ----------
      upiId:
        typeof parsed.upiId === "string" &&
          parsed.upiId.includes("@")
          ? parsed.upiId
          : null,

      // ---------- UTR ----------
      utr:
        typeof parsed.utr === "string" &&
          /^[A-Za-z0-9]{12,18}$/.test(parsed.utr)
          ? parsed.utr
          : null,

      // ---------- Date (STRICT) ----------
      date:
        typeof parsed.date === "string" &&
          /^\d{4}-\d{2}-\d{2}$/.test(parsed.date) &&
          isReasonableDate(parsed.date)
          ? parsed.date
          : null,

      // ---------- Time ----------
      time:
        typeof parsed.time === "string" &&
          /^(\d{2}:\d{2}|\d{2}:\d{2}:\d{2})$/.test(parsed.time)
          ? parsed.time
          : null,

      // ---------- Status ----------
      status:
        typeof parsed.status === "string" &&
          ["success", "failed", "pending", "unknown"].includes(
            parsed.status.toLowerCase()
          )
          ? parsed.status.toLowerCase()
          : "unknown",

      // ---------- App ----------
      appDetected:
        typeof parsed.app === "string"
          ? parsed.app
          : "UNKNOWN",

      // ---------- Fraud ----------
      isLikelyFake: Boolean(parsed.fake),

      // ---------- Confidence ----------
      confidence:
        typeof parsed.confidence === "number"
          ? Math.min(Math.max(parsed.confidence, 0), 1)
          : 0,
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
      aiError: true,
    };
  }
}

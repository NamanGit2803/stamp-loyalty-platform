import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

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
  if (start === -1 || end === -1) throw new Error("No JSON object found");

  return JSON.parse(
    text
      .slice(start, end + 1)
      .replace(/,\s*}/g, "}")
      .replace(/,\s*]/g, "]")
      .replace(/\n/g, " ")
      .replace(/\t/g, " ")
  );
}

export async function parsePaymentScreenshot(imageBase64) {
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
        { role: "system", content: system },
        {
          role: "user",
          content: [
            { type: "text", text: user },
            {
              type: "image",
              image_url: `data:image/jpeg;base64,${imageBase64}`,
            },
          ],
        },
      ],
      temperature: 0,
      max_tokens: 180, // a bit more because status added
    });

    const raw = res.choices[0].message.content;
    const parsed = parseLLMJson(raw);

    return {
      amount: typeof parsed.amount === "number" ? parsed.amount : null,

      upiId:
        typeof parsed.upiId === "string" &&
          parsed.upiId.includes("@")
          ? parsed.upiId
          : null,

      utr:
        typeof parsed.utr === "string" &&
          /^[a-zA-Z0-9]{8,25}$/.test(parsed.utr)
          ? parsed.utr
          : null,

      date:
        typeof parsed.date === "string" &&
          /^\d{4}-\d{2}-\d{2}$/.test(parsed.date)
          ? parsed.date
          : null,

      time:
        typeof parsed.time === "string" &&
          /^(\d{2}:\d{2}|\d{2}:\d{2}:\d{2})$/.test(parsed.time)
          ? parsed.time
          : null,

      // ⭐ STATUS extraction added here
      status:
        typeof parsed.status === "string" &&
          ["success", "failed", "pending", "unknown"].includes(
            parsed.status.toLowerCase()
          )
          ? parsed.status.toLowerCase()
          : "unknown",

      appDetected: parsed.app || "UNKNOWN",
      isLikelyFake: Boolean(parsed.fake),

      confidence:
        typeof parsed.confidence === "number"
          ? Math.min(Math.max(parsed.confidence, 0), 1)
          : 0.5,
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

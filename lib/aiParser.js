import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// This takes OCR text and extracts clean values
export async function parsePaymentOCR(ocrText) {
  try {
    const prompt = `
Extract amount, UTR, UPI ID, and payment app from this text.
Return strict JSON:
{
  "amount": number | null,
  "upiId": "string or null",
  "utr": "string or null",
  "appDetected": "GPay | PhonePe | Paytm | AmazonPay | UNKNOWN",
  "isLikelyFake": boolean
}
OCR text:
${ocrText}
`;

    const res = await client.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        { role: "system", content: "Extract structured payment details." },
        { role: "user", content: prompt }
      ],
      temperature: 0,
    });

    return JSON.parse(res.choices[0].message.content);

  } catch (err) {
    console.error("AI Parser ERROR →", err);

    // ❗ Fallback: continue without AI instead of crashing API
    return {
      amount: null,
      upiId: null,
      utr: null,
      appDetected: "UNKNOWN",
      isLikelyFake: false,
      aiError: true
    };
  }
}


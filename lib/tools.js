// image resize 
import sharp from "sharp"; // for metadata + brightness
import exifr from "exifr"; // for screenshot EXIF check


// Helper function — simple variance check
async function computeNoiseVariance(buffer) {
  const raw = await sharp(buffer).greyscale().raw().toBuffer();
  const mean = raw.reduce((a, b) => a + b, 0) / raw.length;

  let sumSq = 0;
  for (let i = 0; i < raw.length; i++) {
    sumSq += Math.pow(raw[i] - mean, 2);
  }

  return { variance: sumSq / raw.length };
}


// Simple edge detection using Sobel
async function computeEdgeScore(buffer) {
  const img = await sharp(buffer)
    .greyscale()
    .raw()
    .toBuffer({ resolveWithObject: true });

  let edges = 0;
  let transitions = 0;

  for (let i = 1; i < img.data.length; i++) {
    if (Math.abs(img.data[i] - img.data[i - 1]) > 30) {
      edges++;
    }
    transitions++;
  }

  return edges / transitions; // 0–1 score
}



// ss validation 
export async function validateScreenshotBeforeAI(buffer, clientOCR) {
  const meta = await sharp(buffer).metadata();

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
  const raw = await sharp(buffer).greyscale().raw().toBuffer();
  let total = 0;
  for (let i = 0; i < raw.length; i++) total += raw[i];
  const brightness = total / raw.length;

  if (brightness < 15) {
    return "bad_brightness"; // too dark or too bright
  }

  // 4️⃣ Screenshot vs Photo detection (EXIF)
  let exif = null;
  try {
    exif = await exifr.parse(buffer);
  } catch (_) { }

  if (exif && (exif.LensModel || exif.ExposureTime || exif.ISO || exif.FNumber)) {
    return "not_a_screenshot"; // it's a camera photo
  }

  // 5️⃣ Client OCR strength
  const clientText =
    typeof clientOCR?.text === "string"
      ? clientOCR.text.toLowerCase()
      : "";

  if (clientText.length < 10) {
    return "text_too_short";
  }

  // 6️⃣ UPI Detection (Advanced)
  const keywords = [
    // Generic UPI terms
    "upi", "unified payments", "transaction", "ref no", "reference",
    "paid to", "credited", "debited", "₹", "rs", "amount", "received",
    "txn", "upi ref", "transaction id",

    // Google Pay
    "gpay", "google pay",

    // PhonePe
    "phonepe", "phone pe",

    // Paytm
    "paytm",

    // BHIM
    "bhim", "bharat interface for money",

    // WhatsApp Pay
    "whatsapp pay", "wa pay",

    // Amazon Pay
    "amazon pay", "amazon upi",

    // Bank UPI Apps
    "sbi upi", "icici upi", "hdfc upi", "axis upi", "kotak upi",

    // VPA keywords
    "upi id", "vpa", "@ok", "@upi", "@oksbi", "@okaxis", "@okhdfcbank",
    "@ybl", "@ibl", "@axl", "@idfcbank"
  ];

  // 🔍 Fuzzy search to handle OCR mistakes
  function fuzzyIncludes(text, keyword) {
    return text.replace(/\s+/g, "").includes(keyword.replace(/\s+/g, ""));
  }

  let found = keywords.some((k) => fuzzyIncludes(clientText, k));


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
    found = successPhrases.some((p) => fuzzyIncludes(clientText, p));
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
  const layoutKeywords = ["to", "from", "via upi", "scan & pay", "scan and pay"];
  if (!found) {
    found = layoutKeywords.some((k) => fuzzyIncludes(clientText, k));
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



// detect payment paid or else 
export function detectPaymentDirection(text = "") {
  const t = text.toLowerCase();

  const paidWords = [
    "paid successfully",
    "paid",
    "payment successful",
    "you paid",
    "sent",
    "debited",
    "paid to",
  ];

  const receivedWords = [
    "received",
    "payment received",
    "credited",
    "you received",
    "received from",
    "money received",
  ];

  const paid = paidWords.some((w) => t.includes(w));
  const received = receivedWords.some((w) => t.includes(w));

  if (paid && !received) return "PAID";
  if (!paid && received) return "RECEIVED";

  // If both appear → pick strongest match
  if (paid && received) {
    // Usually amount is closer to paid area
    return "PAID";
  }

  return "UNKNOWN";
}


// extract date for ocr 
export function extractDate(text) {
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
    /\b(\d{2})\/(\d{2})\/(\d{4})\b/,      // 24/01/2025
    /\b(\d{2})-(\d{2})-(\d{4})\b/,        // 24-01-2025
    /\b(\d{2})\.(\d{2})\.(\d{4})\b/,      // 24.01.2025
    /\b(\d{4})\/(\d{2})\/(\d{2})\b/,      // 2025/01/24
    /\b(\d{2})\s([A-Za-z]+)\s(\d{4})\b/,  // 24 Jan 2025
    /\b([A-Za-z]+)\s(\d{2})\s(\d{4})\b/   // Jan 24 2025
  ];

  for (let regex of patterns) {
    const match = text.match(regex);
    if (match) return match[0]; // Return exact date string found
  }

  return null;
}


// convert ist date to utc 
export function ISTMidnightToUTC() {
  const now = new Date();
  const istOffset = 5.5 * 60 * 60 * 1000;

  const istDate = new Date(now.getTime() + istOffset);
  const istMidnight = new Date(
    istDate.getFullYear(),
    istDate.getMonth(),
    istDate.getDate(),
    0, 0, 0, 0
  );

  return new Date(istMidnight.getTime() - istOffset);
}








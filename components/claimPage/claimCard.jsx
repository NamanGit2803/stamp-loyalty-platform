"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, X } from "lucide-react";
import { observer } from "mobx-react-lite";
import { Spinner } from "@/components/ui/spinner";
import { createWorker } from "tesseract.js";

/* ------------------------------
   🔵 IMAGE RESIZER (FAST OCR)
--------------------------------*/
async function resizeImage(file, maxWidth = 1200, quality = 0.85) {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
            const scale = Math.min(1, maxWidth / img.width);
            const w = img.width * scale;
            const h = img.height * scale;
            const canvas = document.createElement("canvas");
            canvas.width = w;
            canvas.height = h;
            canvas.getContext("2d").drawImage(img, 0, 0, w, h);

            canvas.toBlob(
                (blob) => resolve(new File([blob], file.name, { type: "image/jpeg" })),
                "image/jpeg",
                quality
            );
        };
        img.src = URL.createObjectURL(file);
    });
}


/* ------------------------------
   🔵 OCR Extractor Helpers
--------------------------------*/
function extractAmountAdvanced(text) {
    if (!text) return null;

    let cleaned = text
        .replace(/[lI]/g, "1")   // OCR error: I → 1
        .replace(/O/g, "0")      // OCR error: O → 0
        .replace(/,/g, "");      // Remove commas

    const lines = cleaned.split("\n").map(l => l.trim());

    let candidates = [];

    // 1️⃣ PRIORITY: Lines containing keywords related to amount
    const priorityKeywords = ["amount", "paid", "rs", "₹", "payment"];
    for (const line of lines) {
        const low = line.toLowerCase();
        if (priorityKeywords.some(k => low.includes(k))) {
            const nums = line.match(/\d{1,6}(?:\.\d{1,2})?/g);
            if (nums) {
                nums.forEach(n => {
                    const val = parseFloat(n);
                    if (val > 0 && val < 50000) {
                        candidates.push({ value: val, weight: 3 });
                    }
                });
            }
        }
    }

    // 2️⃣ SECOND PRIORITY: Lines containing Rupee symbol
    for (const line of lines) {
        if (line.includes("₹")) {
            const nums = line.match(/\d{1,6}(?:\.\d{1,2})?/g);
            if (nums) {
                nums.forEach(n => {
                    const val = parseFloat(n);
                    if (val > 0 && val < 50000) {
                        candidates.push({ value: val, weight: 2 });
                    }
                });
            }
        }
    }

    // 3️⃣ THIRD PRIORITY: All numbers (fallback)
    const allNums = cleaned.match(/\d{1,6}(?:\.\d{1,2})?/g);
    if (allNums) {
        allNums.forEach(n => {
            const val = parseFloat(n);
            // discard timestamps, years, bank numbers, etc.
            if (val > 10 && val < 50000) {
                candidates.push({ value: val, weight: 1 });
            }
        });
    }

    if (candidates.length === 0) return null;

    // 4️⃣ Choose best candidate:
    // - Highest weight first
    // - If tie, largest number wins
    candidates.sort((a, b) => {
        if (b.weight !== a.weight) return b.weight - a.weight;
        return b.value - a.value;
    });

    return candidates[0].value;
}


function extractUpi(text) {
    const m = text.match(/[a-zA-Z0-9.\-_]+@[a-zA-Z]{2,}/);
    return m ? m[0] : null;
}

function extractUTR(text) {
    const m = text.match(/\b\d{6,12}\b/);
    return m ? m[0] : null;
}

function extractStatus(text) {
    text = text.toLowerCase();
    if (text.includes("successful") || text.includes("completed")) return "success";
    if (text.includes("failed")) return "failed";
    if (text.includes("pending")) return "pending";
    return "unknown";
}

function detectApp(text) {
    const lower = text.toLowerCase();
    if (lower.includes("gpay") || lower.includes("google pay")) return "GPAY";
    if (lower.includes("phonepe")) return "PHONEPE";
    if (lower.includes("paytm")) return "PAYTM";
    return "UNKNOWN";
}


/* ------------------------------
   🔵 MAIN COMPONENT
--------------------------------*/

const ClaimCard = ({ shopId, verify, loading, setLoading }) => {
    const [file, setFile] = useState(null);
    const [phone, setPhone] = useState("");
    const [preview, setPreview] = useState(null);

    const handleFileSelect = () => {
        document.getElementById("hidden-file-input")?.click();
    };

    const handleFileChange = (e) => {
        const selected = e.target.files?.[0];
        if (!selected) return;

        setFile(selected);
        setPreview(URL.createObjectURL(selected));
    };

    const removeImage = () => {
        setFile(null);
        setPreview(null);
    };

    /* ------------------------------
       🔵 CLIENT-SIDE OCR LOGIC
    --------------------------------*/
    const handleVerify = async (e) => {
        e.preventDefault();
        if (!file || !phone || phone.length < 10) return;

        setLoading(true); // your MobX store

        //* 1️⃣ Resize Image
        const resized = await resizeImage(file);


        //* 3️⃣ Create OCR worker (new API)
        const worker = await createWorker("eng");


        //* 4️⃣ Run OCR (no load/loadLanguage/init needed)
        const { data } = await worker.recognize(resized);

        //* 5️⃣ Terminate worker
        await worker.terminate();

        const text = data.text || "";

        //* 5️⃣ Extract values
        const ocrResult = {
            text,
            amount: extractAmountAdvanced(text),
            upiId: extractUpi(text),
            utr: extractUTR(text),
            status: extractStatus(text),
            appDetected: detectApp(text),
        };

        console.log("📌 OCR RESULT:", ocrResult);

        //* 6️⃣ Trigger API call in parent component
        await verify(file, phone, ocrResult);
    };

    return (
        <Card className="w-full shadow-md border rounded-xl overflow-hidden max-w-sm bg-white">
            {/* Header */}
            <div className="bg-linear-to-r from-primary to-secondary text-white text-center py-4">
                <h1 className="text-lg font-semibold">Claim Your Stamp</h1>
                <p className="text-white/80 text-xs">Upload your UPI payment screenshot</p>
            </div>

            <CardContent className="flex flex-col gap-5 py-5">
                {/* Upload Box */}
                <div
                    onClick={!preview ? handleFileSelect : undefined}
                    className="relative flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg w-full cursor-pointer transition bg-gray-50 hover:bg-gray-100 p-5 min-h-[170px]"
                >
                    {!preview ? (
                        <div className="flex flex-col items-center gap-2 text-gray-500">
                            <Upload className="w-10 h-10 opacity-70" />
                            <p className="text-sm font-semibold">Tap to upload screenshot</p>
                        </div>
                    ) : (
                        <div className="relative rounded-lg overflow-hidden shadow border">
                            <img src={preview} alt="preview" width={260} height={260} className="object-cover" />

                            {!loading && (
                                <button
                                    onClick={removeImage}
                                    className="absolute top-2 right-2 p-1.5 rounded-full bg-black/50 hover:bg-black/70 text-white transition"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            )}

                            {loading && (
                                <div className="absolute inset-0 bg-black/30 z-50 flex items-center justify-center">
                                    <Spinner />
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <input
                    id="hidden-file-input"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                />

                {/* Phone */}
                <div className="w-full">
                    <label className="block text-sm font-medium text-primary text-left mb-1">Phone</label>
                    <div className="relative">
                        <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500 text-sm">+91</span>

                        <Input
                            type="text"
                            placeholder="XXXXX XXXXX"
                            maxLength={10}
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                </div>

                {/* Submit Button */}
                <Button
                    disabled={!file || loading || phone.length < 10}
                    className="w-full py-3 text-md font-medium rounded-lg"
                    onClick={handleVerify}
                >
                    {loading ? (
                        <>
                            <Spinner /> Verifying...
                        </>
                    ) : (
                        "Submit"
                    )}
                </Button>
            </CardContent>
        </Card>
    );
};

export default observer(ClaimCard);

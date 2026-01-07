"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, X } from "lucide-react";
import { observer } from "mobx-react-lite";
import { Spinner } from "@/components/ui/spinner";
import { createWorker } from "tesseract.js";


// resize image 
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

// extract date 
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


// extract time 
function extractTime(text) {
    if (!text) return null;

    text = text.toLowerCase().trim().replace(/\./g, ":").replace(/-/g, ":");

    // Supported formats:
    // 10:42 AM
    // 10:42AM
    // 22:30
    // 10.42 pm
    // 10:42:10

    const patterns = [
        /\b(\d{1,2}:\d{2}\s?(am|pm))\b/i,   // 10:42 AM
        /\b(\d{1,2}:\d{2}(am|pm))\b/i,      // 10:42AM
        /\b(\d{1,2}:\d{2}:\d{2})\b/,        // 10:42:10
        /\b(\d{1,2}:\d{2})\b/               // 22:30
    ];

    for (let regex of patterns) {
        const match = text.match(regex);
        if (match) return match[0];
    }

    return null;
}


function extractPayeeUpi(text) {
    if (!text) return null;

    const normalized = text
        .replace(/\n+/g, " ")
        .replace(/\s+/g, " ")
        .toLowerCase();

    // Context keywords that usually appear BEFORE payee UPI
    const payeePatterns = [
        /paid to\s+([a-z0-9.\-_]+@[a-z]{2,})/,
        /payee\s+([a-z0-9.\-_]+@[a-z]{2,})/,
        /to\s+([a-z0-9.\-_]+@[a-z]{2,})/,
        /credited to\s+([a-z0-9.\-_]+@[a-z]{2,})/,
        /receiver\s+([a-z0-9.\-_]+@[a-z]{2,})/,
    ];

    for (const pattern of payeePatterns) {
        const match = normalized.match(pattern);
        if (match) return match[1];
    }

    return null;
}


function extractUTR(text) {
    const m = text.match(/\b\d{6,12}\b/);
    return m ? m[0] : null;
}


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
            upiId: extractPayeeUpi(text),
            utr: extractUTR(text),
            date: extractDate(text),
            time: extractTime(text),
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

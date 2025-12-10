"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ClaimPage() {
  const searchParams = useSearchParams();
  const shopId = searchParams.get("shopId");

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  if (!shopId) {
    return (
      <div className="flex justify-center p-10">
        <Card className="p-6 max-w-md">
          <p className="text-red-500 text-center">Invalid QR — Missing shopId</p>
        </Card>
      </div>
    );
  }

  const handleFileChange = (e) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  const handleSubmit = async () => {
    if (!file) return alert("Please select a screenshot");

    setLoading(true);
    setResult(null);

    const form = new FormData();
    form.append("file", file);
    form.append("shopId", shopId);

    const res = await fetch("/api/verify", {
      method: "POST",
      body: form,
    });

    const data = await res.json();
    setLoading(false);

    if (data.success) {
      setResult({ success: true });
    } else {
      setResult({ success: false, error: data.error || data.rejectReason });
    }
  };

  return (
    <div className="flex justify-center py-10 px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">
            Upload UPI Payment Screenshot
          </CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col gap-5">

          {/* Screenshot Preview */}
          {preview ? (
            <div className="flex justify-center">
              <Image
                src={preview}
                alt="preview"
                width={280}
                height={300}
                className="rounded-lg border"
              />
            </div>
          ) : (
            <div className="p-4 border rounded-md text-center text-gray-500">
              No file selected
            </div>
          )}

          {/* File Upload */}
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="border p-2 rounded"
          />

          {/* Submit Button */}
          <Button
            onClick={handleSubmit}
            disabled={loading || !file}
            className="w-full"
          >
            {loading ? "Verifying..." : "Submit Screenshot"}
          </Button>

          {/* Result Messages */}
          {result?.success && (
            <p className="text-green-600 text-center font-medium">
              Payment Verified! Stamp Added 🎉
            </p>
          )}

          {result?.error && (
            <p className="text-red-600 text-center font-medium">
              Verification Failed: {result.error}
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

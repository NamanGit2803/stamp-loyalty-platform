"use client";

import { useState, useEffect } from "react";
import InvalidQRUI from "./invalidQRUI";
import ClaimCard from "./claimCard";
import { toast } from "sonner";
import { Sparkles } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const ClaimPage = ({ shopId }) => {
    const [isInvalid, setIsInvalid] = useState(false);
    const [shopName, setShopName] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);

    if (!shopId) return <InvalidQRUI />;

    useEffect(() => {
        const checkShop = async () => {
            try {
                const res = await fetch("/api/public/checkShop", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ shopId }),
                });

                const data = await res.json();

                if (!data.exists) {
                    setIsInvalid(true);
                } else {
                    setShopName(data.shop.shopName || "");
                }

            } catch (error) {
                console.error(error);
                toast.error(error.message);
                setIsInvalid(true);
            }
        };

        checkShop();
    }, [shopId]);

    if (isInvalid) return <InvalidQRUI />;

    // verify screen shot 
    const verifyScreenshot = async (file, phone, ocrResult, screenshotHash) => {

        if (!file) return;
        if (!phone || phone.length < 10) {
            setResult({ error: "Please enter a valid phone number" });
            return;
        }

        setLoading(true);
        setResult(null);

        try {
            const form = new FormData();
            form.append("file", file);
            form.append("shopId", shopId);
            form.append("phone", phone);
            form.append("ocrResult", JSON.stringify(ocrResult));

            const res = await fetch("/api/screenshot/verify", {
                method: "POST",
                body: form
            });

            const data = await res.json();
            setLoading(false);

            if (data.success) {
                setResult({ success: true });
                toast.success("Payment Verified! Stamp added 🎉");
            } else {
                setResult({ error: data.error || data.rejectReason || "Verification failed" });
                toast.error(data.error || data.rejectReason || "Verification failed");
            }

            console.log("API response:", data);

        } catch (err) {
            console.error("Verification Error:", err);
            setLoading(false);
            setResult({ error: "Something went wrong" });
            toast.error("Something went wrong");
        }
    };


    return (
        <div className="
            relative 
            flex flex-col justify-between items-center 
            min-h-screen p-8 text-center bg-custom-gradient gap-10">

            {/* ---------- TOP SECTION ---------- */}
            <div className="mt-6 animate-fadeIn">
                <h2 className="text-2xl font-extrabold text-primary tracking-wide drop-shadow-sm">
                    {shopName || "Shop"}
                </h2>

                <div className="flex items-center justify-center gap-1 mt-1">
                    <Sparkles className="w-4 h-4 text-primary/70" />
                    <p className="text-sm text-primary/70 font-medium">
                        You're one step away from rewards
                    </p>
                </div>
            </div>

            {/* ---------- CARD CENTERED ---------- */}
            <ClaimCard shopId={shopId} verify={verifyScreenshot} loading={loading} setLoading={setLoading}/>


            {/* Result alerts */}
            {/* {result?.success && (
                    <Alert className="bg-green-50 border-green-300">
                        <CheckCircle2 className="h-5 w-5 text-green-700" />
                        <AlertTitle className="text-green-700 font-semibold">
                            Payment Verified!
                        </AlertTitle>
                        <AlertDescription className="text-green-600">
                            Stamp added successfully 🎉
                        </AlertDescription>
                    </Alert>
                )}

                {result?.error && (
                    <Alert variant="destructive">
                        <XCircle className="h-5 w-5" />
                        <AlertTitle className="font-semibold">Verification Failed</AlertTitle>
                        <AlertDescription>{result.error}</AlertDescription>
                    </Alert>
                )} */}


            {/* ---------- FOOTER ---------- */}
            <p className="mb-5 text-center text-xs text-gray-500 tracking-wide">
                Powered by <span className="font-semibold text-primary">LoyaltyPro</span>
            </p>
        </div>
    );
};

export default ClaimPage;

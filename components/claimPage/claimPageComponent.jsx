"use client";

import { useState, useEffect } from "react";
import InvalidQRUI from "./errorComponents/invalidQRUI";
import ClaimCard from "./claimCard";
import { toast } from "sonner";
import { Sparkles } from "lucide-react";
import SuccessAnimation from "../animations/SuccessAnimation";
import Error429 from "./errorComponents/error429";
import ManualReviewUI from "./errorComponents/manualReviewUI";
import PausedLoyaltyUI from "./errorComponents/pausedLoyaltyUI";
import NameEnterCard from "./nameEnterCard";
import Link from "next/link";

const ClaimPage = ({ shopId }) => {
    const [isInvalid, setIsInvalid] = useState(false);
    const [shop, setShop] = useState({
        name: '',
        targetStamps: 0
    });
    const [loading, setLoading] = useState(false);
    const [uiState, setUIState] = useState("claim");
    const [customer, setCustomer] = useState({})


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
                    if (data.shop?.loyaltyEnabled === false) {
                        setUIState('pauseLoyalty')
                        return
                    }
                    setShop({
                        name: data.shop?.shopName,
                        targetStamps: data.shop?.targetStamps,
                    });
                }

                return

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

        setLoading(true);

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
                if (data.newCustomer) {
                    setUIState('nameCard')
                    setCustomer(data.customer)

                    return
                }

                setUIState("success");

                // set default 
                setTimeout(() => {
                    setUIState('claim')
                }, 5000);

                return

            } else {
                if (data.error === 'daily_upload_limit_reached') {
                    setUIState('error429')
                    return
                }

                if (data.error === 'pauseLoyalty') {
                    setUIState('pauseLoyalty')
                    return
                }



                if (data.rejectReason === 'upi_mismatch' || data.rejectReason === 'upi_not_exist') {
                    setUIState('manualReview')
                    return
                }


                toast.error(
                    data.error
                        ? data.error
                        : data.rejectReason
                            ? "Invalid Screenshot"
                            : "Verification failed"
                );

            }


        } catch (err) {
            console.error("Verification Error:", err);
            setLoading(false);
            toast.error("Something went wrong");
        }
    };


    return (
        <div className="
            relative 
            flex flex-col justify-between items-center 
            min-h-screen p-8 text-center bg-custom-gradient gap-10">

            {/* ---------- TOP SECTION ---------- */}
            {(uiState === 'claim' || uiState === 'success' || uiState === 'nameCard') && (<div className="mt-6 animate-fadeIn">
                <h2 className="text-2xl font-extrabold text-primary tracking-wide drop-shadow-sm capitalize">
                    {shop.name || "Shop"}
                </h2>

                <div className="flex items-center justify-center gap-1 mt-1">
                    <Sparkles className="w-4 h-4 text-primary/70" />
                    <p className="text-sm text-primary/70 font-medium">
                        You're one step away from rewards
                    </p>
                </div>
            </div>)}

            {/* ---------- CARD CENTERED ---------- */}
            {uiState === 'claim' && <ClaimCard shopId={shopId} verify={verifyScreenshot} loading={loading} setLoading={setLoading} />}

            {uiState === 'nameCard' && <NameEnterCard shopName={shop.name} customerId={customer.customerId} setUIState={setUIState} />}

            {uiState === 'success' && <SuccessAnimation targetStamps={shop.targetStamps} customer={customer}/>}

            {uiState === 'error429' && <Error429 />}

            {uiState === 'manualReview' && <ManualReviewUI />}

            {uiState === 'pauseLoyalty' && <PausedLoyaltyUI />}

            {/* ---------- FOOTER ---------- */}
            <p className="mb-5 text-center text-xs text-gray-500 tracking-wide">
                Powered by <Link href={'/'} className='logo-font text-primary'>{process.env.NEXT_PUBLIC_SITE_NAME ?? "site_name"}</Link>
            </p>
        </div>
    );
};

export default ClaimPage;

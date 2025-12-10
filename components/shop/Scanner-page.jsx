"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { observer } from "mobx-react-lite";
import { useStore } from "@/stores/StoreProvider";
import { Spinner } from "@/components/ui/spinner"
import { generateStyledQR } from "@/lib/generateStyledQR";

const ScannerComponent = observer(() => {
    const { shopStore } = useStore();
    const shopId = shopStore.shop?.id;

    const [qr, setQr] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!shopId) return;

        setLoading(true); // ← start loading

        const url = `${process.env.NEXT_PUBLIC_APP_URL}/claim?shopId=${shopId}`;

        QRCode.toDataURL(url, { width: 800, margin: 1 })
            .then((data) => {
                setQr(data);
                setLoading(false); // ← QR generated
            })
            .catch(() => setLoading(false));
    }, [shopId]);

    // doenload the qr 
    const handleDownload = async() => {
        if (!qr) return;

        const styledQR = await generateStyledQR(qr);

        const a = document.createElement("a");
        a.href = styledQR;
        a.download = `shop-qr-${shopId}.png`;
        a.click();
    };

    // print the qr 
    const handlePrint = async() => {
        if (!qr) return;
        const styledQR = await generateStyledQR(qr);

        const win = window.open("");
        win.document.write(`<img src="${styledQR}" style="width:350px;" />`);
        win.print();
    };

    return (
        <Card className="w-full max-w-sm shadow-xl border-0 rounded-2xl backdrop-blur ">

            {/* Header */}
            <CardHeader className="text-center pb-2">
                <CardTitle className="text-2xl font-bold tracking-tight">
                    Shop QR Code
                </CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                    Display this QR at your counter for customers to scan.
                </p>
            </CardHeader>

            <CardContent className="flex flex-col items-center gap-6 pt-4">

                {/* 🔵 LOADING STATE */}
                {loading && (
                    <div className="flex flex-col items-center gap-3 py-10">
                        <Spinner />
                        <p className="text-sm text-muted-foreground">Generating QR...</p>
                    </div>
                )}

                {/* 🔵 QR CODE */}
                {!loading && qr && (
                    <div className="p-4 rounded-xl bg-white border shadow-inner fade-in">
                        <img
                            src={qr}
                            alt="Shop QR Code"
                            className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-md"
                        />
                    </div>
                )}

                {/* Buttons */}
                <div className="w-full flex flex-col gap-3">
                    <Button
                        onClick={handleDownload}
                        disabled={loading} // ← disable while loading
                        className="w-full text-base py-2 font-medium hover:cursor-pointer"
                    >
                        {loading ? "Please wait..." : "Download QR"}
                    </Button>

                    <Button
                        onClick={handlePrint}
                        disabled={loading} // ← disable while loading
                        variant="secondary"
                        className="w-full text-base py-2 font-medium hover:cursor-pointer"
                    >
                        {loading ? "Please wait..." : "Print QR"}
                    </Button>
                </div>

                <p className="text-center text-xs text-muted-foreground leading-relaxed">
                    Customers can scan this to access your loyalty page and claim
                    rewards by uploading payment screenshots.
                </p>
            </CardContent>
        </Card>
    );
});

export default ScannerComponent;

'use client'

import Lottie from "lottie-react";
import successAnim from "@/components/animations/success.json";

export default function SuccessAnimation() {
    return (
        <div className="flex flex-col items-center justify-center">
            <Lottie
                animationData={successAnim}
                loop={false}
                autoplay={true}
                className="w-36 h-36"
            />
            <p className="mt-4 text-base font-medium text-green-600">
                Stamp added successfully
            </p>
        </div>
    );
}

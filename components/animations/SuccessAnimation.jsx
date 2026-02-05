'use client'

import Lottie from "lottie-react";
import successAnim from "@/components/animations/success.json";

export default function SuccessAnimation({ targetStamps, customer }) {
    return (
        <div className="flex flex-col items-center justify-center text-center">
            <Lottie
                animationData={successAnim}
                loop={false}
                autoplay={true}
                className="w-36 h-36"
            />

            <p className="mt-4 text-lg font-semibold text-green-600">
                Stamp added successfully! 🎉
            </p>

            <p className="mt-2 text-base text-gray-700">
                You've earned <span className="font-semibold text-green-600">1 stamp</span> for this visit.
                <br />
                You now have <span className="font-semibold text-primary">{customer.customerStamp ?? 0} stamps</span> in total.<br />
                Only <span className="font-semibold text-primary">{Number(targetStamps) - Number(customer.customerStamp ?? 0) ?? 0} more</span> to unlock your reward! ⭐
            </p>

        </div>
    );
}

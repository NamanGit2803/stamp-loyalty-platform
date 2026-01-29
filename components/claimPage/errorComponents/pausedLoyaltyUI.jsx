"use client";

import { PauseCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function PausedLoyaltyUI() {
    return (
        <div className="flex justify-center items-center h-screen bg-custom-gradient px-4">
            <Card className="w-full max-w-md border-yellow-400 shadow-md rounded-2xl">
                <CardContent className="py-10 flex flex-col items-center text-center gap-4">

                    <div className="bg-yellow-100 p-4 rounded-full">
                        <PauseCircle className="h-10 w-10 text-yellow-600" />
                    </div>

                    <h2 className="text-xl font-semibold text-yellow-700">
                        Loyalty Program Paused
                    </h2>

                    <p className="text-gray-600 max-w-xs leading-tight">
                        This shop has temporarily paused its loyalty program. <br />
                        <span className="font-medium text-yellow-700">
                            Stamps and rewards are currently unavailable.
                        </span>
                    </p>

                </CardContent>
            </Card>
        </div>
    );
}

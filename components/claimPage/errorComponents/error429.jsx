'use client'

import React from 'react'
import { AlertTriangle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const Error429 = () => {
    return (
        <div className="flex justify-center items-center bg-custom-gradient px-4">
            <Card className="w-full max-w-md border-warning-border shadow-md rounded-2xl">
                <CardContent className="py-10 flex flex-col items-center text-center gap-4">

                    {/* Icon */}
                    <div className="bg-warning-bg-primary p-4 rounded-full">
                        <AlertTriangle className="h-10 w-10 text-warning-text-1" />
                    </div>

                    {/* Title */}
                    <h2 className="text-xl font-semibold text-warning-text-2">
                        Daily limit reached
                    </h2>

                    {/* Description */}
                    <p className="text-gray-600 max-w-xs leading-tight">
                        You’ve reached today’s screenshot verification limit for this shop.
                        <br />
                        <span className="font-medium text-warning-text-2">
                            Please try again tomorrow.
                        </span>
                    </p>

                </CardContent>
            </Card>
        </div>
    )
}

export default Error429
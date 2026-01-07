'use client'

import React from 'react'
import { Info } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const ManualReviewUI = () => {
    return (
        <div className="flex justify-center items-center bg-custom-gradient px-4">
            <Card className="w-full max-w-md border-border shadow-md rounded-2xl">
                <CardContent className="py-10 flex flex-col items-center text-center gap-4">

                    {/* Icon */}
                    <div className="bg-background-secondary p-4 rounded-full">
                        <Info className="h-10 w-10 text-primary" />
                    </div>

                    {/* Title */}
                    <h2 className="text-lg font-semibold text-primary">
                        Verification needs review
                    </h2>

                    {/* Message */}
                    <p className="text-dark-text flex flex-col gap-2  max-w-xs leading-tight">
                        The UPI details in your screenshot don’t fully match this shop.
                        
                        <span className="font-medium text-primary">
                            Please show your screenshot to the shop for manual verification and stamp approval.
                        </span>
                    </p>

                </CardContent>
            </Card>
        </div>
    )
}

export default ManualReviewUI
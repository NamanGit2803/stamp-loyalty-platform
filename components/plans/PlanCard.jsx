'use client'

import React, { useState } from 'react'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, EyeOff, TriangleAlert } from "lucide-react"
import { observer } from "mobx-react-lite"
import { useStore } from '@/stores/StoreProvider'

const PlanCard = () => {
    const [step, setStep] = useState(1)


    return (
        <div className="flex w-full md:w-2/5 items-center justify-center p-4 h-screen overflow-y-hidden">
            <Card
                className="
          mt-10 
          w-full max-w-sm 
          border border-border-muted
          shadow-sm 
          rounded-xl 
          hover:shadow-md 
          transition 
          bg-white
        "
            >
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <CardTitle className="text-xl font-semibold">Basic Plan</CardTitle>
                        <Badge className="bg-primary text-white">15 Days Free</Badge>
                    </div>

                    <p className="text-primary text-4xl font-bold mt-3">₹299</p>
                    <p className="text-muted-foreground text-sm">per month</p>
                </CardHeader>

                <CardContent className="mt-2 space-y-2">
                    {[
                        "Unlimited customers",
                        "Multiple locations",
                        "Loyalty stamps",
                        "QR automation",
                        "Custom rewards",
                        "WhatsApp reminders",
                        "Analytics dashboard",
                        "Priority support",
                    ].map((feat) => (
                        <div
                            key={feat}
                            className="flex items-center gap-2 text-gray-700 text-sm"
                        >
                            <span className="text-green-500 text-lg leading-none">✔</span>
                            <span>{feat}</span>
                        </div>
                    ))}
                </CardContent>

                <CardFooter className="mt-4 pt-2">
                    <Button
                        size="lg"
                        className="w-full py-5 text-md font-medium hover:cursor-pointer"

                    >
                        Start Free Trial
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}

export default observer(PlanCard)

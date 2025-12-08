'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button"
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
import { toast } from 'sonner'
import { Spinner } from "@/components/ui/spinner"


const PlanCard = () => {

    const { shopStore, userStore } = useStore()
    const router = useRouter()

    // subscribe function 
    const subscribe = async (e) => {
        e.preventDefault()

        if (!userStore.user) {
            toast.error('User not found. Please sign up.')
            localStorage.removeItem('signupStep')

            setTimeout(() => {
                router.push('/signup')
            }, 1500);
            return
        }

        if (!shopStore.shop) {
            toast.error('Shop not registered. Please registered your shop.')
            localStorage.setItem('signupStep', 2)


            setTimeout(() => {
                router.push('/signup')
            }, 1500);

            return
        }

        // call start free trial days api 
        await shopStore.startTrial()

        if (shopStore.error) {

            if (shopStore.trialUsed) {
                toast.error(shopStore.error, {
                    description: 'Plaese click on login button for login.',
                    action: {
                        label: "Login",
                        onClick: () => router.push('/login'),
                    }
                })

                return
            }

            toast.error(shopStore.error)
            return
        } else {
            toast.success('Welcome aboard! Your subscription is activated.')

            setTimeout(() => {
                router.push(`/shop/${shopStore.shop.id}`)
            }, 1500);
        }
    }


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
                        onClick={subscribe}
                        disabled={shopStore.loading}
                    >
                        {shopStore.loading ? <><Spinner />Processing...</> : 'Start Free Trial'}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}

export default observer(PlanCard)

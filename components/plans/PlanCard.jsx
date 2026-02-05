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
import { observer } from "mobx-react-lite"
import { useStore } from '@/stores/StoreProvider'
import { toast } from 'sonner'
import { Spinner } from "@/components/ui/spinner"


const PlanCard = () => {

    const { shopStore, userStore, planStore } = useStore()
    const router = useRouter()

    const [hydrated, setHydrated] = useState(false)

    useEffect(() => {
        setHydrated(true)
        planStore.loadPlans()
    }, [])

    if (!hydrated) {
        return null
    }

    const plan = planStore.defaultPlan

    // subscribe function 
    const subscribe = async (e, planId) => {
        e.preventDefault()

        localStorage.setItem('signupStep',1);

        setTimeout(() => {
            router.push('/signup')
        }, 800);

        return

        // call start free trial days api 
        await shopStore.startTrial(planId)

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
            <Card className="mt-10 
          w-full max-w-sm 
          border border-border-muted
          shadow-sm 
          rounded-xl 
          hover:shadow-md 
          transition 
          bg-white">
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <CardTitle className="text-xl font-semibold capitalize ">{plan?.name} Plan</CardTitle>
                        <Badge className="bg-primary text-white">15 Days Free</Badge>
                    </div>

                    <p className="text-primary text-4xl font-bold mt-3">₹{plan?.price}</p>
                    <p className="text-muted-foreground text-sm">per month</p>
                </CardHeader>

                <CardContent className="mt-2 space-y-2">
                    {plan?.features.map((feat) => (
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
                        onClick={(e) => subscribe(e)}
                    >
                        Start Free Trial
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}

export default observer(PlanCard)

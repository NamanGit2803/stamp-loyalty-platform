'use client'

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Star, Ban } from "lucide-react"
import { observer } from "mobx-react-lite"
import { useStore } from '@/stores/StoreProvider'
import { toast } from "sonner"
import { Spinner } from "@/components/ui/spinner"

const TrialEndCard = () => {

    const { shopStore } = useStore()

    // start subscription 
    const startSubscription = async (e) => {
        e.preventDefault()

        await shopStore.activeSubscription()

        if (shopStore.error) {
            toast.error(shopStore.error)
            return
        }
    }

    return (
        <Card className="w-full border-none shadow-md bg-linear-to-br from-red-50 via-white to-red-100 rounded-xl overflow-hidden">

            {/* Header */}
            <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-error-bg-primary rounded-full">
                            <AlertTriangle className="w-5 h-5 text-error-text-1" />
                        </div>
                        <CardTitle className="text-xl font-semibold text-error-text-2">
                            Your Trial Has Been Ended
                        </CardTitle>
                    </div>

                    <span className="text-xs px-3 py-1 rounded-full bg-error-bg-primary text-error-text-2 font-semibold shadow-sm">
                        INACTIVE
                    </span>
                </div>
            </CardHeader>

            {/* Content */}
            <CardContent className="space-y-5 mt-3">

                {/* Description */}
                <p className="text-dark-text text-sm leading-relaxed">
                    Your 15-day free trial is over. To keep using <span className="logo-font text-primary">Stampi</span> and continue
                    rewarding your customers, please activate a subscription.
                </p>

                {/* Not Allowed Warning */}
                <div className="flex items-center gap-3 p-3 rounded-lg bg-red-100 border border-red-200">
                    <Ban className="w-5 h-5 text-error-text-1" />
                    <p className="text-sm text-error-text-2 font-medium">
                        You are not able to give stamps until you activate a subscription.
                    </p>
                </div>

                {/* Recommended Plan */}
                <div className="p-4 rounded-xl bg-white border shadow-sm flex justify-between items-center hover:shadow-md transition">
                    <div>
                        <p className="font-semibold text-dark-text flex items-center gap-1 text-lg">
                            <Star className="w-4 h-4 text-primary" /> {shopStore.subscription?.plan?.name ?? 'Plan'} Plan
                        </p>
                        <p className="text-muted-foreground text-sm">₹{shopStore.subscription?.plan?.price ?? 'null'} / month</p>
                    </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col gap-3 pt-1">
                    <Button onClick={(e) => startSubscription(e)} className="w-full hover:cursor-pointer py-3 rounded-lg text-base" disabled={shopStore.loading}>
                        {shopStore.loading ? <><Spinner/>Creating your subscription…</> : 'Start Subscription'}
                    </Button>
                </div>

            </CardContent>

        </Card>
    )
}

export default observer(TrialEndCard)

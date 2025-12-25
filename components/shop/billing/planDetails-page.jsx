'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { observer } from "mobx-react-lite"
import { useStore } from '@/stores/StoreProvider'
import { Spinner } from "@/components/ui/spinner"

const PlanDeatilsPage = () => {

    const { userStore, shopStore } = useStore()

    return (
        <div className='space-y-6'>
            {/* ---------------- Current Plan ---------------- */}
            <Card className='w-full'>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className='text-primary'>Current Plan</CardTitle>
                    <Badge variant="success">Active</Badge>
                </CardHeader>

                <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-lg font-medium">Pro Plan</p>
                            <p className="text-sm text-muted-foreground">
                                ₹299 / month
                            </p>
                        </div>
                    </div>

                    <Separator />

                    <div className="text-sm text-muted-foreground">
                        Next billing on <strong>25 Sep 2025</strong>
                    </div>
                </CardContent>
            </Card>

            {/* ---------------- Plan Features ---------------- */}
            <Card>
                <CardHeader>
                    <CardTitle className='text-primary'>Your Plan Includes</CardTitle>
                </CardHeader>

                <CardContent className="space-y-2 text-sm">
                    <p>✔ Unlimited customers</p>
                    <p>✔ Payment verification</p>
                    <p>✔ Reward management</p>
                    <p>✔ Analytics access</p>
                </CardContent>
            </Card>


            {/* ---------------- Actions ---------------- */}
            <Card>
                <CardHeader>
                    <CardTitle className='text-primary'>Manage Subscription</CardTitle>
                </CardHeader>

                <CardContent className="flex gap-3">
                    <Button variant="outline">Cancel Subscription</Button>
                </CardContent>
            </Card>
        </div>
    )
}

export default observer(PlanDeatilsPage)
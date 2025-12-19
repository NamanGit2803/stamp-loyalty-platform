'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useState } from 'react'
import { observer } from "mobx-react-lite"
import { useStore } from '@/stores/StoreProvider'
import { Spinner } from "@/components/ui/spinner"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"



const LoyaltySettings = () => {

    const { userStore, shopStore } = useStore()
    const [loyaltySettings, setloyaltySettings] = useState({
        targetStamps: shopStore.shop?.targetStamps ?? '',
        reward: shopStore.shop?.reward ?? '',
        maxStampsPerDay: shopStore.shop?.maxStampsPerCustomerPerDay ?? '',
        minAmount: shopStore.shop?.minAmount ?? '',

    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setShopSettings((prev) => ({ ...prev, [name]: value }))
    }



    return (
        <Card className='bg-background border-0 max-w-4xl w-full'>
            <CardHeader>
                <CardTitle className='text-primary'>Loyalty Rules</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
                {/* loyalty enabled switch  */}
                <div className="flex items-center justify-between">
                    <div>
                        <Label>Enable Loyalty Program</Label>
                        <p className="text-sm text-muted-foreground">
                            Turn off to pause stamps and rewards for customers
                        </p>
                    </div>
                    <Switch
                        checked={shopStore.shop?.loyaltyEnabled ?? true}
                    />
                </div>

                <Separator className='bg-gray-300'/>

                {/* target stamp  */}
                <div className='mt-7'>
                    <Label className='mb-1'>Target Stamps</Label>
                    <Input
                        type="number"
                        name='targetStamps'
                        value={loyaltySettings.targetStamps}
                        onChange={handleChange}
                    />
                </div>

                {/* Min amount */}
                <div>
                    <Label className="mb-1">Minimum Payment Amount</Label>

                    <div className="flex">
                        {/* Rupee prefix */}
                        <div className="flex items-center px-3 rounded-l-md border border-r-0 bg-muted text-sm text-muted-foreground">
                            ₹
                        </div>

                        {/* Input */}
                        <Input
                            type="number"
                            name="minAmount"
                            value={loyaltySettings.minAmount}
                            placeholder="0"
                            className="rounded-l-none"
                            onChange={(e) => {
                                handleChange({
                                    target: {
                                        name: "minAmount",
                                        value: e.target.value,
                                    },
                                })
                            }}
                        />
                    </div>
                </div>


                {/* reward  */}
                <div>
                    <Label className='mb-1'>Reward Description</Label>
                    <Input
                        value={loyaltySettings.reward}
                        name='reward'
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <Label className='mb-1'>Max Stamps per Customer / Day</Label>
                    <Input
                        type="number"
                        name='maxStampsPerDay'
                        value={loyaltySettings.maxStampsPerDay}
                        onChange={handleChange}
                    />
                </div>

                <Button className='w-[25%] hover:cursor-pointer' disabled={shopStore.loading}>
                    {shopStore.loading ? <><Spinner /> Saving...</>
                        :
                        'Save'}
                </Button>
            </CardContent>
        </Card>
    )
}

export default observer(LoyaltySettings)
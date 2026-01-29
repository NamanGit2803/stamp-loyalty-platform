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
import { toast } from 'sonner'



const LoyaltySettings = () => {

    const { shopStore } = useStore()
    const [enableEditing, setEnableEditing] = useState(false)
    const [loyaltySettings, setloyaltySettings] = useState({
        targetStamps: shopStore.shop?.targetStamps ?? '',
        reward: shopStore.shop?.reward ?? '',
        minAmount: shopStore.shop?.minAmount ?? '',
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setloyaltySettings((prev) => ({ ...prev, [name]: value }))
    }


    // update detals 
    const updateDetails = async (enable = false) => {

        await shopStore.updateShopDetails(loyaltySettings, enable)


        if (!shopStore.error) {
            if (enable) {
                shopStore.shop?.loyaltyEnabled == true ? toast.success('Your loyalty program has been enabled.') : toast.success('Your loyalty program has been paused.')
                return
            }
            toast.success('Data has been update successfully.')
            return
        }

        toast.error(shopStore.error)
        return
    }



    return (
        <Card className='bg-background border-0 max-w-4xl w-full'>
            <CardHeader className='flex justify-between'>
                <CardTitle className='text-primary'>Loyalty Rules</CardTitle>

                <div className="flex items-center space-x-2">
                    <Label htmlFor="enable-editing" className="text-dark-text">Enable Editing</Label>
                    <Switch checked={enableEditing} onCheckedChange={setEnableEditing} id="enable-editing" />
                </div>
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
                    {shopStore.loading ? <Spinner /> : <Switch
                        checked={shopStore.shop?.loyaltyEnabled ?? true}
                        onCheckedChange={() => updateDetails(true)}
                    />}
                </div>

                <Separator className='bg-gray-300' />

                {/* target stamp  */}
                <div className='mt-7'>
                    <Label className='mb-1'>Target Stamps</Label>
                    <Input
                        type="number"
                        name='targetStamps'
                        value={loyaltySettings.targetStamps}
                        onChange={handleChange}
                        disabled={!enableEditing}
                        className='text-dark-text disabled:opacity-100  disabled:bg-light-shade/40'
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
                            className="rounded-l-none text-dark-text disabled:opacity-100  disabled:bg-light-shade/40"
                            disabled={!enableEditing}
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
                        disabled={!enableEditing}
                        className='capitalize text-dark-text disabled:opacity-100  disabled:bg-light-shade/40'
                    />
                </div>

                <Button className='w-[25%] hover:cursor-pointer' onClick={() => updateDetails()} disabled={shopStore.loading || !enableEditing}>
                    {shopStore.loading ? <><Spinner /> Saving...</>
                        :
                        'Save'}
                </Button>
            </CardContent>
        </Card>
    )
}

export default observer(LoyaltySettings)
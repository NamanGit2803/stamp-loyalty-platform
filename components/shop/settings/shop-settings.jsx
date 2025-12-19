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


const ShopSetting = () => {

    const { userStore, shopStore } = useStore()
    const [shopSettings, setShopSettings] = useState({
        shopName: shopStore.shop?.shopName ?? '',
        phone: shopStore.shop?.phone ?? '',
        address: shopStore.shop?.address ?? '',
        upiId: shopStore.shop?.upiId ?? '',
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setShopSettings((prev) => ({ ...prev, [name]: value }))
    }


    return (
        <Card className='bg-background border-0 max-w-4xl w-full'>
            <CardHeader>
                <CardTitle className='text-primary'>Shop Details</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
                {/* shop name  */}
                <div>
                    <Label className='mb-1'>Shop Name</Label>
                    <Input value={shopSettings.shopName}
                        name='shopName'
                        onChange={handleChange} />
                </div>

                {/* mobile  */}
                <div>
                    <Label className="mb-1">Phone</Label>

                    <div className="flex">
                        {/* Prefix */}
                        <div className="flex items-center px-3 rounded-l-md border border-r-0 text-sm text-muted-foreground bg-muted">
                            +91
                        </div>

                        {/* Input */}
                        <Input
                            type="tel"
                            value={shopSettings.phone}
                            name="phone"
                            maxLength={10}
                            placeholder="Enter 10-digit number"
                            className="rounded-l-none"
                            onChange={(e) => {
                                const value = e.target.value.replace(/\D/g, "")
                                handleChange({
                                    target: {
                                        name: "phone",
                                        value,
                                    },
                                })
                            }}
                        />
                    </div>
                </div>


                {/* address  */}
                <div>
                    <Label className='mb-1'>Address</Label>
                    <Input value={shopSettings.address}
                        name='address'
                        onChange={handleChange} />
                </div>

                {/* upi id  */}
                <div>
                    <Label className='mb-1'>Upi Id</Label>
                    <Input value={shopSettings.upiId}
                        name='upiId'
                        onChange={handleChange} />
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

export default observer(ShopSetting)
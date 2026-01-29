'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from 'react'
import { observer } from "mobx-react-lite"
import { useStore } from '@/stores/StoreProvider'
import { Spinner } from "@/components/ui/spinner"
import { Switch } from "@/components/ui/switch"
import { toast } from "sonner"

const ShopSetting = () => {

    const { shopStore } = useStore()
    const [enableEditing, setEnableEditing] = useState(false)
    const [shopSettings, setShopSettings] = useState({
        shopName: shopStore.shop?.shopName ?? '',
        phone: shopStore.shop?.phone ?? '',
        address: shopStore.shop?.address ?? '',
        upiId: shopStore.shop?.upiId ?? '',
    })
    const [mounted, setMounted] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target
        setShopSettings((prev) => ({ ...prev, [name]: value }))
    }

    // update detals 
    const updateDetails = async () => {

        await shopStore.updateShopDetails(shopSettings)

        if (!shopStore.error) {
            toast.success('Data has been update successfully.')
            return
        }

        toast.error(shopStore.error)
        return
    }


    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null



    return (
        <Card className='bg-background border-0 max-w-4xl w-full'>
            <CardHeader className='flex justify-between'>
                <div className="flex flex-col gap-2">
                    <CardTitle className='text-primary'>Shop Details</CardTitle>

                    <div className='text-sm text-muted-foreground'>
                        Shop Id: <span className='text-primary font-semibold'>{shopStore.shop?.id}</span>
                    </div>
                </div>

                <div className="flex items-center space-x-2">
                    <Label htmlFor="enable-editing" className="text-dark-text">Enable Editing</Label>
                    <Switch checked={enableEditing} onCheckedChange={setEnableEditing} id="enable-editing" />
                </div>
            </CardHeader>
            <CardContent className="grid gap-4">
                {/* shop name  */}
                <div>
                    <Label className='mb-1'>Shop Name</Label>
                    <Input value={shopSettings.shopName}
                        disabled={!enableEditing}
                        name='shopName'
                        onChange={handleChange}
                        className='capitalize text-dark-text disabled:opacity-100  disabled:bg-light-shade/40' />
                </div>

                {/* business type  */}
                <div>
                    <Label className='mb-1'>Business Type</Label>
                    <Input
                        value={shopStore.shop?.businessType ?? ""}
                        readOnly
                        className=" cursor-not-allowed capitalize text-dark bg-light-shade/40"
                    />
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
                            disabled={!enableEditing}
                            placeholder="Enter 10-digit number"
                            className="rounded-l-none text-dark-text disabled:opacity-100  disabled:bg-light-shade/40"
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
                        onChange={handleChange}
                        disabled={!enableEditing}
                        className='capitalize text-dark-text disabled:opacity-100  disabled:bg-light-shade/40'
                    />
                </div>

                {/* upi id  */}
                <div>
                    <Label className='mb-1'>Upi Id</Label>
                    <Input value={shopSettings.upiId}
                        name='upiId'
                        onChange={handleChange}
                        disabled={!enableEditing}
                        className='text-dark-text disabled:opacity-100  disabled:bg-light-shade/40'
                    />
                </div>

                <Button onClick={updateDetails} className='w-[25%] hover:cursor-pointer' disabled={shopStore.loading || !enableEditing}>
                    {shopStore.loading ? <><Spinner /> Saving...</>
                        :
                        'Save'}
                </Button>
            </CardContent>
        </Card>
    )
}

export default observer(ShopSetting)
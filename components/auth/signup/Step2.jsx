'use client'

import React from 'react'
import { observer } from "mobx-react-lite"
import { useStore } from '@/stores/StoreProvider'
import { Eye, EyeOff, TriangleAlert, CircleAlert, CheckCircle } from "lucide-react"
import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from 'sonner'
import { Spinner } from "@/components/ui/spinner"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { businessTypes } from '@/lib/businessTypes'

const Step2 = () => {

    const { userStore } = useStore()
    const [errors, setErrors] = useState({})
    const [formData, setFormData] = useState({
        shopName: "",
        phone: "",
        businessType: '',
        customBusinessType: '',
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
        if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }))
    }

    useEffect(() => {
        console.log(formData)
    }, [formData])


    return (
        <form action="">
            <div className="space-y-4">
                {/* shop Name */}
                <div>
                    <label className="block text-sm font-medium text-primary mb-2">Shop Name</label>
                    <Input
                        type="text"
                        name="shopName"
                        placeholder="Your shop name"
                        value={formData.shopName}
                        onChange={handleChange}
                        className={errors.shopName ? "border-red-500" : "border-border"}
                    />
                    {errors.shopName && <p className="text-red-600 text-xs mt-1 flex gap-2 items-center"><TriangleAlert className='h-3 w-3' /> {errors.shopName}</p>}
                </div>

                {/* Phone */}
                <div>
                    <label className="block text-sm font-medium text-primary mb-2">Phone</label>
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                            +91
                        </span>

                        <Input
                            type="text"
                            name="phone"
                            placeholder="XXXXX XXXXX"
                            maxLength={10}
                            value={formData.phone}
                            onChange={handleChange}
                            className={`pl-12 ${errors.phone ? "border-red-500" : "border-border"}`}
                        />
                    </div>
                    {errors.phone && <p className="text-red-600 text-sm mt-1">⚠️ {errors.phone}</p>}
                </div>

                {/* business types  */}
                <div>
                    <label className="block text-sm font-medium text-primary mb-2">Business Type</label>

                    <Select
                        value={formData.businessType}
                        onValueChange={(value) => {
                            setFormData({ ...formData, businessType: value })
                        }}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select business type" />
                        </SelectTrigger>

                        <SelectContent>
                            {businessTypes.map((item) => (
                                <SelectItem key={item.value} value={item.value}>
                                    {item.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    {/* Show input when "other" is selected */}
                    {formData.businessType === "other" && (
                        <div className="mt-3">
                            <Input
                                placeholder="Enter your business type"
                                value={formData.customBusinessType || ""}
                                onChange={(e) =>
                                    setFormData({ ...formData, customBusinessType: e.target.value })
                                }
                            />
                        </div>
                    )}
                </div>

                <Button
                    type="submit"
                    className="w-full hover:cursor-pointer text-white"
                    disabled={userStore.loading}
                >
                    {userStore.loading ? <><Spinner />Processing...</> : 'Continue'}
                </Button>
            </div>
        </form>
    )
}

export default Step2
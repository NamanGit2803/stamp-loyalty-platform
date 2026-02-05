'use client'

import React from 'react'
import { observer } from "mobx-react-lite"
import { useStore } from '@/stores/StoreProvider'
import { toJS } from 'mobx'
import { Eye, EyeOff, TriangleAlert, CircleAlert, CheckCircle } from "lucide-react"
import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from 'sonner'
import { Spinner } from "@/components/ui/spinner"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { businessTypes } from '@/lib/businessTypes'
import { useRouter } from 'next/navigation'
import { FormatToIST } from '@/lib/dateFormat'

const Step2 = ({ setStep }) => {

    const { userStore, shopStore, planStore } = useStore()
    const [errors, setErrors] = useState({})
    const [formData, setFormData] = useState({
        shopName: "",
        phone: "",
        upiId: "",
        businessType: '',
        customBusinessType: '',
        address: "",
        minAmount: '',
        targetStamp: '',
        reward: '',
    })

    const router = useRouter()
    const plan = planStore.defaultPlan

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
        if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }))
    }

    // number regex 
    const numberValidate = (value) => {
        const isValidNumber = /^[0-9]+$/.test(value);
        return isValidNumber;
    }

    // validation 
    const validate = () => {
        const newErrors = {}
        if (!formData.shopName.trim()) newErrors.shopName = "Shopname is required"
        if (!formData.phone.trim()) newErrors.phone = "Phone is required"
        if (!formData.upiId.trim()) newErrors.upiId = "UpiId is required"
        if (!formData.businessType.trim()) newErrors.businessType = "Business type is required"
        if (formData.businessType == 'other') {
            if (!formData.customBusinessType.trim()) newErrors.customBusinessType = "Custom business type is required"
        }
        if (!formData.address.trim()) newErrors.address = "Address is required"
        if (!formData.minAmount.trim()) newErrors.minAmount = "Minimum amount is required"
        if (formData.minAmount.trim().length > 0 && !numberValidate(formData.minAmount)) newErrors.minAmount = "Plaese enter valid minimum amount"
        if (!formData.targetStamp.trim()) newErrors.targetStamp = "Target stamp is required"
        if (formData.targetStamp.trim().length > 0 && !numberValidate(formData.targetStamp)) newErrors.minAmount = "Plaese enter valid target stamp."
        if (!formData.reward.trim()) newErrors.reward = "Reward is required"
        return newErrors
    }

    // shop creation  
    const submit = async (e) => {
        e.preventDefault()
        const newErrors = validate()
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
            return
        }

        let finalData = { ...formData }

        // If user selected OTHER → replace businessType with customBusinessType
        if (formData.businessType === "other") {
            finalData.businessType = formData.customBusinessType
        }

        // In ALL cases → remove customBusinessType before sending
        delete finalData.customBusinessType

        if (!userStore.user?.email) {
            toast.error("User not exist.")
            setStep(1)
            localStorage.setItem('signupStep', 1)
            return
        }

        // ADD USER EMAIL HERE
        finalData.ownerId = userStore.user.email   // <---- IMPORTANT

        // calling api through store 
        await shopStore.createShop(finalData, plan.id)


        if (shopStore.error) {
            if (shopStore.error == 'Shop already exists for this user.') {
                toast.error(shopStore.error, {
                    description: 'Click the button to login.',
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
            setFormData({
                shopName: "",
                phone: "",
                businessType: '',
                customBusinessType: '',
                upiId: '',
                address: "",
                minAmount: '',
                targetStamp: '',
                reward: '',
            })

            toast.success('Welcome aboard! Your shop has been created.')
            localStorage.removeItem("signupStep")

            setTimeout(() => {
                router.push(`/shop/${shopStore.shop.id}`)
            }, 1500);

            // send welcome email 
            await fetch("/api/email/sendWelcomeEmail", {
                method: "POST",
                body: JSON.stringify({
                    email: userStore.user?.email,
                    name: userStore.user?.name,
                    shopName: shopStore.shop?.shopName,
                    trialEndDate: FormatToIST(shopStore.subscription?.trialEndsAt),
                    dashboardUrl: `${process.env.NEXT_PUBLIC_APP_URL}/shop/${shopStore.shop?.id}`,
                })
            });

            return
        }
    }



    return (
        <form >
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
                    {errors.shopName && (
                        <p className="text-red-600 text-xs mt-1 flex gap-2 items-center">
                            <TriangleAlert className='h-3 w-3' />
                            {errors.shopName}
                        </p>
                    )}
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
                    {errors.phone && (
                        <p className="text-red-600 text-xs mt-1 flex gap-2 items-center">
                            <TriangleAlert className='h-3 w-3' />
                            {errors.phone}
                        </p>
                    )}
                </div>

                {/* upi id */}
                <div>
                    <label className="block text-sm font-medium text-primary mb-2">Upi Id</label>
                    <Input
                        type="text"
                        name="upiId"
                        placeholder="Your upi id"
                        value={formData.upiId}
                        onChange={handleChange}
                        className={errors.upiId ? "border-red-500" : "border-border"}
                    />
                    {errors.upiId && (
                        <p className="text-red-600 text-xs mt-1 flex gap-2 items-center">
                            <TriangleAlert className='h-3 w-3' />
                            {errors.upiId}
                        </p>
                    )}
                </div>

                {/* Business types */}
                <div>
                    <label className="block text-sm font-medium text-primary mb-2">Business Type</label>

                    <Select
                        value={formData.businessType}
                        onValueChange={(value) => {
                            setFormData({ ...formData, businessType: value })

                            // clear businessType error
                            if (errors.businessType) {
                                setErrors((prev) => ({ ...prev, businessType: "" }))
                            }

                            // if user selects other, keep custom input
                            // else clear custom input and its error
                            if (value !== "other") {
                                setFormData((prev) => ({ ...prev, customBusinessType: "" }))

                                if (errors.customBusinessType) {
                                    setErrors((prev) => ({ ...prev, customBusinessType: "" }))
                                }
                            }
                        }}
                    >
                        <SelectTrigger className={`${errors.businessType ? "border-red-500" : "border-border"} w-full `}>
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

                    {errors.businessType && (
                        <p className="text-red-600 text-xs mt-1 flex gap-2 items-center">
                            <TriangleAlert className='h-3 w-3' />
                            {errors.businessType}
                        </p>
                    )}


                    {/* Show input when "other" is selected */}
                    {formData.businessType === "other" && (
                        <div className="mt-3">
                            <Input
                                name="customBusinessType"
                                placeholder="Enter your business type"
                                value={formData.customBusinessType}
                                onChange={handleChange}
                                className={errors.customBusinessType ? "border-red-500" : "border-border"}
                            />
                            {errors.customBusinessType && (
                                <p className="text-red-600 text-xs mt-1 flex gap-2 items-center">
                                    <TriangleAlert className='h-3 w-3' />
                                    {errors.customBusinessType}
                                </p>
                            )}
                        </div>
                    )}
                </div>

                {/* Address */}
                <div>
                    <label className="block text-sm font-medium text-primary mb-2">Shop Address</label>
                    <Input
                        type="text"
                        name="address"
                        placeholder="Shop full address"
                        value={formData.address}
                        onChange={handleChange}
                        className={errors.address ? "border-red-500" : "border-border"}
                    />
                    {errors.address && (
                        <p className="text-red-600 text-xs mt-1 flex gap-2 items-center">
                            <TriangleAlert className="h-3 w-3" />
                            {errors.address}
                        </p>
                    )}
                </div>

                {/* min amount */}
                <div>
                    <label className="block text-sm font-medium text-primary mb-2">
                        Minimum Amount For A Stamp
                    </label>

                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                            ₹
                        </span>

                        <Input
                            type="number"
                            name="minAmount"
                            placeholder="0"
                            value={formData.minAmount}
                            onChange={handleChange}
                            className={`pl-8 ${errors.minAmount ? "border-red-500" : "border-border"}`}
                        />
                    </div>

                    {errors.minAmount && (
                        <p className="text-red-600 text-xs mt-1 flex gap-2 items-center">
                            <TriangleAlert className="h-3 w-3" />
                            {errors.minAmount}
                        </p>
                    )}
                </div>

                {/* target stamp */}
                <div>
                    <label className="block text-sm font-medium text-primary mb-2">Stamps Required for Reward</label>
                    <Input
                        type="number"
                        name="targetStamp"
                        placeholder="Enter target stamp.   e.g., 5"
                        value={formData.targetStamp}
                        onChange={handleChange}
                        className={errors.targetStamp ? "border-red-500" : "border-border"}
                    />
                    {errors.targetStamp && (
                        <p className="text-red-600 text-xs mt-1 flex gap-2 items-center">
                            <TriangleAlert className="h-3 w-3" />
                            {errors.targetStamp}
                        </p>
                    )}
                </div>

                {/* Reward */}
                <div>
                    <label className="block text-sm font-medium text-primary mb-2">Reward</label>
                    <Input
                        type="text"
                        name="reward"
                        placeholder="e.g., Free Coffee"
                        value={formData.reward}
                        onChange={handleChange}
                        className={errors.reward ? "border-red-500" : "border-border"}
                    />
                    {errors.reward && (
                        <p className="text-red-600 text-xs mt-1 flex gap-2 items-center">
                            <TriangleAlert className="h-3 w-3" />
                            {errors.reward}
                        </p>
                    )}
                </div>

                <Button
                    onClick={submit}
                    className="w-full hover:cursor-pointer text-white"
                    disabled={shopStore.loading}
                >
                    {shopStore.loading ? <><Spinner />Processing...</> : 'Continue'}
                </Button>
            </div>
        </form>
    )
}

export default observer(Step2)

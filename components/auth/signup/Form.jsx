'use client'

import React, { useState } from 'react'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Eye, EyeOff, TriangleAlert } from "lucide-react" 
import Step1 from './Step1'  
import Step2 from './Step2'
import { observer } from "mobx-react-lite"
import { useStore } from '@/stores/StoreProvider'

const Form = () => {
    const [step, setStep] = useState(2)
    const [showPassword, setShowPassword] = useState(false) // 
    const [showConfirmPassword, setShowConfirmPassword] = useState(false) 

    const [formData, setFormData] = useState({
        name: "",
        shopName: "",
        phone: "",
        email: "",
        password: "",
        confirmPassword: "",
    })

    const [errors, setErrors] = useState({})
    const [isLoading, setIsLoading] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
        if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }))
    }

    const validateStep1 = () => {
        const newErrors = {}
        if (!formData.name.trim()) newErrors.name = "Name is required"
        if (!formData.email.trim()) newErrors.email = "Email is required"
        if (!formData.email.includes("@")) newErrors.email = "Invalid email"
        if (!formData.phone.trim()) newErrors.phone = "Phone is required"
        if (formData.phone.length < 10) newErrors.phone = "Invalid phone number"
        return newErrors
    }

    const validateStep2 = () => {
        const newErrors = {}
        if (formData.password.length < 6) newErrors.password = "Password must be 6+ characters"
        if (formData.password !== formData.confirmPassword)
            newErrors.confirmPassword = "Passwords do not match"
        return newErrors
    }

    const handleNext = () => {
        const newErrors = validateStep1()
        if (Object.keys(newErrors).length === 0) {
            setStep(2)
            setErrors({})
        } else {
            setErrors(newErrors)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const newErrors = validateStep2()
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
            return
        }

        setIsLoading(true)
        setTimeout(() => {
            window.location.href = "/plans"
            setIsLoading(false)
        }, 1000)
    }

    return (
        <div className="flex w-full md:w-2/5 items-center justify-center p-4 h-screen overflow-y-hidden">
            <Card className="w-full max-w-md shadow-lg border-blue-100 p-0 h-[90%] overflow-y-auto no-scrollbar">
                <div className="p-8">
                    <div className="mb-6">
                        <h1 className="text-3xl font-bold text-secondary mb-2">
                            {step === 1 ? "Create Account" : "Enter Shop Details"}
                        </h1>
                        <p className="text-gray-600">
                            {step === 1 ? "Join thousands of shopkeepers managing loyalty" : "Provide your shop information to continue."}
                        </p>
                    </div>

                    <div className="flex gap-2 mb-8">
                        {[1, 2].map((s) => (
                            <div
                                key={s}
                                className={`h-1 flex-1 rounded-full transition-colors ${s <= step ? "bg-secondary" : "bg-gray-200"}`}
                            />
                        ))}
                    </div>

                    <div>
                        {step === 1 ? (
                           <Step1 setStep={setStep}/>
                        ) : (
                            /* STEP 2 */
                           <Step2 setStep={setStep}/>
                        )}
                    </div>

                    <p className="text-center text-sm text-gray-600 mt-6">
                        Already have an account?{" "}
                        <Link href="/login" className="text-primary hover:underline">
                            Sign in
                        </Link>
                    </p>
                </div>
            </Card>
        </div>
    )
}

export default observer(Form)

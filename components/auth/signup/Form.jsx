'use client'

import React, { useState } from 'react'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Eye, EyeOff, TriangleAlert } from "lucide-react"   

const Form = () => {
    const [step, setStep] = useState(1)
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
                            {step === 1 ? "Create Account" : "Set Password"}
                        </h1>
                        <p className="text-gray-600">
                            {step === 1 ? "Join thousands of shopkeepers managing loyalty" : "Secure your account"}
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

                    <form onSubmit={handleSubmit}>
                        {step === 1 ? (
                            <div className="space-y-4">
                                {/* Full Name */}
                                <div>
                                    <label className="block text-sm font-medium text-primary mb-2">Full Name</label>
                                    <Input
                                        type="text"
                                        name="name"
                                        placeholder="Your name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className={errors.name ? "border-red-500" : "border-border"}
                                    />
                                    {errors.name && <p className="text-red-600 text-sm mt-1"><TriangleAlert/> {errors.name}</p>}
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="block text-sm font-medium text-primary mb-2">Email</label>
                                    <Input
                                        type="email"
                                        name="email"
                                        placeholder="m@example.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className={errors.email ? "border-red-500" : "border-border"}
                                    />
                                    {errors.email && <p className="text-red-600 text-sm mt-1">⚠️ {errors.email}</p>}
                                </div>

                                {/* Password */}
                                <div>
                                    <label className="block text-sm font-medium text-primary mb-2">Password</label>

                                    <div className="relative">
                                        <Input
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            placeholder="Minimum 6 characters"
                                            value={formData.password}
                                            onChange={handleChange}
                                            className={errors.password ? "border-red-500 pr-10" : "border-border pr-10"}
                                        />

                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-800"
                                        >
                                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    </div>

                                    {errors.password && <p className="text-red-600 text-sm mt-1 flex gap-2 items-center"><TriangleAlert className='h-4 w-4'/> {errors.password}</p>}
                                </div>

                                {/* Confirm Password */}
                                <div>
                                    <label className="block text-sm font-medium text-primary mb-2">Confirm Password</label>

                                    <div className="relative">
                                        <Input
                                            type={showConfirmPassword ? "text" : "password"}
                                            name="confirmPassword"
                                            placeholder="Re-enter password"
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            className={errors.confirmPassword ? "border-red-500 pr-10" : "border-border pr-10"}
                                        />

                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-800"
                                        >
                                            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    </div>

                                    {errors.confirmPassword && <p className="text-red-600 text-sm mt-1 flex gap-2 items-center"><TriangleAlert className='h-4 w-4'/> {errors.confirmPassword}</p>}
                                </div>



                                <Button onClick={handleNext} className="w-full mt-6 text-white">
                                    Continue
                                </Button>
                            </div>
                        ) : (
                            /* STEP 2 */
                            <div className="space-y-4">

                                {/* Phone */}
                                <div>
                                    <label className="block text-sm font-medium text-primary mb-2">Phone</label>
                                    <Input
                                        type="text"
                                        name="phone"
                                        placeholder="+91 XXXXX XXXXX"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className={errors.phone ? "border-red-500" : "border-border"}
                                    />
                                    {errors.phone && <p className="text-red-600 text-sm mt-1">⚠️ {errors.phone}</p>}
                                </div>


                                <div className="flex gap-3 mt-6">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => setStep(1)}
                                        className="flex-1 border-blue-200 text-blue-600 hover:bg-blue-50"
                                    >
                                        Back
                                    </Button>

                                    <Button
                                        type="submit"
                                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? "Creating..." : "Create Account"}
                                    </Button>
                                </div>
                            </div>
                        )}
                    </form>

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

export default Form

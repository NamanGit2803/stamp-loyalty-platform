'use client'

import React, { useState, useEffect } from 'react'
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'
import { observer } from "mobx-react-lite"
import { useStore } from '@/stores/StoreProvider'
import { Eye, EyeOff, TriangleAlert, CircleAlert, CheckCircle } from "lucide-react"
import { Spinner } from "@/components/ui/spinner"
import { toast } from 'sonner'
import ForgotPasswordDialog from './forgotPasswordDialog'


const Form = () => {

    const { userStore, shopStore } = useStore()
    const router = useRouter()
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })
    const [errors, setErrors] = useState({})
    const [showPassword, setShowPassword] = useState(false)


    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: "" }))
        }
    }

    // validation 
    const validate = () => {
        const newErrors = {}

        if (!formData.email.trim()) newErrors.email = "Email is required"
        if (formData.email.length > 0 && !formData.email.includes("@")) newErrors.email = "Invalid email"
        if (!formData.password) newErrors.password = "Password is required"

        return newErrors
    }

    // handle login 
    const handleSubmit = async (e) => {
        e.preventDefault()
        const newErrors = validate();

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
            return
        }

        await userStore.login(formData)

        if (userStore.error) {

            // if shop not registered 
            if (userStore.error === 'Shop not registered.') {
                localStorage.setItem("signupStep", 2)
                toast.error(userStore.error, {
                    description: 'Please registerd your shop.',
                    action: {
                        label: "Register",
                        onClick: () => router.push('/signup'),
                    }
                })

                return
            }

            if (userStore.error === 'Incorrect password.') {
                toast.error(userStore.error)
                setFormData((prev) => ({ ...prev, password: '' }))
                return
            }

            if (userStore.error == 'User not found.') {
                localStorage.setItem("signupStep", 1)
                toast.error(userStore.error, {
                    description: 'Please signup.',
                    action: {
                        label: "Register",
                        onClick: () => router.push('/signup'),
                    }
                })

                return
            }

            toast.error(userStore.error)
            return
        }

        // load shop data 
        await shopStore.loadInitial();

        if (shopStore.shop == null) {
            localStorage.setItem("signupStep", 2)
            toast.error(userStore.error, {
                description: 'Please registerd your shop.',
                action: {
                    label: "Register",
                    onClick: () => router.push('/signup'),
                }
            })

            return
        }

        toast.success('Login successfully');

        setTimeout(() => {
            router.push(`/shop/${userStore.shopId}`)
        }, 1000);

        setFormData({
            email: "",
            password: "",
        })
    }

    // handle signup 
    const signup = () => {
        localStorage.setItem("signupStep", 1)
        setTimeout(() => {
            router.push('/signup')
        }, 500);

    }



    return (
        <div className="flex w-full md:w-2/5 items-center justify-center p-4 h-screen overflow-y-hidden">
            <Card className="w-full max-w-md shadow-lg border-border/50 p-0 h-[65%] sm:h-[90%] overflow-y-auto no-scrollbar">
                <div className="p-8">
                    <h1 className="text-3xl font-bold text-secondary mb-2">Welcome Back</h1>
                    <p className="text-muted-foreground mb-7">Sign in to your <Link href={'/'} className='logo-font text-primary'>{process.env.NEXT_PUBLIC_SITE_NAME ?? "site_name"}</Link> account</p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* email address  */}
                        <div>
                            <label className="block text-sm font-medium text-primary mb-2">Email Address</label>
                            <Input
                                type="email"
                                name="email"
                                placeholder="your@email.com"
                                value={formData.email}
                                onChange={handleChange}
                                className={errors.email ? "border-red-500" : "border-border"}
                            />
                            {errors.email && <p className="text-red-600 text-xs mt-1 flex gap-2 items-center"><TriangleAlert className='h-3 w-3' />  {errors.email}</p>}
                        </div>

                        {/* password  */}
                        <div>
                            <label className="block text-sm font-medium text-primary mb-2">Password</label>

                            <div className="relative">
                                <Input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="Enter your password"
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

                            {errors.password && <p className="text-red-600 text-xs mt-1 flex gap-2 items-center"><TriangleAlert className='h-3 w-3' /> {errors.password}</p>}
                        </div>

                        <ForgotPasswordDialog />

                        <Button type="submit" className="w-full mt-5 hover:cursor-pointer" disabled={userStore.loading}>
                            {userStore.loading ? <><Spinner />Signing in...</> : "Sign In"}
                        </Button>
                    </form>

                    <p className="text-center text-sm text-gray-600 mt-6">
                        Don't have an account?{" "}
                        <span onClick={signup} className="text-primary font-semibold hover:underline hover:cursor-pointer">
                            Sign up
                        </span>
                    </p>
                </div>
            </Card>
        </div>
    )
}

export default observer(Form)

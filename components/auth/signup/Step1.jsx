'use client'

import React from 'react'
import { observer } from "mobx-react-lite"
import { useStore } from '@/stores/StoreProvider'
import { Eye, EyeOff, TriangleAlert, CircleAlert, CheckCircle } from "lucide-react"
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from 'sonner'
import { Spinner } from "@/components/ui/spinner"
import { useRouter } from 'next/navigation'
import Link from "next/link"
import { Checkbox } from "@/components/ui/checkbox"

const Step1 = ({ setStep }) => {

    const { userStore } = useStore()

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [errors, setErrors] = useState({})

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        checkbox: false,
    })

    const router = useRouter()

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
        if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }))
    }

    // validation 
    const validate = () => {
        const newErrors = {}
        if (!formData.name.trim()) newErrors.name = "Name is required"
        if (!formData.email.trim()) newErrors.email = "Email is required"
        if (!formData.email.includes("@")) newErrors.email = "Invalid email"
        if (formData.password.length < 6) newErrors.password = "Password must be 6+ characters"
        if (formData.password !== formData.confirmPassword)
            newErrors.confirmPassword = "Passwords do not match"
        return newErrors
    }


    // user signup 
    const createUser = async (e) => {
        e.preventDefault();

        const newErrors = validate();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        if (formData.checkbox == false) {
            toast.error('Please check the checkbox.')
            return
        }

        const { confirmPassword: _, ...data } = formData;

        //  SIGNUP CHECK-ONLY MODE
        await userStore.userSignup({ ...data, checkOnly: true });


        if (userStore.error === "User already exists") {
            toast.error(userStore.error+'.', {
                description: 'Please login.',
                action: {
                    label: "Login",
                    onClick: () => router.push('/login'),
                }
            })
            return;
        }

        if (userStore.error === 'Shop not registered') {
            localStorage.setItem("signupStep", 2)

            toast.error('Shop not registered yet with this email.', {
                description: 'Please registerd your shop.',
            })
            setStep(2)
            return
        }

        //  Send OTP
        await userStore.requestOtp(formData.email, "signup");

        if (userStore.error) {
            toast.error(userStore.error);
            return;
        }

        //  Wait OTP
        await userStore.waitForOtp();

        //  Final signup (actual)
        await userStore.userSignup(data);

        if (userStore.error) {
            toast.error(userStore.error);
            return;
        }

        // Reset and next step
        setFormData({
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        });

        localStorage.setItem("signupStep", 2);
        setStep(2);
    };




    return (
        <form action="">
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
                    {errors.name && <p className="text-red-600 text-xs mt-1 flex gap-2 items-center"><TriangleAlert className='h-3 w-3' /> {errors.name}</p>}
                </div>

                {/* Email */}
                <div>
                    <label className="block text-sm font-medium text-primary mb-2">Email</label>
                    <Input
                        type="email"
                        name="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={handleChange}
                        className={errors.email ? "border-red-500" : "border-border"}
                    />
                    {errors.email && <p className="text-red-600 text-xs mt-1 flex gap-2 items-center"><TriangleAlert className='h-3 w-3' /> {errors.email}</p>}
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

                    {errors.password && <p className="text-red-600 text-xs mt-1 flex gap-2 items-center"><TriangleAlert className='h-3 w-3' /> {errors.password}</p>}
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

                    {errors.confirmPassword && <p className="text-red-600 text-xs mt-1 flex gap-2 items-center"><TriangleAlert className='h-3 w-3' /> {errors.confirmPassword}</p>}
                </div>

                {/* checkbox  */}
                <div className="flex items-start gap-2 text-sm">
                    <Checkbox id="terms" required checked={formData.checkbox} onCheckedChange={(val) => setFormData((prev) => ({ ...prev, 'checkbox': !!val }))} />

                    <label
                        htmlFor="terms"
                        className="text-gray-600 leading-relaxed cursor-pointer"
                    >
                        I agree to the{" "}
                        <Link href="/terms" className="text-primary hover:underline">
                            Terms & Conditions
                        </Link>{" "}
                        and{" "}
                        <Link href="/privacy" className="text-primary hover:underline">
                            Privacy Policy
                        </Link>
                    </label>
                </div>

                <Button onClick={createUser} disabled={userStore.loading} className="w-full mt-6 text-white hover:cursor-pointer">
                    {userStore.loading ? <><Spinner />Processing...</> : 'Continue'}
                </Button>
            </div>
        </form>
    )
}

export default observer(Step1)
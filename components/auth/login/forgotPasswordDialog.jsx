"use client"

import { useState } from "react"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Mail, TriangleAlert, CheckCircle2 } from "lucide-react"
import { observer } from "mobx-react-lite"
import { useStore } from '@/stores/StoreProvider'
import { toast } from "sonner"

const ForgotPasswordDialog = () => {

    const { userStore } = useStore()

    const [email, setEmail] = useState("")
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleSubmitEmail = async (e) => {

        e.preventDefault()

        if (!email) {
            setError('Email is required.')
            return
        }

        if (email.trim().length > 0 && !email.includes("@")) {
            setError("Invalid email!")
            return
        }

        setLoading(true)

        // call api 
        await userStore.forgotPassword(email)

        setLoading(false)

        if (userStore.error) {
            toast.error(userStore.error)
            return
        }

        setSuccess(true)

    }

    return (
        <Dialog onOpenChange={(isOpen) => {
            if (!isOpen) {
                setSuccess(false)
                setEmail("")
                setError("")
            }
        }}>
            <DialogTrigger asChild>
                <button className="text-sm text-primary hover:underline hover:cursor-pointer">
                    Forgot password?
                </button>
            </DialogTrigger>

            {!success ? <DialogContent className="sm:max-w-[420px] rounded-2xl">
                <DialogHeader className="space-y-1">
                    <DialogTitle className="text-2xl text-primary font-semibold text-center">
                        Reset your password
                    </DialogTitle>
                    <DialogDescription className="text-center text-gray-500">
                        Enter your email and we’ll send you a reset link
                    </DialogDescription>
                </DialogHeader>

                {/* BRAND */}
                <div className="flex justify-center">
                    <span className="logo-font text-primary text-lg font-semibold">
                        Stampi
                    </span>
                </div>

                {/* FORM */}
                <div className="space-y-4 mt-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email address</Label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                                id="email"
                                type="email"
                                placeholder="you@company.com"
                                className="pl-10"
                                value={email}
                                onChange={(e) => (setEmail(e.target.value), setError(''))}
                            />
                        </div>
                        {error && (
                            <p className="text-red-600 text-xs mt-1 flex gap-2 items-center">
                                <TriangleAlert className='h-3 w-3' /> {error}
                            </p>
                        )}
                    </div>

                    <Button
                        onClick={handleSubmitEmail}
                        disabled={!email || loading}
                        className="w-full rounded-lg"
                    >
                        {loading ? "Sending..." : "Send reset link"}
                    </Button>
                </div>


                {/* FOOTER */}
                <p className="text-xs text-center text-muted-foreground mt-4">
                    You’ll receive an email if an account exists with this address.
                </p>
            </DialogContent>
                :
                <DialogContent className="max-w-sm rounded-2xl p-6">
                    <DialogHeader className="text-center space-y-3">

                        {/* Icon */}
                        <div className="flex justify-center">
                            <div className="bg-green-100 text-green-600 p-3 rounded-full">
                                <CheckCircle2 size={32} />
                            </div>
                        </div>

                        {/* Title */}
                        <DialogTitle className="text-2xl font-semibold text-center text-primary">
                            Check your email
                        </DialogTitle>

                        {/* Description */}
                        <DialogDescription className="text-muted-foreground text-center leading-relaxed">
                            If an account with <span className="font-medium text-primary">{email}</span>{" "}
                            exists, we’ve sent a password reset link.
                            Please check your inbox and spam folder.
                        </DialogDescription>
                    </DialogHeader>

                    {/* Button */}
                    <div className="mt-4 flex justify-center">
                        <DialogClose asChild>
                            <Button className="px-6" onClick={() => setSuccess(false)}>
                                Okay
                            </Button>
                        </DialogClose>
                    </div>
                </DialogContent>}
        </Dialog>
    )
}

export default observer(ForgotPasswordDialog)

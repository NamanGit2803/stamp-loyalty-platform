"use client";

import { observer } from "mobx-react-lite";
import { useStore } from "@/stores/StoreProvider";
import { useState, useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { toast } from 'sonner'
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"

function OtpModal() {
    const { userStore } = useStore();
    const [code, setCode] = useState("");
    const [timer, setTimer] = useState(30);
    const [canResend, setCanResend] = useState(false);

    // 🔥 TIMER LOGIC
    useEffect(() => {
        if (!userStore.otpModalOpen) {
            // Modal closed → reset timer & disable resend
            setTimer(30);
            setCanResend(false);
            return;
        }
        let interval;

        if (!canResend && timer > 0) {
            interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        }

        if (timer === 0) {
            setCanResend(true);
        }

        return () => clearInterval(interval);
    }, [userStore.otpModalOpen, timer, canResend]);

    // handle verify 
    const handleVerify = async (e) => {
        e.preventDefault();
        await userStore.verifyOtp(code);

        if (!userStore.error) {
            setCode('')
            return
        }

        toast.error(userStore.error)
    };

    // resend email 
    const resend = async () => {
        setTimer(30)
        setCanResend(false)
        try {
            const res = await fetch("/api/auth/otp/send", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: userStore.otpEmail, purpose: 'signup' }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error);


        } catch (error) {
            toast.error(error)
        }

    }

    return (
        <Dialog open={userStore.otpModalOpen}
            onOpenChange={(isOpen) => {
                if (!isOpen) userStore.closeOtp()
            }}>
            <DialogContent className="w-sm bg-custom-gradient">
                <DialogHeader>
                    <DialogTitle>Enter verification code</DialogTitle>
                    <DialogDescription>
                        We sent a 6-digit code to <span className="text-primary font-bold">{userStore.otpEmail}</span>.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleVerify}>
                    <FieldGroup>
                        <Field>
                            <FieldLabel htmlFor="otp">Verification code</FieldLabel>

                            <InputOTP maxLength={6} id="otp" value={code} onChange={setCode} required>
                                <InputOTPGroup className="gap-2.5 *:data-[slot=input-otp-slot]:rounded-md *:data-[slot=input-otp-slot]:border">
                                    <InputOTPSlot index={0} />
                                    <InputOTPSlot index={1} />
                                    <InputOTPSlot index={2} />
                                    <InputOTPSlot index={3} />
                                    <InputOTPSlot index={4} />
                                    <InputOTPSlot index={5} />
                                </InputOTPGroup>
                            </InputOTP>

                            <FieldDescription>Enter the 6-digit code sent to your email.</FieldDescription>

                            <FieldDescription>OTP is valid for 5 minutes.</FieldDescription>

                            {/*  ERROR MESSAGE BELOW OTP */}
                            {userStore.error && (
                                <p className="text-error-text-1 text-sm mt-2">
                                    {userStore.error}
                                </p>
                            )}
                        </Field>

                        <FieldGroup>
                            <Button className="hover:cursor-pointer" type="submit" disabled={userStore.loading}>{userStore.loading ? "Verifying..." : "Verify OTP"}</Button>
                            <FieldDescription className="text-center">
                                Didn&apos;t receive the code? {canResend ? <span className="hover:cursor-pointer" onClick={() => resend()}>Resend</span> : timer + 's'}
                            </FieldDescription>
                        </FieldGroup>
                    </FieldGroup>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export default observer(OtpModal);

"use client";

import { observer } from "mobx-react-lite";
import { useStore } from "@/stores/StoreProvider";
import { useState } from "react";

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
import { verify } from "crypto";

function OtpModal() {
    const { userStore } = useStore();
    const [code, setCode] = useState("");

    const handleVerify = async (e) => {
        e.preventDefault();   
        await userStore.verifyOtp(code);

        if(!userStore.error){
            setCode('')
        }
    };

    return (
        <Dialog open={userStore.otpModalOpen}
            onOpenChange={(isOpen) => {
                if (!isOpen) userStore.closeOtp()  
            }}>
            <DialogContent className="w-sm bg-custom-gradient">
                <DialogHeader>
                    <DialogTitle>Enter verification code</DialogTitle>
                    <DialogDescription>
                        We sent a 6-digit code to <b>{userStore.otpEmail}</b>.
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

                            {/*  ERROR MESSAGE BELOW OTP */}
                            {userStore.error && (
                                <p className="text-red-500 text-sm mt-2">
                                    {userStore.error}
                                </p>
                            )}
                        </Field>

                        <FieldGroup>
                            <Button className="hover:cursor-pointer" type="submit" disabled={userStore.loading}>{userStore.loading ? "Verifying..." : "Verify OTP"}</Button>
                            <FieldDescription className="text-center">
                                Didn&apos;t receive the code? <a href="#">Resend</a>
                            </FieldDescription>
                        </FieldGroup>
                    </FieldGroup>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export default observer(OtpModal);

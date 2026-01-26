'use client'

import { useState } from "react"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { observer } from "mobx-react-lite"
import { useStore } from '@/stores/StoreProvider'
import { toast } from "sonner"

const VerifyConfirmDialog = ({ scanId, customer }) => {

    const { shopStore } = useStore()

    const handleVerify = async () => {
        if (!scanId) {
            toast.error("Scan ID invalid!")
            return
        }

        await shopStore.verifyScan(scanId)

        if (!shopStore.error) {
            toast.success("Payment verified successfully. Stamp added to customer.")
        }
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button size="sm" variant="default">
                    Verify
                </Button>
            </AlertDialogTrigger>

            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Verify Payment?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Verify this payment for&nbsp;
                        <span className='capitalize text-primary font-semibold'>
                            {'+91 ' + customer}
                        </span>.
                        <br />
                        Once verified, the customer will receive their stamp.
                        This action cannot be undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel disabled={shopStore.loading}>Cancel</AlertDialogCancel>

                    <AlertDialogAction
                        onClick={handleVerify}
                        disabled={shopStore.loading}
                    >
                        {shopStore.loading ? "Verifying..." : "Confirm Verify"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default observer(VerifyConfirmDialog)

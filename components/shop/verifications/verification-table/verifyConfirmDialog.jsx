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
import { Spinner } from "@/components/ui/spinner"

const VerifyConfirmDialog = ({ scanId, customer }) => {

    const { shopStore } = useStore()
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)

    const handleVerify = async () => {
        if (!scanId) {
            toast.error("Scan ID invalid!")
            return
        }

        setLoading(true)

        await shopStore.verifyScan(scanId)

        setLoading(false)

        if (!shopStore.error) {
            toast.success("Payment verified successfully. Stamp added to customer.")
            setOpen(false)
            return
        }

        toast.error(shopStore.error)

    }

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
                <Button size="sm" variant="default" onClick={() => setOpen(true)}>
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
                    <AlertDialogCancel disabled={loading} onClick={() => setOpen(false)}>Cancel</AlertDialogCancel>

                    <Button
                        onClick={handleVerify}
                        disabled={loading}
                    >
                        {loading ? <><Spinner /> Verifying...</> : "Confirm Verify"}
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default observer(VerifyConfirmDialog)

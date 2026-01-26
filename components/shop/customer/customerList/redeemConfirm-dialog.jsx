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

const RedeemConfirmDialog = ({ customerId, customerName }) => {

    const { shopStore } = useStore()

    const handleRedeem = async () => {
        if (!customerId) {
            toast.error("Customer Id invalid!")
            return
        }

        await shopStore.redeemReward(customerId)

        if (!shopStore.error) {
            toast.success("Reward redeemed successfully.")
        }
    }

    return (
        <AlertDialog >
            <AlertDialogTrigger asChild>
                <Button size="sm" >
                    Redeem
                </Button>
            </AlertDialogTrigger>

            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Redeem reward?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Redeem this reward for the customer <span className='capitalize text-primary font-semibold'>
                            {customerName}
                        </span>.
                        This action cannot be undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>

                    <AlertDialogAction onClick={handleRedeem} disabled={shopStore.loading}>
                        {shopStore.loading ? 'Redeeming' : 'Confirm Redeem'}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default observer(RedeemConfirmDialog)

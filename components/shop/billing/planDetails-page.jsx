'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { observer } from "mobx-react-lite"
import { useStore } from '@/stores/StoreProvider'
import { Spinner } from "@/components/ui/spinner"
import { FormatToIST } from '@/lib/dateFormat'
import { renderStatusBadge } from '@/components/toolbar/statusVariant'
import { CreditCard, Calendar, ListChecks, Settings2 } from 'lucide-react';
import TrialEndCard from "./planDetails-page/trialEnd-card"


const PlanDeatilsPage = () => {

    const { userStore, shopStore } = useStore()

    return (
        <div className='space-y-6'>
            {/* ---------------- Current Plan ---------------- */}
            {shopStore.subscription?.status === 'trial_end' ? <TrialEndCard />
                :
                <Card className='w-full'>
                    <CardHeader className="flex flex-row items-center gap-3 justify-between">
                        <CardTitle className='text-primary flex items-center gap-2'><CreditCard className="w-5 h-5" /> Current Plan</CardTitle>
                        {renderStatusBadge(shopStore.subscription?.status)}
                    </CardHeader>

                    <CardContent className="space-y-3">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-lg text-dark-text font-medium">{shopStore.subscription?.plan?.name ?? 'plan'}</p>
                                <p className="text-sm text-muted-foreground">
                                    ₹{shopStore.subscription?.plan?.price ?? '0'} / month
                                </p>
                            </div>
                        </div>

                        <Separator />

                        <div className="text-sm text-muted-foreground flex items-center">
                            <Calendar className="h-4 w-4 text-primary mr-2" /> Next billing on: <span className="font-bold ml-1">{FormatToIST(shopStore.subscription?.nextBillingAt)}</span>
                        </div>
                    </CardContent>
                </Card>}

            {/* ---------------- Plan Features ---------------- */}
            <Card>
                <CardHeader>
                    <CardTitle className='text-primary flex gap-2 items-center'> <ListChecks className="w-5 h-5" /> Your Plan Includes</CardTitle>
                </CardHeader>

                <CardContent className="space-y-2 text-sm">
                    {shopStore.subscription?.plan?.features?.map((feat) => <p key={feat} className="text-dark-text">✔ {feat}</p>)}
                </CardContent>
            </Card>


            {/* ---------------- Actions ---------------- */}
            <Card>
                <CardHeader>
                    <CardTitle className='text-primary flex items-center gap-2'> <Settings2 className="w-5 h-5" /> Manage Subscription</CardTitle>
                </CardHeader>

                <CardContent className="flex gap-3">
                    <Button variant="outline">Cancel Subscription</Button>
                </CardContent>
            </Card>
        </div>
    )
}

export default observer(PlanDeatilsPage)
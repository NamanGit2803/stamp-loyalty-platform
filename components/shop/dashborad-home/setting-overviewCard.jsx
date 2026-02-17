"use client"

import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button"
import { BadgeCheck, Target, IndianRupee, Gift, QrCode } from "lucide-react"

const SettingOverviewCard = ({shop}) => {

    const router = useRouter()

    return (
        <Card className="card">
            <CardHeader className="flex flex-row items-center justify-between p-0 gap-3">

                {/* Left Title */}
                <CardTitle className="text-xl font-semibold flex items-center gap-2 text-primary">
                    <BadgeCheck className="size-5 text-primary" />
                    Shop Settings Overview
                </CardTitle>

                {/* Update Button */}
                <Button disabled={!shop} onClick={()=>router.push(`/shop/${shop.id}/settings`)} size="sm" className="hover:cursor-pointer">
                    Update
                </Button>

            </CardHeader>

            <CardContent className="flex flex-col sm:grid grid-cols-2 gap-4 sm:gap-6 sm:gap-x-8 p-0">

                {/* Target Stamps */}
                <div className="p-4 bg-background rounded-xl shadow-sm flex items-center gap-3">
                    <Target className="size-6 text-primary" />
                    <div>
                        <p className="text-sm text-muted-foreground">Target Stamps</p>
                        <p className="text-sm font-semibold text-dark-text">{shop?.targetStamps || 'none'}</p>
                    </div>
                </div>

                {/* Min Amount */}
                <div className="p-4 bg-background rounded-xl shadow-sm flex items-center gap-3">
                    <IndianRupee className="size-6 text-primary" />
                    <div>
                        <p className="text-sm text-muted-foreground">Minimum Amount</p>
                        <p className="text-sm font-semibold text-dark-text">₹{shop?.minAmount || 0}</p>
                    </div>
                </div>

                {/* Reward */}
                <div className="p-4 bg-background rounded-xl shadow-sm flex items-center gap-3">
                    <Gift className="size-6 text-primary" />
                    <div>
                        <p className="text-sm text-muted-foreground">Reward</p>
                        <p className="text-sm font-semibold text-dark-text capitalize">{shop?.reward || 'reward'}</p>
                    </div>
                </div>

                {/* UPI ID */}
                <div className="p-4 bg-background rounded-xl shadow-sm flex items-center gap-3">
                    <QrCode className="size-6 text-primary" />
                    <div>
                        <p className="text-sm text-muted-foreground">UPI ID</p>
                        <p className="text-sm font-semibold text-dark-text">{shop?.upiId || 'none'}</p>
                    </div>
                </div>

            </CardContent>
        </Card>
    )
}

export default SettingOverviewCard

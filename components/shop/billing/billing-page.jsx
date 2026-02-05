'use client'

import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import PlanDeatilsPage from './planDetails-page'
import PaymentHistoryPage from './paymentHistory-page'

const BillingPage = () => {
    return (
        <div className="space-y-6">

            <Tabs defaultValue="plan" className="gap-6">
                <TabsList className="grid grid-cols-2">
                    <TabsTrigger value="plan">Plan Details</TabsTrigger>
                    <TabsTrigger value="history">Payment History</TabsTrigger>
                </TabsList>

                <TabsContent value="plan">
                   <PlanDeatilsPage/>
                </TabsContent>
                <TabsContent value="history">
                    <PaymentHistoryPage />
                </TabsContent>

            </Tabs>

        </div>
    )
}

export default BillingPage
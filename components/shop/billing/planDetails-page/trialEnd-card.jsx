'use client'

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertCircle, Crown, AlertTriangle, Star } from "lucide-react"

const TrialEndCard = () => {
    return (
        <Card className="w-full border-none shadow-md bg-gradient-to-br from-red-50 via-white to-red-100 rounded-xl overflow-hidden">

  {/* Header */}
  <CardHeader className="pb-2">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-red-100 rounded-full">
          <AlertTriangle className="w-5 h-5 text-red-600" />
        </div>
        <CardTitle className="text-xl font-semibold text-red-700">
          Your Trial Has Ended
        </CardTitle>
      </div>

      <span className="text-xs px-3 py-1 rounded-full bg-red-200 text-red-700 font-semibold shadow-sm">
        INACTIVE
      </span>
    </div>
  </CardHeader>

  {/* Content */}
  <CardContent className="space-y-5 mt-3">

    {/* Description */}
    <p className="text-dark-text text-sm leading-relaxed">
      Your 15-day free trial is over. To keep using <b>Stampi</b> and continue 
      rewarding your customers, please activate a subscription.
    </p>

    {/* Recommended Plan Section */}
    <div className="p-4 rounded-xl bg-white border shadow-sm flex justify-between items-center hover:shadow-md transition">
      <div>
        <p className="font-semibold text-dark-text flex items-center gap-1 text-lg">
          <Star className="w-4 h-4 text-primary" /> Basic Plan
        </p>
        <p className="text-muted-foreground text-sm">₹499 / month</p>
      </div>

      <Button size="sm" className="bg-primary text-white px-5">
        Select
      </Button>
    </div>

    {/* CTA Buttons */}
    <div className="flex flex-col gap-3 pt-1">
      <Button className="w-full bg-primary text-white hover:bg-primary/90 py-3 rounded-lg text-base">
        Start Subscription
      </Button>

      <Button variant="outline" className="w-full py-3 rounded-lg text-base">
        Explore Plans
      </Button>
    </div>

  </CardContent>

</Card>
    )
}

export default TrialEndCard
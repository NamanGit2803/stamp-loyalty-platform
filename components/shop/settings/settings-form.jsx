"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Toggle } from "@/components/ui/toggle"
import { CheckCircle } from "lucide-react"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

import ShopSetting from "./shop-settings"
import LoyaltySettings from "./loyalty-settings"

export default function SettingsForm() {
  const [settings, setSettings] = useState({
    loyaltyEnabled: true,
    stampsPerPurchase: 1,
    rewardStamps: 10,
    rewardText: "Free Coffee",
    whatsappEnabled: true,
  })
  const [isSaved, setIsSaved] = useState(false)

  const handleChange = (field, value) => {
    setSettings((prev) => ({ ...prev, [field]: value }))
    setIsSaved(false)
  }

  const handleSave = () => {
    setIsSaved(true)
    setTimeout(() => setIsSaved(false), 3000)
  }

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <Tabs defaultValue="shop" className="w-full gap-6">
        <TabsList className="grid grid-cols-3 md:grid-cols-5 w-full">
          <TabsTrigger value="shop">Shop</TabsTrigger>
          <TabsTrigger value="loyalty">Loyalty</TabsTrigger>
          <TabsTrigger value="rewards">Rewards</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
        </TabsList>

        <TabsContent value="shop" className="flex justify-center">
          <ShopSetting/>
        </TabsContent>
        <TabsContent value="loyalty" className="flex justify-center">
          <LoyaltySettings/>
        </TabsContent>

      </Tabs>
    </div>
  )
}

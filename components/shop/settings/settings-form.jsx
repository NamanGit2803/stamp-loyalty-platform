"use client"

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

import ShopSetting from "./shop-settings"
import LoyaltySettings from "./loyalty-settings"

export default function SettingsForm() {
  

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <Tabs defaultValue="shop" className="w-full gap-6">
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="shop">Shop</TabsTrigger>
          <TabsTrigger value="loyalty">Loyalty</TabsTrigger>
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

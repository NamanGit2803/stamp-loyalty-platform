"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Toggle } from "@/components/ui/toggle"
import { CheckCircle } from "lucide-react"

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
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted mt-1">Configure your loyalty program</p>
      </div>

      {/* Save Notification */}
      {isSaved && (
        <Card className="p-4 bg-green-50 border border-accent flex items-center gap-3">
          <CheckCircle size={20} className="text-accent" />
          <span className="text-foreground font-medium">Settings saved successfully!</span>
        </Card>
      )}

      {/* Loyalty Toggle */}
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-foreground">Enable Loyalty Program</h2>
            <p className="text-muted text-sm mt-1">Turn loyalty rewards on or off</p>
          </div>
          <Toggle
            pressed={settings.loyaltyEnabled}
            onPressedChange={(pressed) => handleChange("loyaltyEnabled", pressed)}
          />
        </div>
      </Card>

      {/* Settings */}
      {settings.loyaltyEnabled && (
        <>
          <Card className="p-6 space-y-6">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Stamps Per ₹100 Purchase</label>
              <div className="flex gap-2">
                {[1, 2, 5, 10].map((val) => (
                  <Button
                    key={val}
                    variant={settings.stampsPerPurchase === val ? "default" : "outline"}
                    onClick={() => handleChange("stampsPerPurchase", val)}
                  >
                    {val}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Stamps Required for Reward</label>
              <Input
                type="number"
                min="5"
                value={settings.rewardStamps}
                onChange={(e) => handleChange("rewardStamps", Number.parseInt(e.target.value))}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Reward Description</label>
              <Input
                type="text"
                placeholder="e.g., Free Coffee, 20% Discount"
                value={settings.rewardText}
                onChange={(e) => handleChange("rewardText", e.target.value)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-foreground">Send WhatsApp Notifications</h3>
                <p className="text-muted text-sm mt-1">Auto-send updates to customers</p>
              </div>
              <Toggle
                pressed={settings.whatsappEnabled}
                onPressedChange={(pressed) => handleChange("whatsappEnabled", pressed)}
              />
            </div>
          </Card>

          <Button onClick={handleSave} className="w-full">
            Save Settings
          </Button>
        </>
      )}
    </div>
  )
}

"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import ProfileCard from "./profile-card"
import PasswordCard from "./password-card"

export default function AccountPage() {

  const [emailNotifications, setEmailNotifications] = useState(true)
  const [securityAlerts, setSecurityAlerts] = useState(true)

  return (
    <div className="space-y-6">

      {/* ---------------- Profile ---------------- */}
      <ProfileCard/>

      {/* ---------------- Security ---------------- */}
      <PasswordCard/>

    </div>
  )
}

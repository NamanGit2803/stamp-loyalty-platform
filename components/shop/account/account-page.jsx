
import { useState } from "react"
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

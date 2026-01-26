
import ProfileCard from "./profile-card"
import PasswordCard from "./password-card"

export default function AccountPage() {

  return (
    <div className="space-y-6">

      {/* ---------------- Profile ---------------- */}
      <ProfileCard/>

      {/* ---------------- Security ---------------- */}
      <PasswordCard/>

    </div>
  )
}

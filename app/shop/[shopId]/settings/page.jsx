import SettingsForm from "@/components/shop/settings/settings-form"

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-secondary">Settings</h1>
        <p className="text-muted-foreground mt-1">Configure your loyalty program</p>
      </div>

      <SettingsForm />
    </div >
  )
}

import { ArrowUpRight, ArrowDownRight } from "lucide-react"
import { Card } from "@/components/ui/card"

export default function StatCard({ label, value, icon: Icon, trend, trendValue, bgColor }) {
  const isPositive = trend === "up"

  return (
    <Card className="p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-muted text-sm font-medium">{label}</p>
          <h3 className="text-3xl font-bold text-foreground mt-2">{value}</h3>
        </div>
        <div className={`p-3 rounded-lg ${bgColor}`}>
          <Icon size={24} className="text-white" />
        </div>
      </div>
      {trendValue && (
        <div className={`flex items-center gap-1 text-sm font-medium ${isPositive ? "text-accent" : "text-danger"}`}>
          {isPositive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
          <span>{trendValue} vs last month</span>
        </div>
      )}
    </Card>
  )
}

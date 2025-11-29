"use client"

import StatCard from "./stat-card"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function DashboardHome() {
  const stats = [
    {
      label: "Today's Customers",
      value: "12",
      emoji: "👥",
      trend: "up",
      trendValue: "+8%",
      bgColor: "bg-blue-600",
    },
    {
      label: "Total Stamps Given",
      value: "342",
      emoji: "🎁",
      trend: "up",
      trendValue: "+15%",
      bgColor: "bg-indigo-600",
    },
    {
      label: "Revenue (This Month)",
      value: "₹4,250",
      emoji: "💳",
      trend: "up",
      trendValue: "+22%",
      bgColor: "bg-blue-500",
    },
    {
      label: "Redemptions",
      value: "8",
      emoji: "📈",
      trend: "down",
      trendValue: "-3%",
      bgColor: "bg-indigo-500",
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-blue-900">Welcome Back, Rajesh</h1>
        <p className="text-gray-600 mt-1">Here's what's happening in your shop today</p>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      {/* Recent Activity */}
      <Card className="p-6 border-blue-100">
        <h2 className="text-xl font-bold text-blue-900 mb-6">Recent Activity</h2>
        <div className="space-y-4">
          {[
            { customer: "Amit Kumar", action: "Earned 3 stamps", time: "2 hours ago" },
            { customer: "Priya Singh", action: "Redeemed reward", time: "4 hours ago" },
            { customer: "Vikram Patel", action: "New customer", time: "6 hours ago" },
          ].map((activity, i) => (
            <div key={i} className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
              <div>
                <p className="font-medium text-blue-900">{activity.customer}</p>
                <p className="text-sm text-gray-600">{activity.action}</p>
              </div>
              <p className="text-sm text-gray-600">{activity.time}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-4">
        <Button asChild className="h-12 border-blue-200 text-blue-600 hover:bg-blue-50 bg-white">
          <Link href="/dashboard/settings">Setup Loyalty</Link>
        </Button>
        <Button asChild className="h-12 border-blue-200 text-blue-600 hover:bg-blue-50 bg-white">
          <Link href="/dashboard/customers">View Customers</Link>
        </Button>
        <Button asChild className="h-12 border-blue-200 text-blue-600 hover:bg-blue-50 bg-white">
          <Link href="/dashboard/transactions">View Revenue</Link>
        </Button>
      </div>
    </div>
  )
}

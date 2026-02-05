"use client";

import { useEffect, useState } from "react";
import StatCard from "./stat-card";
import { Card } from "@/components/ui/card";
import { observer } from "mobx-react-lite";
import { useStore } from "@/stores/StoreProvider";
import { IndianRupee, TicketPercent, Gift, Repeat } from 'lucide-react';

const DashboardHome = observer(() => {
  const { shopStore, userStore } = useStore();

  // Prevent hydration mismatch
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-secondary">
            Welcome Back,
          </h1>
          <p className="text-muted-foreground mt-1">
            Here's what's happening in your shop today
          </p>
        </div>
      </div>
    );
  }

  // ⭐ FINAL 4 ANALYTICS CARDS
  const stats = [
    {
      label: "Revenue (This Month)",
      value: "₹4,250",  // dynamic later
      Icon: IndianRupee,
      trend: "up",
      trendValue: "+12%",
    },
    {
      label: "Stamps Given",
      value: "342",
      Icon: TicketPercent,
      trend: "up",
      trendValue: "+18%",
    },
    {
      label: "Rewards Redeemed",
      value: "8",
      Icon: Gift,
      trend: "up",
      trendValue: "+6%",
    },
    {
      label: "Repeat Customer Rate",
      value: "37%",
      Icon: Repeat,
      trend: "up",
      trendValue: "+4%",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-secondary">
          Welcome Back, {userStore.user?.name}
        </h1>
        <p className="text-muted-foreground mt-1">
          Here's what's happening in your shop today
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      {/* Recent Activity */}
      <Card className="p-6 border-blue-100">
        <h2 className="text-xl font-bold text-blue-900 mb-6">
          Recent Activity
        </h2>
        <div className="space-y-4">
          {[
            { customer: "Amit Kumar", action: "Earned 3 stamps", time: "2 hours ago" },
            { customer: "Priya Singh", action: "Redeemed reward", time: "4 hours ago" },
            { customer: "Vikram Patel", action: "New customer", time: "6 hours ago" },
          ].map((activity, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-4 bg-blue-50 rounded-lg"
            >
              <div>
                <p className="font-medium text-blue-900">{activity.customer}</p>
                <p className="text-sm text-gray-600">{activity.action}</p>
              </div>
              <p className="text-sm text-gray-600">{activity.time}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
});

export default DashboardHome;

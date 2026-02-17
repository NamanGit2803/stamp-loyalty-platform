"use client";

import { useEffect, useState } from "react";
import StatCard from "./stat-card";
import { observer } from "mobx-react-lite";
import { useStore } from "@/stores/StoreProvider";
import { IndianRupee, TicketPercent, Gift, Repeat } from 'lucide-react';
import SettingOverviewCard from "./setting-overviewCard";
import { BestCustomers } from "./best-customerCard";
import { CloseToRewardCard } from "./customer-closeCard";

const DashboardHome = observer(() => {
  const { shopStore, userStore } = useStore();

  // Prevent hydration mismatch
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);

  }, []);

  useEffect(() => {
    if (shopStore.shop?.id && !shopStore.dashboardStats) {
      shopStore.fetchDashboardStats();
    }
  }, [shopStore.shop?.id]);


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

  // 4 ANALYTICS CARDS
  const stats = [
    {
      label: "Revenue",
      value: (shopStore.dashboardStats?.revenue
        ? `₹${Intl.NumberFormat("en-IN").format(shopStore.dashboardStats.revenue)}`
        : "₹0"),
      Icon: IndianRupee,
      trend: "up",
      trendValue: "+12%",
    },
    {
      label: "Stamps Given",
      value: shopStore.dashboardStats?.stampsGiven || 0,
      Icon: TicketPercent,
      trend: "up",
      trendValue: "+18%",
    },
    {
      label: "Rewards Redeemed",
      value: shopStore.dashboardStats?.rewardsRedeemed || 0,
      Icon: Gift,
      trend: "up",
      trendValue: "+6%",
    },
    {
      label: "Repeat Customer Rate",
      value: shopStore.dashboardStats?.repeatRate + '%' || 0,
      Icon: Repeat,
      trend: "up",
      trendValue: "+4%",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-secondary">
          Welcome Back, {userStore.user?.name}
        </h1>
        <p className="text-muted-foreground mt-1">
          Here's what's happening in your shop today
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} loading={shopStore.loading} />
        ))}
      </div>

      <SettingOverviewCard shop={shopStore.shop} />

      <div className="flex flex-col sm:flex-row gap-5">
        <BestCustomers bestCustomers={shopStore.dashboardStats?.bestCustomers} loading={shopStore.loading} />
        <CloseToRewardCard closeToReward={shopStore.dashboardStats?.closeToReward} targetStamps={shopStore.shop?.targetStamps} loading={shopStore.loading} />
      </div>
    </div>
  );
});

export default DashboardHome;

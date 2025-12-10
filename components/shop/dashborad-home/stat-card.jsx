"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

export default function StatCard({
  label,
  value,
  Icon,
  trend,        // "up" | "down"
  trendValue,   // "+15%" or "-3%"
}) {
  const isUp = trend === "up";

  return (
    <Card className="rounded-2xl p-4 bg-linear-to-br from-purple-50 to-white border border-purple-100 shadow-sm hover:shadow-md transition-all duration-300">
      <CardHeader className="flex flex-row items-center justify-between p-0">
        {/* icon  */}
        <div className="bg-primary p-2 rounded-lg"><Icon className='size-5 text-white'/></div>
        <CardTitle className="text-2xl font-semibold text-dark-text">{value}</CardTitle>
      </CardHeader>

      <CardContent className="p-0 mt-3">
        <p className="text-sm text-primary font-semibold">{label}</p>

        <div className="flex items-center gap-1 mt-3">
          {isUp ? (
            <ArrowUpRight className="h-4 w-4 text-green-600" />
          ) : (
            <ArrowDownRight className="h-4 w-4 text-red-600" />
          )}

          <span
            className={`text-xs font-semibold ${
              isUp ? "text-green-700" : "text-red-700"
            }`}
          >
            {trendValue}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

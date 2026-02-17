"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

import { LayoutDashboard, Users, BadgeCheck, Gift, QrCode, Settings } from "lucide-react";

export function NavMain({ shopId }) {
  const pathname = usePathname();
  const sidebar = useSidebar();


  const navItems = [
    { label: "Home", url: `/shop/${shopId}`, icon: LayoutDashboard, match: `/shop/${shopId}` },
    { label: "Customers", url: `/shop/${shopId}/customers`, icon: Users, match: `/shop/${shopId}/customers` },
    { label: "Payment Verifications", url: `/shop/${shopId}/verifications`, icon: BadgeCheck, match: `/shop/${shopId}/verifications` },
    { label: "Customer Rewards", url: `/shop/${shopId}/rewards`, icon: Gift, match: `/shop/${shopId}/rewards` },
    { label: "QR Code", url: `/shop/${shopId}/qr-code`, icon: QrCode, match: `/shop/${shopId}/qr-code` },
    { label: "Settings", url: `/shop/${shopId}/settings`, icon: Settings, match: `/shop/${shopId}/settings` },
  ];

  return (
    <SidebarGroup>
      <SidebarMenu>
        {navItems.map((item) => {
          const isActive = pathname === item.match;

          return (
            <SidebarMenuItem key={item.label}>
              <SidebarMenuButton asChild isActive={isActive} className="h-10">
                <Link
                  href={item.url}
                  onClick={() => {
                    if (sidebar.isMobile) sidebar.setOpenMobile(false); // CLOSE ONLY ON MOBILE
                  }}
                >
                  <item.icon className="size-6" />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}

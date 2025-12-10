"use client";

import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, CreditCard, Settings, QrCode } from "lucide-react";

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";

export function NavMain({ shopId }) {
  const pathname = usePathname();

  const navItems = [
    {
      label: "Home",
      url: `/shop/${shopId}`,
      icon: LayoutDashboard,
      match: `/shop/${shopId}`,
    },
    {
      label: "Customers",
      url: `/shop/${shopId}/customers`,
      icon: Users,
      match: `/shop/${shopId}/customers`,
    },
    {
      label: "Transactions",
      url: `/shop/${shopId}/transactions`,
      icon: CreditCard,
      match: `/shop/${shopId}/transactions`,
    },
    {
      label: "QR Code",
      url: `/shop/${shopId}/qr-code`,
      icon: QrCode,
      match: `/shop/${shopId}/qr-code`,
    },
    {
      label: "Settings",
      url: `/shop/${shopId}/settings`,
      icon: Settings,
      match: `/shop/${shopId}/settings`,
    },
  ];

  return (
    <SidebarGroup>
      <SidebarMenu>
        {navItems.map((item) => {
          const isActive = pathname === item.match;

          return (
            <SidebarMenuItem key={item.label}>
              <SidebarMenuButton
                asChild
                isActive={isActive}
                className="h-10"
              >
                <Link href={item.url} className={isActive ? "bg-primary/10" : ""}>
                  {item.icon && <item.icon className="size-6"/>}
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

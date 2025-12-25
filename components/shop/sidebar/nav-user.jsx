"use client";

import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Sparkles,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useRouter } from "next/navigation";


export function NavUser({ user, logout, shopId }) {

  const { isMobile } = useSidebar();
  const router = useRouter()


  return (
    <SidebarMenu>
      <SidebarMenuItem >
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-primary data-[state=open]:text-sidebar-accent-foreground shadow-[0_10px_30px_rgba(0,0,0,0.12)] bg-background border border-border/30 hover:cursor-pointer hover:bg-background  hover:text-sidebar-foreground"
            >
              <div className="h-8 w-8 bg-secondary rounded-lg flex items-center justify-center text-primary-foreground">
                {user?.name?.charAt(0).toUpperCase()}
              </div>

              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium capitalize">{user?.name ?? ''}</span>
                <span className="truncate text-xs">{user?.email ?? ''}</span>
              </div>

              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <div className="h-8 w-8 bg-secondary rounded-lg flex items-center justify-center text-primary-foreground">
                  {user?.name?.charAt(0).toUpperCase()}
                </div>

                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user?.name}</span>
                  <span className="truncate text-xs">{user?.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <DropdownMenuItem onClick={()=>router.push(`/shop/${shopId}/myAccount`)}>
                <BadgeCheck />
                Account
              </DropdownMenuItem>

              <DropdownMenuItem onClick={()=>router.push(`/shop/${shopId}/billing`)}>
                <CreditCard />
                Billing
              </DropdownMenuItem>

              <DropdownMenuItem>
                <Bell />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            <DropdownMenuItem onClick={logout}>
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

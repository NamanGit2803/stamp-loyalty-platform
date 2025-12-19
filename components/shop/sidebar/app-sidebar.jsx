"use client";

import * as React from "react";
import {
    AudioWaveform,
    BookOpen,
    Bot,
    Command,
    Frame,
    GalleryVerticalEnd,
    Map,
    PieChart,
    Settings2,
    SquareTerminal,
} from "lucide-react";
import { observer } from "mobx-react-lite"
import { useStore } from '@/stores/StoreProvider'
import { NavMain } from "@/components/shop/sidebar/nav-main";
import { NavUser } from "@/components/shop/sidebar/nav-user";
import { Separator } from "@/components/ui/separator"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from "@/components/ui/sidebar";

// This is sample data.
const data = {
    user: {
        name: "shadcn",
        email: "m@example.com",
        avatar: "/avatars/shadcn.jpg",
    },

};

const AppSidebar = (props) => {

    const { shopStore, userStore } = useStore()

    return (
        <Sidebar collapsible="icon" {...props}>
            {/* shop name  */}
            <SidebarHeader>
                <div className="flex gap-2 items-center">
                    <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                        <GalleryVerticalEnd className="size-4" />
                    </div>

                    <div className="grid flex-1">
                        <span className="truncate font-medium">{shopStore.shop?.shopName || 'Shop Name'}</span>
                    </div>
                </div>
            </SidebarHeader>

            <Separator/>

            <SidebarContent>
                <NavMain shopId={shopStore.shop?.id} />
            </SidebarContent>

            <SidebarFooter>
                <NavUser user={userStore.user} logout={userStore.logout} />
            </SidebarFooter>

            <SidebarRail />
        </Sidebar>
    );
}

export default observer(AppSidebar)

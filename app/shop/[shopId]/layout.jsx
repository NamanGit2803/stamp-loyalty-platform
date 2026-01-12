import React from 'react'
import AppSidebar from "@/components/shop/sidebar/app-sidebar"
import ExpiryStatus from '@/components/shop/ExpiryStatus'
import { Separator } from "@/components/ui/separator"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import Link from 'next/link'


const ShopLayout = ({ children }) => {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset className='bg-custom-gradient'>
                <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 w-full">
                    <div className="flex items-center justify-between px-4 w-full">
                        <div className='flex items-center gap-2'>
                            <SidebarTrigger className="-ml-1" />
                            <Separator
                                orientation="vertical"
                                className="mr-2 data-[orientation=vertical]:h-4"
                            />
                            <ExpiryStatus />
                        </div>

                        <Link href={'/'} className='logo-font flex items-center text-secondary tracking-wide text-lg'>{process.env.NEXT_PUBLIC_SITE_NAME ?? 'brand name'}</Link>
                    </div>
                </header>
                <div className="p-4 md:p-8">{children}</div>
            </SidebarInset>
        </SidebarProvider>
    )
}

export default ShopLayout
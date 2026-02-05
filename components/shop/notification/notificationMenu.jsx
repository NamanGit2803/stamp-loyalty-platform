"use client"

import { Bell, CheckCircle, AlertTriangle, Info } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function NotificationMenu() {
    const notifications = [
        {
            title: "New Customer Joined",
            desc: "A new customer registered from QR scan.",
            icon: <CheckCircle className="h-5 w-5 text-green-500" />,
            time: "2 min ago",
        },
        {
            title: "Low Reward Points",
            desc: "Some users have points expiring soon.",
            icon: <AlertTriangle className="h-5 w-5 text-yellow-500" />,
            time: "1 hour ago",
        },
        {
            title: "New Feedback",
            desc: "You received new user feedback.",
            icon: <Info className="h-5 w-5 text-blue-500" />,
            time: "Yesterday",
        },
    ]

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="outline-none relative">
                <Bell className="text-primary size-6 p-1 rounded-full hover:bg-gray-200 hover:cursor-pointer" />
                <span className="absolute top-0 right-0 h-2 w-2 bg-secondary rounded-full"></span>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-80 p-0 rounded-xl shadow-xl bg-white/80 backdrop-blur-xl border border-gray-200">
                <DropdownMenuLabel className="text-lg font-semibold px-4 py-3">
                    Notifications
                </DropdownMenuLabel>
                <DropdownMenuSeparator />

                <div className="max-h-80 overflow-y-auto custom-scroll px-2">
                    {notifications.map((n, i) => (
                        <DropdownMenuItem
                            key={i}
                            className="flex gap-4 py-3 px-4 rounded-lg hover:bg-gray-100 cursor-pointer"
                        >
                            <div>{n.icon}</div>
                            <div className="flex flex-col">
                                <span className="font-medium">{n.title}</span>
                                <span className="text-sm text-gray-500">{n.desc}</span>
                                <span className="text-xs text-gray-400 mt-1">{n.time}</span>
                            </div>
                        </DropdownMenuItem>
                    ))}
                </div>

                <DropdownMenuSeparator />
                <div className="px-4 py-3 text-center">
                    <button className="text-sm text-blue-600 hover:underline">
                        View All Notifications
                    </button>
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

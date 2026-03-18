"use client"

import { useEffect, useState } from "react"
import { Bell } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { CircleCheckBig, Info, TriangleAlert, CircleMinus } from 'lucide-react';
import { TimeAgoUTCtoIST } from "@/lib/dateFormat";
import NotificationDialog from "./notification-dialog/notifyDialog";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";

export default function NotificationMenu({ shopId }) {
    const [notifications, setNotifications] = useState([])
    const [selectedNotification, setSelectedNotification] = useState(null)
    const [dialogOPen, setDialogOPen] = useState(false)
    const router = useRouter()

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch("/api/shop/notifications/getRecent", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ shopId }),
            })

            const data = await res.json()
            setNotifications(data.notifications)
        }
        fetchData()
    }, [shopId])

    // handle single notification 
    const handleNofification = async (notification) => {
        setSelectedNotification(notification)
        setDialogOPen(true)

        if (!notification.isRead) {
            try {
                await fetch("/api/shop/notifications/markAsRead", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ notificationId: notification.id }),
                });
            } catch (error) {
                toast.error(error)
            }
        }


    }

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger className="outline-none relative">
                    <Bell className="text-primary size-6 p-1 rounded-full hover:bg-gray-200 hover:cursor-pointer" />

                    {notifications.some((n) => !n.isRead) && (
                        <span className="absolute top-0 right-0 h-2 w-2 bg-secondary rounded-full animate-pulse"></span>
                    )}
                </DropdownMenuTrigger>

                <DropdownMenuContent className="w-80 p-0 rounded-xl shadow-xl bg-white/80 backdrop-blur-xl border border-gray-200 sm:mr-2">
                    <DropdownMenuLabel className="text-lg font-semibold px-4 py-3 text-primary">
                        Notifications
                    </DropdownMenuLabel>

                    <DropdownMenuSeparator />

                    <div className="max-h-80 overflow-y-auto px-2">
                        {notifications.length === 0 && (
                            <div className="text-center text-sm text-gray-500 py-6">
                                No notifications yet
                            </div>
                        )}

                        {notifications.map((n) => (
                            <DropdownMenuItem
                                key={n.id}
                                className={`flex gap-4 py-3 px-4 mb-1 group rounded-lg cursor-pointer ${n.isRead ? '' : 'bg-background-3'}`} onClick={() => handleNofification(n)}>
                                <div>
                                    {n.type === "warn" && (
                                        <TriangleAlert className="text-warning-text-1 group-hover:text-muted" />
                                    )}
                                    {n.type === "PLAN_EXPIRED" && (
                                        <CircleMinus className="text-error-text-1 group-hover:text-muted" />
                                    )}
                                    {n.type === "success" && (
                                        <CircleCheckBig className="text-success-text-1 group-hover:text-muted" />
                                    )}
                                    {n.type === "system" && (
                                        <Info className="text-primary group-hover:text-muted" />
                                    )}
                                </div>

                                <div className="flex flex-col">
                                    <span className="font-medium">{n.title}</span>
                                    <span className="text-sm text-muted-foreground line-clamp-2 group-hover:text-muted/50">
                                        {n.message}
                                    </span>
                                    <span className="text-xs text-gray-400 mt-1">
                                        {TimeAgoUTCtoIST(n.createdAt)}
                                    </span>
                                </div>
                            </DropdownMenuItem>
                        ))}
                    </div>

                    <DropdownMenuSeparator />

                    <div className="px-4 py-3 text-center">
                        <Link href={`/shop/${shopId}/notifications`} className="text-sm text-primary hover:underline">
                            View All Notifications
                        </Link>
                    </div>
                </DropdownMenuContent>
            </DropdownMenu>

            <NotificationDialog notification={selectedNotification} dialogOPen={dialogOPen} setDialogOPen={setDialogOPen} />

        </>
    )
}
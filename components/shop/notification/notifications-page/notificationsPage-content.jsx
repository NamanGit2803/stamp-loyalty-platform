'use client'

import { useEffect, useState } from "react";
import { Dot } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { LoadingSkeleton } from "./loading-skeleton";
import { EmptyState } from "./empty-state";


const NotificationsPageContent = ({shopId}) => {

    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        fetchNotifications();
    }, []);

    const fetchNotifications = async () => {
        try {
            const res = await fetch("/api/shop/notifications/getAll", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ shopId }),
            })
            const data = await res.json();

            console.log('data', data)
            setNotifications(data.notifications);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    // handle single notification 
    const handleNofification = async (id) => {
        try {
            await fetch("/api/shop/notifications/markAsRead", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ notificationId: id }),
            });
        } catch (error) {
            toast.error(error)
        }

        router.push(`/shop/${shopId}/notifications/${id}`)

    }

    const handleClick = (item) => {

        router.push(`/notifications/${item.id}`);
    };

    return (
        <div className=" mx-auto py-10 px-4">
            {loading ? (
                <LoadingSkeleton />
            ) : notifications.length === 0 ? (
                <EmptyState />
            ) : (
                <div className="space-y-3">
                    {notifications?.map((item) => (
                        <Card
                            key={item.id}
                            onClick={() => handleClick(item)}
                            className={cn(
                                "cursor-pointer transition-all hover:shadow-lg",
                                !item.isRead && "border-blue-500 border"
                            )}
                        >
                            <CardContent className="p-4 flex items-start gap-3">
                                {!item.isRead && (
                                    <Dot className="text-blue-600 w-8 h-8 -ml-2" />
                                )}
                                <div>
                                    <p className="font-medium">{item.title}</p>
                                    <p className="text-sm text-muted-foreground">
                                        {item.message}
                                    </p>
                                </div>
                                <span className="ml-auto text-xs text-gray-500">
                                    {new Date(item.createdAt).toLocaleString()}
                                </span>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    )
}

export default NotificationsPageContent
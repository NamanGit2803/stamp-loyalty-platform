'use client'

import { useEffect, useState, useRef } from "react";
import { CircleCheckBig, Info, TriangleAlert, CircleMinus } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LoadingSkeleton } from "./loading-skeleton";
import { EmptyState } from "./empty-state";
import { TimeAgoUTCtoIST } from "@/lib/dateFormat";
import NotificationDialog from "../notification-dialog/notifyDialog";
import { SearchBar } from "@/components/toolbar/SearchBar";
import { useDebounce } from "@/hooks/use-debounce";

const NotificationsPageContent = ({ shopId }) => {

    const [notifications, setNotifications] = useState([])
    const [selectedNotification, setSelectedNotification] = useState(null)
    const [dialogOPen, setDialogOPen] = useState(false)

    const [loading, setLoading] = useState(true)
    const [loadingMore, setLoadingMore] = useState(false)

    const [search, setSearch] = useState('')
    const debouncedSearch = useDebounce(search, 500)

    const [cursor, setCursor] = useState(null)
    const [hasMore, setHasMore] = useState(true)

    const loadMoreRef = useRef(null)

    // initial fetch + search
    useEffect(() => {
        setNotifications([])
        setCursor(null)
        setHasMore(true)
        fetchNotifications(true)
    }, [debouncedSearch])

    // infinite scroll observer
    useEffect(() => {

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasMore && !loadingMore) {
                    fetchNotifications()
                }
            },
            { threshold: 1 }
        )

        if (loadMoreRef.current) {
            observer.observe(loadMoreRef.current)
        }

        return () => observer.disconnect()

    }, [cursor, hasMore, loadingMore])



    const fetchNotifications = async (reset = false) => {

        if (loadingMore) return

        if (!reset) setLoadingMore(true)

        try {

            const res = await fetch("/api/shop/notifications/getAll", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    shopId,
                    cursor: reset ? null : cursor,
                    search: debouncedSearch
                }),
            })

            const data = await res.json()

            if (reset) {
                setNotifications(data.notifications)
            } else {
                setNotifications(prev => [...prev, ...data.notifications])
            }

            setCursor(data.nextCursor)

            if (!data.nextCursor) {
                setHasMore(false)
            }

        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
            setLoadingMore(false)
        }
    }



    const handleNotification = async (id) => {
        try {
            await fetch("/api/shop/notifications/markAsRead", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ notificationId: id }),
            })
        } catch (error) {
            console.log(error)
        }
    }



    const handleClick = (item) => {
        handleNotification(item.id)
        setDialogOPen(true)
        setSelectedNotification(item)
    }



    return (
        <>
            <div className="mx-auto py-10 px-4">

                <div className="mb-4">
                    <SearchBar
                        value={search}
                        onChange={(value) => setSearch(value)}
                        placeholder="Search..."
                    />
                </div>


                {loading ? (
                    <LoadingSkeleton />
                ) : notifications.length === 0 ? (
                    <EmptyState />
                ) : (
                    <div className="space-y-3">
                        {notifications.map((item) => (
                            <Card
                                key={item.id}
                                onClick={() => handleClick(item)}
                                className={cn(
                                    "hover:cursor-pointer transition-all hover:shadow-lg border-border/10",
                                    !item.isRead && "bg-background-secondary/50"
                                )}
                            >
                                <CardContent className="p-3 flex items-center gap-3">

                                    <div className="mr-2">
                                        {item.type === "warn" && (
                                            <TriangleAlert className="text-warning-text-1" />
                                        )}
                                        {item.type === "PLAN_EXPIRED" && (
                                            <CircleMinus className="text-error-text-1" />
                                        )}
                                        {item.type === "success" && (
                                            <CircleCheckBig className="text-success-text-1" />
                                        )}
                                        {item.type === "system" && (
                                            <Info className="text-primary" />
                                        )}
                                    </div>

                                    <div className="w-[80%] space-y-2">
                                        <p className="font-medium">{item.title}</p>
                                        <p className="text-sm text-muted-foreground line-clamp-2 h-10">
                                            {item.message}
                                        </p>
                                    </div>

                                    <span className="ml-auto text-xs text-dark-text/60">
                                        {TimeAgoUTCtoIST(item.createdAt)}
                                    </span>

                                </CardContent>
                            </Card>
                        ))}

                        {/* infinite scroll trigger */}
                        {hasMore && (
                            <div ref={loadMoreRef} className="h-10 flex items-center justify-center">
                                {loadingMore && (
                                    <p className="text-sm text-muted-foreground">Loading...</p>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </div>

            <NotificationDialog notification={selectedNotification} dialogOPen={dialogOPen} setDialogOPen={setDialogOPen}/>
        </>
    )
}

export default NotificationsPageContent
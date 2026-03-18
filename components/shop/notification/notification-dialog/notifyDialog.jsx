"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Bell } from "lucide-react"
import { useRouter } from "next/navigation"


export default function NotificationDialog({ notification, dialogOPen, setDialogOPen }) {

    if (!notification) return null

    const router = useRouter() 

    return (
        <Dialog open={dialogOPen} onOpenChange={setDialogOPen}>
            <DialogContent className="sm:max-w-md">

                <DialogHeader className="flex flex-row items-center gap-3">
                    <div className="p-2 rounded-full bg-primary/10">
                        <Bell className="w-5 h-5 text-primary" />
                    </div>

                    <DialogTitle className="text-lg font-semibold">
                        {notification.title}
                    </DialogTitle>
                </DialogHeader>

                <p className="text-sm text-dark-text mt-2">
                    {notification.message}
                </p>

                <div>
                    <span className="text-muted-foreground">
                        Date: {new Date(notification.createdAt).toLocaleString("en-IN", {
                            timeZone: "Asia/Kolkata",
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                            hour: "numeric",
                            minute: "2-digit",
                        })}
                    </span>
                </div>

                <div className="flex justify-end gap-2 mt-6">
                    {notification.link && <Button variant="outline"
                        onClick={()=>router.push(notification.link)}
                    >
                        View
                    </Button>}
                    <Button
                        onClick={() => setDialogOPen(false)}
                    >
                        Close
                    </Button>
                </div>

            </DialogContent>
        </Dialog>
    )
}
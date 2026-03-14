'use client'

import { Bell } from "lucide-react";

export function EmptyState() {
    return (
        <div className="text-center py-20">
            <Bell className="w-12 h-12 mx-auto text-gray-400" />
            <p className="text-lg mt-3 font-medium">No Notifications</p>
            <p className="text-sm text-muted-foreground">
                You are all caught up!
            </p>
        </div>
    );
}
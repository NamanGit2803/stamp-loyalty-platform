"use client"

import { Button } from "@/components/ui/button"
import { Search, Plus, MoreVertical } from "lucide-react"
import CustomersList from "./customers-list"


export default function CustomersComponent() {

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-secondary">Customers</h1>
                    <p className="text-muted-foreground mt-1">Manage your loyal customers</p>
                </div>
            </div>

            <CustomersList />
        </div>
    )
}

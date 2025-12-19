"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { CheckCircle, AlertCircle, Download, Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import RewardsTable from "./rewards-table"
import { SearchBar } from "@/components/toolbar/SearchBar"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const mockTransactions = [
    { id: 1, customer: "Amit Kumar", mobile: '1234567891', amount: 250, date: "2024-01-15", app: 'Paytm', status: "success" },
    { id: 2, customer: "Priya Singh", mobile: '1234567891', amount: 180, date: "2024-01-14", app: 'Paytm', status: "success" },
    { id: 3, customer: "Vikram Patel", mobile: '1234567891', amount: 99, date: "2024-01-13", app: 'Paytm', status: "failed" },
    { id: 4, customer: "Neha Sharma", mobile: '1234567891', amount: 500, date: "2024-01-12", app: 'Paytm', status: "success" },
]

export default function RewardsList() {
    const [filterDate, setFilterDate] = useState("")
    const [search, setSearch] = useState("")
    const [status, setStatus] = useState("all")

    const transactions = mockTransactions.filter(
        (tx) => !filterDate || tx.date === filterDate
    )

    return (
        <div className="space-y-2">
            {/* Filter */}
            <div className="flex justify-between">
                <div className="flex gap-2">
                    {/* input search  */}
                    <SearchBar
                        value={search}
                        onChange={setSearch}
                        placeholder="Search by name, phone or transaction ID"
                    />

                    {/* date  */}
                    <Input
                        type="date"
                        value={filterDate}
                        onChange={(e) => setFilterDate(e.target.value)}
                        className="h-9 text-sm w-auto"
                        style={{ background: "linear-gradient(to bottom right, #faf5ff, #ffffff)" }}
                    />

                    {/* status  */}
                    <Select value={status} onValueChange={setStatus}>
                        <SelectTrigger className="bg-background">
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectItem value="all">All Status</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="success">Verified</SelectItem>
                            <SelectItem value="rejected">Rejected</SelectItem>
                            <SelectItem value="manual_review">Under Review</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Table */}
            <RewardsTable />
        </div>
    )
}

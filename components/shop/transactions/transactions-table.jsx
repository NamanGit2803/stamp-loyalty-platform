"use client"

import { useState } from "react"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, AlertCircle, Download, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"

const mockTransactions = [
    { id: 1, customer: "Amit Kumar", mobile: '1234567891', amount: 250, date: "2024-01-15", status: "success" },
    { id: 2, customer: "Priya Singh", mobile: '1234567891', amount: 180, date: "2024-01-14", status: "success" },
    { id: 3, customer: "Vikram Patel", mobile: '1234567891', amount: 99, date: "2024-01-13", status: "failed" },
    { id: 4, customer: "Neha Sharma", mobile: '1234567891', amount: 500, date: "2024-01-12", status: "success" },
]

export default function TransactionsTable() {
    const [filterDate, setFilterDate] = useState("")

    const transactions = mockTransactions.filter(
        (tx) => !filterDate || tx.date === filterDate
    )

    return (
        <div className="space-y-2">
            {/* Filter */}
            <div className="flex justify-between">
                <div className="w-xs">
                    <Input
                        type="date"
                        value={filterDate}
                        onChange={(e) => setFilterDate(e.target.value)}
                        className="h-9 text-sm"
                        style={{ background: "linear-gradient(to bottom right, #faf5ff, #ffffff)" }}
                    />
                </div>

                <Button className="gap-2 hover:cursor-pointer">
                    <Download size={20} />
                    Export
                </Button>
            </div>

            {/* Table */}
            <Card className="overflow-hidden card">
                <Table>
                    <TableHeader className="bg-muted/40 sticky top-0 z-10">
                        <TableRow>
                            <TableHead className="text-primary">Customer</TableHead>
                            <TableHead className="text-primary">Mobile</TableHead>
                            <TableHead className="text-primary">Amount</TableHead>
                            <TableHead className="text-primary">Date</TableHead>
                            <TableHead className="text-primary">Status</TableHead>
                            <TableHead className="text-primary">Actions</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {transactions.map((tx) => (
                            <TableRow
                                key={tx.id}
                                className="hover:bg-muted/30 transition-colors"
                            >
                                {/* Customer */}
                                <TableCell className="py-3 font-medium">
                                    {tx.customer}
                                </TableCell>

                                {/* mobile  */}
                                <TableCell className="py-3 font-medium text-dark-text">
                                    {tx.mobile}
                                </TableCell>

                                {/* Amount */}
                                <TableCell className="py-3 font-semibold text-dark-text">
                                    ₹{tx.amount}
                                </TableCell>

                                {/* Date */}
                                <TableCell className="py-3 text-muted-foreground">
                                    {tx.date}
                                </TableCell>

                                {/* Status */}
                                <TableCell className="py-3">
                                    {tx.status === "success" ? (
                                        <Badge className="gap-1 bg-green-100 text-green-700 hover:bg-green-100">
                                            <CheckCircle size={14} />
                                            Success
                                        </Badge>
                                    ) : (
                                        <Badge className="gap-1 bg-red-100 text-red-700 hover:bg-red-100">
                                            <AlertCircle size={14} />
                                            Failed
                                        </Badge>
                                    )}
                                </TableCell>

                                {/* action  */}
                                <TableCell>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button
                                                variant="ghost"
                                                size="icon-sm"
                                            >
                                                <Eye />
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>View details</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                {transactions.length === 0 && (
                    <div className="py-6 text-center text-sm text-muted-foreground">
                        No transactions found
                    </div>
                )}
            </Card>
        </div>
    )
}

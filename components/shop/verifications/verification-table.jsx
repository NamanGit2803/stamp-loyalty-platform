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
import { CheckCircle, AlertCircle, Download, Eye, Pencil } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"

const mockTransactions = [
    { id: 1, customer: "Amit Kumar", mobile: '1234567891', amount: 250, date: "2024-01-15", app: 'Paytm', status: "success" },
    { id: 2, customer: "Priya Singh", mobile: '1234567891', amount: 180, date: "2024-01-14", app: 'Paytm', status: "success" },
    { id: 3, customer: "Vikram Patel", mobile: '1234567891', amount: 99, date: "2024-01-13", app: 'Paytm', status: "failed" },
    { id: 4, customer: "Neha Sharma", mobile: '1234567891', amount: 500, date: "2024-01-12", app: 'Paytm', status: "success" },
]

export default function VerificationsTable() {
    const [filterDate, setFilterDate] = useState("")

    const transactions = mockTransactions.filter(
        (tx) => !filterDate || tx.date === filterDate
    )

    return (
        <Card className="overflow-hidden card">
            <Table>
                <TableHeader className="bg-muted/40 sticky top-0 z-10">
                    <TableRow>
                        <TableHead className="text-primary">Customer</TableHead>
                        <TableHead className="text-primary">Mobile</TableHead>
                        <TableHead className="text-primary">Amount</TableHead>
                        <TableHead className="text-primary">Date</TableHead>
                        <TableHead className="text-primary">App</TableHead>
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

                            {/* mobile */}
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

                            {/* App */}
                            <TableCell className="py-3 text-primary">
                                {tx.app}
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
                            <TableCell className="py-3 flex gap-1">
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            size="icon-sm"
                                        >
                                            <Eye className="size-4" />
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>View details</p>
                                    </TooltipContent>
                                </Tooltip>

                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            size="icon-sm"
                                        >
                                            <Pencil className="size-4" />
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Edit</p>
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
    )
}

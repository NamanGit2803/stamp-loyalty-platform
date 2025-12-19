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
import RedeemConfirmDialog from "./redeemConfirm-dialog"

const mockTransactions = [
    { id: 1, customer: "Amit Kumar", mobile: '1234567891', reward: 'coffee', date: "2024-01-15", app: 'Paytm', status: "Available" },
    { id: 2, customer: "Priya Singh", mobile: '1234567891', reward: 'coffee', date: "2024-01-14", app: 'Paytm', status: "Redeemed" },
    { id: 3, customer: "Vikram Patel", mobile: '1234567891', reward: 'coffee', date: "2024-01-13", app: 'Paytm', status: "Redeemed" },
    { id: 4, customer: "Neha Sharma", mobile: '1234567891', reward: 'coffee', date: "2024-01-12", app: 'Paytm', status: "Available" },
]

export default function RewardsTable() {
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
                        <TableHead className="text-primary">Reward</TableHead>
                        <TableHead className="text-primary">Status</TableHead>
                        <TableHead className="text-primary">Earned On</TableHead>
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
                                {'+91 ' + tx.mobile}
                            </TableCell>

                            {/* reward */}
                            <TableCell className="py-3 text-dark-text">
                                {tx.reward}
                            </TableCell>

                            {/* Status */}
                            <TableCell className="py-3">
                                {tx.status === "Available" ? (
                                    <Badge className="gap-1 bg-green-100 text-green-700 hover:bg-green-100">
                                        <CheckCircle size={14} />
                                        {tx.status}
                                    </Badge>
                                ) : (
                                    <Badge variant="default" className="bg-gray-200 text-gray-700">
                                        {tx.status}
                                    </Badge>
                                )}
                            </TableCell>

                            {/* Date */}
                            <TableCell className="py-3 text-muted-foreground">
                                {tx.date}
                            </TableCell>

                            {/* action  */}
                            <TableCell className="py-3 flex gap-1">
                                {tx.status == 'Available' ? <RedeemConfirmDialog/>
                                    :
                                    <Badge variant="default" className="bg-gray-200 text-gray-700">
                                        {tx.status}
                                    </Badge>
                                }
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

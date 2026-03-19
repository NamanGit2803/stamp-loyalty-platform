'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

const PaymentHistoryPage = () => {

    // 👉 Replace this with real API data later
    const payments = []

    return (
        <div className='space-y-6'>
            <Card>
                <CardHeader>
                    <CardTitle>Payment History</CardTitle>
                </CardHeader>

                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Date</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Method</TableHead>
                                <TableHead className="text-right">Invoice</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {payments.length > 0 ? (
                                payments.map((payment, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{payment.date}</TableCell>
                                        <TableCell>₹{payment.amount}</TableCell>
                                        <TableCell>
                                            <Badge variant={payment.status === "success" ? "success" : "secondary"}>
                                                {payment.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>{payment.method}</TableCell>
                                        <TableCell className="text-right">
                                            {payment.invoice ? (
                                                <Button variant="link">Download</Button>
                                            ) : (
                                                "—"
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-10 text-muted-foreground">
                                        No payment history found
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}

export default PaymentHistoryPage
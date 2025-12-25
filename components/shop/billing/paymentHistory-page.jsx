'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
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
    return (
        <div className='space-y-6'>
            {/* ---------------- Payment History ---------------- */}
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
                            <TableRow>
                                <TableCell>12 Sep 2025</TableCell>
                                <TableCell>₹299</TableCell>
                                <TableCell>
                                    <Badge variant="success">Success</Badge>
                                </TableCell>
                                <TableCell>UPI</TableCell>
                                <TableCell className="text-right">
                                    <Button variant="link">Download</Button>
                                </TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell>12 Aug 2025</TableCell>
                                <TableCell>₹299</TableCell>
                                <TableCell>
                                    <Badge variant="secondary">Failed</Badge>
                                </TableCell>
                                <TableCell>UPI</TableCell>
                                <TableCell className="text-right">—</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}

export default PaymentHistoryPage
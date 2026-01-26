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
import { Spinner } from "@/components/ui/spinner"
import { FormatLastVisit } from "@/lib/dateFormat"
import VerifyConfirmDialog from "./verification-table/verifyConfirmDialog"
import DetailsDialog from "./verification-table/detailsDialog"

function renderStatusBadge(status) {
    switch (status) {
        case "success":
            return (
                <Badge className="gap-1 bg-green-100 text-green-700 hover:bg-green-100">
                    <CheckCircle size={14} />
                    Success
                </Badge>
            );

        case "pending":
            return (
                <Badge className="gap-1 bg-warning-bg-primary text-warning-text-1 ">
                    <AlertCircle size={14} />
                    Pending
                </Badge>
            );

        case "rejected":
        default:
            return (
                <Badge className="gap-1 bg-error-bg-primary text-error-text-1">
                    <AlertCircle size={14} />
                    Rejected
                </Badge>
            );
    }
}



export default function VerificationsTable({ loading, data }) {

    return (
        <Card className="overflow-hidden card">

            {/* LOADING STATE */}
            {loading && (
                <div className="flex justify-center items-center py-10">
                    <Spinner className="h-6 w-6 text-primary" />
                </div>
            )}

            {!loading && (
                <Table className="whitespace-nowrap">
                    <TableHeader className="bg-muted/40 sticky top-0 z-10">
                        <TableRow>
                            <TableHead className="text-primary">Id</TableHead>
                            <TableHead className="text-primary">Customer Mobile</TableHead>
                            <TableHead className="text-primary">Amount</TableHead>
                            <TableHead className="text-primary">UTR</TableHead>
                            <TableHead className="text-primary">Status</TableHead>
                            <TableHead className="text-primary">Created At</TableHead>
                            <TableHead className="text-primary">Actions</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {data.map((data) => (
                            <TableRow
                                key={data.id}
                                className="hover:bg-muted/30 transition-colors"
                            >
                                {/* id */}
                                <TableCell className="py-3 text-dark-text">
                                    {data.id}
                                </TableCell>

                                {/* mobile */}
                                <TableCell className="py-3 font-medium text-dark-text">
                                    {'+91 ' + data.phone}
                                </TableCell>

                                {/* Amount */}
                                <TableCell className="py-3 font-semibold text-dark-text">
                                    ₹{data.amount ? data.amount : '0'}
                                </TableCell>

                                {/* utr */}
                                <TableCell className="py-3 font-medium text-muted-foreground">
                                    {data.utr}
                                </TableCell>

                                {/* Status */}
                                <TableCell className="py-3">
                                    {renderStatusBadge(data.status)}
                                </TableCell>


                                {/* Date */}
                                <TableCell className="py-3 text-muted-foreground">
                                    {FormatLastVisit(data.createdAt, true)}
                                </TableCell>



                                {/* action  */}
                                <TableCell className="py-3 flex gap-1">
                                    <DetailsDialog scan={data} status={data.status}/>

                                    {data.status === 'pending' && <VerifyConfirmDialog scanId={data.id} customer={data.phone} />}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}

            {!loading && data?.length === 0 && (
                <div className="py-10 text-center text-sm text-muted-foreground">
                    No data found
                </div>
            )}
        </Card>
    )
}

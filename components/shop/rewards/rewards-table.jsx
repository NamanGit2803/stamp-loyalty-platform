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
import { Spinner } from "@/components/ui/spinner"
import { FormatLastVisit } from "@/lib/dateFormat"


export default function RewardsTable({ rewardsData, loading }) {

    return (
        <Card className="overflow-hidden card">

            {/* LOADING STATE */}
            {loading && (
                <div className="flex justify-center items-center py-10">
                    <Spinner className="h-6 w-6 text-primary" />
                </div>
            )}

            {!loading && (
                <Table>
                    <TableHeader className="bg-muted/40 sticky top-0 z-10">
                        <TableRow>
                            <TableHead className="text-primary">Customer</TableHead>
                            <TableHead className="text-primary">Reward Id</TableHead>
                            <TableHead className="text-primary">Mobile</TableHead>
                            <TableHead className="text-primary">Reward</TableHead>
                            <TableHead className="text-primary">Earned On</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {rewardsData?.map((c) => (
                            <TableRow
                                key={c.id}
                                className="hover:bg-muted/30 transition-colors"
                            >
                                {/* Customer */}
                                <TableCell className="py-3 font-medium">
                                    <div className="flex items-center gap-3">
                                        <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-semibold">
                                            {c.customer?.name[0]}
                                        </div>
                                        <span className="font-medium capitalize">{c.customer?.name}</span>
                                    </div>
                                </TableCell>

                                {/* reward id  */}
                                <TableCell className="py-3 text-dark-text">
                                    {c.id}
                                </TableCell>

                                {/* mobile */}
                                <TableCell className="py-3 font-medium text-dark-text">
                                    {'+91 ' + c.customer?.phone}
                                </TableCell>

                                {/* reward */}
                                <TableCell className="py-3 text-dark-text capitalize">
                                    {c.rewardText}
                                </TableCell>


                                {/* Date */}
                                <TableCell className="py-3 text-muted-foreground">
                                    {FormatLastVisit(c.createdAt, true)}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}

            {!loading && rewardsData?.length === 0 && (
                <div className="py-10 text-center text-sm text-muted-foreground">
                    No data found
                </div>
            )}
        </Card>
    )
}

'use client'

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Card } from "@/components/ui/card"
import RedeemConfirmDialog from "./redeemConfirm-dialog"
import { MoreHorizontal } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { shopStore } from "@/stores/shopStore"
import { FormatLastVisit } from "@/lib/dateFormat"
import { Spinner } from "@/components/ui/spinner"

const CustomersTable = ({ customers, loading }) => {
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
                            <TableHead className="text-primary">Mobile</TableHead>
                            <TableHead className="text-center text-primary">Stamps</TableHead>
                            <TableHead className="text-center text-primary">Visits</TableHead>
                            <TableHead className="text-primary">Last Visit</TableHead>
                            <TableHead className="text-primary">Reward</TableHead>
                            <TableHead className="w-10" />
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {customers?.map((c) => (
                            <TableRow key={c.id} className="hover:bg-muted/30 transition-colors">

                                {/* CUSTOMER */}
                                <TableCell className="py-3">
                                    <div className="flex items-center gap-3">
                                        <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-semibold">
                                            {c.name ? c.name[0] : ''}
                                        </div>
                                        <span className="font-medium capitalize">{c.name || 'Unkown'}</span>
                                    </div>
                                </TableCell>

                                {/* PHONE */}
                                <TableCell className="text-muted-foreground py-3">
                                    {'+91 ' + c.phone}
                                </TableCell>

                                {/* STAMPS */}
                                <TableCell className="text-center py-3">
                                    <Badge variant="default" className="rounded-full px-2 py-0.5">
                                        {c.stampCount}
                                    </Badge>
                                </TableCell>

                                {/* VISITS */}
                                <TableCell className="text-center py-3">
                                    {c.totalVisits}
                                </TableCell>

                                {/* LAST VISIT */}
                                <TableCell className="text-muted-foreground py-3">
                                    {FormatLastVisit(c.lastVisit)}
                                </TableCell>

                                {/* REWARD */}
                                <TableCell className="py-3 flex gap-1">
                                    {c.stampCount >= shopStore.shop?.targetStamps ? (
                                        <RedeemConfirmDialog customerId={c.id} customerName={c.name} />
                                    ) : (
                                        <Badge variant="default" className="bg-gray-200 text-dark-text py-1">
                                            Not Eligible
                                        </Badge>
                                    )}
                                </TableCell>

                                {/* MENU */}
                                <TableCell className="text-right py-3">
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                        <MoreHorizontal size={16} />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}

            {/* EMPTY STATE */}
            {!loading && customers?.length === 0 && (
                <div className="py-10 text-center text-sm text-muted-foreground">
                    No customers found
                </div>
            )}
        </Card>
    );
}

export default CustomersTable;

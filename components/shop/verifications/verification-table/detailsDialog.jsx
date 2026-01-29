'use client'

import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogDescription,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { observer } from "mobx-react-lite"
import { Calendar, CreditCard, Shield, FileText, AlertTriangle, Eye } from "lucide-react"

const StatusBadge = ({ status }) => {
    const color =
        status === "success" ? "bg-green-500" :
            status === "rejected" ? "bg-red-500" :
                "bg-yellow-500"

    return (
        <Badge className={`${color} text-white capitalize px-2 py-0.5`}>
            {status}
        </Badge>
    )
}

const InfoRow = ({ label, value }) => (
    <div className="grid grid-cols-[120px_1fr] gap-4 py-1 border-b border-muted/20 min-w-0">
        <span className="text-muted-foreground text-sm">{label}</span>

        <span className="font-medium text-sm break-all min-w-0">
            {value || "—"}
        </span>
    </div>

)

const DetailsDialog = ({ scan }) => {
    if (!scan) return null

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost" size="icon-sm">
                    <Eye className="size-4" />
                </Button>
            </DialogTrigger>

            <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto overflow-x-auto rounded-xl">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-3 text-xl font-semibold">
                        Scan Verification
                        <StatusBadge status={scan.status} />
                    </DialogTitle>

                    <DialogDescription className="text-sm">
                        Payment, OCR, security, and timeline details.
                    </DialogDescription>
                </DialogHeader>

                {/* PAYMENT CARD */}
                <Card className="mt-4 card">
                    <CardHeader className="pb-2">
                        <CardTitle className="flex items-center gap-2 text-base font-medium">
                            <CreditCard className="h-4 w-4 text-primary" />
                            Payment Info
                        </CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-1">
                        <InfoRow label="Customer" value={scan.customer?.name || 'Unknown'} />
                        <InfoRow label="Phone" value={scan.phone} />
                        <InfoRow label="Amount" value={scan.amount ? `₹${scan.amount}` : null} />
                        <InfoRow label="UPI ID" value={scan.upiId ? scan.upiId : null} />
                        <InfoRow label="UTR" value={scan.utr} />
                    </CardContent>
                </Card>

                {/* SECURITY CARD */}
                <Card className="mt-4 card">
                    <CardHeader className="pb-2">
                        <CardTitle className="flex items-center gap-2 text-base font-medium">
                            <Shield className="h-4 w-4 text-primary" />
                            Security
                        </CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-1">
                        <InfoRow label="App Detected" value={scan.appDetected} />
                        <InfoRow label="Screenshot Hash" value={scan.screenshotHash} />
                        <InfoRow label="Checksum" value={scan.checksum} />
                    </CardContent>
                </Card>

                {/* OCR TEXT */}
                {scan.ocrText && (
                    <Card className="mt-4 card">
                        <CardHeader className="pb-2">
                            <CardTitle className="flex items-center gap-2 text-base font-medium">
                                <FileText className="h-4 w-4 text-primary" />
                                OCR Text
                            </CardTitle>
                        </CardHeader>

                        <CardContent>
                            <pre className="text-xs whitespace-pre-wrap bg-muted p-3 rounded-md max-h-40 overflow-y-auto">
                                {scan.ocrText}
                            </pre>
                        </CardContent>
                    </Card>
                )}

                {/* TIMELINE */}
                <Card className="mt-4 mb-3 card">
                    <CardHeader className="pb-2">
                        <CardTitle className="flex items-center gap-2 text-base font-medium">
                            <Calendar className="h-4 w-4 text-primary" />
                            Timeline
                        </CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-1">
                        <InfoRow
                            label="Created At"
                            value={new Date(scan.createdAt).toLocaleString()}
                        />
                        <InfoRow
                            label="Verified At"
                            value={scan.verifiedAt ? new Date(scan.verifiedAt).toLocaleString() : null}
                        />
                    </CardContent>
                </Card>
            </DialogContent>
        </Dialog>
    )
}

export default observer(DetailsDialog)

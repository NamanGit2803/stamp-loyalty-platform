import { Badge } from "@/components/ui/badge"
import { CheckCircle, AlertCircle} from "lucide-react"

export function renderStatusBadge(status) {
    switch (status) {
        case "success":
        case "active":    
            return (
                <Badge className="gap-1 bg-green-100 text-green-700 hover:bg-green-100 capitalize">
                    <CheckCircle size={14} />
                    {status}
                </Badge>
            );

        case "pending":
        case "trialing":
            return (
                <Badge className="gap-1 bg-warning-bg-primary text-warning-text-1 capitalize">
                    {status!='trialing' &&<AlertCircle size={14} />}
                    {status}
                </Badge>
            );

        case "rejected":
        case "expired":
        case "canceled":
        default:
            return (
                <Badge className="gap-1 bg-error-bg-primary text-error-text-1 capitalize">
                    <AlertCircle size={14} />
                    {status == 'trial_end' ? 'Trial Ended' : status}
                </Badge>
            );
    }
}
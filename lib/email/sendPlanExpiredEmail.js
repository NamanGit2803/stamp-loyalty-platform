import { sendEmail } from "../sendEmail";
import { PlanExpiredEmailTemplate } from "../templates/planExpired";

export async function sendPlanExpiredEmail({
    to,
    shopName,
    expiryDate,
    dashboardUrl
}) {
    return sendEmail({
        to,
        subject: "Your Plan Has Expired",
        html: PlanExpiredEmailTemplate({
            shopName,
            expiryDate,
            dashboardUrl,
        }),
    });
}

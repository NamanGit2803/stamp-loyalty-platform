import { sendEmail } from "../sendEmail";
import { PlanExpiresTomorrowEmail } from "../templates/tomorrowPlanExpire";

export async function sendPlanExpiresTomorrowEmail({
    to,
    shopName,
    expiryDate,
    dashboardUrl
}) {
    return sendEmail({
        to,
        subject: "Your Plan Expires Tomorrow",
        html: PlanExpiresTomorrowEmail({
            shopName,
            expiryDate,
            dashboardUrl,
        }),
    });
}

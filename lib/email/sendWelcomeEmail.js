import { sendEmail } from "../sendEmail";
import { ShopWelcomeEmailTemplate } from "../templates/shopWelcomeEmail";

export async function sendWelcomeEmail({ to, name, shopName, trialEndDate, dashboardUrl }) {
    return sendEmail({
        to,
        subject: "Welcome to Stampi! Your Shop Is Live 🎉",
        html: ShopWelcomeEmailTemplate({
            name,
            shopName,
            trialEndDate,
            dashboardUrl,
        }),
    });
}

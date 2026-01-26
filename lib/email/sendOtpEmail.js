import { sendEmail } from "../sendEmail";
import { otpEmailTemplate } from "../templates/otpEmail";

export async function sendOtpEmail({ to, otp }) {
    return sendEmail({
        to,
        subject: "Your Stampi OTP Code",
        html: otpEmailTemplate({ otp }),
    });
}

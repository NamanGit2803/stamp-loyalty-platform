import { sendEmail } from "../sendEmail";
import { ResetPasswordEmailTemplate } from "../templates/resetPasswordEmail";

export async function SendResetPasswordEmail({ email, resetLink }) {
  try {
    return await sendEmail({
      to: email,
      subject: "Reset Your Stampi Password",
      html: ResetPasswordEmailTemplate({ resetLink }),
    });
  } catch (error) {
    console.error("[Reset Password Email Error]:", error);
    throw error;
  }
}

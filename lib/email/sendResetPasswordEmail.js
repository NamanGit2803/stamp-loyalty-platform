import { sendEmail } from "../sendEmail";
import { ResetPasswordEmailTemplate } from "../templates/resetPasswordEmail";

export async function SendResetPasswordEmail({email, resetLink}) {

  const html = ResetPasswordEmailTemplate({ resetLink });

  await sendEmail({
    to: email,
    subject: "Reset Your Stampi Password",
    html
  });
}

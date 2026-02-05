import { resend } from "./resend";

export async function sendEmail({ to, subject, html }) {
  try {
    return await resend.emails.send({
      from: "Stampi <no-reply@stampi.in>",
      to,
      subject,
      html,
    });
  } catch (error) {
    console.error("Email error:", error);
    throw error;
  }
}

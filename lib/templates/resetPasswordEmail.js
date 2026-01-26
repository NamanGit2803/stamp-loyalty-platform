import { baseEmailTemplate } from "./baseEmail";

export function ResetPasswordEmailTemplate({ resetLink }) {
    return baseEmailTemplate({
        title: "Reset Your Password",
        content: `
      <p>We received a request to reset your Stampi account password.</p>

      <p>Click the button below to reset it:</p>

      <a href="${resetLink}"
         style="
          display:inline-block;
          padding:12px 24px;
          background:#c9a7ff;
          color:#000;
          border-radius:8px;
          text-decoration:none;
          font-weight:600;
          margin:20px 0;
        ">
        Reset Password
      </a>

      <p>If you didn't request this, you can safely ignore this email.</p>
    `,
    });
}

import { baseEmailTemplate } from "./baseEmail";

export function otpEmailTemplate({ otp }) {
    return baseEmailTemplate({
        title: "Your OTP Code",
        content: `
      <p>Your one-time password (OTP) is:</p>

      <div style="
        font-size:32px;
        font-weight:bold;
        letter-spacing:6px;
        background:#f3f0ff;
        padding:16px;
        text-align:center;
        border-radius:6px;
        margin:20px 0;
      ">
        ${otp}
      </div>

      <p>This OTP is valid for <b>5 minutes</b>.</p>
      <p>If you didn’t request this, you can safely ignore this email.</p>
    `,
    });
}

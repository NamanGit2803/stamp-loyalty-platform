import { baseEmailTemplate } from "./baseEmail";

export function PlanExpiresTomorrowEmail({ shopName, expiryDate, dashboardUrl }) {
    return baseEmailTemplate({
        title: "Your Plan Expires Tomorrow",
        content: `
      <p>Hi <strong>${shopName}</strong>,</p>

      <p>
        This is a friendly reminder that your subscription plan will expire <strong>tomorrow</strong>.
      </p>

      <p>
        To avoid any interruption in your services, please renew your plan 
        before it expires. Renewing on time ensures that you continue to enjoy:
      </p>

      <ul style="padding-left:18px; line-height:1.6;">
        <li>Unlimited stamp & reward management</li>
        <li>Customer visit & loyalty tracking</li>
        <li>Automated notifications</li>
        <li>Advanced analytics & insights</li>
      </ul>

      <p style="margin-top:20px;">
        Your plan expires on: <strong>${expiryDate}</strong>
      </p>

      <a href="${dashboardUrl}"
         style="
           display:inline-block;
           padding:12px 24px;
           background:#c9a7ff;
           color:#000;
           border-radius:8px;
           text-decoration:none;
           font-weight:600;
           margin:25px 0;
         ">
        Renew Your Plan
      </a>

      <p>
        If you already renewed, you can safely ignore this message.
        If you need help, reply to this email anytime!
      </p>
    `,
    });
}

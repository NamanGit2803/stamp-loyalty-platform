import { baseEmailTemplate } from "./baseEmail";

export function PlanExpiredEmailTemplate({ shopName, expiryDate, dashboardUrl }) {
    return baseEmailTemplate({
        title: "Your Plan Has Expired",
        content: `
      <p>Hi <strong>${shopName}</strong>,</p>

      <p>
        Your subscription plan has 
        <strong>expired</strong>.
      </p>

      <p>
        Since your plan is no longer active, certain features such as 
        stamp management, customer tracking, rewards, and analytics may become 
        unavailable.
      </p>

      <p style="margin-top: 16px;">
        <strong>Expired on:</strong> ${expiryDate}
      </p>

      <a href="${dashboardUrl}"
         style="
           display:inline-block;
           padding:12px 24px;
           background:#ff6f6f;
           color:#fff;
           border-radius:8px;
           text-decoration:none;
           font-weight:600;
           margin:25px 0;
         "
      >
        Renew Your Plan
      </a>

      <p>
        Renew your subscription anytime to instantly regain access to all premium features.
      </p>

      <p>
        Need help? Just reply to this email—we’re always here.
      </p>
    `,
    });
}

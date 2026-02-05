import { baseEmailTemplate } from "./baseEmail";

export function ShopWelcomeEmailTemplate({ name, shopName, trialEndDate, dashboardUrl }) {
    return baseEmailTemplate({
        title: "Your Shop is Live! 🎉",
        content: `
      <p>Hi <strong>${name}</strong>,</p>

      <p>
        Welcome to <strong>Stampi</strong>! Your shop 
        <strong>${shopName}</strong> has been successfully created.
      </p>

      <p>
        Your <strong>15-days free trial</strong> has officially started.
        During this period, you can explore:
      </p>

      <ul style="padding-left:18px; line-height:1.6;">
        <li>Customer visit tracking</li>
        <li>Reward & stamp management</li>
        <li>Automatic reward notifications</li>
        <li>Analytics & insights</li>
      </ul>

      <p style="margin-top:20px;">
        Your trial will end on: <strong>${trialEndDate}</strong>
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
        Go to Dashboard
      </a>

      <p>
        If you need help, reply to this email anytime — we’re here for you.
      </p>
    `,
    });
}

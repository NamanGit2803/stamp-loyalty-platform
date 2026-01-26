import { SendEmailCommand } from "@aws-sdk/client-ses";
import { sesClient } from "./awsSes";

export async function sendEmail({ to, subject, text, html }) {
    const command = new SendEmailCommand({
        Source: `Stampi <${process.env.SES_FROM_EMAIL}>`,
        ReplyToAddresses: ["support@stampi.in"], // 👈 important
        Destination: {
            ToAddresses: [to],
        },
        Message: {
            Subject: { Data: subject, Charset: "UTF-8" },
            Body: {
                ...(html
                    ? { Html: { Data: html, Charset: "UTF-8" } }
                    : { Text: { Data: text, Charset: "UTF-8" } }),
            },
        },
    });

    return sesClient.send(command);
}

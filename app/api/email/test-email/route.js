export const runtime = "nodejs";

import { sendEmail } from "@/lib/sendEmail";

export async function GET() {
    try {
        await sendEmail({
            to: "njain4282@gmail.com",
            subject: "SES Test Email 🎉",
            text: "Hello! AWS SES is working successfully.",
        });

        return Response.json({ success: true });
    } catch (error) {
        console.error(error);
        return Response.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}

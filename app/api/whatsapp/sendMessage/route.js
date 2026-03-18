export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { sendWhatsAppTemplate } from "@/lib/whatsapp/sendMessages"

export async function POST(req) {
    try {
        const { phone, templateName, variables } = await req.json();

        // validation
        if (!phone || !templateName) {
            return NextResponse.json(
                { error: "Phone and templateName are required" },
                { status: 400 }
            );
        }

        const result = await sendWhatsAppTemplate({
            phone,
            templateName,
            variables
        });

        return NextResponse.json({
            success: true,
            data: result
        });

    } catch (err) {
        console.error("WhatsApp API Error:", err);

        return NextResponse.json(
            { error: "Failed to send WhatsApp message" },
            { status: 500 }
        );
    }
}
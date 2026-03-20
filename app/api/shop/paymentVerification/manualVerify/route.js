export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { nanoid } from "nanoid"
import { sendWhatsAppTemplate } from "@/lib/whatsapp/sendMessages"

export async function POST(req) {
    try {
        const { default: prisma } = await import("@/lib/prisma");

        const body = await req.json();
        const { scanId, shopId, shopName, targetStamps } = body;


        if (!shopId && !scanId) {
            return NextResponse.json(
                { error: "Inavalid" },
                { status: 400 }
            );
        }

        let scan = await prisma.scanVerification.findUnique({
            where: { id: scanId }
        });

        if (!scan) {
            return NextResponse.json({ error: "Scan not found" }, { status: 404 });
        }


        // FETCH CUSTOMER
        let customer = await prisma.customer.findFirst({
            where: { shopId, phone: scan.phone }
        });
        let newCustomer = false;


        //  3. If no customer → create new one
        if (!customer) {
            customer = await prisma.customer.create({
                data: {
                    id: `cust_${nanoid(10)}`,
                    shopId,
                    phone: scan.phone,
                    stampCount: 1,
                    totalVisits: 1,
                    totalStampCount: 1,
                    lastVisit: new Date(),
                },
            });

            newCustomer = true;
        }
        else {
            //  Customer exists → add stamp
            customer = await prisma.customer.update({
                where: { id: customer.id },
                data: {
                    stampCount: { increment: 1 },
                    totalVisits: { increment: 1 },
                    totalStampCount: { increment: 1 },
                    lastVisit: new Date(),
                },
            });

            newCustomer = false;
        }

        // -------------------------
        // UPDATE
        // -------------------------
        scan = await prisma.scanVerification.update({
            where: { id: scanId },
            data: {
                status: 'success',
                verifiedAt: new Date(),
                rejectReason: null,
                customerId: customer.id,
            }
        });



        if (customer.stampCount < 3 && !newCustomer) {

            // send whatsapp message 
            await sendWhatsAppTemplate({
                phone: customer.phone,
                templateName: 'stamp_added_link',
                variables: [
                    customer.name || "",
                    shopName,
                    customer.stampCount,
                    targetStamps,
                    `https://stampi.in/customer/${customer.id}`,
                ]
            });
        }


        // -------------------------
        // RESPONSE
        // -------------------------
        return NextResponse.json({
            success: true,
            message: "Scan verified. Stamp added.",
            data: scan,
            newCustomer,
        });

    } catch (err) {
        console.error("Scan Verification API error:", err);
        return NextResponse.json(
            { error: "Server Error" },
            { status: 500 }
        );
    }
}

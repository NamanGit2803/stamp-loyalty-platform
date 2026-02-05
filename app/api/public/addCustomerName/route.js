export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import { NextResponse } from "next/server";

export async function PATCH(req) {
  try {
    const { default: prisma } = await import("@/lib/prisma");

    const { customerId, name } = await req.json();

    // Validate
    if (!customerId || !name) {
      return NextResponse.json(
        { error: "customerId and name are required" },
        { status: 400 }
      );
    }

    // Update customer
    const updatedCustomer = await prisma.customer.update({
      where: { id: customerId },
      data: { name },
    });

    return NextResponse.json(
      { message: "Customer name updated successfully", updatedCustomer },
      { status: 200 }
    );
  } catch (error) {
    console.error("Update Name Error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

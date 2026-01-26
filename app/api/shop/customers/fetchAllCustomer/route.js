export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { default: prisma } = await import("@/lib/prisma");

    const body = await req.json();
    const { shopId, page = 1, limit = 10, search = "" } = body;

    if (!shopId) {
      return NextResponse.json(
        { error: "shopId is required" },
        { status: 400 }
      );
    }

    const skip = (page - 1) * limit;

    // SEARCH FILTER
    const where = {
      shopId,
      OR: [
        { name: { contains: search } },
        { phone: { contains: search } },
      ]
    };

    // FETCH PAGE DATA
    const customers = await prisma.customer.findMany({
      where,
      skip,
      take: limit,
      orderBy: { lastVisit: "desc" }
    });

    // TOTAL COUNT
    const total = await prisma.customer.count({ where });

    return NextResponse.json({
      success: true,
      data: customers,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    });

  } catch (err) {
    console.error("Customers API error:", err);
    return NextResponse.json(
      { error: "Server Error" },
      { status: 500 }
    );
  }
}

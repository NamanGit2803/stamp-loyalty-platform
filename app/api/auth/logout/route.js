export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import { NextResponse } from "next/server";

export async function POST() {
    try {
        // Remove cookie by setting it to empty + expired
        const res = NextResponse.json(
            { success: true, message: "Logged out successfully" },
            { status: 200 }
        );

        res.cookies.set("token", "", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            expires: new Date(0), // instantly expire
            path: "/",
        });

        return res;
    } catch (err) {
        console.error("[logout error]", err);

        return NextResponse.json(
            { success: false, error: "Internal server error" },
            { status: 500 }
        );
    }
}

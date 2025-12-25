import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs"
import { cookies } from "next/headers";

const prisma = new PrismaClient();

export async function PUT(req) {
    try {

        // Reads JWT from cookies automatically
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;

        if (!token) {
            return NextResponse.json(
                { error: "Not authenticated" },
                { status: 401 }
            );
        }

        // Verify token
        let decoded
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch {
            return NextResponse.json({ error: "Invalid token" }, { status: 401 })
        }


        // ✅ Parse request body
        const body = await req.json();
        const { name, currentPassword, newPassword } = body;

        if (!name && !newPassword) {
            return NextResponse.json({ error: "No fields to update" }, { status: 400 });
        }

        // ✅ Get user
        const user = await prisma.user.findUnique({
            where: { email: decoded.email },
        });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const updateData = {};

        // ✅ Handle password change
        if (newPassword) {
            if (!currentPassword) {
                return NextResponse.json(
                    { error: "Current password is required" },
                    { status: 400 }
                );
            }

            const isMatch = await bcrypt.compare(currentPassword, user.password);
            if (!isMatch) {
                return NextResponse.json(
                    { error: "Current password is incorrect" },
                    { status: 400 }
                );
            }

            const hashedPassword = await bcrypt.hash(newPassword, 10);
            updateData.password = hashedPassword;
        }

        // ✅ Handle other updates
        if (name) updateData.name = name;

        // ✅ Only now update once
        const updatedUser = await prisma.user.update({
            where: { email: decoded.email },
            data: updateData,
        });

        return NextResponse.json({
            message: newPassword
                ? "Password and profile updated successfully"
                : "Profile updated successfully",
            user: updatedUser,
        });
    } catch (err) {
        console.error("Error updating profile:", err);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
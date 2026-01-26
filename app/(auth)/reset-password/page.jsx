import { notFound } from "next/navigation";
import PasswordChangeCard from "@/components/resetPassword/passwordChangeCard";

export default async function ResetPasswordPage({ searchParams }) {
    const params = await searchParams;
    const token = params.token;

    if (!token) {
        return (
            notFound()
        );
    }

    return (
        <div className="min-h-dvh bg-custom-gradient flex justify-center items-center p-6">
            <PasswordChangeCard token={token} />
        </div>
    );
}


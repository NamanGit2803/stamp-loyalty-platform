"use client";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, TriangleAlert } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function PasswordChangeCard({ token }) {
    const [formData, setFormData] = useState({
        newPassword: "",
        confirmNewPassword: "",
    });
    const router = useRouter()

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    // Separate toggles
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    // Validation
    const validate = () => {
        const newErrors = {};

        if (!formData.newPassword.trim()) {
            newErrors.newPassword = "New password is required";
        }

        if (formData.newPassword.length < 6) {
            newErrors.newPassword = "Password must be at least 6 characters";
        }

        if (!formData.confirmNewPassword.trim()) {
            newErrors.confirmNewPassword = "Please confirm your password";
        }

        if (formData.confirmNewPassword !== formData.newPassword) {
            newErrors.confirmNewPassword = "Passwords do not match";
        }

        return newErrors;
    };

    // handle change password 
    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = validate();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setLoading(true);

        try {
            const res = await fetch("/api/auth/forgotPassword/resetPassword", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    token,
                    password: formData.newPassword,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                toast.error(data.error || "Failed to reset password");
                setLoading(false);
                return;
            }

            toast.success("Password reset successfully!");

            setTimeout(() => {
                router.push('/login')
            }, 2500);
        } catch (error) {
            toast.error("Something went wrong");
        }

        setLoading(false);
    };

    return (
        <Card className="w-md border-border/50 shadow-lg p-0">
            <div className="p-8">

                <h1 className="text-3xl font-bold text-secondary mb-8">
                    Reset Password
                </h1>

                <form onSubmit={handleSubmit} className="space-y-4">

                    {/* New Password */}
                    <div>
                        <label className="block text-sm font-medium mb-1 text-primary">
                            New Password
                        </label>

                        <div className="relative">
                            <Input
                                type={showNewPassword ? "text" : "password"}
                                name="newPassword"
                                placeholder="Enter new password"
                                value={formData.newPassword}
                                onChange={handleChange}
                                className={errors.newPassword ? "border-red-500 pr-10" : "border-border pr-10"}
                            />

                            {/* Separate eye toggle */}
                            <button
                                type="button"
                                onClick={() => setShowNewPassword(!showNewPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-800"
                            >
                                {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>

                        {errors.newPassword && (
                            <p className="text-red-600 text-xs mt-1 flex gap-2 items-center">
                                <TriangleAlert className="h-3 w-3" /> {errors.newPassword}
                            </p>
                        )}
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label className="block text-sm font-medium mb-1 text-primary">
                            Confirm New Password
                        </label>

                        <div className="relative">
                            <Input
                                type={showConfirmPassword ? "text" : "password"}
                                name="confirmNewPassword"
                                placeholder="Confirm password"
                                value={formData.confirmNewPassword}
                                onChange={handleChange}
                                className={errors.confirmNewPassword ? "border-red-500 pr-10" : "border-border pr-10"}
                            />

                            {/* Separate eye toggle */}
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-800"
                            >
                                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>

                        {errors.confirmNewPassword && (
                            <p className="text-red-600 text-xs mt-1 flex gap-2 items-center">
                                <TriangleAlert className="h-3 w-3" /> {errors.confirmNewPassword}
                            </p>
                        )}
                    </div>

                    <Button type="submit" className="w-full mt-5" disabled={loading}>
                        {loading ? <><Spinner /> Resetting...</> : "Reset Password"}
                    </Button>
                </form>
            </div>
            <span className="logo-font text-primary text-center mb-2 text-sm">
                <Link href={'/'}>{process.env.NEXT_PUBLIC_SITE_NAME ?? "Stampi"}</Link>
            </span>
        </Card>
    );
}

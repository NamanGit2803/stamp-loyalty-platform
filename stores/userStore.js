'use client'

import { makeAutoObservable, runInAction } from "mobx"

class UserStore {
    user = null
    loading = false
    error = null


    // OTP global state
    otpModalOpen = false;
    otpEmail = "";
    otpPurpose = "";  // signup, login, reset, security, change-email…
    otpVerified = false;

    redirectAfterOtp = null; // after OTP verification → auto redirect somewhere

    constructor() {
        makeAutoObservable(this)
        this.fetchUserProfile() // auto load user on refresh
    }

    // Register
    async userSignup(formData) {
        this.loading = true
        this.error = null
        try {
            const res = await fetch("/api/auth/signup/userCreate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            })
            const data = await res.json()

            if (!res.ok) throw new Error(data.error)

            runInAction(() => {
                this.user = data.user
            })
        } catch (err) {
            runInAction(() => this.error = err.message)
        } finally {
            this.loading = false
        }
    }


    // Login
    async login(credentials) {
        this.loading = true
        this.error = null
        try {
            const res = await fetch("/api/user/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(credentials),
            })

            const data = await res.json()

            if (!res.ok) throw new Error(data.error)

            runInAction(() => {
                this.user = data.user
            })
        } catch (err) {
            runInAction(() => this.error = err.message)
        } finally {
            this.loading = false
        }
    }


    // Auto-fetch user (browser sends cookie)
    async fetchUserProfile() {
        try {
            const res = await fetch("/api/user/findUser", {
                method: "GET",
                credentials: "include"
            })

            if (!res.ok) return

            const data = await res.json()

            runInAction(() => {
                this.user = data
            })
        } catch { }
    }


    // Logout
    async logout() {
        await fetch("/api/user/logout", { method: "POST" })
        this.user = null
    }



    // OTP: request
    async requestOtp(email, purpose, redirectUrl = null) {
        this.loading = true;
        this.error = null;

        try {
            const res = await fetch("/api/auth/otp/send", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, purpose }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Failed to send OTP");

            runInAction(() => {
                this.otpEmail = email;
                this.otpPurpose = purpose;
                this.redirectAfterOtp = redirectUrl;
                this.otpModalOpen = true;
            });
        } catch (err) {
            runInAction(() => (this.error = err.message));
        } finally {
            this.loading = false;
        }
    }

    closeOtp() {
        this.otpModalOpen = false;
        this.error = null
    }

    // -----------------------------
    // OTP: verify
    // -----------------------------
    async verifyOtp(code) {
        this.loading = true;
        this.error = null;

        try {
            const res = await fetch("/api/auth/otp/verify", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: this.otpEmail,
                    code,
                    purpose: this.otpPurpose,
                }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Invalid OTP");

            runInAction(() => {
                this.otpVerified = true;
                this.otpModalOpen = false;
            });

            // automatic redirect if configured
            if (this.redirectAfterOtp) {
                window.location.href = this.redirectAfterOtp;
            }

            return true;
        } catch (err) {
            runInAction(() => (this.error = err.message));
            return false;
        } finally {
            this.loading = false;
        }
    }
}

export const userStore = new UserStore()

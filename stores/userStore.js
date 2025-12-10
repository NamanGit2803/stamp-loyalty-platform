'use client';

import { makeAutoObservable, runInAction } from "mobx";

class UserStore {
  user = null;            
  shopId = null;
  loading = false;
  error = null;

  signupStep = 1;

  // OTP global state
  otpModalOpen = false;
  otpEmail = "";
  otpPurpose = "";   
  otpVerified = false;
  otpResolver = null;

  redirectAfterOtp = null;

  hydrated = false; // Prevent hydration mismatch

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });

    if (typeof window !== "undefined") {
      this.hydrated = true;      // Client-only state
      this.loadInitialUser();    // Safe initial load
    }
  }

  /** ================================
   * USER INITIAL LOAD (client only)
   * ================================= */
  async loadInitialUser() {
    try {
      const res = await fetch("/api/auth/findUser", {
        method: "GET",
        credentials: "include",
      });

      if (!res.ok) return;

      const data = await res.json();

      runInAction(() => {
        this.user = data.user;
        this.shopId = data.user?.shopId ?? null;
      });

    } catch (err) {
      console.error("User load failed:", err);
    }
  }

  /** ============== SIGNUP ============== */
  async userSignup(formData) {
    this.loading = true;
    this.error = null;

    try {
      const res = await fetch("/api/auth/signup/userCreate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error);

      runInAction(() => {
        this.user = data.user;
      });

    } catch (err) {
      runInAction(() => (this.error = err.message));
    } finally {
      this.loading = false;
    }
  }

  /** ============== LOGIN ============== */
  async login(formData) {
    this.loading = true;
    this.error = null;

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error);

      runInAction(() => {
        this.user = data.user;
        this.shopId = data.shopId;
      });

    } catch (err) {
      runInAction(() => (this.error = err.message));
    } finally {
      this.loading = false;
    }
  }

  /** ============== LOGOUT ============== */
  async logout() {
    await fetch("/api/user/logout", { method: "POST" });

    runInAction(() => {
      this.user = null;
      this.shopId = null;
    });
  }

  /** ============== SIGNUP STEP ============== */
  setSignupStep(step) {
    this.signupStep = step;
  }

  /** ============== OTP: SEND ============== */
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
      if (!res.ok) throw new Error(data.error);

      runInAction(() => {
        this.otpEmail = email;
        this.otpPurpose = purpose;
        this.redirectAfterOtp = redirectUrl;
        this.otpModalOpen = true;
        this.otpVerified = false;
      });

    } catch (err) {
      runInAction(() => (this.error = err.message));
    } finally {
      this.loading = false;
    }
  }

  /** ============== WAIT FOR OTP RESOLUTION ============== */
  waitForOtp() {
    return new Promise((resolve) => {
      this.otpResolver = resolve;
    });
  }

  closeOtp() {
    this.otpModalOpen = false;
    this.error = null;
  }

  /** ============== OTP: VERIFY ============== */
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
      if (!res.ok) throw new Error(data.error);

      runInAction(() => {
        this.otpVerified = true;
        this.otpModalOpen = false;
      });

      // resolve any pending promise
      if (this.otpResolver) {
        this.otpResolver(true);
        this.otpResolver = null;
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

export const userStore = new UserStore();

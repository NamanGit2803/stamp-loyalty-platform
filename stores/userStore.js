'use client'

import { makeAutoObservable, runInAction } from "mobx";

class UserStore {
    user = null;
    token = null;
    role = null;
    isLoggedIn = false;
    error = null;
    loading = false;

    constructor() {
        makeAutoObservable(this);
        this.loadFromStorage();
    }

    
    // SAVE SESSION
    setSession(user, token) {
        this.user = user;
        this.token = token;

        // Persist in localStorage
        localStorage.setItem("user", token);
    }

    // SignUp 
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

            if (!res.ok) throw new Error(data.error || "Registration failed")

            runInAction(() => {
                this.setSession(data.user, data.token)
            })
        } catch (err) {
            runInAction(() => {
                this.error = err.message
            })
        } finally {
            this.loading = false
        }
    }


    // LOAD SESSION ON PAGE REFRESH
    loadFromStorage() {
        if (typeof window === "undefined") return;

        const storedUser = localStorage.getItem("user");
        const storedToken = localStorage.getItem("token");

        if (storedUser && storedToken) {
            this.user = JSON.parse(storedUser);
            this.token = storedToken;
            this.role = this.user.role;
            this.isLoggedIn = true;
        }
    }

    // LOGIN
    async login(email, password) {
        const res = await fetch("/api/auth/login", {
            method: "POST",
            body: JSON.stringify({ email, password }),
        });

        const data = await res.json();

        if (!res.ok) throw new Error(data.error);

        // API returns { user, token }
        this.setSession(data);
        return data;
    }


    // LOGOUT
    logout() {
        this.user = null;
        this.token = null;
        this.role = null;
        this.isLoggedIn = false;

        localStorage.removeItem("user");
        localStorage.removeItem("token");
    }


    // CHECK ROLE HELPERS
    get isAdmin() {
        return this.role === "ADMIN";
    }

    get isShop() {
        return this.role === "SHOP";
    }
}

export const userStore = new UserStore();

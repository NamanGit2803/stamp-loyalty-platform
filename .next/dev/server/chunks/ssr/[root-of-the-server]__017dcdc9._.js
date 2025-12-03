module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/stores/userStore.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "userStore",
    ()=>userStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mobx$2f$dist$2f$mobx$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/mobx/dist/mobx.esm.js [app-ssr] (ecmascript)");
'use client';
;
class UserStore {
    user = null;
    loading = false;
    error = null;
    // OTP global state
    otpModalOpen = false;
    otpEmail = "";
    otpPurpose = "";
    otpVerified = false;
    redirectAfterOtp = null;
    constructor(){
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mobx$2f$dist$2f$mobx$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["makeAutoObservable"])(this);
        this.fetchUserProfile(); // auto load user on refresh
    }
    // Register
    async userSignup(formData) {
        this.loading = true;
        this.error = null;
        try {
            const res = await fetch("/api/auth/signup/userCreate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mobx$2f$dist$2f$mobx$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["runInAction"])(()=>{
                this.user = data.user;
            });
        } catch (err) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mobx$2f$dist$2f$mobx$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["runInAction"])(()=>this.error = err.message);
        } finally{
            this.loading = false;
        }
    }
    // Login
    async login(credentials) {
        this.loading = true;
        this.error = null;
        try {
            const res = await fetch("/api/user/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(credentials)
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mobx$2f$dist$2f$mobx$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["runInAction"])(()=>{
                this.user = data.user;
            });
        } catch (err) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mobx$2f$dist$2f$mobx$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["runInAction"])(()=>this.error = err.message);
        } finally{
            this.loading = false;
        }
    }
    // Auto-fetch user (browser sends cookie)
    async fetchUserProfile() {
        try {
            const res = await fetch("/api/user/findUser", {
                method: "GET",
                credentials: "include"
            });
            if (!res.ok) return;
            const data = await res.json();
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mobx$2f$dist$2f$mobx$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["runInAction"])(()=>{
                this.user = data;
            });
        } catch  {}
    }
    // Logout
    async logout() {
        await fetch("/api/user/logout", {
            method: "POST"
        });
        this.user = null;
    }
    // -----------------------------
    // OTP: request
    // -----------------------------
    async requestOtp(email, purpose, redirectUrl = null) {
        this.loading = true;
        this.error = null;
        try {
            const res = await fetch("/api/otp/send", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    purpose
                })
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Failed to send OTP");
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mobx$2f$dist$2f$mobx$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["runInAction"])(()=>{
                this.otpEmail = email;
                this.otpPurpose = purpose;
                this.redirectAfterOtp = redirectUrl;
                this.otpModalOpen = true;
            });
        } catch (err) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mobx$2f$dist$2f$mobx$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["runInAction"])(()=>this.error = err.message);
        } finally{
            this.loading = false;
        }
    }
    closeOtp() {
        this.otpModalOpen = false;
    }
    // -----------------------------
    // OTP: verify
    // -----------------------------
    async verifyOtp(code) {
        this.loading = true;
        this.error = null;
        try {
            const res = await fetch("/api/otp/verify", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: this.otpEmail,
                    code,
                    purpose: this.otpPurpose
                })
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Invalid OTP");
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mobx$2f$dist$2f$mobx$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["runInAction"])(()=>{
                this.otpVerified = true;
                this.otpModalOpen = false;
            });
            // automatic redirect if configured
            if (this.redirectAfterOtp) {
                window.location.href = this.redirectAfterOtp;
            }
            return true;
        } catch (err) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mobx$2f$dist$2f$mobx$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["runInAction"])(()=>this.error = err.message);
            return false;
        } finally{
            this.loading = false;
        }
    }
}
const userStore = new UserStore();
}),
"[project]/stores/shopStore.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "shopStore",
    ()=>shopStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mobx$2f$dist$2f$mobx$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/mobx/dist/mobx.esm.js [app-ssr] (ecmascript)");
;
class ShopStore {
    shops = [];
    loading = false;
    error = null;
    constructor(){
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mobx$2f$dist$2f$mobx$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["makeAutoObservable"])(this);
    }
    // CREATE NEW SHOP
    async createShop(shopData) {
        this.loading = true;
        this.error = null;
        try {
            const res = await fetch("/api/auth/signup/shopCreate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(shopData)
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Shop creation failed");
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mobx$2f$dist$2f$mobx$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["runInAction"])(()=>{
                // ADD NEW SHOP TO SHOP LIST
                this.shops.push(data.shop);
            });
            return data.shop;
        } catch (err) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mobx$2f$dist$2f$mobx$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["runInAction"])(()=>{
                this.error = err.message;
            });
        } finally{
            this.loading = false;
        }
    }
    // SET ALL SHOPS
    setShops(shops) {
        this.shops = shops;
    }
    // ACTIVE SHOP (OPTIONAL FEATURE)
    get activeShop() {
        return this.shops[0] || null;
    }
}
const shopStore = new ShopStore();
}),
"[project]/stores/StoreProvider.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "StoreProvider",
    ()=>StoreProvider,
    "useStore",
    ()=>useStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
// Import all stores here
var __TURBOPACK__imported__module__$5b$project$5d2f$stores$2f$userStore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/stores/userStore.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$stores$2f$shopStore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/stores/shopStore.js [app-ssr] (ecmascript)");
"use client";
;
;
;
;
// Combine stores in one object
const store = {
    userStore: __TURBOPACK__imported__module__$5b$project$5d2f$stores$2f$userStore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["userStore"],
    shopStore: __TURBOPACK__imported__module__$5b$project$5d2f$stores$2f$shopStore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["shopStore"]
};
// Create React Context
const StoreContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(store);
const StoreProvider = ({ children })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(StoreContext.Provider, {
        value: store,
        children: children
    }, void 0, false, {
        fileName: "[project]/stores/StoreProvider.js",
        lineNumber: 19,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const useStore = ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(StoreContext);
}),
"[project]/components/ui/sonner.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Toaster",
    ()=>Toaster
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-themes/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-ssr] (ecmascript)");
'use client';
;
;
;
const Toaster = ({ ...props })=>{
    const { theme = 'system' } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTheme"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Toaster"], {
        theme: theme,
        className: "toaster group",
        style: {
            '--normal-bg': 'var(--popover)',
            '--normal-text': 'var(--popover-foreground)',
            '--normal-border': 'var(--border)'
        },
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/sonner.tsx",
        lineNumber: 10,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__017dcdc9._.js.map
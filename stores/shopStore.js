import { makeAutoObservable, runInAction } from "mobx";

class ShopStore {
  shop = null;
  loading = false;
  error = null;
  trialUsed = false;

  constructor() {
    makeAutoObservable(this);

    // On refresh → load from secure API
    if (typeof window !== "undefined") {
      this.loadShopFromServer();
    }
  }

  // load shop on refresh 
  async loadShopFromServer() {
    try {
      const res = await fetch("/api/auth/findShop", {
        method: "GET",
        credentials: "include",
      });

      const data = await res.json();

      runInAction(() => {
        if (res.status === 401) {
          // User not logged in
          this.shop = null;
          return;
        }

        // If shop is null or undefined → no shop created
        this.shop = data.shop ?? null;
      });

      // auto check subscription after loading shop
      if (data.shop) {
        this.checkSubscription();
      }

    } catch (err) {
      console.error("Shop load failed:", err);
      runInAction(() => {
        this.shop = null; // failsafe
      });
    }
  }


  // CREATE NEW SHOP
  async createShop(shopData) {
    this.loading = true;
    this.error = null;

    try {
      const res = await fetch("/api/auth/signup/shopCreate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(shopData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Shop creation failed");

      console.log('data', data)

      runInAction(() => {
        this.shop = data.newShop;
      });

      return

    } catch (err) {
      runInAction(() => {
        this.error = err.message;
      });

    } finally {
      this.loading = false;
    }
  }


  // start free trail 
  async startTrial() {
    if (!this.shop) return;

    this.loading = true;
    this.error = null;
    this.trialUsed = false;  // add if needed

    try {
      const res = await fetch("/api/subscription/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ shopId: this.shop.id })
      });

      const data = await res.json();


      // Handle Trial Already Used (409)
      if (res.status === 409) {
        runInAction(() => {
          this.trialUsed = true;
          this.error = data.error || "Free trial already used";
        });
        return; // stop here
      }


      //  Handle other API errors
      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      return

    } catch (err) {
      runInAction(() => {
        this.error = err.message;
      });

    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }


  // CHECK SUBSCRIPTION STATUS
  async checkSubscription() {
    if (!this.shop) return;

    this.loading = true;
    this.error = null;

    try {
      const res = await fetch("/api/subscription/status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ shopId: this.shop.id }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to get subscription status");
      }

      runInAction(() => {
        // update subscription object inside shop
        this.shop.subscription = data.subscription || null;

        // example: ACTIVE | EXPIRED | TRIAL | NONE
        this.shop.subscriptionStatus = data.status || "NONE";
      });

      return data; // return for UI usage

    } catch (err) {
      runInAction(() => {
        this.error = err.message;
      });

    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }


  // get expire date 
  get daysLeft() {
    if (!this.shop?.subscription) return null;

    const sub = this.shop.subscription;
    const endDate = sub.trialEndsAt || sub.nextBillingAt;

    if (!endDate) return null;

    const expire = new Date(endDate);
    const now = new Date();

    const diff = Math.ceil((expire - now) / (1000 * 60 * 60 * 24));

    return diff; // may be negative if expired
  }




}

export const shopStore = new ShopStore();

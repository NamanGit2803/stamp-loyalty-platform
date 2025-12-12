// stores/ShopStore.ts
import { makeAutoObservable, runInAction } from "mobx";

class ShopStore {
  shop = null;            // Full shop object from backend
  subscription = null;    // Subscription object (clean separation)
  subscriptionStatus = ""; 
  daysLeft = null;

  loading = false;
  error = null;

  hydrated = false;       // prevents hydration mismatch

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });

    // load data only on client
    if (typeof window !== "undefined") {
      this.hydrated = true;
      this.loadInitial();
    }
  }

  /**
   * Load shop + subscription together on start.
   * Best performance & prevents flickering.
   */
  async loadInitial() {
    this.loading = true;

    try {
      const res = await fetch("/api/auth/findShop", {
        method: "GET",
        credentials: "include",
      });

      const data = await res.json();

      if (res.status === 401 || !data.shop) {
        runInAction(() => {
          this.shop = null;
          this.subscription = null;
          this.subscriptionStatus = "NONE";
        });
        return;
      }

      // Set shop
      runInAction(() => {
        this.shop = data.shop;
      });

      // Now load subscription
      await this.loadSubscription();

    } catch (err) {
      runInAction(() => {
        this.error = err.message;
        this.shop = null;
        this.subscription = null;
        this.subscriptionStatus = "NONE";
      });
    } finally {
      this.loading = false;
    }
  }

  /**
   * Loads only subscription data.
   */
  async loadSubscription() {
    if (!this.shop?.id) return;

    try {
      const res = await fetch("/api/subscription/status", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ shopId: this.shop.id }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to load subscription");

      runInAction(() => {
        this.subscription = data.subscription;
        this.subscriptionStatus = data.subscription.status || "NONE";
        this.daysLeft = this.calculateDaysLeft(data.subscription);
      });

    } catch (err) {
      runInAction(() => {
        this.error = err.message;
        this.subscription = null;
        this.subscriptionStatus = "NONE";
        this.daysLeft = null;
      });
    }
  }

  /**
   * Utility to calculate days left (extracted for clear logic).
   */
  calculateDaysLeft(sub) {
    if (!sub) return null;

    const endDate = sub.trialEndsAt || sub.nextBillingAt;
    if (!endDate) return null;

    const expire = new Date(endDate);
    const now = new Date();

    return Math.ceil((expire - now) / (1000 * 60 * 60 * 24));
  }

  /**
   * Creates a new shop
   */
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
      if (!res.ok) throw new Error(data.error);

      runInAction(() => {
        this.shop = data.newShop;
      });

    } catch (err) {
      runInAction(() => (this.error = err.message));
    } finally {
      this.loading = false;
    }
  }

  /**
   * Start free trial
   */
  async startTrial() {
    if (!this.shop) return;

    this.loading = true;
    this.error = null;

    try {
      const res = await fetch("/api/subscription/start", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ shopId: this.shop.id }),
      });

      const data = await res.json();

      if (res.status === 409) {
        // Trial already used
        runInAction(() => (this.error = data.error));
        return;
      }

      if (!res.ok) throw new Error(data.error);

      // Refresh subscription
      await this.loadSubscription();

    } catch (err) {
      runInAction(() => (this.error = err.message));
    } finally {
      this.loading = false;
    }
  }
}

export const shopStore = new ShopStore();

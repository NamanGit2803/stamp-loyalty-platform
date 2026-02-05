// stores/ShopStore.ts
import { makeAutoObservable, runInAction } from "mobx";

class ShopStore {
  shop = null;            // Full shop object from backend
  subscription = null;    // Subscription object (clean separation)
  subscriptionStatus = "";
  daysLeft = null;
  plan = [];

  loading = false;
  error = null;

  hydrated = false;       // prevents hydration mismatch

  // customers 
  customers = [];
  scanVerifications = [];
  pagination = {
    page: 1,
    total: 0,
    limit: 10,
    totalPages: 1
  };

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

    // Convert any UTC timestamp → IST date-only (00:00)
    const toISTDay = (date) => {
      const d = new Date(date);
      const utc = d.getTime() + (d.getTimezoneOffset() * 60000);
      const ist = new Date(utc + 5.5 * 60 * 60 * 1000);
      return new Date(ist.getFullYear(), ist.getMonth(), ist.getDate());
    };

    // TODAY (IST)
    const now = new Date();
    const utcNow = now.getTime() + (now.getTimezoneOffset() * 60000);
    const nowIST = new Date(utcNow + 5.5 * 60 * 60 * 1000);
    const todayIST = new Date(nowIST.getFullYear(), nowIST.getMonth(), nowIST.getDate());

    // 1️⃣ Trial still valid?
    if (sub.trialEndsAt) {
      const trialEnd = toISTDay(sub.trialEndsAt);
      const diff = Math.floor((trialEnd - todayIST) / 86400000);
      if (diff >= 0) return diff;
    }

    // 2️⃣ Paid subscription
    if (sub.nextBillingAt) {
      const billingDay = toISTDay(sub.nextBillingAt);
      const diff = Math.floor((billingDay - todayIST) / 86400000);

      return diff > 0 ? diff : 0;
    }

    return 0;
  }



  /**
   * Creates a new shop
   */
  async createShop(shopData, planId) {
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

      // start trial 
      await this.startTrial(planId)

    } catch (err) {
      runInAction(() => (this.error = err.message));
    } finally {
      this.loading = false;
    }
  }

  /**
   * Start free trial
   */
  async startTrial(planId) {

    if(!this.shop) return

    this.loading = true;
    this.error = null;

    try {
      const res = await fetch("/api/subscription/start", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ shopId: this.shop.id, planId }),
      });

      const data = await res.json();

      if (res.status === 409 && res.subscription == true) {
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

  /*
  reset paginatio
  */
  resetPagination() {
    this.pagination = {
      page: 1,
      total: 0,
      limit: 10,
      totalPages: 1
    };
  }


  /*
 update paginatio
 */
  updatePagination(data) {
    this.pagination = {
      page: data.page,
      total: data.total,
      limit: data.limit,
      totalPages: data.totalPages
    };
  }


  /*
    fetch all customer of a shop 
  */
  async fetchCustomers({ page, search = '' }) {
    this.loading = false
    this.error = null

    try {
      const res = await fetch("/api/shop/customers/fetchAllCustomer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          shopId: this.shop?.id,
          page,
          limit: this.pagination.limit,
          search
        })
      })

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      runInAction(() => {
        this.customers = data.data;       // <-- customer list
        this.pagination = data.pagination; // <-- pagination info
      });


    } catch (error) {
      runInAction(() => (this.error = error.message));
    } finally {
      this.loading = false;
    }
  }


  /*
  redeem reward
  */
  async redeemReward(customerId) {
    this.loading = true;
    this.error = null;

    try {
      const res = await fetch("/api/shop/customers/rewardRedeem", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerId,
          shopId: this.shop?.id,
          requiredStamps: this.shop?.targetStamps,
          rewardText: this.shop?.reward,
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      // Refresh customer list after redeem
      await this.fetchCustomers({
        page: this.pagination.page,
      });


    } catch (err) {
      this.error = err.message;
      return { error: err.message };

    } finally {
      this.loading = false;
    }
  }

  /*
  payment verifications records
  */
  async fetchPaymentVerifications({ page, search, date, status }) {
    this.loading = false
    this.error = null

    try {
      const res = await fetch("/api/shop/paymentVerification/fetch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          shopId: shopStore.shop?.id,
          page,
          limit: shopStore.pagination?.limit,
          search,
          date,
          status,
        }),
      });

      const data = await res.json();


      if (!res.ok) {
        throw new Error(data.error || "Failed to fetch rewards");
      }

      runInAction(() => {
        this.scanVerifications = data.data;
        this.pagination = data.pagination;
      });

    } catch (error) {
      runInAction(() => (this.error = error.message));
    } finally {
      this.loading = false;
    }

  }


  /*
  payment verifications records
  */
  async verifyScan(scanId) {
    this.loading = true;
    this.error = null;

    try {
      const res = await fetch("/api/shop/paymentVerification/manualVerify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          shopId: this.shop?.id,
          scanId
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      // Refresh customer list after redeem
      await this.fetchPaymentVerifications({
        page: this.pagination.page,
        search: '',
        status: 'all'
      });


    } catch (err) {
      this.error = err.message;
      return { error: err.message };

    } finally {
      this.loading = false;
    }
  }

  /*
  update shop details 
  */
  async updateShopDetails(details, enable = false) {
    this.loading = true;
    this.error = null;

    try {
      const res = await fetch("/api/shop/shopDetails/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          shopId: shopStore.shop?.id,
          details,
          enable
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to update.");
      }

      runInAction(() => (this.shop = data.shop))

      return
    } catch (error) {
      runInAction(() => (this.error = error.message));
    } finally {
      this.loading = false;
    }
  }


  // subscription handle 
  /*
  extend or active subscription 
  */
  async activeSubscription() {
    this.loading = true
    this.error = null

    try {
      const res = await fetch("/api/subscription/extend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          shopId: this.shop?.id,
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

    } catch (err) {
      this.error = err.message;
      return { error: err.message };

    } finally {
      this.loading = false;
    }
  }



}

export const shopStore = new ShopStore();

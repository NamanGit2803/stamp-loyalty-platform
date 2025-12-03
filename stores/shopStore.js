import { makeAutoObservable, runInAction } from "mobx";

class ShopStore {
  shop = null;
  loading = false;
  error = null;

  constructor() {
    makeAutoObservable(this);
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

      runInAction(() => {
        this.shop = data.shop;   // ✅ SET SINGLE SHOP
      });

      return data.shop;

    } catch (err) {
      runInAction(() => {
        this.error = err.message;
      });

    } finally {
      this.loading = false;
    }
  }

  // GET ACTIVE SHOP
  get activeShop() {
    return this.shop;
  }
}

export const shopStore = new ShopStore();

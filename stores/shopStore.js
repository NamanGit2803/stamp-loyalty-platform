import { makeAutoObservable, runInAction } from "mobx";

class ShopStore {
  shops = [];      
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
        // ADD NEW SHOP TO SHOP LIST
        this.shops.push(data.shop);  
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

  // SET ALL SHOPS
  setShops(shops) {
    this.shops = shops;
  }

  // ACTIVE SHOP (OPTIONAL FEATURE)
  get activeShop() {
    return this.shops[0] || null;
  }
}

export const shopStore = new ShopStore();

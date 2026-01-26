import { makeAutoObservable, runInAction } from "mobx";

class PlanStore {
  plans = [];         // All plans fetched from DB
  selectedPlan = null; // If user picks a plan in UI
  loading = false;
  error = null;

  hydrated = false;   // Prevent hydration mismatch

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });

    if (typeof window !== "undefined") {
      this.hydrated = true;
      this.loadPlans(); // auto-load on client
    }
  }

  /**
   * Load all plans from backend
   */
  async loadPlans() {
    this.loading = true;
    this.error = null;

    try {
      const res = await fetch("/api/plans/fetchPlans", {
        method: "GET",
        credentials: "include",
      });

      const data = await res.json();
      if (!data.success) throw new Error(data.message || "Failed to load plans");

      runInAction(() => {
        this.plans = data.plans || [];
        this.selectedPlan = data.plans?.[0] || null; // auto-select first plan
      });

    } catch (err) {
      runInAction(() => {
        this.error = err.message;
        this.plans = [];
        this.selectedPlan = null;
      });
    } finally {
      this.loading = false;
    }
  }

  /**
   * Select plan (UI usage)
   */
  selectPlan(planId) {
    const found = this.plans.find((p) => p.id === planId);
    this.selectedPlan = found || null;
  }

  /**
   * Get single plan
   */
  getPlanById(planId) {
    return this.plans.find((p) => p.id === planId);
  }

  /**
   * Safe getter for default plan
   */
  get defaultPlan() {
    return this.plans?.[0] || null;
  }
}

export const planStore = new PlanStore();

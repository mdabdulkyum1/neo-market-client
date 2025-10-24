"use client";

import { dashboardService } from "@/app/services/dashboardService";
import { create } from "zustand";

export interface ReferralUser {
  id: string;
  name: string;
  email: string;
  referralCode: string;
  credits: number;
}

export interface ReferralStats {
  totalReferredUsers: number;
  convertedUsers: number;
  pendingUsers: number;
  totalCreditsEarned: number;
  conversionRate: number;
}

export interface DashboardData {
  user: ReferralUser;
  stats: ReferralStats;
  referralLink: string;
}


type DashboardState = {
  stats: DashboardData | null;
  loading: boolean;
  error: string | null;
  fetchStats: (accessToken: string) => Promise<void>;
};

export const useDashboardStore = create<DashboardState>((set) => ({
  stats: null,
  loading: false,
  error: null,

  fetchStats: async (accessToken) => {
    if (!accessToken) return;
    set({ loading: true, error: null });
    try {
      const response = await dashboardService.getReferralStats(accessToken);
      set({ stats: response, loading: false });
    } catch (err: unknown) {
  if (err instanceof Error) {
    console.error("Failed to load stats:", err.message);
    set({ error: `Failed to load stats: ${err.message}`, loading: false });
  } else {
    console.error("Failed to load stats:", err);
    set({ error: "Failed to load stats", loading: false });
  }
}

  },
}));

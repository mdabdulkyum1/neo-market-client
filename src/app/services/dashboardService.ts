import api, { setAuthToken } from "@/lib/api";

export const dashboardService = {
  getReferralStats: async (token: string) => {

    setAuthToken(token);

    const { data } = await api.get("/referrals/stats"); 
    return data?.data;
  },
};

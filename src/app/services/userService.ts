import api, { setAuthToken } from "@/lib/api";

export const userService = {
  getMe: async (token: string) => {

    setAuthToken(token);

    const { data } = await api.get("/users/me"); 
    return data?.data;
  },
};

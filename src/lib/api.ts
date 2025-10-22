
import axios, { AxiosInstance } from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "https://neo-market-server.onrender.com/api/v1";

const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Auth token helper
export const setAuthToken = (token?: string) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

export default api;

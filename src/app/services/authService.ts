import axios from "@/lib/api";

interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  referralCode?: string;
}

interface LoginPayload {
  email: string;
  password: string;
}

interface VerifyOtpPayload {
  userId: string;
  otpCode: string;
  type: string;
}

interface ResendOtpPayload {
  userId: string;
  email: string;
}

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000/api/v1";

export const authService = {
  // ✅ Register a new user
  registerUser: async (payload: RegisterPayload) => {
    const { data } = await axios.post(`${BASE_URL}/auth/create-account`, payload);
    return data;
  },

  // ✅ Login user
  loginUser: async (payload: LoginPayload) => {
    const { data } = await axios.post(`${BASE_URL}/auth/login`, payload);
    return data;
  },

  // ✅ Verify OTP for email verification / forgot password
  verifyOtp: async (payload: VerifyOtpPayload) => {
    const { data } = await axios.post(`${BASE_URL}/auth/email-verify`, payload);
    return data;
  },

  // ✅ Resend OTP
  resendOtp: async (payload: ResendOtpPayload) => {
    const { data } = await axios.post(`${BASE_URL}/auth/resend-otp`, payload);
    return data;
  },

  // ✅ Forgot password (send OTP)
  forgotPassword: async (email: string) => {
    const { data } = await axios.post(`${BASE_URL}/auth/forgot-password`, { email });
    return data;
  },

  // ✅ Reset password
  resetPassword: async (userId: string, newPassword: string) => {
    const { data } = await axios.post(`${BASE_URL}/auth/reset-password`, { userId, newPassword });
    return data;
  },

  // ✅ Change password (user logged in)
  changePassword: async (userId: string, oldPassword: string, newPassword: string) => {
    const { data } = await axios.post(`${BASE_URL}/auth/change-password`, { userId, oldPassword, newPassword });
    return data;
  },
};

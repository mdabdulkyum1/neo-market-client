"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import { authService } from "@/app/services/authService";
import { useAuthStore } from "@/stores/authStore";

function OtpPageContent() {
  const { email, password } = useAuthStore();
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId") || "";

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setInterval(() => setCountdown((prev) => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [countdown]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp.trim()) return toast.error("Please enter the OTP");

    setLoading(true);
    try {
      await toast.promise(
        authService.verifyOtp({ userId, otpCode: otp, type: "register" }),
        {
          loading: "Verifying OTP...",
          success: (data) => {
            setTimeout(() => {
              signIn("credentials", {
                redirect: true,
                email: data.data.email,
                password: password,
                callbackUrl: "/",
              });
            }, 1000);
            return data.data.message || "OTP verified successfully!";
          },
          error: (err) =>
            err?.response?.data?.message || "OTP verification failed",
        }
      );
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toast.error(err.response?.data?.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (countdown > 0) return;
    setResendLoading(true);
    try {
      if (!email || !userId) {
        toast.error("Missing user info");
        return;
      }
      const data = await authService.resendOtp({ userId, email });
      toast.success(data.message || "OTP resent successfully");
      setCountdown(300);
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toast.error(err.response?.data?.message || "Failed to resend OTP");
    } finally {
      setResendLoading(false);
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#F3F6F8] dark:bg-[#121E2E]">
      <div className="bg-white dark:bg-[#1C2A3A] shadow-2xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-[#0073B1] mb-2">
          Verify Your Email
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Enter the 4-digit OTP sent to your email.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            maxLength={6}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-center text-lg tracking-widest focus:outline-none focus:ring-2 focus:ring-[#0073B1]"
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl text-white font-semibold transition ${
              loading
                ? "bg-[#0073B1]/60 cursor-not-allowed"
                : "bg-[#0073B1] hover:bg-[#2867B2]"
            }`}
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={handleResend}
            disabled={resendLoading || countdown > 0}
            className={`font-medium text-[#0073B1] hover:text-[#2867B2] transition disabled:text-gray-400`}
          >
            {resendLoading
              ? "Resending..."
              : countdown > 0
              ? `Resend OTP in ${formatTime(countdown)}`
              : "Resend OTP"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function OtpPage() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center min-h-screen text-gray-500">
          Loading OTP page...
        </div>
      }
    >
      <OtpPageContent />
    </Suspense>
  );
}

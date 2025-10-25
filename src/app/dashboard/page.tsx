"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Copy } from "lucide-react";
import DashboardCard from "./components/DashboardCard";
import { useDashboardStore } from "@/stores/dashboardStore";
import Loading from "@/components/loading/Loading";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const { stats, fetchStats } = useDashboardStore();
  
  const [copied, setCopied] = useState(false);
    const referralLink = `https://neo-market-client.vercel.app/register?r=${stats?.user?.referralCode}`;

useEffect(() => {
    if (session?.accessToken) {
      fetchStats(session?.accessToken);
    }
  }, [session, fetchStats]);


  const handleCopy = async () => {
    await navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  if (status === "loading") return <Loading></Loading>;
  if (!session) return <p>Not signed in</p>;


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 rounded-b-2xl shadow-lg">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">Welcome back!</h1>
              <p className="text-indigo-100 text-lg">
                Track your referrals and manage your credits
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-indigo-200 text-sm">Total Credits</p>
                <p className="text-2xl font-bold">{stats?.user?.credits}</p>
              </div>
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Referral Link Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Your Referral Link</h2>
              <p className="text-gray-600 mb-4">
                Share this link with friends to earn credits when they sign up and make purchases
              </p>
             <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-200 shadow-sm">
  {/* Referral link */}
  <div className="flex-1 min-w-0">
    <span
      className="text-indigo-600 text-sm sm:text-base font-mono block truncate"
      title={referralLink}
    >
      {/* Shortened link for mobile */}
      <span className="sm:hidden">
        {referralLink?.length > 25
          ? referralLink.slice(0, 25) + "..."
          : referralLink}
      </span>

      {/* Full link for tablet & desktop */}
      <span className="hidden sm:inline">{referralLink}</span>
    </span>
  </div>

  {/* Copy button */}
  <button
    onClick={handleCopy}
    className="flex items-center justify-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 active:bg-indigo-800 transition-all duration-200 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2"
  >
    <Copy className="w-4 h-4" />
    {copied ? "Copied!" : "Copy Link"}
  </button>
</div>

            </div>
            <div className="lg:w-48">
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-4 text-center">
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <p className="text-sm text-gray-600">Earn 2 credits for each successful referral</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <DashboardCard 
            title="Total Credits Earned" 
            value={stats?.user?.credits as number} 
            icon="credits"
            trend="+2 this week"
          />
          <DashboardCard 
            title="Referred Users" 
            value={stats?.stats?.totalReferredUsers as number} 
            subtitle={`${stats?.stats?.convertedUsers} converted users`} 
            icon="users"
            trend="+1 this week"
          />
          <DashboardCard 
            title="Conversion Rate" 
            value={`${stats?.stats?.conversionRate}%`} 
            subtitle={`${stats?.stats?.convertedUsers} out of ${stats?.stats?.totalReferredUsers} users`}
            icon="trend"
            trend="+5% this month"
          />
        </div>
      </div>
    </div>
  );
}

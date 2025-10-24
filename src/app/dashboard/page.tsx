"use client";

import { useState } from "react";
import { Copy } from "lucide-react";
import DashboardCard from "./components/DashboardCard";
import ReferralTable from "./components/ReferralTable";
import { useUserStore } from "@/stores/userStore";

export default function DashboardPage() {
  const user = useUserStore((state) => state.user);

  const [copied, setCopied] = useState(false);
  const referralLink = `https://neo-market-client.vercel.app/register?r=${user?.referralCode}`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>

      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <p className="text-gray-600 mb-2">Referral Link</p>
        <div className="flex items-center justify-between bg-gray-50 border rounded-lg p-2">
          <span className="text-blue-600 text-sm truncate">{referralLink}</span>
          <button
            onClick={handleCopy}
            className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm flex items-center gap-1 hover:bg-blue-700"
          >
            <Copy className="w-4 h-4" />
            {copied ? "Link Copied!" : "Copy Link"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <DashboardCard title="Total Credits Earned" value={8} />
        <DashboardCard title="Referred Users" value={10} subtitle="Converted Users (who purchased): 4" />
      </div>

      <ReferralTable />
    </div>
  );
}

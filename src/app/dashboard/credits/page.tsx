"use client";

import { Coins } from "lucide-react";

export default function CreditsPage() {
  return (
    <div>
      {/* Page Header */}
      <h1 className="text-2xl font-semibold mb-6">My Credits</h1>

      {/* Credits Overview Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Total Credits Earned */}
        <div className="bg-white p-6 rounded-xl shadow-sm flex flex-col items-center justify-center text-center">
          <div className="bg-indigo-100 p-3 rounded-full mb-3">
            <Coins className="w-6 h-6 text-indigo-600" />
          </div>
          <h3 className="text-gray-500 text-sm">Total Credits Earned</h3>
          <p className="text-3xl font-bold text-indigo-600 mt-1">8</p>
        </div>

        {/* Credits Used */}
        <div className="bg-white p-6 rounded-xl shadow-sm flex flex-col items-center justify-center text-center">
          <div className="bg-green-100 p-3 rounded-full mb-3">
            <Coins className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="text-gray-500 text-sm">Credits Used</h3>
          <p className="text-3xl font-bold text-green-600 mt-1">5</p>
        </div>

        {/* Available Credits */}
        <div className="bg-white p-6 rounded-xl shadow-sm flex flex-col items-center justify-center text-center">
          <div className="bg-yellow-100 p-3 rounded-full mb-3">
            <Coins className="w-6 h-6 text-yellow-600" />
          </div>
          <h3 className="text-gray-500 text-sm">Available Credits</h3>
          <p className="text-3xl font-bold text-yellow-600 mt-1">3</p>
        </div>
      </div>

      {/* Credit History Table */}
      <div className="bg-white mt-8 rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4">Credit History</h2>

        <table className="w-full text-sm">
          <thead>
            <tr className="text-gray-500 border-b">
              <th className="text-left p-3">Date</th>
              <th className="text-left p-3">Description</th>
              <th className="text-left p-3">Credits</th>
              <th className="text-left p-3">Type</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b hover:bg-gray-50">
              <td className="p-3">2024-01-15</td>
              <td className="p-3">Referral Bonus</td>
              <td className="p-3 text-green-600 font-semibold">+5</td>
              <td className="p-3">Earned</td>
            </tr>
            <tr className="border-b hover:bg-gray-50">
              <td className="p-3">2024-01-20</td>
              <td className="p-3">File Download</td>
              <td className="p-3 text-red-600 font-semibold">-2</td>
              <td className="p-3">Used</td>
            </tr>
            <tr className="border-b hover:bg-gray-50">
              <td className="p-3">2024-01-22</td>
              <td className="p-3">Referral Bonus</td>
              <td className="p-3 text-green-600 font-semibold">+3</td>
              <td className="p-3">Earned</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}


import { ReactNode } from "react";
import Link from "next/link";

type Props = { children: ReactNode };

export default function DashboardLayout({ children }: Props) {
  return (
    <div className="min-h-screen flex bg-gray-100">
      <aside className="hidden md:flex flex-col w-64 bg-white shadow-md p-6">
        <h1 className="text-2xl font-bold text-indigo-600 mb-8">Dashboard</h1>
        <nav className="flex flex-col space-y-2">
          <Link href="/dashboard">Home</Link>
          <Link href="/dashboard/profile">Profile</Link>
          <Link href="/dashboard/referrals">Referrals</Link>
          <Link href="/dashboard/purchases">Purchases</Link>
          <Link href="/dashboard/settings">Settings</Link>
        </nav>
      </aside>
      <main className="flex-1 p-6 md:ml-64">{children}</main>
    </div>
  );
}

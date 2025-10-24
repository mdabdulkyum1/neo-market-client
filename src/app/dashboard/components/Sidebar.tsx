"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, User, Users, CreditCard, ShoppingCart, Settings } from "lucide-react";

const links = [
  { href: "/dashboard", label: "Home", icon: Home },
  { href: "/dashboard/profile", label: "Profile", icon: User },
  { href: "/dashboard/credits", label: "My Credits", icon: CreditCard },
  { href: "/dashboard/referrals", label: "Referrals", icon: Users },
  { href: "/dashboard/purchases", label: "Purchases", icon: ShoppingCart },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex flex-col w-64 bg-white shadow-md p-6">
      <h1 className="text-2xl font-bold text-indigo-600 mb-8">
        <Link href="/">FileSure</Link>
      </h1>

      <nav className="flex flex-col space-y-2">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 p-2 rounded-lg transition-colors ${
                isActive
                  ? "bg-indigo-50 text-indigo-600 font-semibold"
                  : "text-gray-700 hover:bg-gray-100 hover:text-indigo-600"
              }`}
            >
              <Icon className="w-5 h-5" />
              {link.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

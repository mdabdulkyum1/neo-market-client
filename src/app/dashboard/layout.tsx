import { ReactNode } from "react";
import Link from "next/link";
import { Home, User, Users, ShoppingCart, Settings } from "lucide-react";

type Props = { children: ReactNode };

export default function DashboardLayout({ children }: Props) {
  const links = [
    { href: "/dashboard", label: "Home", icon: <Home className="w-4 h-4 mr-2" /> },
    { href: "/dashboard/profile", label: "Profile", icon: <User className="w-4 h-4 mr-2" /> },
    { href: "/dashboard/referrals", label: "Referrals", icon: <Users className="w-4 h-4 mr-2" /> },
    { href: "/dashboard/purchases", label: "Purchases", icon: <ShoppingCart className="w-4 h-4 mr-2" /> },
    { href: "/dashboard/settings", label: "Settings", icon: <Settings className="w-4 h-4 mr-2" /> },
  ];

  return (
    <div className="min-h-screen flex bg-gray-100">
      <aside className="hidden md:flex flex-col w-64 bg-white shadow-md p-6">
        <h1 className="text-2xl font-bold text-indigo-600 mb-8">
          <Link href="/">logo</Link>
        </h1>
        <nav className="flex flex-col space-y-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center text-gray-700 hover:text-indigo-600"
            >
              {link.icon} {link.label}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}

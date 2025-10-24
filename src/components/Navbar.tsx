"use client"

import { usePathname } from "next/navigation";
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import { signOut, useSession } from 'next-auth/react';
import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/providers/CartProvider";

export default function Navbar() {
  const pathname = usePathname();
  // Use NextAuth session hook to check auth status
  const { data: session, status } = useSession();
  const { getTotalItems } = useCart();
  const isLoggedIn = status === 'authenticated';
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Animation variants
  const navItemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  const mobileMenuVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { opacity: 1, height: 'auto', transition: { duration: 0.3 } },
  };

  // Handle logout
  const handleLogout = async () => {
    await signOut({ callbackUrl: '/' });
    setIsMobileMenuOpen(false);
  };

   const hideNavbar = pathname.startsWith("/dashboard");

  if (!hideNavbar) {
    return (
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-md sticky top-0 z-50"
      >
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent hover:from-indigo-700 hover:to-purple-700 transition-all duration-200">
            Neo Market
          </Link>
  
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <motion.div variants={navItemVariants} initial="hidden" animate="visible">
              <Link href="/" className="text-gray-800 hover:text-indigo-500 transition">
                Home
              </Link>
            </motion.div>
            <motion.div variants={navItemVariants} initial="hidden" animate="visible">
              <Link href="/products" className="text-gray-800 hover:text-indigo-500 transition">
                Products
              </Link>
            </motion.div>
            <motion.div variants={navItemVariants} initial="hidden" animate="visible">
              <Link href="/checkout" className="relative text-gray-800 hover:text-indigo-500 transition">
                <ShoppingCart className="w-5 h-5" />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {getTotalItems()}
                  </span>
                )}
              </Link>
            </motion.div>
            {isLoggedIn ? (
              <>
                <motion.div variants={navItemVariants} initial="hidden" animate="visible">
                  <Link
                    href="/dashboard"
                    className="text-gray-800 hover:text-indigo-500 transition"
                  >
                    Dashboard
                  </Link>
                </motion.div>
                <motion.div variants={navItemVariants} initial="hidden" animate="visible">
                  <Image
                        src={session.user?.image || "https://ui-avatars.com/api/?name=User+Name&background=0073B1&color=fff"}
                        alt="User"
                        width={32}
                        height={32}
                        className="rounded-full"
                        title={session.user?.name}
                      />
                </motion.div>
                <motion.div variants={navItemVariants} initial="hidden" animate="visible">
                  <button
                    onClick={handleLogout}
                    className="text-gray-800 hover:text-indigo-500 transition"
                  >
                    Logout
                  </button>
                </motion.div>
              </>
            ) : (
              <>
                <motion.div variants={navItemVariants} initial="hidden" animate="visible">
                  <Link
                    href="/login"
                    className="text-gray-800 hover:text-indigo-500 transition"
                  >
                    Login
                  </Link>
                </motion.div>
                <motion.div variants={navItemVariants} initial="hidden" animate="visible">
                  <Link
                    href="/register"
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 rounded-full hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    Register
                  </Link>
                </motion.div>
              </>
            )}
          </div>
  
          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-800"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
  
        {/* Mobile Menu */}
        <motion.div
          variants={mobileMenuVariants}
          initial="hidden"
          animate={isMobileMenuOpen ? 'visible' : 'hidden'}
          className="md:hidden bg-gray-50"
        >
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <Link
              href="/"
              className="text-gray-800 hover:text-indigo-500 transition"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/products"
              className="text-gray-800 hover:text-indigo-500 transition"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Products
            </Link>
            <Link
              href="/checkout"
              className="relative text-gray-800 hover:text-indigo-500 transition"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5" />
                <span>Cart</span>
                {getTotalItems() > 0 && (
                  <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {getTotalItems()}
                  </span>
                )}
              </div>
            </Link>
            {isLoggedIn ? (
              <>
                <Link
                  href="/dashboard"
                  className="text-gray-800 hover:text-indigo-500 transition"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-gray-800 hover:text-indigo-500 transition text-left"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-gray-800 hover:text-indigo-500 transition"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 rounded-full text-center hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </motion.div>
      </motion.nav>
    );
  }

}
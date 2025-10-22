"use client";


import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiMail, FiInfo, FiShield } from 'react-icons/fi';

export default function Footer() {
  const pathname = usePathname();
  
 const hideNavbar = pathname.startsWith("/dashboard");

  const footerItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  if (!hideNavbar) {
    return (
      <motion.footer
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
        className="bg-gray-800 text-white py-12"
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* About Section */}
            <motion.div variants={footerItemVariants}>
              <h3 className="text-lg font-semibold mb-4">About YourApp</h3>
              <p className="text-gray-300">
                YourApp is a digital product platform where you can earn credits by
                referring friends. Join our community and start sharing today!
              </p>
            </motion.div>
  
            {/* Quick Links */}
            <motion.div variants={footerItemVariants}>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-gray-300 hover:text-indigo-400 transition">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/products" className="text-gray-300 hover:text-indigo-400 transition">
                    Products
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard" className="text-gray-300 hover:text-indigo-400 transition">
                    Dashboard
                  </Link>
                </li>
              </ul>
            </motion.div>
  
            {/* Contact Section */}
            <motion.div variants={footerItemVariants}>
              <h3 className="text-lg font-semibold mb-4">Get in Touch</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <FiMail className="text-indigo-400" />
                  <a href="mailto:support@yourapp.com" className="text-gray-300 hover:text-indigo-400 transition">
                    support@neo.com
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <FiInfo className="text-indigo-400" />
                  <Link href="/about" className="text-gray-300 hover:text-indigo-400 transition">
                    About Us
                  </Link>
                </li>
                <li className="flex items-center gap-2">
                  <FiShield className="text-indigo-400" />
                  <Link href="/privacy" className="text-gray-300 hover:text-indigo-400 transition">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </motion.div>
          </div>
  
          {/* Bottom Bar */}
          <motion.div
            variants={footerItemVariants}
            className="mt-8 pt-8 border-t border-gray-700 text-center"
          >
            <p className="text-gray-400">
              &copy; {new Date().getFullYear()} Neo market. All rights reserved.
            </p>
          </motion.div>
        </div>
      </motion.footer>
    );
  }
}
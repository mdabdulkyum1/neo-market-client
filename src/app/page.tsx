"use client";

import { motion } from 'framer-motion';
// import { useState } from 'react';
import { FiCopy, FiShare2, FiUsers, FiDollarSign, FiGift } from 'react-icons/fi';

export default function Home() {
  // Mock referral code and user data (replace with actual data from your backend)
  // const [referralCode: string] = useState('LINA123');
  // const [copied, setCopied] = useState(false);

  // Handle copy referral code
  const handleCopy = () => {
    // navigator.clipboard.write(` https://yourapp.com/register?r=${referralCode} `);
    // setCopied(true);
    // setTimeout(() => setCopied(false), 2000);
  };

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const stagger = {
    visible: { transition: { staggerChildren: 0.2 } },
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={stagger}
        className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20"
      >
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            variants={fadeIn}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Share, Earn, Repeat!
          </motion.h1>
          <motion.p
            variants={fadeIn}
            className="text-lg md:text-xl mb-8 max-w-2xl mx-auto"
          >
            Invite your friends to our platform and earn credits for every purchase
            they make. Start building your rewards today!
          </motion.p>
          <motion.a
            variants={fadeIn}
            href="/dashboard"
            className="bg-white text-indigo-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Go to Dashboard
          </motion.a>
        </div>
      </motion.section>

      {/* Referral Code Section */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={stagger}
        className="py-16"
      >
        <div className="container mx-auto px-4">
          <motion.div
            variants={fadeIn}
            className="bg-gray-100 rounded-lg p-8 text-center max-w-md mx-auto"
          >
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              🎯 Your Referral Code
            </h2>
            <div className="bg-white border-2 border-indigo-500 rounded-md p-4 mb-4">
              <p className="text-xl font-bold text-indigo-500 font-mono tracking-wider">
                
              </p>
            </div>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 transition"
              >
                <FiCopy />
                {/* {copied ? 'Copied!' : 'Copy Link'} */}
              </button>
              <button className="flex items-center gap-2 bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition">
                <FiShare2 />
                Share
              </button>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={stagger}
        className="py-16 bg-white"
      >
        <div className="container mx-auto px-4">
          <motion.h2
            variants={fadeIn}
            className="text-3xl font-bold text-center text-gray-800 mb-12"
          >
            Why Join Our Referral Program?
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              variants={fadeIn}
              className="text-center p-6 bg-gray-50 rounded-lg shadow-sm"
            >
              <FiUsers className="text-4xl text-indigo-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Invite Friends
              </h3>
              <p className="text-gray-600">
                Share your unique referral link with friends and family.
              </p>
            </motion.div>
            <motion.div
              variants={fadeIn}
              className="text-center p-6 bg-gray-50 rounded-lg shadow-sm"
            >
              <FiDollarSign className="text-4xl text-indigo-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Earn Credits
              </h3>
              <p className="text-gray-600">
                Get 2 credits for every referred user who makes a purchase.
              </p>
            </motion.div>
            <motion.div
              variants={fadeIn}
              className="text-center p-6 bg-gray-50 rounded-lg shadow-sm"
            >
              <FiGift className="text-4xl text-indigo-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Redeem Rewards
              </h3>
              <p className="text-gray-600">
                Use your credits to unlock premium features or products.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* How It Works Section */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={stagger}
        className="py-16 bg-gray-100"
      >
        <div className="container mx-auto px-4">
          <motion.h2
            variants={fadeIn}
            className="text-3xl font-bold text-center text-gray-800 mb-12"
          >
            How It Works
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div variants={fadeIn} className="text-center">
              <div className="text-5xl font-bold text-indigo-500 mb-4">1</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Sign Up
              </h3>
              <p className="text-gray-600">
                Create an account and get your unique referral link.
              </p>
            </motion.div>
            <motion.div variants={fadeIn} className="text-center">
              <div className="text-5xl font-bold text-indigo-500 mb-4">2</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                ShareSony
              Share Your Link
              </h3>
              <p className="text-gray-600">
                Invite friends using your referral link.
              </p>
            </motion.div>
            <motion.div variants={fadeIn} className="text-center">
              <div className="text-5xl font-bold text-indigo-500 mb-4">3</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Earn Credits
              </h3>
              <p className="text-gray-600">
                Both you and your friend earn credits on their first purchase.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="py-16 bg-indigo-600 text-white text-center"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">
            Start Earning Credits Today!
          </h2>
          <p className="text-lg mb-8 max-w-xl mx-auto">
            Join our referral program and turn your network into rewards. Share
            your link and start earning now!
          </p>
          <a
            href="/register"
            className="bg-white text-indigo-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Get Started
          </a>
        </div>
      </motion.section>
    </div>
  );
}
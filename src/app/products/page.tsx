"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import ProductSidebar from "./components/product-sidebar"
import ProductGrid from "./components/product-grid"

export default function ProductPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("featured")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16"
      >
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Discover Amazing Products
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-indigo-100">
            Explore our curated collection of digital products, books, and software. 
            Earn credits with every purchase and unlock exclusive rewards.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="bg-white/20 rounded-full px-6 py-3 backdrop-blur-sm">
              <span className="text-sm font-medium">🎯 Earn 2 Credits per Purchase</span>
            </div>
            <div className="bg-white/20 rounded-full px-6 py-3 backdrop-blur-sm">
              <span className="text-sm font-medium">💳 Secure Payment with Stripe</span>
            </div>
            <div className="bg-white/20 rounded-full px-6 py-3 backdrop-blur-sm">
              <span className="text-sm font-medium">⚡ Instant Access</span>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Main Content */}
      <div className="flex min-h-screen w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <ProductSidebar
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
        <div className="flex-1 flex flex-col">
          {/* Mobile Filter Header */}
          <div className="md:hidden flex items-center gap-4 p-4 border-b border-gray-200 bg-white sticky top-0 z-30 shadow-sm">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-3 hover:bg-gray-100 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
              aria-label="Toggle sidebar"
            >
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <span className="text-sm font-medium text-gray-700">Filters & Categories</span>
            <div className="ml-auto flex items-center gap-2">
              <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
              <span className="text-xs text-gray-500">Live</span>
            </div>
          </div>
          
          <ProductGrid
            selectedCategory={selectedCategory}
            sortBy={sortBy}
            onSortChange={setSortBy}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
          />
        </div>
      </div>
    </div>
  )
}
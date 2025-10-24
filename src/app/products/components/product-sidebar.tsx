"use client"

import { X, Filter, Star, Zap } from "lucide-react"
import { motion } from "framer-motion"

interface ProductSidebarProps {
  selectedCategory: string
  onCategoryChange: (category: string) => void
  isOpen?: boolean
  onClose?: () => void
}

const categories = [
  { id: "all", label: "All Products", icon: "🛍️", count: 9 },
  { id: "saas", label: "SaaS", icon: "☁️", count: 3 },
  { id: "book", label: "Books", icon: "📚", count: 3 },
  { id: "software", label: "Software", icon: "💻", count: 3 },
]

const brands = [
  { id: "brand1", label: "Brand Alpha", count: 3 },
  { id: "brand2", label: "Brand Beta", count: 3 },
  { id: "brand3", label: "Brand Gamma", count: 3 },
]

const priceRanges = [
  { id: "0-50", label: "Under $50", count: 2 },
  { id: "50-100", label: "$50 - $100", count: 4 },
  { id: "100-200", label: "$100 - $200", count: 3 },
  { id: "200+", label: "$200+", count: 0 },
]

export default function ProductSidebar({
  selectedCategory,
  onCategoryChange,
  isOpen = false,
  onClose,
}: ProductSidebarProps) {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden animate-in fade-in duration-300"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed md:static top-0 left-0 h-full w-11/12 sm:w-80 md:w-72 max-w-[90vw] border-r border-gray-200 bg-white shadow-lg md:shadow-none overflow-y-auto z-50 md:z-auto transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Filter className="w-4 h-4 text-white" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Filters</h2>
            </div>
            <button
              onClick={onClose}
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
              aria-label="Close sidebar"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Categories Section */}
          <div className="mb-8">
            <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
              Categories
            </h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <motion.button
                  key={category.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    onCategoryChange(category.id)
                    onClose?.()
                  }}
                  className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 flex items-center justify-between group ${
                    selectedCategory === category.id
                      ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg"
                      : "text-gray-700 hover:bg-gray-100 hover:text-indigo-600"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{category.icon}</span>
                    <span>{category.label}</span>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    selectedCategory === category.id
                      ? "bg-white/20 text-white"
                      : "bg-gray-100 text-gray-600"
                  }`}>
                    {category.count}
                  </span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Brands Section */}
          <div className="mb-8">
            <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
              Brands
            </h3>
            <div className="space-y-3">
              {brands.map((brand) => (
                <label key={brand.id} className="flex items-center justify-between cursor-pointer group p-2 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="text-sm text-gray-700 group-hover:text-indigo-600 transition-colors">
                      {brand.label}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                    {brand.count}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Range Section */}
          <div className="mb-8">
            <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              Price Range
            </h3>
            <div className="space-y-3">
              {priceRanges.map((range) => (
                <label key={range.id} className="flex items-center justify-between cursor-pointer group p-2 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="priceRange"
                      className="w-4 h-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="text-sm text-gray-700 group-hover:text-indigo-600 transition-colors">
                      {range.label}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                    {range.count}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Special Offers */}
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-4 mb-6">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-4 h-4 text-indigo-600" />
              <h4 className="text-sm font-semibold text-gray-900">Special Offers</h4>
            </div>
            <p className="text-xs text-gray-600 mb-3">
              Get 2 credits for every purchase and unlock exclusive rewards!
            </p>
            <div className="flex items-center gap-2 text-xs">
              <Star className="w-3 h-3 text-yellow-500" />
              <span className="text-gray-700 font-medium">Premium Member Benefits</span>
            </div>
          </div>

          {/* Clear Filters */}
          <button className="w-full py-2 px-4 text-sm font-medium text-gray-600 hover:text-indigo-600 hover:bg-gray-100 rounded-lg transition-colors duration-200">
            Clear All Filters
          </button>
        </div>
      </aside>
    </>
  )
}
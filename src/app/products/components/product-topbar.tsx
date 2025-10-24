"use client"

import { Grid3x3, List, ArrowUpDown, Filter } from "lucide-react"
import { motion } from "framer-motion"

interface ProductTopbarProps {
  sortBy: string
  onSortChange: (sort: string) => void
  viewMode: "grid" | "list"
  onViewModeChange: (mode: "grid" | "list") => void
}

export default function ProductTopbar({ sortBy, onSortChange, viewMode, onViewModeChange }: ProductTopbarProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-8 p-6 bg-white rounded-2xl shadow-lg border border-gray-200"
    >
      {/* Sort and Filter Section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full lg:w-auto">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-indigo-600" />
          <span className="text-sm font-semibold text-gray-700">Sort & Filter</span>
        </div>
        
        <div className="flex items-center gap-3">
          <label className="text-sm font-medium text-gray-600">Sort by:</label>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="px-4 py-2 rounded-xl border border-gray-300 bg-white text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 cursor-pointer shadow-sm"
          >
            <option value="featured">Featured</option>
            <option value="price-low-high">Price: Low to High</option>
            <option value="price-high-low">Price: High to Low</option>
            <option value="name-asc">Name: A to Z</option>
            <option value="name-desc">Name: Z to A</option>
          </select>
        </div>
      </div>

      {/* View Toggle and Stats */}
      <div className="flex items-center gap-4">
        {/* Quick Stats */}
        <div className="hidden sm:flex items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>Live</span>
          </div>
          <div className="flex items-center gap-1">
            <ArrowUpDown className="w-4 h-4" />
            <span>Updated</span>
          </div>
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-2 bg-gray-100 rounded-xl p-1">
          <button
            onClick={() => onViewModeChange("grid")}
            className={`p-2 rounded-lg transition-all duration-200 hover:scale-105 active:scale-95 ${
              viewMode === "grid" 
                ? "bg-indigo-600 text-white shadow-lg" 
                : "text-gray-600 hover:bg-white hover:text-indigo-600"
            }`}
            title="Grid view"
          >
            <Grid3x3 className="w-4 h-4" />
          </button>
          <button
            onClick={() => onViewModeChange("list")}
            className={`p-2 rounded-lg transition-all duration-200 hover:scale-105 active:scale-95 ${
              viewMode === "list" 
                ? "bg-indigo-600 text-white shadow-lg" 
                : "text-gray-600 hover:bg-white hover:text-indigo-600"
            }`}
            title="List view"
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  )
}

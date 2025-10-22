"use client"

import { Grid3x3, List } from "lucide-react"

interface ProductTopbarProps {
  sortBy: string
  onSortChange: (sort: string) => void
  viewMode: "grid" | "list"
  onViewModeChange: (mode: "grid" | "list") => void
}

export default function ProductTopbar({ sortBy, onSortChange, viewMode, onViewModeChange }: ProductTopbarProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-gray-200 animate-in fade-in slide-in-from-top-2 duration-300">
      {/* Sort Dropdown */}
      <div className="w-full sm:w-auto">
        <label className="text-sm font-medium text-gray-700 mr-3">Sort by:</label>
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="px-4 py-2 rounded-md border border-gray-300 bg-white text-gray-900 hover:bg-gray-50 transition-colors cursor-pointer"
        >
          <option value="featured">Featured</option>
          <option value="price-low-high">Price: Low to High</option>
          <option value="price-high-low">Price: High to Low</option>
          <option value="name-asc">Name: A to Z</option>
          <option value="name-desc">Name: Z to A</option>
        </select>
      </div>

      {/* View Toggle Icons */}
      <div className="flex items-center gap-2 ml-auto">
        <button
          onClick={() => onViewModeChange("grid")}
          className={`p-2 rounded-md transition-all duration-200 hover:scale-105 active:scale-95 ${
            viewMode === "grid" ? "bg-purple-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
          title="Grid view"
        >
          <Grid3x3 className="w-5 h-5" />
        </button>
        <button
          onClick={() => onViewModeChange("list")}
          className={`p-2 rounded-md transition-all duration-200 hover:scale-105 active:scale-95 ${
            viewMode === "list" ? "bg-purple-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
          title="List view"
        >
          <List className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}

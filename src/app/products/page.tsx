"use client"

import { useState } from "react"
import ProductSidebar from "./components/product-sidebar"
import ProductGrid from "./components/product-grid"


export default function ProductPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("featured")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-background w-full px-4 sm:px-6 lg:px-8 max-w-[100vw] md:max-w-7xl mx-auto">
      <ProductSidebar
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <div className="flex-1 flex flex-col">
        <div className="md:hidden flex items-center gap-4 p-4 border-b border-border bg-card sticky top-0 z-30">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-3 hover:bg-muted rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-purple-600"
            aria-label="Toggle sidebar"
          >
            <svg className="w-6 h-6 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <span className="text-sm font-medium text-foreground">Filters</span>
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
  )
}
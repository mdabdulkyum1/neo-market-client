"use client"

import { useMemo } from "react"
import { motion } from "framer-motion"
import ProductCard from "./product-card"
import ProductTopbar from "./product-topbar"
import ProductListItem from "./product-list-item"
import { allProducts } from "@/lib/products"
import { useUserStore } from "@/stores/userStore"

interface ProductGridProps {
  selectedCategory: string
  sortBy: string
  onSortChange: (sort: string) => void
  viewMode: "grid" | "list"
  onViewModeChange: (mode: "grid" | "list") => void
}

// Products are now imported from @/lib/products

export default function ProductGrid({
  selectedCategory,
  sortBy,
  onSortChange,
  viewMode,
  onViewModeChange,
}: ProductGridProps) {

    const user = useUserStore((state) => state.user);


  const filteredAndSortedProducts = useMemo(() => {
    let products = allProducts

    // Filter by category
    if (selectedCategory !== "all") {
      products = products.filter((product) => product.category === selectedCategory)
    }

    // Sort products
    const sorted = [...products]
    switch (sortBy) {
      case "price-low-high":
        sorted.sort((a, b) => a.price - b.price)
        break
      case "price-high-low":
        sorted.sort((a, b) => b.price - a.price)
        break
      case "name-asc":
        sorted.sort((a, b) => a.name.localeCompare(b.name))
        break
      case "name-desc":
        sorted.sort((a, b) => b.name.localeCompare(a.name))
        break
      default:
        break
    }

    // Show all products
    return sorted
  }, [selectedCategory, sortBy])

  return (
    <main className="flex-1 p-6 lg:p-8">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
              {selectedCategory === "all"
                ? "All Products"
                : selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}
            </h1>
            <p className="text-gray-600 flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              Showing {filteredAndSortedProducts.length} product{filteredAndSortedProducts.length !== 1 ? "s" : ""}
              <span className="text-sm text-gray-500 ml-2">
                • Earn 2 credits per purchase
              </span>
            </p>
          </div>
          
          {/* Quick Stats */}
          <div className="flex items-center gap-4">
            <div className="bg-white rounded-lg px-4 py-2 shadow-sm border border-gray-200">
              <div className="text-xs text-gray-500">Avg. Price</div>
              <div className="text-lg font-semibold text-gray-900">
                ${Math.round(filteredAndSortedProducts.reduce((acc, p) => acc + p.price, 0) / filteredAndSortedProducts.length) || 0}
              </div>
            </div>
            <div className="bg-white rounded-lg px-4 py-2 shadow-sm border border-gray-200">
              <div className="text-xs text-gray-500">Credits Earned</div>
              <div className="text-lg font-semibold text-indigo-600">
                {user?.credits || 0}
              </div>
            </div>
          </div>
        </div>
      </div>

      <ProductTopbar
        sortBy={sortBy}
        onSortChange={onSortChange}
        viewMode={viewMode}
        onViewModeChange={onViewModeChange}
      />

      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-4 lg:gap-6">
          {filteredAndSortedProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          {filteredAndSortedProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <ProductListItem product={product} />
            </motion.div>
          ))}
        </div>
      )}

      {filteredAndSortedProducts.length === 0 && (
        <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
          <p className="text-gray-600 mb-6 max-w-md">
            We couldn&apos;t find any products matching your current filters. Try adjusting your search criteria.
          </p>
          <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors duration-200">
            Clear Filters
          </button>
        </div>
      )}
    </main>
  )
}
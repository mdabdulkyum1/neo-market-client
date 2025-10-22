"use client"

import { X } from "lucide-react"

interface ProductSidebarProps {
  selectedCategory: string
  onCategoryChange: (category: string) => void
  isOpen?: boolean
  onClose?: () => void
}

const categories = [
  { id: "all", label: "All Products" },
  { id: "saas", label: "SaaS" },
  { id: "book", label: "Books" },
  { id: "software", label: "Software" },
]

const brands = [
  { id: "brand1", label: "Brand Alpha" },
  { id: "brand2", label: "Brand Beta" },
  { id: "brand3", label: "Brand Gamma" },
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
        className={`fixed md:static top-0 left-0 h-full w-11/12 sm:w-80 md:w-64 max-w-[90vw] border-r border-gray-200 bg-white p-4 sm:p-6 overflow-y-auto z-50 md:z-auto transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Filter Products</h2>
          <button
            onClick={onClose}
            className="md:hidden p-2 hover:bg-gray-100 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-purple-600"
            aria-label="Close sidebar"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Categories Section */}
        <div className="mb-8">
          <h3 className="text-xs sm:text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">
            Categories
          </h3>
          <div className="space-y-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => {
                  onCategoryChange(category.id)
                  onClose?.()
                }}
                className={`w-full text-left px-3 py-2 rounded-md text-sm sm:text-base transition-all duration-200 hover:translate-x-1 focus:outline-none focus:ring-2 focus:ring-purple-600 ${
                  selectedCategory === category.id
                    ? "bg-purple-600 text-white font-medium"
                    : "text-gray-900 hover:bg-gray-100"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Brands Section */}
        <div className="mb-8">
          <h3 className="text-xs sm:text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">Brands</h3>
          <div className="space-y-2">
            {brands.map((brand) => (
              <label key={brand.id} className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  className="w-5 h-5 rounded border border-gray-300 bg-white cursor-pointer focus:ring-2 focus:ring-purple-600"
                />
                <span className="text-sm sm:text-base text-gray-900 group-hover:text-purple-600 transition-colors">
                  {brand.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Price Range Section */}
        <div>
          <h3 className="text-xs sm:text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">
            Price Range
          </h3>
          <div className="space-y-4">
            <div>
              <label className="text-xs text-gray-600 mb-2 block">Min Price</label>
              <input
                type="number"
                placeholder="$0"
                className="w-full px-3 py-2 rounded-md border border-gray-300 bg-white text-gray-900 text-sm focus:ring-2 focus:ring-purple-600"
              />
            </div>
            <div>
              <label className="text-xs text-gray-600 mb-2 block">Max Price</label>
              <input
                type="number"
                placeholder="$1000"
                className="w-full px-3 py-2 rounded-md border border-gray-300 bg-white text-gray-900 text-sm focus:ring-2 focus:ring-purple-600"
              />
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}
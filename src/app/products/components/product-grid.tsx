"use client"

import { useMemo } from "react"
import ProductCard from "./product-card"
import ProductTopbar from "./product-topbar"
import ProductListItem from "./product-list-item"

interface ProductGridProps {
  selectedCategory: string
  sortBy: string
  onSortChange: (sort: string) => void
  viewMode: "grid" | "list"
  onViewModeChange: (mode: "grid" | "list") => void
}

const allProducts = [
  {
    id: 1,
    name: "CloudSync Pro",
    category: "saas",
    brand: "Brand Alpha",
    price: 99,
    description: "Enterprise cloud synchronization platform",
    image: "/cloud-sync-software.jpg",
  },
  {
    id: 2,
    name: "DataVault Enterprise",
    category: "saas",
    brand: "Brand Beta",
    price: 199,
    description: "Secure data management solution",
    image: "/data-vault-software.jpg",
  },
  {
    id: 3,
    name: "Analytics Dashboard",
    category: "saas",
    brand: "Brand Gamma",
    price: 149,
    description: "Real-time analytics and reporting",
    image: "/analytics-dashboard.png",
  },
  {
    id: 4,
    name: "Web Development Mastery",
    category: "book",
    brand: "Brand Alpha",
    price: 49,
    description: "Complete guide to modern web development",
    image: "/web-development-book.jpg",
  },
  {
    id: 5,
    name: "Design Systems Guide",
    category: "book",
    brand: "Brand Beta",
    price: 39,
    description: "Building scalable design systems",
    image: "/design-systems-book.jpg",
  },
  {
    id: 6,
    name: "AI & Machine Learning",
    category: "book",
    brand: "Brand Gamma",
    price: 59,
    description: "Practical AI implementation guide",
    image: "/ai-machine-learning-book.jpg",
  },
  {
    id: 7,
    name: "CodeStudio IDE",
    category: "software",
    brand: "Brand Alpha",
    price: 79,
    description: "Professional development environment",
    image: "/code-studio-ide.jpg",
  },
  {
    id: 8,
    name: "DesignPro Suite",
    category: "software",
    brand: "Brand Beta",
    price: 129,
    description: "Complete design and prototyping toolkit",
    image: "/design-pro-suite.jpg",
  },
  {
    id: 9,
    name: "DevTools Pro",
    category: "software",
    brand: "Brand Gamma",
    price: 89,
    description: "Advanced development utilities",
    image: "/devtools-pro.jpg",
  },
  // ... (same product data as provided)
]

export default function ProductGrid({
  selectedCategory,
  sortBy,
  onSortChange,
  viewMode,
  onViewModeChange,
}: ProductGridProps) {
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

    return sorted
  }, [selectedCategory, sortBy])

  return (
    <main className="flex-1 p-4 sm:p-6 lg:p-8">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
          {selectedCategory === "all"
            ? "All Products"
            : selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}
        </h1>
        <p className="text-sm sm:text-base text-gray-600">
          Showing {filteredAndSortedProducts.length} product{filteredAndSortedProducts.length !== 1 ? "s" : ""}
        </p>
      </div>

      <ProductTopbar
        sortBy={sortBy}
        onSortChange={onSortChange}
        viewMode={viewMode}
        onViewModeChange={onViewModeChange}
      />

      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {filteredAndSortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="space-y-4 sm:space-y-6">
          {filteredAndSortedProducts.map((product) => (
            <ProductListItem key={product.id} product={product} />
          ))}
        </div>
      )}

      {filteredAndSortedProducts.length === 0 && (
        <div className="flex items-center justify-center min-h-[50vh] sm:min-h-[60vh]">
          <p className="text-base sm:text-lg text-gray-600 text-center">
            No products found in this category.
          </p>
        </div>
      )}
    </main>
  )
}
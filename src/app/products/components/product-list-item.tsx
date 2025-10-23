"use client"

import { ShoppingCart } from "lucide-react"
import Image from "next/image"
import { toast } from "react-hot-toast"

interface Product {
  id: number
  name: string
  category: string
  brand: string
  price: number
  description: string
  image: string
}

interface ProductListItemProps {
  product: Product
}

export default function ProductListItem({ product }: ProductListItemProps) {
  const handleAddToCart = () => {
    toast.success(`${product.name} added to cart!`)
  }

  return (
    <div className="flex flex-col sm:flex-row gap-4 p-4 rounded-lg border border-gray-200 bg-white hover:shadow-lg transition-shadow duration-300 animate-in fade-in slide-in-from-left-2 duration-300">
      {/* Product Image */}
      <div className="w-full sm:w-32 h-32 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden transition-transform duration-300 hover:scale-105">
        <Image width={100} height={100} src={product.image || "/placeholder.svg"} alt={product.name} className="w-full h-full object-cover" />
      </div>

      {/* Product Info */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">{product.brand}</p>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
          <p className="text-sm text-gray-600">{product.description}</p>
        </div>

        {/* Price and Button */}
        <div className="flex items-center justify-between mt-4">
          <div className="text-2xl font-bold text-purple-600">${product.price}</div>
          <button
            onClick={handleAddToCart}
            className="p-2 rounded-md bg-purple-600 text-white hover:bg-purple-700 transition-all duration-200 hover:scale-110 active:scale-95"
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}

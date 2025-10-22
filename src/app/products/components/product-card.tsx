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

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const handleAddToCart = () => {
    toast.success(`${product.name} added to cart!`)
  }

  return (
    <div className="group rounded-lg border border-gray-200 bg-white overflow-hidden hover:shadow-lg transition-shadow duration-300 animate-in fade-in slide-in-from-bottom-2 duration-300">
      {/* Product Image */}
      <div className="relative h-48 bg-gray-100 overflow-hidden">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          width={500}
          height={500}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>

      {/* Product Info */}
      <div className="p-4">
        <div className="mb-2">
          <p className="text-xs text-gray-500 uppercase tracking-wide">{product.brand}</p>
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">{product.name}</h3>
        </div>

        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{product.description}</p>

        {/* Price and Button */}
        <div className="flex items-center justify-between">
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

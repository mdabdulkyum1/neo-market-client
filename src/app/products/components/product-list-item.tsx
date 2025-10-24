"use client"

import { DollarSign, ShoppingCart } from "lucide-react"
import Image from "next/image"
import { toast } from "react-hot-toast"
import { Product } from "@/lib/products"
import { useCart } from "@/providers/CartProvider"

interface ProductListItemProps {
  product: Product
}

export default function ProductListItem({ product }: ProductListItemProps) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  const handleBuyNow = () => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
    window.location.href = "/checkout";
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 p-4 rounded-lg border border-gray-200 bg-white hover:shadow-lg transition-shadow animate-in fade-in slide-in-from-left-2 duration-300 h-full">
      {/* Product Image */}
      <div className="w-full sm:w-32 h-32 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden transition-transform duration-300 hover:scale-105">
        <Image
          width={100}
          height={100}
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Product Info */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">{product.brand}</p>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
          <p className="text-sm text-gray-600 flex-grow">{product.description}</p>
        </div>

        {/* Buttons and Price */}
        <div className="flex items-center justify-between mt-4 gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <button
              onClick={handleAddToCart}
              className="flex items-center gap-1 px-2 py-1 rounded-md bg-gray-100 text-gray-700 text-xs font-medium hover:bg-gray-200 transition-all duration-200 hover:scale-105 active:scale-95"
            >
              <ShoppingCart className="w-3 h-3" /> Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              className="flex items-center gap-1 px-2 py-1 rounded-md bg-indigo-600 text-white text-xs font-medium hover:bg-indigo-700 transition-all duration-200 hover:scale-105 active:scale-95"
            >
              <DollarSign className="w-3 h-3" /> Buy Now
            </button>
          </div>
          <div className="text-xl font-bold text-indigo-600">${product.price}</div>
        </div>
      </div>
    </div>
  )
}
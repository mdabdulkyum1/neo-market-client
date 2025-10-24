"use client"

import { DollarSign, Star, Zap, Shield, Clock, ShoppingCart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { toast } from "react-hot-toast"
import { Product } from "@/lib/products"
import { useCart } from "@/providers/CartProvider"

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  const handleBuyNow = () => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
    // Redirect to checkout
    window.location.href = "/checkout";
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'saas': return '☁️'
      case 'book': return '📚'
      case 'software': return '💻'
      default: return '🛍️'
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'saas': return 'bg-blue-100 text-blue-800'
      case 'book': return 'bg-green-100 text-green-800'
      case 'software': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="group rounded-2xl border border-gray-200 bg-white overflow-hidden hover:shadow-2xl transition-all duration-300 max-w-sm mx-auto flex flex-col h-full"
    >
      {/* Product Image */}
      <div className="relative h-48 sm:h-56 md:h-64 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
          priority
        />
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(product.category)}`}>
            {getCategoryIcon(product.category)} {product.category.toUpperCase()}
          </span>
        </div>

        {/* Price Badge */}
        <div className="absolute top-4 right-4">
          <div className="bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 shadow-lg">
            <span className="text-lg font-bold text-gray-900">${product.price}</span>
          </div>
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="flex gap-2">
            <button className="bg-white/90 backdrop-blur-sm text-gray-900 px-4 py-2 rounded-full text-sm font-medium hover:bg-white transition-colors">
              Quick View
            </button>
          </div>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="mb-3">
          <p className="text-xs text-gray-500 uppercase tracking-wide font-medium mb-1">{product.brand}</p>
          <h3 className="text-xl font-bold text-gray-900 line-clamp-2 mb-2">{product.name}</h3>
          <p className="text-sm text-gray-600 line-clamp-2 flex-grow">{product.description}</p>
        </div>

        {/* Features */}
        <div className="flex items-center gap-4 mb-4 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 text-yellow-500" />
            <span>Premium</span>
          </div>
          <div className="flex items-center gap-1">
            <Shield className="w-3 h-3 text-green-500" />
            <span>Secure</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3 text-blue-500" />
            <span>Instant</span>
          </div>
        </div>

        {/* Price and Credits Info */}
        <div className="mb-4 p-3 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-gray-900">${product.price}</div>
              <div className="text-xs text-gray-600">One-time payment</div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1 text-sm font-medium text-indigo-600">
                <Zap className="w-4 h-4" />
                <span>+2 Credits</span>
              </div>
              <div className="text-xs text-gray-600">Earn rewards</div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-auto space-y-2">
          <div className="flex gap-2">
            <button
              onClick={handleAddToCart}
              className="flex-1 flex items-center justify-center gap-1 px-3 py-2 rounded-lg bg-gray-100 text-gray-700 text-sm font-medium hover:bg-gray-200 transition-all duration-200 hover:scale-105 active:scale-95"
            >
              <ShoppingCart className="w-3 h-3" />
              Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              className="flex-1 flex items-center justify-center gap-1 px-3 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-medium hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
            >
              <DollarSign className="w-3 h-3" />
              Buy Now
            </button>
          </div>
          
          <div className="text-center">
            <Link 
              href={`/products/${product.id}`}
              className="text-sm text-indigo-600 hover:text-indigo-700 font-medium hover:underline"
            >
              View Details →
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
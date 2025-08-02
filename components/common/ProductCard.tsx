"use client"

import Link from "next/link"
import Image from "next/image"
import { MessageCircle } from "lucide-react"

interface Product {
  id: string
  name: string
  price: number
  image: string
  description: string
  category: string
  slug: string
}

interface ProductCardProps {
  product: Product
  index: number
}

export default function ProductCard({ product, index }: ProductCardProps) {
  const whatsappMessage = `Hi Crakers, I'm interested in ${product.name} (₹${product.price}). Please provide more details.`

  return (
    <div
      className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden group animate-[fadeInUp_0.6s_ease-out] border border-gray-100"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="relative overflow-hidden">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          width={300}
          height={300}
          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
          ₹{product.price}
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-red-600 transition-colors">
          {product.name}
        </h3>
        <p className="text-gray-600 mb-4 text-sm leading-relaxed">{product.description}</p>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href={`/products/${product.slug}`}
            onClick={() => window.scrollTo(0, 0)}
            className="flex-1 bg-red-600 text-white text-center py-3 px-4 rounded-lg hover:bg-red-700 transition-colors font-semibold"
          >
            View Details
          </Link>
          <a
            href={`https://wa.me/919876543210?text=${encodeURIComponent(whatsappMessage)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center space-x-2 bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors font-semibold"
          >
            <MessageCircle className="w-4 h-4" />
            <span className="hidden sm:inline">Enquire</span>
          </a>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  )
}

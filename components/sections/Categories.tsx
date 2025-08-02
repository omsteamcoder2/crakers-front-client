"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"

interface Category {
  _id: string
  name: string
  description?: string
  image: string
  isActive: boolean
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || ""

function shuffleArray<T>(array: T[]): T[] {
  return array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
}

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/category`)
        const data = await res.json()
        const activeCategories = data.categories.filter((cat: Category) => cat.isActive)

        const shuffled: Category[] = shuffleArray<Category>(activeCategories).slice(0, 8)
        setCategories(shuffled)
      } catch (error) {
        console.error("Failed to fetch categories:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  return (
    <section className="py-6 sm:py-15 md:py-18 bg-white">
      <div className="container mx-auto px-1 sm:px-6">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-2 sm:mb-3 md:mb-4">
            Our Product Categories
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our wide range of premium fireworks and crackers for every celebration
          </p>
        </div>

        {loading ? (
          <div className="text-center text-gray-500 py-12 sm:py-16">Loading categories...</div>
        ) : categories.length === 0 ? (
          <div className="text-center text-gray-400 py-8 sm:py-12">
            No categories found.
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-1 sm:gap-6 md:gap-8">
            {categories.map((category, index) => (
              <Link
                key={category._id}
                href={`/quick-purchase?category=${encodeURIComponent(category.name.toLowerCase())}`}
                onClick={() => window.scrollTo(0, 0)}
                className="group bg-white rounded-xl sm:rounded-2xl shadow-md hover:shadow-lg sm:hover:shadow-xl transition-all duration-300 hover:-translate-y-1 sm:hover:-translate-y-2 overflow-hidden border border-gray-100"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative overflow-hidden">
                  <Image
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    width={400}
                    height={300}
                    className="w-full h-24 sm:h-28 md:h-36 lg:h-48 object-cover group-hover:scale-105 sm:group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                <div className="p-2 sm:p-4 md:p-6">
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-800 mb-1 sm:mb-2 group-hover:text-red-600 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3 md:mb-4 line-clamp-2 md:line-clamp-1">
                    {category.description || "Explore our collection."}
                  </p>
                  <div className="flex items-center text-red-600 font-medium sm:font-semibold text-xs sm:text-sm group-hover:text-red-700">
                    <span>Explore Collection</span>
                    <svg
                      className="w-3 h-3 sm:w-4 sm:h-4 ml-1 sm:ml-2 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
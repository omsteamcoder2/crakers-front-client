"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Filter, ChevronDown } from "lucide-react"
import { X } from "lucide-react"

interface Gallery {
  _id: string
  category: string
  images: string[]
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || ""

export default function GalleryGrid() {
  const [galleries, setGalleries] = useState<Gallery[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [showDropdown, setShowDropdown] = useState(false)
  const [randomizedImages, setRandomizedImages] = useState<any[]>([])

  const fetchGalleries = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/galleries`)
      const data = await res.json()
      setGalleries(data.galleries || [])
    } catch (error) {
      console.error("Failed to fetch gallery:", error)
    }
  }

  useEffect(() => {
    fetchGalleries()
  }, [])

  const categories = [
    { id: "all", name: "All Images" },
    ...Array.from(
      new Set(galleries.map((g) => g.category))
    ).map((category) => ({ id: category, name: category }))
  ]

  useEffect(() => {
    // Shuffle images whenever filteredImages changes
    const filtered = 
      selectedCategory === "all"
        ? galleries.flatMap((g) => 
            g.images.map((img) => ({ 
              src: img, 
              alt: g.category, 
              id: g._id, 
              category: g.category 
            }))
          )
        : galleries
            .filter((g) => g.category === selectedCategory)
            .flatMap((g) => 
              g.images.map((img) => ({ 
                src: img, 
                alt: g.category, 
                id: g._id, 
                category: g.category 
              }))
            )

    // Fisher-Yates shuffle algorithm
    const shuffled = [...filtered]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    setRandomizedImages(shuffled)
  }, [galleries, selectedCategory])

  return (
    <section className="py-4 sm:py-12 md:py-12 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Category Filter - Desktop */}
        <div className="hidden md:block mb-8 sm:mb-10 md:mb-12">
          <div className="flex flex-wrap gap-3 sm:gap-4 justify-center">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 rounded-full font-medium sm:font-semibold text-sm sm:text-base transition-colors ${
                  selectedCategory === category.id
                    ? "bg-red-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Category Filter - Mobile Dropdown */}
        <div className="md:hidden relative mb-6">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center justify-between w-full max-w-xs mx-auto bg-white border border-gray-300 rounded-full px-4 py-3 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
          >
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              <span>{categories.find(c => c.id === selectedCategory)?.name || 'Filter'}</span>
            </div>
            <ChevronDown className={`w-4 h-4 transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
          </button>

          {showDropdown && (
            <div className="absolute z-10 mt-1 w-full max-w-xs mx-auto bg-white rounded-xl shadow-lg border border-gray-200">
              <div className="py-1">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => {
                      setSelectedCategory(category.id)
                      setShowDropdown(false)
                    }}
                    className={`block w-full text-left px-4 py-2.5 text-sm ${
                      selectedCategory === category.id
                        ? 'bg-red-50 text-red-600'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Masonry Grid */}
        <div className="columns-2 sm:columns-2 lg:columns-3 xl:columns-4 gap-2 sm:gap-3 md:gap-4 lg:gap-6 space-y-2 sm:space-y-3 md:space-y-4 lg:space-y-6">
          {randomizedImages.map((image, index) => (
            <div
              key={`${image.id}-${index}`}
              className="break-inside-avoid group cursor-pointer animate-[fadeInUp_0.6s_ease-out]"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => setSelectedImage(image.src)}
            >
              <div className="relative overflow-hidden rounded-xl sm:rounded-2xl shadow-md sm:shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <Image
                  src={`${API_BASE_URL}${image.src}`}
                  alt={image.alt}
                  width={400}
                  height={300}
                  className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-xs sm:text-sm font-medium sm:font-semibold">{image.alt}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Image Modal */}
        {selectedImage && (
  <div
    className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
    onClick={() => setSelectedImage(null)}
  >
    <div
      className="relative w-full max-w-6xl max-h-[90vh] overflow-auto flex items-center justify-center"
      onClick={(e) => e.stopPropagation()} // prevent modal close when clicking on image
    >
      <img
        src={`${API_BASE_URL}${selectedImage}`}
        alt="Selected Image"
        className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-xl"
      />
      <button
        onClick={() => setSelectedImage(null)}
        className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-red-500 hover:bg-red-400 text-white p-1 sm:p-2 rounded-full transition-colors"
      >
        <X className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>
    </div>
  </div>
)}

      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </section>
  )
}
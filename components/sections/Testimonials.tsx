"use client"

import { useState, useEffect } from "react"
import { Star, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"

const testimonials = [
  {
    name: "Rajesh Kumar",
    location: "Chennai",
    rating: 5,
    comment:
      "Excellent quality fireworks! Made our Diwali celebration truly special. Fast delivery and great customer service.",
    avatar: "/placeholder.svg?height=60&width=60",
  },
  {
    name: "Priya Sharma",
    location: "Coimbatore",
    rating: 5,
    comment: "Amazing gift boxes! Perfect for family celebrations. The kids loved the sparklers and flower pots.",
    avatar: "/placeholder.svg?height=60&width=60",
  },
  {
    name: "Murugan Selvam",
    location: "Madurai",
    rating: 5,
    comment: "Best prices in the market with authentic products. WhatsApp ordering made it so convenient!",
    avatar: "/placeholder.svg?height=60&width=60",
  },
  {
    name: "Lakshmi Devi",
    location: "Salem",
    rating: 5,
    comment: "Safe and high-quality crackers. Perfect for our wedding celebration. Highly recommended!",
    avatar: "/placeholder.svg?height=60&width=60",
  },
]

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="py-6 sm:py-15 md:py-16 bg-gradient-to-r from-red-50 to-orange-50">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-2 sm:mb-3 md:mb-4">
            What Our Customers Say
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600">
            Trusted by thousands of happy customers across Tamil Nadu
          </p>
        </div>

        <div className="max-w-4xl mx-auto relative">
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl p-6 sm:p-8 md:p-10 lg:p-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 sm:h-2 bg-gradient-to-r from-red-500 to-orange-500"></div>

            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 md:gap-8">
              <div className="flex-shrink-0">
                <Image
                  src={testimonials[currentIndex].avatar || "/placeholder.svg"}
                  alt={testimonials[currentIndex].name}
                  width={60}
                  height={60}
                  className="rounded-full border-2 sm:border-3 md:border-4 border-orange-200"
                />
              </div>

              <div className="flex-1 text-center sm:text-left">
                <div className="flex justify-center sm:justify-start mb-2 sm:mb-3 md:mb-4">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-current" />
                  ))}
                </div>

                <p className="text-sm sm:text-base md:text-lg text-gray-700 mb-4 sm:mb-5 md:mb-6 italic leading-relaxed">
                  "{testimonials[currentIndex].comment}"
                </p>

                <div>
                  <h4 className="text-base sm:text-lg md:text-xl font-bold text-gray-800">{testimonials[currentIndex].name}</h4>
                  <p className="text-sm sm:text-base text-gray-600">{testimonials[currentIndex].location}</p>
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={prevTestimonial}
              className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-white shadow-md sm:shadow-lg rounded-full p-1 sm:p-2 hover:bg-gray-50 transition-colors"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-gray-600" />
            </button>

            <button
              onClick={nextTestimonial}
              className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-white shadow-md sm:shadow-lg rounded-full p-1 sm:p-2 hover:bg-gray-50 transition-colors"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-gray-600" />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-4 sm:mt-6 md:mt-8 space-x-1 sm:space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-colors ${
                  index === currentIndex ? "bg-red-500" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
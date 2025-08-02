"use client"

import Link from "next/link"
import { Gift, Percent, Clock } from "lucide-react"

export default function Offers() {
  return (
    <section className="py-6 sm:py-15 md:py-16 bg-gradient-to-r from-red-50 to-orange-50">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-2 sm:mb-3 md:mb-4">
            Special Offers
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600">
            Don't miss out on these amazing deals!
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {/* Diwali Special */}
          <div className="bg-gradient-to-br from-red-500 to-orange-500 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 text-white relative overflow-hidden group hover:scale-[1.02] sm:hover:scale-105 transition-transform duration-300">
            <div className="absolute top-0 right-0 w-20 sm:w-24 md:w-32 h-20 sm:h-24 md:h-32 bg-white/10 rounded-full -translate-y-10 sm:-translate-y-12 md:-translate-y-16 translate-x-10 sm:translate-x-12 md:translate-x-16"></div>
            <div className="relative z-10">
              <Percent className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 mb-2 sm:mb-3 md:mb-4 text-yellow-300" />
              <h3 className="text-xl sm:text-xl md:text-2xl font-bold mb-1 sm:mb-2">Our Special</h3>
              <p className="text-2xl sm:text-2xl md:text-3xl font-bold text-yellow-300 mb-1 sm:mb-2">50% OFF</p>
              <p className="text-sm sm:text-base md:text-base mb-4 sm:mb-5 md:mb-6 text-white/90">
                On all fireworks and crackers
              </p>
              <Link
  href="/quick-purchase?offers=true"
  onClick={() => window.scrollTo(0, 0)}
  className="inline-block bg-white text-red-600 px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 rounded-full font-semibold text-sm sm:text-base hover:bg-yellow-100 transition-colors"
>
  Shop Now
</Link>
            </div>
          </div>

          {/* Gift Boxes */}
          <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 text-white relative overflow-hidden group hover:scale-[1.02] sm:hover:scale-105 transition-transform duration-300">
            <div className="absolute top-0 right-0 w-20 sm:w-24 md:w-32 h-20 sm:h-24 md:h-32 bg-white/10 rounded-full -translate-y-10 sm:-translate-y-12 md:-translate-y-16 translate-x-10 sm:translate-x-12 md:translate-x-16"></div>
            <div className="relative z-10">
              <Gift className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 mb-2 sm:mb-3 md:mb-4 text-yellow-300" />
              <h3 className="text-xl sm:text-xl md:text-2xl font-bold mb-1 sm:mb-2">Gift Boxes</h3>
              <p className="text-sm sm:text-base md:text-lg mb-1 sm:mb-2">Starting from</p>
              <p className="text-2xl sm:text-2xl md:text-3xl font-bold text-yellow-300 mb-3 sm:mb-4">₹999</p>
              <Link
  href="/quick-purchase?category=gift box"
  onClick={() => window.scrollTo(0, 0)}
  className="inline-block bg-white text-purple-600 px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 rounded-full font-semibold text-sm sm:text-base hover:bg-yellow-100 transition-colors"
>
  View Boxes
</Link>
            </div>
          </div>

          {/* Limited Time */}
          <div className="bg-gradient-to-br from-green-500 to-teal-500 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 text-white relative overflow-hidden group hover:scale-[1.02] sm:hover:scale-105 transition-transform duration-300">
            <div className="absolute top-0 right-0 w-20 sm:w-24 md:w-32 h-20 sm:h-24 md:h-32 bg-white/10 rounded-full -translate-y-10 sm:-translate-y-12 md:-translate-y-16 translate-x-10 sm:translate-x-12 md:translate-x-16"></div>
            <div className="relative z-10">
              <Clock className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 mb-2 sm:mb-3 md:mb-4 text-yellow-300" />
              <h3 className="text-xl sm:text-xl md:text-2xl font-bold mb-1 sm:mb-2">Limited Time</h3>
              <p className="text-sm sm:text-base md:text-lg mb-1 sm:mb-2">Free Delivery</p>
              <p className="text-sm sm:text-base md:text-lg text-yellow-300 mb-3 sm:mb-4">
                Orders above ₹2000
              </p>
              <a
                href="/quick-purchase"
                className="inline-block bg-white text-green-600 px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 rounded-full font-semibold text-sm sm:text-base hover:bg-yellow-100 transition-colors"
              >
                Book Order
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
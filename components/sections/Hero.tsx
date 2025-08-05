"use client"

import Link from "next/link"
import { Sparkles, Star } from "lucide-react"
import { useEffect, useState } from "react"

interface Sparkle {
  left: string
  top: string
  delay: string
}

export default function Hero() {
  const [sparkles, setSparkles] = useState<Sparkle[]>([])

  useEffect(() => {
    const generated = Array.from({ length: 20 }).map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 3}s`,
    }))
    setSparkles(generated)
  }, [])

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-red-600 via-orange-500 to-yellow-400 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* SVG Blob Background */}
        <svg
          className="absolute top-0 left-0 w-full h-full opacity-20"
          viewBox="0 0 1000 1000"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#FFF" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          <path
            d="M200,300 Q400,100 600,300 T1000,300 L1000,1000 L0,1000 Z"
            fill="url(#gradient)"
            className="animate-[wave_6s_ease-in-out_infinite]"
          />
        </svg>

        {/* Floating Sparkles (hydration-safe) */}
        {sparkles.map((sparkle, i) => (
          <div
            key={i}
            className="absolute animate-[float_3s_ease-in-out_infinite] opacity-60"
            style={{
              left: sparkle.left,
              top: sparkle.top,
              animationDelay: sparkle.delay,
            }}
          >
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
          </div>
        ))}
      </div>

      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-4 py-16 sm:py-20 flex items-center min-h-screen">
        <div className="max-w-4xl mx-auto text-center text-white px-2 sm:px-4">
          {/* Festive Banner */}
          <div className="mb-6 sm:mb-8 animate-[bounce_2s_infinite]">
            <div className="inline-flex items-center space-x-1 sm:space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 sm:px-6 sm:py-3 border border-white/30">
              <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-300" />
              <span className="text-sm sm:text-lg font-semibold">Special Sale - 50% Off!</span>
              <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-300" />
            </div>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight">
            <span className="block animate-[slideInLeft_1s_ease-out]">Light Up Your</span>
            <span className="block text-yellow-300 animate-[slideInRight_1s_ease-out_0.3s_both]">Celebrations</span>
          </h1>

          {/* Subheading */}
          <p className="text-base sm:text-xl md:text-2xl mb-6 sm:mb-8 text-white/90 max-w-2xl mx-auto animate-[fadeInUp_1s_ease-out_0.6s_both]">
            Premium quality fireworks and crackers for Diwali, weddings, and all your special moments
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center animate-[fadeInUp_1s_ease-out_0.9s_both]">
            <Link
              href="/quick-purchase"
              onClick={() => window.scrollTo(0, 0)}
              className="bg-white text-red-600 px-6 py-3 sm:px-8 sm:py-4 rounded-full text-base sm:text-lg font-semibold hover:bg-yellow-100 transition-all duration-300 hover:scale-105 shadow-lg"
            >
              Shop Crackers Now
            </Link>
            <a
              href="/quick-purchase?category=gift box"
              className="bg-transparent border-2 border-white text-white px-6 py-3 sm:px-8 sm:py-4 rounded-full text-base sm:text-lg font-semibold hover:bg-white hover:text-red-600 transition-all duration-300 hover:scale-105"
            >
              Explore Gift Packs
            </a>
          </div>

          {/* Trust Indicators */}
          <div className="mt-8 sm:mt-12 flex flex-wrap justify-center items-center gap-4 sm:gap-6 md:gap-8 text-sm sm:text-base text-white/80 animate-[fadeInUp_1s_ease-out_1.2s_both]">
            <div className="flex items-center space-x-1 sm:space-x-2">
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-400 rounded-full"></div>
              <span>Safe & Authentic</span>
            </div>
            <div className="flex items-center space-x-1 sm:space-x-2">
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-400 rounded-full"></div>
              <span>Fast Delivery</span>
            </div>
            <div className="flex items-center space-x-1 sm:space-x-2">
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-400 rounded-full"></div>
              <span>Best Prices</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes wave {
          0%, 100% { transform: translateX(0) translateY(0); }
          50% { transform: translateX(-20px) translateY(-10px); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }

        @keyframes slideInLeft {
          from { transform: translateX(-100px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }

        @keyframes slideInRight {
          from { transform: translateX(100px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }

        @keyframes fadeInUp {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </section>
  )
}
"use client"

import { useState, useEffect, useRef } from "react"
import { usePathname } from "next/navigation"

const SPARKLE_COLORS = ["#FF9900", "#FFDD00", "#FF3300", "#FF7700", "#FFCC00"]
const STAR_COLORS = ["#FFFFFF", "#FFD700", "#87CEEB", "#FFA07A"]

export default function PageLoader() {
  const [isLoading, setIsLoading] = useState(false)
  const [showLoader, setShowLoader] = useState(false)
  const minimumLoadTimeRef = useRef<NodeJS.Timeout | null>(null)
  const pathname = usePathname()
  const previousPathname = useRef(pathname)

  useEffect(() => {
    if (pathname !== previousPathname.current) {
      setIsLoading(true)
      setShowLoader(true)

      minimumLoadTimeRef.current = setTimeout(() => {
        setIsLoading(false)
      }, 1000)

      previousPathname.current = pathname
    }
  }, [pathname])

  useEffect(() => {
    if (!isLoading && showLoader) {
      const fadeOutTimeout = setTimeout(() => {
        setShowLoader(false)
      }, 500)
      return () => clearTimeout(fadeOutTimeout)
    }
  }, [isLoading, showLoader])

  const generateSparkles = () => {
    const sparkles = []
    const count = window.innerWidth < 768 ? 30 : 50
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * 360
      const distance = Math.random() * (window.innerWidth < 768 ? 80 : 100) + 50
      const delay = Math.random() * 1.5
      const size = Math.random() * (window.innerWidth < 768 ? 3 : 4) + 1
      const color = SPARKLE_COLORS[Math.floor(Math.random() * SPARKLE_COLORS.length)]
      const duration = 1 + Math.random() * 1

      sparkles.push(
        <div
          key={i}
          className="absolute w-2 h-2 rounded-full"
          style={{
            backgroundColor: color,
            transform: `translate(-50%, -50%) rotate(${angle}deg) translateX(${distance}px)`,
            animation: `sparkle-burst ${duration}s ease-out ${delay}s forwards`,
            width: `${size}px`,
            height: `${size}px`,
            boxShadow: `0 0 ${size * 2}px ${size}px ${color}`
          }}
        />
      )
    }
    return sparkles
  }

  const generateStars = () => {
    const stars = []
    const count = window.innerWidth < 768 ? 60 : 100
    for (let i = 0; i < count; i++) {
      const left = `${Math.random() * 100}%`
      const top = `${Math.random() * 100}%`
      const size = Math.random() * (window.innerWidth < 768 ? 2 : 3)
      const opacity = Math.random() * 0.8 + 0.2
      const color = STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)]
      const twinkleDuration = 3 + Math.random() * 5
      const twinkleDelay = Math.random() * 5

      stars.push(
        <div
          key={i}
          className="absolute rounded-full animate-twinkle"
          style={{
            left,
            top,
            width: `${size}px`,
            height: `${size}px`,
            backgroundColor: color,
            opacity,
            animationDuration: `${twinkleDuration}s`,
            animationDelay: `${twinkleDelay}s`
          }}
        />
      )
    }
    return stars
  }

  if (!showLoader) return null

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center transition-opacity duration-500 ${
        isLoading ? "opacity-100" : "opacity-0"
      }`}
      style={{
        background: "radial-gradient(ellipse at center, #0c1445 0%, #020617 70%)"
      }}
    >
      {/* Background stars */}
      <div className="absolute inset-0 overflow-hidden">{generateStars()}</div>
      
      {/* Glowing cosmic dust */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,200,100,0.1)_0%,rgba(255,200,100,0)_70%)]"></div>
      
      <div className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-48 md:h-48 lg:w-64 lg:h-64 flex items-center justify-center">
        {/* Outer glow ring */}
        <div className="absolute w-full h-full rounded-full bg-gradient-to-r from-amber-500/30 to-orange-600/20 animate-pulse"></div>
        
        {/* Middle glow ring */}
        <div 
          className="absolute w-[90%] h-[90%] rounded-full bg-gradient-to-r from-amber-400/40 to-orange-500/30 animate-ping"
          style={{ animationDuration: "3s" }}
        ></div>
        
        {/* Inner glow ring */}
        <div 
          className="absolute w-[80%] h-[80%] rounded-full bg-gradient-to-r from-amber-300/50 to-orange-400/40"
        ></div>

        {/* Thara Chakram */}
        <div className="relative w-16 h-16 sm:w-24 sm:h-24 md:w-36 md:h-36 lg:w-48 lg:h-48">
          {/* Chakram outer ring */}
          <div className="absolute inset-0 rounded-full border-4 sm:border-6 md:border-8 border-amber-500 shadow-[0_0_15px_5px_rgba(255,165,0,0.5)] sm:shadow-[0_0_25px_8px_rgba(255,165,0,0.6)] md:shadow-[0_0_30px_10px_rgba(255,165,0,0.7)]"></div>
          
          {/* Chakram inner design */}
          <div className="absolute inset-1 sm:inset-2 md:inset-3 lg:inset-4 rounded-full border-2 sm:border-3 md:border-4 border-amber-400/80"></div>
          
          {/* Chakram spokes */}
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute top-1/2 left-1/2 w-0.5 sm:w-1 h-full bg-gradient-to-b from-transparent via-amber-400 to-transparent origin-center"
              style={{
                transform: `translate(-50%, -50%) rotate(${i * 45}deg)`,
                background: "linear-gradient(to bottom, transparent, rgba(255, 200, 100, 0.8), transparent)"
              }}
            ></div>
          ))}
          
          {/* Chakram center */}
          <div className="absolute top-1/2 left-1/2 w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-12 lg:h-12 bg-gradient-to-br from-amber-300 to-orange-500 rounded-full transform -translate-x-1/2 -translate-y-1/2 shadow-[0_0_10px_3px_rgba(255,200,100,0.6)] sm:shadow-[0_0_15px_4px_rgba(255,200,100,0.7)] md:shadow-[0_0_20px_5px_rgba(255,200,100,0.8)]"></div>
          
          {/* Rotating particles */}
          {[...Array(12)].map((_, i) => {
            const angle = (i * 30) + (Date.now() / 100) % 360
            const distance = window.innerWidth < 768 ? 50 : 70
            return (
              <div
                key={i}
                className="absolute top-1/2 left-1/2 w-2 h-2 sm:w-3 sm:h-3 bg-amber-400 rounded-full shadow-[0_0_5px_1px_rgba(255,200,100,0.6)] sm:shadow-[0_0_8px_1.5px_rgba(255,200,100,0.7)] md:shadow-[0_0_10px_2px_rgba(255,200,100,0.8)]"
                style={{
                  transform: `translate(-50%, -50%) rotate(${angle}deg) translate(${distance}px) rotate(-${angle}deg)`,
                  animation: `particle-rotate ${10 - i}s linear infinite`,
                  animationDelay: `${i * 0.2}s`
                }}
              ></div>
            )
          })}
        </div>

        {/* Sparkles */}
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
          {generateSparkles()}
        </div>
      </div>

      {/* Loading Text */}
      <div className="absolute bottom-[20%] sm:bottom-[25%] text-white text-sm sm:text-base md:text-lg lg:text-xl font-bold animate-pulse">
        <span className="text-amber-300">Loading</span> 
        <span className="text-orange-400"> Crakers</span>
        <span className="text-yellow-300">...</span>
      </div>

      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes sparkle-burst {
          0% {
            opacity: 0;
            transform: translate(-50%, -50%) rotate(0deg) translateX(0) scale(0);
          }
          20% {
            opacity: 1;
            transform: translate(-50%, -50%) rotate(0deg) translateX(${Math.random() * 50 + 50}px) scale(1);
          }
          80% {
            opacity: 0.5;
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -50%) rotate(${Math.random() * 360}deg) translateX(${Math.random() * 100 + 100}px) scale(1.5);
          }
        }
        
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 1; }
        }
        
        @keyframes particle-rotate {
          from { transform: translate(-50%, -50%) rotate(0deg) translate(${window.innerWidth < 768 ? 50 : 70}px) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg) translate(${window.innerWidth < 768 ? 50 : 70}px) rotate(-360deg); }
        }
        
        .animate-twinkle {
          animation: twinkle infinite ease-in-out;
        }
      `}</style>
    </div>
  )
}
"use client"

import { useState, useEffect } from "react"
import { Phone, ArrowUp } from "lucide-react"
import { WhatsappLogo } from 'phosphor-react'

export default function FloatingButtons() {
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50 flex flex-col gap-2 sm:gap-3">
      {/* WhatsApp Button */}
      <a
        href="https://wa.me/919876543210?text=Hi%20Crakers,%20I%20want%20to%20buy%20fireworks"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-500 hover:bg-green-600 text-white p-2 sm:p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 animate-pulse"
        aria-label="Chat on WhatsApp"
      >
        <WhatsappLogo className="w-5 h-5 sm:w-6 sm:h-6" />
      </a>

      {/* Phone Button */}
      <a
        href="tel:+919876543210"
        className="bg-blue-500 hover:bg-blue-600 text-white p-2 sm:p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
        aria-label="Call us"
      >
        <Phone className="w-5 h-5 sm:w-6 sm:h-6" />
      </a>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="bg-red-500 hover:bg-red-600 text-white p-2 sm:p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      )}
    </div>
  )
}
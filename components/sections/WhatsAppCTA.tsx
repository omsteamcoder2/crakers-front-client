"use client"

import { MessageCircle, Sparkles } from "lucide-react"
import { useState, useEffect } from "react"
import { WhatsappLogo } from 'phosphor-react'

export default function WhatsAppCTA() {
  const [sparkles, setSparkles] = useState<any[]>([]);
const phoneNumber = process.env.NEXT_PUBLIC_PHONE_NUMBER;
  const whatsappLink = process.env.NEXT_PUBLIC_WHATSAPP_LINK;

  useEffect(() => {
    const randomSparkles = [...Array(15)].map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 2}s`,
    }));
    setSparkles(randomSparkles);
  }, []);

  return (
    <section className="py-6 sm:py-15 md:py-16 bg-gradient-to-r from-green-600 to-green-500 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        {sparkles.map((_, i) => (
          <div
            key={i}
            className="absolute animate-pulse"
            style={{
              left: sparkles[i].left,
              top: sparkles[i].top,
              animationDelay: sparkles[i].animationDelay,
            }}
          >
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
          </div>
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center text-white">
          <div className="mb-6 sm:mb-8">
            <WhatsappLogo className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 mx-auto mb-4 sm:mb-6 text-white animate-bounce" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-3 md:mb-4">
              Ready to Celebrate?
            </h2>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-green-100 mb-6 sm:mb-8">
              Get instant quotes and place orders directly through WhatsApp
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <a
              href={`https://wa.me/${whatsappLink}?text=Hi%20Crakers,%20I%20want%20to%20place%20an%20order%20for%20fireworks`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-green-600 px-5 py-3 sm:px-6 sm:py-3 md:px-8 md:py-4 rounded-full text-sm sm:text-base md:text-lg font-semibold hover:bg-green-50 transition-all duration-300 hover:scale-[1.02] sm:hover:scale-105 shadow-md sm:shadow-lg inline-flex items-center justify-center space-x-2 sm:space-x-3"
            >
              <WhatsappLogo className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
              <span>Contact on WhatsApp</span>
            </a>

            <a
              href={`tel:${phoneNumber}`}
              className="bg-transparent border-2 border-white text-white px-5 py-3 sm:px-6 sm:py-3 md:px-8 md:py-4 rounded-full text-sm sm:text-base md:text-lg font-semibold hover:bg-white hover:text-green-600 transition-all duration-300 hover:scale-[1.02] sm:hover:scale-105"
            >
              Call Now: {phoneNumber}
            </a>
          </div>

          <div className="mt-8 sm:mt-10 md:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 md:gap-8 text-center">
            <div>
              <div className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2">10,000+</div>
              <div className="text-xs sm:text-sm md:text-base text-green-100">Happy Customers</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2">500+</div>
              <div className="text-xs sm:text-sm md:text-base text-green-100">Product Varieties</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2">24/7</div>
              <div className="text-xs sm:text-sm md:text-base text-green-100">WhatsApp Support</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

"use client"

import Link from "next/link"
import { Home, Search, MessageCircle } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-600 via-orange-500 to-yellow-400 flex items-center justify-center px-4">
      <div className="text-center text-white max-w-2xl mx-auto">
        {/* 404 Animation */}
        <div className="mb-8">
          <div className="text-9xl font-bold mb-4 animate-bounce">404</div>
          <div className="flex justify-center space-x-4 mb-6">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-4 h-4 bg-white rounded-full animate-pulse"
                style={{ animationDelay: `${i * 0.2}s` }}
              ></div>
            ))}
          </div>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold mb-6">Oops! Page Not Found</h1>

        <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
          The page you're looking for seems to have disappeared like a firework in the night sky!
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link
            href="/"
            onClick={() => window.scrollTo(0, 0)}
            className="inline-flex items-center space-x-3 bg-white text-red-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-yellow-100 transition-all duration-300 hover:scale-105 shadow-lg"
          >
            <Home className="w-5 h-5" />
            <span>Go Home</span>
          </Link>

          <Link
            href="/quick-purchase"
            onClick={() => window.scrollTo(0, 0)}
            className="inline-flex items-center space-x-3 bg-transparent border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-red-600 transition-all duration-300 hover:scale-105"
          >
            <Search className="w-5 h-5" />
            <span>Browse Products</span>
          </Link>
        </div>

        {/* Help Section */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
          <h2 className="text-2xl font-bold mb-4">Need Help?</h2>
          <p className="text-white/90 mb-6">
            Can't find what you're looking for? Our team is here to help you celebrate!
          </p>
          <a
            href="https://wa.me/919876543210?text=Hi%20Crakers,%20I%20need%20help%20finding%20a%20page%20on%20your%20website"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-3 bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition-colors font-semibold"
          >
            <MessageCircle className="w-5 h-5" />
            <span>Contact Support</span>
          </a>
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-float opacity-20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
              }}
            >
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
      `}</style>
    </div>
  )
}

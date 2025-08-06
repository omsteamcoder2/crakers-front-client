"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, Phone, ShoppingCart } from "lucide-react"
import Logo from "./Logo"
import { ROUTES } from "@/constants/routes"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
const phoneNumber = process.env.NEXT_PUBLIC_PHONE_NUMBER

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  const handleLinkClick = () => {
    setIsMenuOpen(false)
    window.scrollTo(0, 0)
  }

  return (
    <header className="bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Logo />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {ROUTES.map((route) => (
              <Link
                key={route.path}
                href={route.path}
                onClick={handleLinkClick}
                className="text-white hover:text-yellow-200 transition-colors duration-300 font-medium"
              >
                {route.name}
              </Link>
            ))}
          </nav>

          {/* Header Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              href={`tel:${phoneNumber}`}
              className="flex items-center space-x-2 text-white hover:text-yellow-200 transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span className="text-sm">{phoneNumber}</span>
            </a>
            <Link
              href="/cart"
              onClick={handleLinkClick}
              className="bg-white text-red-600 px-4 py-2 rounded-full hover:bg-yellow-100 transition-colors duration-300 flex items-center space-x-2"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Cart</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={toggleMenu} className="md:hidden text-white hover:text-yellow-200 transition-colors">
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-white/20">
            <div className="flex flex-col space-y-4">
              {ROUTES.map((route) => (
                <Link
                  key={route.path}
                  href={route.path}
                  onClick={handleLinkClick}
                  className="text-white hover:text-yellow-200 transition-colors duration-300 font-medium"
                >
                  {route.name}
                </Link>
              ))}
              <a
                href="tel:+919486910605"
                className="flex items-center space-x-2 text-white hover:text-yellow-200 transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>+91 00000 00000</span>
              </a>
              <Link
                href="/cart"
                onClick={handleLinkClick}
                className="flex items-center space-x-2 text-white hover:text-yellow-200 transition-colors duration-300"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Cart</span>
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}

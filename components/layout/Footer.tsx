"use client"

import Link from "next/link"
import { Phone, Mail, MapPin, MessageCircle, Facebook, Twitter, Instagram } from "lucide-react"
import { ROUTES } from "@/constants/routes"
import { WhatsappLogo } from 'phosphor-react'

// Access the environment variables
const phoneNumber = process.env.NEXT_PUBLIC_PHONE_NUMBER;
const whatsappLink = process.env.NEXT_PUBLIC_WHATSAPP_LINK;
const emailAddress = process.env.NEXT_PUBLIC_EMAIL_ADDRESS;

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-red-800 via-red-700 to-orange-600 text-white">
      <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-6 md:py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Crakers</h3>
            <p className="text-sm sm:text-base text-red-100 mb-3 sm:mb-4">
              Premium quality fireworks and crackers for all your celebrations. Safe, authentic, and delivered with
              care.
            </p>
            <div className="flex space-x-3 sm:space-x-4">
              <a href="#" className="text-red-200 hover:text-white transition-colors">
                <Facebook className="w-5 h-5 sm:w-6 sm:h-6" />
              </a>
              <a href="#" className="text-red-200 hover:text-white transition-colors">
                <Twitter className="w-5 h-5 sm:w-6 sm:h-6" />
              </a>
              <a href="#" className="text-red-200 hover:text-white transition-colors">
                <Instagram className="w-5 h-5 sm:w-6 sm:h-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Quick Links</h3>
            <ul className="space-y-1 sm:space-y-2">
              {ROUTES.map((route) => (
                <li key={route.path}>
                  <Link
                    href={route.path}
                    onClick={() => window.scrollTo(0, 0)}
                    className="text-sm sm:text-base text-red-200 hover:text-white transition-colors"
                  >
                    {route.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Contact Info</h3>
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-300" />
                <span className="text-sm sm:text-base text-red-100">{phoneNumber}</span>
              </div>
              <div className="flex items-center space-x-2 sm:space-x-3">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-300" />
                <span className="text-sm sm:text-base text-red-100">{emailAddress}</span>
              </div>
              <div className="flex items-start space-x-2 sm:space-x-3">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-300 mt-0.5 sm:mt-1" />
                <span className="text-sm sm:text-base text-red-100">
                  123 Fireworks Street,
                  <br />
                  Sivakasi, Tamil Nadu 626123
                </span>
              </div>
            </div>
          </div>

          {/* WhatsApp Contact */}
          <div>
            <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">WhatsApp Support</h3>
            <a
              href={`https://wa.me/${whatsappLink}?text=Hi%20Crakers,%20I%20need%20help%20with%20fireworks`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 sm:space-x-3 bg-green-600 hover:bg-green-700 px-3 py-2 sm:px-4 sm:py-3 rounded-lg transition-colors duration-300 text-sm sm:text-base"
            >
              <WhatsappLogo className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Chat with us</span>
            </a>
            <p className="text-xs sm:text-sm text-red-100 mt-2 sm:mt-3">
              Get instant support and place orders directly through WhatsApp
            </p>
          </div>
        </div>

        <div className="border-t border-red-600 mt-3 sm:mt-4 pt-3 sm:pt-4 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-xs sm:text-sm text-red-200">© 2024 Crakers. All rights reserved.</p>
          <p className="text-xs sm:text-sm text-red-200 mt-2 sm:mt-0">
            Developed by{" "}
            <a
              href="https://orangemegasoftware.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-yellow-300 hover:text-white transition-colors"
            >
              OrangeMegaSoftware
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
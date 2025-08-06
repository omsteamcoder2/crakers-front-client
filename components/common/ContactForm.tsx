"use client"

import type React from "react"
import { useState } from "react"
import { Send } from "lucide-react"

export default function ContactForm() {
  const phoneNumber = process.env.NEXT_PUBLIC_PHONE_NUMBER;
const whatsappLink = process.env.NEXT_PUBLIC_WHATSAPP_LINK;
const emailAddress = process.env.NEXT_PUBLIC_EMAIL_ADDRESS;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const whatsappMessage = `Hi Crakers,

Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Subject: ${formData.subject}

Message: ${formData.message}

Please get back to me soon. Thank you!`

    const whatsappUrl = `https://wa.me/${whatsappLink}?text=${encodeURIComponent(whatsappMessage)}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm sm:shadow-lg p-4 sm:p-6 md:p-8">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">Send us a Message</h2>

      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <label htmlFor="name" className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <label htmlFor="phone" className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
              Phone Number *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors"
            />
          </div>

          <div>
            <label htmlFor="subject" className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
              Subject *
            </label>
            <select
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors"
            >
              <option value="">Select a subject</option>
              <option value="Product Inquiry">Product Inquiry</option>
              <option value="Bulk Order">Bulk Order</option>
              <option value="Custom Requirements">Custom Requirements</option>
              <option value="Complaint">Complaint</option>
              <option value="General Query">General Query</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="message" className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={4}
            className="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors resize-vertical"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-red-600 text-white py-3 px-4 sm:py-4 sm:px-6 rounded-lg hover:bg-red-700 transition-colors font-medium sm:font-semibold text-sm sm:text-base flex items-center justify-center gap-2"
        >
          <Send className="w-4 h-4 sm:w-5 sm:h-5" />
          <span>Send Message via WhatsApp</span>
        </button>
      </form>
    </div>
  )
}
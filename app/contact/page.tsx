import PageHeader from "@/components/common/PageHeader"
import ContactForm from "@/components/common/ContactForm"
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react"
import { WhatsappLogo } from 'phosphor-react'

export default function ContactPage() {
  return (
    <div>
      <PageHeader
        title="Contact Us"
        subtitle="Get in touch with us for all your fireworks needs"
      />

      <section className="py-6 sm:py-12 md:py-12 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-6 sm:mb-8">Get In Touch</h2>

              <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-8">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="bg-red-600 p-2 sm:p-3 rounded-full">
                    <Phone className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800 mb-1">Phone</h3>
                    <p className="text-sm sm:text-base text-gray-600">+91 00000 00000</p>
                    <p className="text-sm sm:text-base text-gray-600">+91 00000 00000</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="bg-red-600 p-2 sm:p-3 rounded-full">
                    <Mail className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800 mb-1">Email</h3>
                    <p className="text-sm sm:text-base text-gray-600">info@crakers.com</p>
                    <p className="text-sm sm:text-base text-gray-600">orders@crakers.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="bg-red-600 p-2 sm:p-3 rounded-full">
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800 mb-1">Address</h3>
                    <p className="text-sm sm:text-base text-gray-600">
                      123 Fireworks Street,
                      <br />
                      Sivakasi, Tamil Nadu 626123
                      <br />
                      India
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="bg-red-600 p-2 sm:p-3 rounded-full">
                    <Clock className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800 mb-1">Business Hours</h3>
                    <p className="text-sm sm:text-base text-gray-600">Monday - Saturday: 9:00 AM - 8:00 PM</p>
                    <p className="text-sm sm:text-base text-gray-600">Sunday: 10:00 AM - 6:00 PM</p>
                  </div>
                </div>
              </div>

              {/* WhatsApp CTA */}
              <div className="bg-green-50 border border-green-200 rounded-xl sm:rounded-2xl p-4 sm:p-6">
                <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                  <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-green-600" />
                  <div>
                    <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800">WhatsApp Support</h3>
                    <p className="text-xs sm:text-sm md:text-base text-gray-600">Get instant responses to your queries</p>
                  </div>
                </div>
                <a
                  href="https://wa.me/919876543210?text=Hi%20Crakers,%20I%20need%20help%20with%20my%20order"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 sm:px-5 sm:py-2 md:px-6 md:py-3 rounded-md sm:rounded-lg hover:bg-green-700 transition-colors font-medium sm:font-semibold text-xs sm:text-sm md:text-base"
                >
                  <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                  <span>Chat with us on WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Google Map */}
      <section className="py-8 sm:py-15 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-3 sm:mb-4">Find Us On Map</h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600">Visit our store in the heart of Sivakasi</p>
          </div>

          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden">
            <div className="aspect-video bg-gray-200 flex items-center justify-center">
              <div className="text-center p-4">
                <MapPin className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-gray-400 mx-auto mb-2 sm:mb-3 md:mb-4" />
                <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-1">Interactive Google Map</p>
                <p className="text-xs sm:text-sm text-gray-500">123 Fireworks Street, Sivakasi, Tamil Nadu</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
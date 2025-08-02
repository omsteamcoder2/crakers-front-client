"use client"

import { Truck, Shield, Clock, Headphones } from "lucide-react"

const services = [
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "Quick and safe delivery to your doorstep across Tamil Nadu",
  },
  {
    icon: Shield,
    title: "Quality Assured",
    description: "Premium quality fireworks with safety certifications",
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description: "Round-the-clock customer support via WhatsApp and phone",
  },
  {
    icon: Headphones,
    title: "Expert Guidance",
    description: "Professional advice on fireworks selection and safety",
  },
]

export default function Services() {
  return (
    <section className="py-6 sm:py-15 md:py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-2 sm:mb-3 md:mb-4">
            Why Choose Crakers?
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            We're committed to making your celebrations memorable with our premium services
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="text-center group hover:scale-[1.02] sm:hover:scale-105 transition-transform duration-300 p-4 sm:p-6"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="bg-gradient-to-br from-red-500 to-orange-500 w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:shadow-md sm:group-hover:shadow-lg transition-shadow duration-300">
                <service.icon className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl md:text-xl font-bold text-gray-800 mb-2 sm:mb-3 md:mb-4 group-hover:text-red-600 transition-colors">
                {service.title}
              </h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
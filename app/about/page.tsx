import PageHeader from "@/components/common/PageHeader"
import { Award, Users, Shield, Clock } from "lucide-react"
import Image from "next/image"

export default function AboutPage() {
  return (
    <div>
      <PageHeader
        title="About Crakers"
        subtitle="Your trusted partner for premium fireworks and celebrations"
      />

      {/* Company Story */}
      <section className="py-6 md:py-12 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4 sm:mb-6">Our Story</h2>
              <p className="text-base sm:text-lg text-gray-600 mb-4 sm:mb-6 leading-relaxed">
                Founded in the heart of Sivakasi, Tamil Nadu, Crakers has been illuminating celebrations for over two
                decades. We started as a small family business with a passion for creating magical moments through
                premium quality fireworks.
              </p>
              <p className="text-base sm:text-lg text-gray-600 mb-4 sm:mb-6 leading-relaxed">
                Today, we're proud to be one of the leading fireworks retailers in South India, serving thousands of
                happy customers across Tamil Nadu and beyond. Our commitment to quality, safety, and customer
                satisfaction remains unwavering.
              </p>
              <div className="grid grid-cols-2 gap-4 sm:gap-6">
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-red-600 mb-1 sm:mb-2">20+</div>
                  <div className="text-sm sm:text-base text-gray-600">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-red-600 mb-1 sm:mb-2">10,000+</div>
                  <div className="text-sm sm:text-base text-gray-600">Happy Customers</div>
                </div>
              </div>
            </div>
            <div className="relative mt-6 md:mt-0">
              <Image
                src="/images/aboutus.jpeg?height=500&width=600"
                alt="Our Workshop"
                width={600}
                height={500}
                className="rounded-2xl shadow-lg"
              />
              <div className="absolute -bottom-4 -left-4 md:-bottom-6 md:-left-6 bg-red-600 text-white p-4 md:p-6 rounded-2xl">
                <div className="text-xl md:text-2xl font-bold mb-1">Since 2004</div>
                <div className="text-xs md:text-sm text-red-100">Crafting Joy</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-8 md:py-16 bg-gradient-to-r from-red-50 to-orange-50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-12">
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-red-600 rounded-full flex items-center justify-center mb-4 md:mb-6">
                <Award className="w-6 h-6 md:w-8 md:h-8 text-white" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-3 md:mb-4">Our Mission</h3>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                To bring joy and excitement to every celebration by providing premium quality, safe, and authentic
                fireworks. We strive to make every festival, wedding, and special occasion memorable with our carefully
                curated products.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-orange-600 rounded-full flex items-center justify-center mb-4 md:mb-6">
                <Users className="w-6 h-6 md:w-8 md:h-8 text-white" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-3 md:mb-4">Our Vision</h3>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                To become the most trusted and preferred fireworks brand across India, known for our commitment to
                quality, safety, and customer satisfaction. We envision a future where every celebration is brightened
                by our products.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 md:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-3 md:mb-4">Why Choose Crakers?</h2>
            <p className="text-base md:text-xl text-gray-600 max-w-2xl mx-auto">
              We're committed to excellence in every aspect of our business
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            <div className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="bg-gradient-to-br from-red-500 to-orange-500 w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 group-hover:shadow-lg transition-shadow duration-300">
                <Shield className="w-6 h-6 md:w-8 md:h-8 text-white" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-3 md:mb-4">Safety First</h3>
              <p className="text-sm md:text-base text-gray-600">
                All our products meet international safety standards and come with proper certifications.
              </p>
            </div>

            <div className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="bg-gradient-to-br from-green-500 to-teal-500 w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 group-hover:shadow-lg transition-shadow duration-300">
                <Award className="w-6 h-6 md:w-8 md:h-8 text-white" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-3 md:mb-4">Premium Quality</h3>
              <p className="text-sm md:text-base text-gray-600">
                We source only the finest materials and follow strict quality control processes.
              </p>
            </div>

            <div className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="bg-gradient-to-br from-blue-500 to-purple-500 w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 group-hover:shadow-lg transition-shadow duration-300">
                <Clock className="w-6 h-6 md:w-8 md:h-8 text-white" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-3 md:mb-4">Fast Delivery</h3>
              <p className="text-sm md:text-base text-gray-600">Quick and reliable delivery across Tamil Nadu with careful packaging.</p>
            </div>

            <div className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="bg-gradient-to-br from-purple-500 to-pink-500 w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 group-hover:shadow-lg transition-shadow duration-300">
                <Users className="w-6 h-6 md:w-8 md:h-8 text-white" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-3 md:mb-4">Expert Support</h3>
              <p className="text-sm md:text-base text-gray-600">
                Our experienced team provides personalized guidance for your celebrations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-10 md:py-20 bg-gradient-to-r from-red-50 to-orange-50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-3 md:mb-4">Meet Our Team</h2>
            <p className="text-base md:text-xl text-gray-600">The passionate people behind Crakers</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
            <div className="bg-white rounded-2xl p-6 md:p-8 text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
              <Image
                src="/placeholder.svg?height=150&width=150"
                alt="Founder"
                width={150}
                height={150}
                className="w-20 h-20 md:w-24 md:h-24 rounded-full mx-auto mb-4 md:mb-6 object-cover"
              />
              <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-1 md:mb-2">Rajesh Kumar</h3>
              <p className="text-red-600 text-sm md:text-base font-semibold mb-3 md:mb-4">Founder & CEO</p>
              <p className="text-xs md:text-sm text-gray-600">
                With over 20 years in the fireworks industry, Rajesh leads our vision of bringing joy to celebrations.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 md:p-8 text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
              <Image
                src="/placeholder.svg?height=150&width=150"
                alt="Operations Manager"
                width={150}
                height={150}
                className="w-20 h-20 md:w-24 md:h-24 rounded-full mx-auto mb-4 md:mb-6 object-cover"
              />
              <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-1 md:mb-2">Priya Sharma</h3>
              <p className="text-red-600 text-sm md:text-base font-semibold mb-3 md:mb-4">Operations Manager</p>
              <p className="text-xs md:text-sm text-gray-600">
                Priya ensures smooth operations and maintains our high standards of quality and customer service.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 md:p-8 text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
              <Image
                src="/placeholder.svg?height=150&width=150"
                alt="Technical Expert"
                width={150}
                height={150}
                className="w-20 h-20 md:w-24 md:h-24 rounded-full mx-auto mb-4 md:mb-6 object-cover"
              />
              <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-1 md:mb-2">Murugan Selvam</h3>
              <p className="text-red-600 text-sm md:text-base font-semibold mb-3 md:mb-4">Technical Expert</p>
              <p className="text-xs md:text-sm text-gray-600">
                Our safety and quality expert who ensures every product meets the highest standards.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
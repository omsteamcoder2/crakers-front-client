"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { MessageCircle, ShoppingCart, Star, Shield, Truck, Award, Plus, Minus } from "lucide-react"
import PageHeader from "@/components/common/PageHeader"

// Mock product data - in real app, this would come from API/database
const getProductBySlug = (slug: string) => {
  const products = {
    "premium-ground-chakra": {
      id: "1",
      name: "Premium Ground Chakra",
      price: 299,
      originalPrice: 399,
      images: [
        "/placeholder.svg?height=500&width=500",
        "/placeholder.svg?height=500&width=500",
        "/placeholder.svg?height=500&width=500",
      ],
      description:
        "Experience the mesmerizing beauty of our Premium Ground Chakra. This stunning firework creates a spectacular spinning wheel of vibrant colors that will captivate your audience. Perfect for Diwali celebrations, weddings, and special occasions.",
      features: [
        "Duration: 45-60 seconds",
        "Colors: Multi-colored display",
        "Safety certified",
        "Weather resistant",
        "Easy to light",
      ],
      specifications: {
        "Product Type": "Ground Chakra",
        Duration: "45-60 seconds",
        Colors: "Red, Green, Blue, Yellow, White",
        Size: "6 inches diameter",
        Weight: "150 grams",
        Certification: "PESO Approved",
      },
      category: "Ground Chakras",
      inStock: true,
      rating: 4.8,
      reviews: 124,
      safetyTips: [
        "Light from a safe distance of at least 8 feet",
        "Place on flat, stable ground",
        "Keep water nearby",
        "Adult supervision required",
        "Do not attempt to relight if it fails",
      ],
    },
  }

  return products[slug as keyof typeof products] || null
}

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState("description")

  const product = getProductBySlug(params.slug)

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h1>
          <Link href="/quick-purchase" className="text-red-600 hover:text-red-700">
            Back to Products
          </Link>
        </div>
      </div>
    )
  }

  const handleWhatsAppEnquiry = () => {
    const message = `Hi Crakers, I'm interested in ${product.name} (₹${product.price}). 

Quantity: ${quantity}
Total: ₹${product.price * quantity}

Please provide more details and confirm availability.`

    const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  const addToCart = () => {
    // In a real app, this would add to cart state/context
    alert(`Added ${quantity} x ${product.name} to cart!`)
  }

  return (
    <div>
      <PageHeader
        title={product.name}
        subtitle="Premium quality fireworks for your celebrations"
      />

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <div className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
            <Link href="/" className="hover:text-red-600">
              Home
            </Link>
            <span>/</span>
            <Link href="/quick-purchase" className="hover:text-red-600">
              Products
            </Link>
            <span>/</span>
            <span className="text-gray-800">{product.name}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Product Images */}
            <div>
              <div className="mb-6">
                <Image
                  src={product.images[selectedImage] || "/placeholder.svg"}
                  alt={product.name}
                  width={500}
                  height={500}
                  className="w-full h-96 object-cover rounded-2xl shadow-lg"
                />
                {product.originalPrice > product.price && (
                  <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Save ₹{product.originalPrice - product.price}
                  </div>
                )}
              </div>

              {/* Image Thumbnails */}
              <div className="flex space-x-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === index ? "border-red-600" : "border-gray-200"
                    }`}
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${product.name} ${index + 1}`}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div>
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.name}</h1>

                {/* Rating */}
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                        }`}
                      />
                    ))}
                    <span className="text-gray-600 ml-2">({product.reviews} reviews)</span>
                  </div>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">
                    {product.inStock ? "In Stock" : "Out of Stock"}
                  </span>
                </div>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-center space-x-4">
                    <span className="text-3xl font-bold text-red-600">₹{product.price}</span>
                    {product.originalPrice > product.price && (
                      <span className="text-xl text-gray-500 line-through">₹{product.originalPrice}</span>
                    )}
                  </div>
                  <p className="text-gray-600 mt-2">Inclusive of all taxes</p>
                </div>

                {/* Description */}
                <p className="text-gray-700 leading-relaxed mb-6">{product.description}</p>

                {/* Features */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Key Features:</h3>
                  <ul className="space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Quantity Selector */}
                <div className="mb-8">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Quantity:</label>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center border border-gray-300 rounded-lg">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="p-3 hover:bg-gray-100 transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="px-6 py-3 font-semibold">{quantity}</span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="p-3 hover:bg-gray-100 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <span className="text-gray-600">Total: ₹{(product.price * quantity).toLocaleString()}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <button
                    onClick={addToCart}
                    className="flex-1 bg-red-600 text-white py-4 px-6 rounded-lg hover:bg-red-700 transition-colors font-semibold flex items-center justify-center space-x-2"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    <span>Add to Cart</span>
                  </button>
                  <button
                    onClick={handleWhatsAppEnquiry}
                    className="flex-1 bg-green-600 text-white py-4 px-6 rounded-lg hover:bg-green-700 transition-colors font-semibold flex items-center justify-center space-x-2"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>WhatsApp Enquiry</span>
                  </button>
                </div>

                {/* Trust Indicators */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <Shield className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Safety Certified</p>
                  </div>
                  <div className="text-center">
                    <Truck className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Fast Delivery</p>
                  </div>
                  <div className="text-center">
                    <Award className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Premium Quality</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Details Tabs */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6">
                {["description", "specifications", "safety"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-4 px-2 border-b-2 font-medium text-sm capitalize transition-colors ${
                      activeTab === tab
                        ? "border-red-600 text-red-600"
                        : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    {tab === "safety" ? "Safety Tips" : tab}
                  </button>
                ))}
              </nav>
            </div>

            <div className="p-6">
              {activeTab === "description" && (
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Product Description</h3>
                  <p className="text-gray-700 leading-relaxed mb-6">{product.description}</p>
                  <h4 className="text-lg font-semibold text-gray-800 mb-3">What makes this special:</h4>
                  <ul className="space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-red-600 rounded-full mt-2"></div>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {activeTab === "specifications" && (
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Technical Specifications</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between py-3 border-b border-gray-200">
                        <span className="font-medium text-gray-700">{key}:</span>
                        <span className="text-gray-600">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "safety" && (
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Safety Guidelines</h3>
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                    <p className="text-yellow-800 font-medium">
                      ⚠️ Please read and follow all safety instructions carefully
                    </p>
                  </div>
                  <ul className="space-y-3">
                    {product.safetyTips.map((tip, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                          {index + 1}
                        </div>
                        <span className="text-gray-700">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

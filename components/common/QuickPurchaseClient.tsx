"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import PageHeader from "@/components/common/PageHeader"
import { useSearchParams } from "next/navigation"
import { Filter, X, Play, ShoppingCart, ChevronDown, ChevronUp, Sliders } from 'lucide-react'

interface Product {
  id: string
  productName: string
  category: string
  productCode: string
  boxQuantity?: string
  piecesPerBox?: number
  price: number
  offerPercentage?: number
  image: string
  videoUrl?: string
  tags?: string[]
  isActive: boolean
  seoTitle?: string
  metaDescription?: string
  quantity: number
  inCart?: boolean
}

export default function QuickPurchasePage() {
  const searchParams = useSearchParams()
  const initialCategory = (searchParams.get("category") || "").toLowerCase()
  const showOffersOnly = searchParams.get("offers") === "true"
  const [selectedCategory, setSelectedCategory] = useState(initialCategory)
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<{ id: string, name: string, count: number }[]>([])
  const [showAllProducts, setShowAllProducts] = useState(false)
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [showVideoModal, setShowVideoModal] = useState(false)
  const [showImageModal, setShowImageModal] = useState(false)
  const [modalImageUrl, setModalImageUrl] = useState("")
  const orderSummaryRef = useRef<HTMLDivElement>(null)
  const [showFloatingSummary, setShowFloatingSummary] = useState(false)
  const [hasMounted, setHasMounted] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL
const [selectedTag, setSelectedTag] = useState<string>("")
const [availableTags, setAvailableTags] = useState<{ id: string, name: string }[]>([])

  const minimumOrderValue = 2000
  const packingCharges = 50

const sanitizeYoutubeUrl = (url?: string) => {
  if (!url) return "";

  // Shorts URL
  if (url.includes("youtube.com/shorts/")) {
    const id = url.split("shorts/")[1].split("?")[0];
    return `https://www.youtube.com/watch?v=${id}`;
  }

  if (url.includes("youtu.be/")) {
    const id = url.split("youtu.be/")[1].split("?")[0];
    return `https://www.youtube.com/watch?v=${id}`;
  }

  if (url.includes("watch?v=")) {
    const id = url.split("watch?v=")[1].split("&")[0];
    return `https://www.youtube.com/watch?v=${id}`;
  }

  return url;
};

useEffect(() => {
  if (showVideoModal && selectedProduct?.videoUrl) {
    console.log("Sanitized Video URL:", sanitizeYoutubeUrl(selectedProduct.videoUrl));
  }
}, [showVideoModal, selectedProduct]);

  
  useEffect(() => {
    if (!isLoading && orderSummaryRef.current) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          setShowFloatingSummary(!entry.isIntersecting)
        },
        { threshold: 0.1 }
      )

      observer.observe(orderSummaryRef.current)

      return () => {
        if (orderSummaryRef.current) {
          observer.unobserve(orderSummaryRef.current)
        }
      }
    }
  }, [isLoading])

  useEffect(() => {
    setSelectedCategory(initialCategory)
  }, [initialCategory])

  useEffect(() => {
    setHasMounted(true)
    if (typeof window !== "undefined") {
      setIsDesktop(window.innerWidth >= 1024)
      const handleResize = () => {
        setIsDesktop(window.innerWidth >= 1024)
      }
      window.addEventListener('resize', handleResize)
      return () => window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(`${API_BASE_URL}/api/products`)
        const data = await response.json()

        const activeProducts = data.products.filter((product: any) => product.isActive)

        const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]") as Product[]
        const cartProductIds = new Set(cartItems.map(item => item.id))

        setProducts(activeProducts.map((product: any) => ({
          id: product._id,
          productName: product.productName,
          category: product.category.toLowerCase(),
          productCode: product.productCode,
          boxQuantity: product.boxQuantity,
          piecesPerBox: product.piecesPerBox,
          price: product.price,
          offerPercentage: product.offerPercentage,
          image: product.image,
          videoUrl: product.videoUrl,
          tags: product.tags,
          isActive: product.isActive,
          seoTitle: product.seoTitle,
          metaDescription: product.metaDescription,
          quantity: 0,
          inCart: cartProductIds.has(product._id)
        })))

        const categoryMap = new Map<string, number>()
        activeProducts.forEach((product: any) => {
          const count = categoryMap.get(product.category) || 0
          categoryMap.set(product.category, count + 1)
        })

        const categoryList = Array.from(categoryMap.entries()).map(([id, count]) => ({
          id: id.toLowerCase(),
          name: id.charAt(0).toUpperCase() + id.slice(1).replace(/-/g, ' '),
          count
        }))

        setCategories(categoryList)
        // Extract unique tags from active products
const tagSet = new Set<string>()
activeProducts.forEach((product: any) => {
  if (Array.isArray(product.tags)) {
    product.tags.forEach(tag => {
      if (tag.trim()) tagSet.add(tag.trim())
    })
  }
})

const tagList = Array.from(tagSet).map((tag: string) => ({
  id: tag,
  name: tag
}))


setAvailableTags(tagList)

        if (categoryList.length > 0 && !initialCategory) {
          setSelectedCategory("")
        }
      } catch (error) {
        console.error("Failed to fetch products:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [])

  useEffect(() => {
    const savedQuantities = localStorage.getItem("quickPurchaseQuantities")
    if (savedQuantities) {
      const parsedQuantities = JSON.parse(savedQuantities)
      setProducts(prevProducts =>
        prevProducts.map(product => ({
          ...product,
          quantity: parsedQuantities[product.id] || 0
        }))
      )
    }
  }, [isLoading])

  const updateQuantity = (id: string, quantity: number) => {
    const newProducts = products.map(product =>
      product.id === id ? { ...product, quantity: Math.max(0, quantity) } : product
    )

    setProducts(newProducts)

    const quantitiesToStore = newProducts.reduce((acc, product) => {
      if (product.quantity > 0) acc[product.id] = product.quantity
      return acc
    }, {} as Record<string, number>)

    localStorage.setItem("quickPurchaseQuantities", JSON.stringify(quantitiesToStore))
  }

  const addToCart = (product: Product) => {
    const existingCart = JSON.parse(localStorage.getItem("cartItems") || "[]") as Product[]
    
    if (existingCart.some(item => item.id === product.id)) return

    const productToAdd = { 
      ...product, 
      quantity: product.quantity > 0 ? product.quantity : 1,
      inCart: true 
    }

    const updatedCart = [...existingCart, productToAdd]
    localStorage.setItem("cartItems", JSON.stringify(updatedCart))

    setProducts(prevProducts =>
      prevProducts.map(p =>
        p.id === product.id ? { ...p, inCart: true } : p
      )
    )
  }

  const removeFromCart = (productId: string) => {
    const existingCart = JSON.parse(localStorage.getItem("cartItems") || "[]") as Product[]
    const updatedCart = existingCart.filter(item => item.id !== productId)
    localStorage.setItem("cartItems", JSON.stringify(updatedCart))

    setProducts(prevProducts =>
      prevProducts.map(p =>
        p.id === productId ? { ...p, inCart: false } : p
      )
    )
  }

const filteredProducts = products.filter(product =>
  (selectedCategory ? product.category === selectedCategory : true) &&
  (!showOffersOnly || (product.offerPercentage && product.offerPercentage > 0)) &&
  (selectedTag ? product.tags?.includes(selectedTag) : true)
)


  const totalQuantity = products.reduce((sum, product) => sum + (product.quantity || 0), 0)
  const totalPayable = products.reduce((sum, product) => sum + (product.price * (product.quantity || 0)), 0)

  const getProductDescription = (product: Product) => {
    let description = []
    if (product.boxQuantity) description.push(`Box: ${product.boxQuantity}`)
    if (product.piecesPerBox) description.push(`${product.piecesPerBox} pieces/box`)
    return description.join(' , ') || 'Available for purchase'
  }

  const openProductDetail = (product: Product) => {
    setSelectedProduct(product)
    if (product.videoUrl) {
      setShowVideoModal(true)
    }
  }

  const proceedToBook = () => {
    const selectedProducts = products.filter((p) => (p.quantity || 0) > 0)
    if (selectedProducts.length === 0) {
      alert("Please select at least one product")
      return
    }

    const orderDetails = selectedProducts
      .map((product) => `${product.productName} (${product.productCode}) - Qty: ${product.quantity} - ₹${product.price * (product.quantity || 0)}`)
      .join("\n")

    const whatsappMessage = `Hi Crakers, I want to make a quick purchase:

${orderDetails}

Total Quantity: ${totalQuantity}
Total Payable: ₹${totalPayable}
Packing Charges: ₹${packingCharges}

Please confirm my order and provide payment details.`

    const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(whatsappMessage)}`
    window.open(whatsappUrl, "_blank")
  }

  // Desktop Product Card Component
  const DesktopProductCard = ({ product }: { product: Product }) => (
    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex items-center gap-4">
        {/* Product Image with Video Indicator */}
        <div className="flex-shrink-0 relative">
          <Image
            src={`${API_BASE_URL}${product.image}`}
            alt={product.productName}
            width={80}
            height={80}
            className="w-20 h-20 object-cover rounded-lg cursor-pointer"
            onClick={() => {
              setModalImageUrl(`${API_BASE_URL}${product.image}`)
              setShowImageModal(true)
            }}
          />
          {product.videoUrl && (
            <div
              className="absolute bottom-1 right-1 bg-black bg-opacity-50 rounded-full p-1 cursor-pointer"
              onClick={() => openProductDetail(product)}
            >
              <Play size={14} className="text-white" />
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-800 text-base line-clamp-2">
            {product.productName}
          </h3>
          <p className="text-sm text-gray-600">{getProductDescription(product)}</p>
          <p className="text-sm font-medium text-red-600">
            Rs. {product.price}
            {product.offerPercentage && product.offerPercentage > 0 && (
              <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded">
                {product.offerPercentage}% OFF
              </span>
            )}
          </p>
          {product.tags && product.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-1">
              {product.tags
                .filter(tag => tag.trim() !== "")
                .map(tag => (
                  <span key={tag} className="text-xs bg-red-300 text-gray-900 px-2 py-0.5 rounded">
                    {tag}
                  </span>
                ))}
            </div>
          )}
        </div>

        {/* Quantity Selector and Actions */}
        <div className="flex flex-col items-end gap-2 min-w-[150px]">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700">Qty:</label>
            <select
              value={product.quantity || 0}
              onChange={(e) => updateQuantity(product.id, Number.parseInt(e.target.value))}
              className="border border-gray-300 rounded px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent w-20"
            >
              {[...Array(21)].map((_, i) => (
                <option key={i} value={i}>{i}</option>
              ))}
            </select>
          </div>

          <div className="text-sm text-gray-600 font-medium">
            Rs. {(product.quantity || 0) * product.price}
          </div>

          {product.inCart ? (
            <button
              onClick={() => removeFromCart(product.id)}
              className="text-xs px-3 py-1.5 rounded transition bg-red-100 text-red-700 hover:bg-red-200 flex items-center gap-1"
            >
              <ShoppingCart size={14} />
              Remove from Cart
            </button>
          ) : (
            <button
              onClick={() => addToCart(product)}
              className="text-xs px-3 py-1.5 rounded transition bg-blue-600 text-white hover:bg-blue-700 flex items-center gap-1"
            >
              <ShoppingCart size={14} />
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  )

  // Mobile Product Card Component
  const MobileProductCard = ({ product }: { product: Product }) => (
    <div className="border border-gray-200 rounded-lg p-2 hover:shadow-md transition-shadow">
      <div className="flex gap-3 items-start">
        {/* Image */}
        <div className="flex-shrink-0 relative">
          <Image
            src={`${API_BASE_URL}${product.image}`}
            alt={product.productName}
            width={72}
            height={72}
            className="w-14 h-14 object-cover rounded-lg cursor-pointer"
            onClick={() => {
              setModalImageUrl(`${API_BASE_URL}${product.image}`)
              setShowImageModal(true)
            }}
          />
          {product.videoUrl && (
            <div
              className="absolute bottom-0 right-0 bg-black bg-opacity-50 rounded-full p-1 cursor-pointer"
              onClick={() => openProductDetail(product)}
            >
              <Play size={12} className="text-white" />
            </div>
          )}
        </div>

        {/* Only Name + Description beside image */}
        <div className="flex flex-col justify-start min-w-0">
          <h3 className="font-semibold text-gray-800 text-sm">
            {product.productName}
          </h3>
          <p className="text-xs text-gray-600">
            {getProductDescription(product)}
          </p>
        </div>
      </div>

      {/* All Other Info BELOW image+text */}
      <div className="mt-2 space-y-1">
        {/* Price */}
        <p className="text-sm font-medium text-red-600">
          Rs. {product.price}
          {product.offerPercentage && product.offerPercentage > 0 && (
            <span className="ml-1 text-[10px] bg-green-100 text-green-800 px-1.5 py-0.5 rounded">
              {product.offerPercentage}% OFF
            </span>
          )}
        </p>

        {/* Tags */}
        {Array.isArray(product.tags) && product.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {product.tags
              .filter(tag => tag.trim() !== "")
              .map(tag => (
                <span key={tag} className="text-[8px] bg-red-300 text-gray-900 px-1 py-0.5 rounded">
                  {tag}
                </span>
              ))}
          </div>
        )}

        {/* Quantity and Actions */}
        <div className="flex items-center justify-between gap-2 mt-1">
          <label className="text-xs font-medium text-gray-700">Qty:</label>
          <select
            value={product.quantity || 0}
            onChange={(e) => updateQuantity(product.id, Number.parseInt(e.target.value))}
            className="border border-gray-300 rounded px-2 py-1 text-xs focus:ring-1 focus:ring-blue-500 focus:border-transparent w-16"
          >
            {[...Array(21)].map((_, i) => (
              <option key={i} value={i}>{i}</option>
            ))}
          </select>

          <span className="text-xs text-gray-800 font-medium">
            Rs. {(product.quantity || 0) * product.price}
          </span>

          {product.inCart ? (
            <button
              onClick={() => removeFromCart(product.id)}
              className="text-[10px] px-2 py-1 rounded transition bg-red-100 text-red-700 hover:bg-red-200 flex items-center gap-1"
            >
              <ShoppingCart size={12} />
              Remove
            </button>
          ) : (
            <button
              onClick={() => addToCart(product)}
              className="text-[10px] px-2 py-1 rounded transition bg-blue-600 text-white hover:bg-blue-700 flex items-center gap-1"
            >
              <ShoppingCart size={12} />
              Add
            </button>
          )}
        </div>
      </div>
    </div>
  )

  return (
    <div className="pb-20 md:pb-0">
      <PageHeader
        title="Quick Purchase"
        subtitle="Enter the quantity of your required crackers and complete your booking"
      />

      {/* Video Modal */}
      {showVideoModal && selectedProduct?.videoUrl && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-1 md:p-4">
          <div className="bg-white rounded-lg px-0 p-2 md:p-4 max-w-4xl w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg md:text-xl font-bold">{selectedProduct.productName}</h3>
              <button
                onClick={() => setShowVideoModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>
            <div className="w-full h-[200px] sm:h-[300px] md:h-[400px]">
<iframe
  width="100%"
  height="100%"
  src={`https://www.youtube.com/embed/${sanitizeYoutubeUrl(selectedProduct.videoUrl).split('v=')[1]}`}
  title="YouTube video player"
  frameBorder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowFullScreen
/>


            </div>
            <div className="mt-4 text-xs sm:text-sm text-gray-600">
              {selectedProduct.metaDescription || selectedProduct.seoTitle || ''}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Filter Overlay */}
      {isMobileFilterOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsMobileFilterOpen(false)}
        />
      )}

      <section className="py-4 md:py-10 bg-gray-50">
        <div className="container mx-auto px-1 sm:px-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 md:gap-6">
            {/* Mobile Filter Toggle Button */}
<div className="lg:hidden">
  <button
    onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm w-full mb-3 flex items-center justify-center gap-2"
  >
    <Sliders size={16} />
    {isMobileFilterOpen ? "Hide Filters" : "Show Filters"}
    {isMobileFilterOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
  </button>
</div>

{/* Filter Sidebar (Mobile + Desktop) */}
{hasMounted && (
  <div
    className={`
      lg:col-span-1
      ${isMobileFilterOpen ? "fixed inset-0 z-50 bg-white p-4 overflow-y-auto" : "hidden lg:block"}
    `}
  >
    {/* Close Button for Mobile */}
    {isMobileFilterOpen && (
      <div className="flex justify-end mb-2">
        <button
          onClick={() => setIsMobileFilterOpen(false)}
          className="text-gray-500 hover:text-gray-700"
        >
          <X size={20} />
        </button>
      </div>
    )}

    {/* Filter by Tags */}
    <div className="mb-6">
      <h3 className="text-base font-semibold text-gray-800 flex items-center gap-2 mb-2">
        <Filter size={16} />
        Filter by Tags
      </h3>
      <div className="space-y-2">
        <button
          onClick={() => setSelectedTag("")}
          className={`w-full text-left px-3 py-2 rounded-lg text-sm transition ${
            selectedTag === "" ? "bg-blue-600 text-white" : "bg-gray-100 hover:bg-gray-200"
          }`}
        >
          All Tags
        </button>
        {availableTags.map((tag) => (
          <button
            key={tag.id}
            onClick={() => setSelectedTag(tag.id)}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition ${
              selectedTag === tag.id ? "bg-blue-600 text-white" : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            {tag.name}
          </button>
        ))}
      </div>
    </div>

    {/* Filter by Categories */}
    <div className="bg-white rounded-lg shadow p-4 sticky lg:top-6">
      <h3 className="text-base font-semibold text-gray-800 flex items-center gap-2 mb-2">
        <Filter size={16} />
        Filter by Category
      </h3>
      <div className="space-y-2 max-h-[50vh] overflow-y-auto pr-1">
        {[{ id: "", name: "All Products", count: products.length }, ...categories].map((category) => (
          <button
            key={category.id}
            onClick={() => {
              setSelectedCategory(category.id)
              if (window.innerWidth < 1024) setIsMobileFilterOpen(false)
            }}
            className={`w-full text-left px-3 py-2 rounded-lg flex justify-between items-center text-sm transition ${
              selectedCategory === category.id ? "bg-blue-600 text-white" : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            <span>{category.name}</span>
            <span
              className={`text-xs px-2 py-0.5 rounded-full ${
                selectedCategory === category.id ? "bg-white text-blue-600" : "bg-gray-300 text-gray-800"
              }`}
            >
              {category.count}
            </span>
          </button>
        ))}
      </div>
    </div>
  </div>
)}


            {/* Products List */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-lg md:rounded-xl shadow p-2 md:p-4">
                {isLoading ? (
                  <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
                  </div>
                ) : (
                  <>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-3 md:mb-4 gap-2">
                      <h2 className="text-lg md:text-xl font-bold text-gray-800 capitalize">
                        {categories.find((c) => c.id === selectedCategory)?.name || "All Products"}
                      </h2>
                      {filteredProducts.length > 10 && (
                        <button
                          onClick={() => setShowAllProducts(!showAllProducts)}
                          className="bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 transition-colors text-xs md:text-sm"
                        >
                          {showAllProducts ? "Show Less" : "Show All"}
                        </button>
                      )}
                    </div>

                    {filteredProducts.length === 0 ? (
                      <div className="text-center py-6 md:py-8">
                        <p className="text-gray-500 text-xs md:text-sm">No products found in this category</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {filteredProducts
                          .slice(0, showAllProducts ? filteredProducts.length : 10)
                          .map((product) => (
                            isDesktop ? (
                              <DesktopProductCard key={product.id} product={product} />
                            ) : (
                              <MobileProductCard key={product.id} product={product} />
                            )
                          ))}
                      </div>
                    )}

                    {/* Order Summary */}
                    <div ref={orderSummaryRef} className="mt-6 border-t border-gray-200 pt-4">
                      <div className="bg-gray-50 rounded-lg p-3 md:p-4">
                        <div className="grid grid-cols-3 gap-2 md:gap-4 mb-3">
                          <div className="text-center">
                            <div className="text-[10px] md:text-xs text-gray-600">Min order</div>
                            <div className="text-sm md:text-base font-bold text-gray-800">Rs. {minimumOrderValue.toLocaleString()}</div>
                          </div>
                          <div className="text-center">
                            <div className="text-[10px] md:text-xs text-gray-600">Total Qty</div>
                            <div className="text-sm md:text-base font-bold text-blue-600">{totalQuantity}</div>
                          </div>
                          <div className="text-center">
                            <div className="text-[10px] md:text-xs text-gray-600">Total Payable</div>
                            <div className="text-sm md:text-base font-bold text-red-600">Rs. {totalPayable.toLocaleString()}</div>
                          </div>
                        </div>

                        <div className="text-center">
                          <div className="text-[10px] md:text-xs text-gray-600 mb-1">Packing Charges: Rs. {packingCharges}</div>
                          {totalPayable < minimumOrderValue && (
                            <p className="text-[10px] text-red-600 mb-1">
                              Minimum order amount is ₹{minimumOrderValue}
                            </p>
                          )}
                          <button
                            onClick={proceedToBook}
                            disabled={totalPayable < minimumOrderValue}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium text-xs md:text-sm disabled:bg-gray-400 disabled:cursor-not-allowed w-full max-w-xs"
                          >
                            Proceed to Book
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bank Account Details */}
      <section className="py-8 md:py-16 bg-white">
        <div className="container mx-auto px-3 sm:px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 md:mb-6">Bank Account Details</h2>
              <div className="bg-gray-50 rounded-lg md:rounded-xl p-3 md:p-4 space-y-2 md:space-y-3">
                <div className="text-xs md:text-sm">
                  <span className="font-semibold text-gray-700">Account Holder:</span>
                  <span className="ml-2 text-gray-600">Crakers</span>
                </div>
                <div className="text-xs md:text-sm">
                  <span className="font-semibold text-gray-700">Account Number:</span>
                  <span className="ml-2 text-gray-600">1261135000018718</span>
                </div>
                <div className="text-xs md:text-sm">
                  <span className="font-semibold text-gray-700">Account Type:</span>
                  <span className="ml-2 text-gray-600">Current</span>
                </div>
                <div className="text-xs md:text-sm">
                  <span className="font-semibold text-gray-700">Bank:</span>
                  <span className="ml-2 text-gray-600">Karur Vysya Bank</span>
                </div>
                <div className="text-xs md:text-sm">
                  <span className="font-semibold text-gray-700">Branch:</span>
                  <span className="ml-2 text-gray-600">Sivakasi</span>
                </div>
                <div className="text-xs md:text-sm">
                  <span className="font-semibold text-gray-700">IFSC Code:</span>
                  <span className="ml-2 text-gray-600">KVBL0001261</span>
                </div>
                <div className="text-xs md:text-sm">
                  <span className="font-semibold text-gray-700">UPI Address:</span>
                  <span className="ml-2 text-gray-600">crakers@ibl</span>
                </div>
                <div className="text-xs md:text-sm">
                  <span className="font-semibold text-gray-700">GPay Number:</span>
                  <span className="ml-2 text-gray-600">8072374773</span>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-2 md:p-3 mt-3 md:mt-4">
                <p className="text-yellow-800 text-[10px] md:text-xs">
                  <strong>Note:</strong> Once you transfer the payment, please submit the payment information in the
                  order page. The order page link can be found in your email.
                </p>
              </div>
            </div>

            <div className="flex justify-center">
              <div className="bg-white border-2 sm:border-4 border-blue-600 rounded-lg md:rounded-xl p-3 md:p-4 text-center max-w-xs w-full">
                <h3 className="text-base md:text-lg font-bold text-gray-800 mb-2 md:mb-3">CRAKERS</h3>
                <p className="text-[10px] md:text-xs text-gray-600 mb-2 md:mb-3">SCAN & PAY</p>
                <div className="bg-gray-200 w-32 h-32 md:w-40 md:h-40 mx-auto rounded-lg flex items-center justify-center mb-2 md:mb-3">
                  <div className="text-gray-500 text-center">
                    <div className="text-2xl md:text-3xl mb-1">📱</div>
                    <div className="text-[10px] md:text-xs">QR Code</div>
                    <div className="text-[8px] md:text-[10px]">Scan to Pay</div>
                  </div>
                </div>
                <p className="text-[8px] md:text-[10px] text-gray-600">UPI ID: crakers786976399@indianbk</p>
                <div className="flex justify-center space-x-1 md:space-x-2 mt-2 md:mt-3">
                  <div className="w-5 h-4 md:w-6 md:h-5 bg-blue-600 rounded text-white text-[8px] md:text-[10px] flex items-center justify-center">
                    Pay
                  </div>
                  <div className="w-5 h-4 md:w-6 md:h-5 bg-green-600 rounded text-white text-[8px] md:text-[10px] flex items-center justify-center">
                    G
                  </div>
                  <div className="w-5 h-4 md:w-6 md:h-5 bg-purple-600 rounded text-white text-[8px] md:text-[10px] flex items-center justify-center">
                    Ph
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {showImageModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md"
          onClick={() => setShowImageModal(false)}
        >
          <div
            className="relative max-w-3xl w-full px-3 sm:px-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-1 right-1 text-white bg-black bg-opacity-50 hover:bg-opacity-70 rounded-full p-0.5"
              onClick={() => setShowImageModal(false)}
            >
              <X size={16} />
            </button>
            <img
              src={modalImageUrl}
              alt="Product"
              className="w-full max-h-[90vh] object-contain rounded-lg shadow-lg"
            />
          </div>
        </div>
      )}

      {showFloatingSummary && (
        <div className="fixed bottom-0 left-0 w-full bg-gray-200 border-t border-gray-300 shadow-md px-2 py-2 sm:px-3 sm:py-4 z-50">
          <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-1 sm:gap-3">
            <div className="text-xs sm:text-sm text-gray-800 font-medium text-center">
              Qty: <span className="font-semibold">{totalQuantity}</span> &nbsp;|&nbsp;
              Payable: ₹<span className="font-semibold">{totalPayable.toLocaleString()}</span> + ₹{packingCharges} packing
            </div>
            <button
              onClick={proceedToBook}
              disabled={totalPayable < minimumOrderValue}
              className="w-full sm:w-auto text-center bg-blue-600 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-lg font-medium text-xs sm:text-sm transition-all hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-1"
            >
              <ShoppingCart size={14} />
              Proceed to Book
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Trash2, Plus, Minus, ShoppingCart } from "lucide-react"
import PageHeader from "@/components/common/PageHeader"

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  productCode: string
  image: string
  category: string
  boxQuantity?: string
  piecesPerBox?: number
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [notes, setNotes] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isDesktop, setIsDesktop] = useState(false)
  const minimumOrderValue = 2000
  const packingCharges = 50
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

  useEffect(() => {
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
    const fetchCartItems = async () => {
      try {
        setIsLoading(true)
        
        // Get cart items from localStorage
        const localCart = JSON.parse(localStorage.getItem("cartItems") || "[]")
        
        if (localCart.length === 0) {
          setCartItems([])
          return
        }

        // Fetch latest product data for items in cart
        const response = await fetch(`${API_BASE_URL}/api/products`)
        const data = await response.json()

        // Merge localStorage quantities with fresh product data
        const mergedCartItems = localCart.map((localItem: any) => {
          const product = data.products.find((p: any) => p._id === localItem.id)
          return product ? {
            id: product._id,
            name: product.productName,
            price: product.price,
            quantity: localItem.quantity,
            productCode: product.productCode,
            image: `${API_BASE_URL}${product.image}`,
            category: product.category,
            boxQuantity: product.boxQuantity,
            piecesPerBox: product.piecesPerBox,
          } : null
        }).filter(Boolean)

        setCartItems(mergedCartItems)
      } catch (error) {
        console.error("Failed to fetch cart items:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCartItems()
  }, [])

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return
    
    const updatedItems = cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    )
    
    setCartItems(updatedItems)
    
    // Update localStorage
    const cartToStore = updatedItems.map(item => ({
      id: item.id,
      quantity: item.quantity
    }))
    localStorage.setItem("cartItems", JSON.stringify(cartToStore))
  }

  const removeItem = (id: string) => {
    const updatedItems = cartItems.filter(item => item.id !== id)
    setCartItems(updatedItems)
    
    // Update localStorage
    const cartToStore = updatedItems.map(item => ({
      id: item.id,
      quantity: item.quantity
    }))
    localStorage.setItem("cartItems", JSON.stringify(cartToStore))
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const totalPayable = subtotal + packingCharges

const proceedToCheckout = () => {
  const selectedProducts = cartItems.filter((p) => (p.quantity || 0) > 0);
  if (selectedProducts.length === 0) {
    alert("Please select at least one product");
    return;
  }

  localStorage.setItem("checkoutProducts", JSON.stringify(selectedProducts));
  window.location.href = "/checkout"; // Navigate to checkout page
};


  // Desktop Cart Item Component
  const DesktopCartItem = ({ item }: { item: CartItem }) => (
    <div key={item.id} className="border border-gray-200 rounded-lg md:rounded-xl p-2 md:p-4 hover:shadow-md transition-shadow">
      <div className="flex flex-col sm:flex-row gap-2 md:gap-4">
        <div className="flex-shrink-0">
          <Image
            src={item.image || "/placeholder.svg"}
            alt={item.name}
            width={96}
            height={96}
            className="w-16 h-16 md:w-24 md:h-24 object-cover rounded-lg"
          />
        </div>

        <div className="flex-1">
          <h3 className="text-base md:text-lg font-bold text-gray-800 mb-1 md:mb-2">{item.name}</h3>
          <p className="text-gray-600 text-xs md:text-sm mb-2 md:mb-4">
            {item.boxQuantity && <span className="mr-2">Box: {item.boxQuantity} ,</span>}
            {item.piecesPerBox && <span>{item.piecesPerBox} pcs/box</span>}
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 md:gap-4">
            <div className="flex items-center space-x-2 md:space-x-3">
              <span className="text-xs md:text-sm font-medium text-gray-700">Qty:</span>
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button 
                  onClick={() => updateQuantity(item.id, item.quantity - 1)} 
                  className="p-1 md:p-2 hover:bg-gray-100" 
                  disabled={item.quantity <= 1}
                >
                  <Minus className="w-3 h-3 md:w-4 md:h-4" />
                </button>
                <span className="px-2 md:px-4 py-1 md:py-2 font-semibold text-sm md:text-base">{item.quantity}</span>
                <button 
                  onClick={() => updateQuantity(item.id, item.quantity + 1)} 
                  className="p-1 md:p-2 hover:bg-gray-100"
                >
                  <Plus className="w-3 h-3 md:w-4 md:h-4" />
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-3 md:space-x-4">
              <div className="text-right">
                <div className="text-xs md:text-sm text-gray-600">
                  ₹{item.price} × {item.quantity}
                </div>
                <div className="text-base md:text-lg font-bold text-red-600">
                  ₹{(item.price * item.quantity).toLocaleString()}
                </div>
              </div>
              <button 
                onClick={() => removeItem(item.id)} 
                className="bg-red-500 text-white p-1.5 md:p-2 rounded-lg hover:bg-red-600"
              >
                <Trash2 className="w-3 h-3 md:w-4 md:h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  // Mobile Cart Item Component
  const MobileCartItem = ({ item }: { item: CartItem }) => (
    <div key={item.id} className="border border-gray-200 rounded-lg p-2 hover:shadow-md transition-shadow">
      <div className="flex gap-3 items-start">
        {/* Image */}
        <div className="flex-shrink-0 relative">
          <Image
            src={item.image || "/placeholder.svg"}
            alt={item.name}
            width={72}
            height={72}
            className="w-14 h-14 object-cover rounded-lg"
          />
        </div>

        {/* Name and details */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-800 text-sm line-clamp-2">{item.name}</h3>
          <div className="flex items-center gap-2 mt-1">
            {item.boxQuantity && (
              <span className="text-xs bg-gray-100 text-gray-800 px-2 py-0.5 rounded">
                Box: {item.boxQuantity}
              </span>
            )}
            {item.piecesPerBox && (
              <span className="text-xs bg-gray-100 text-gray-800 px-2 py-0.5 rounded">
                {item.piecesPerBox} pcs/box
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Price and quantity controls */}
      <div className="mt-3 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-red-600">
            ₹{item.price.toLocaleString()}
          </span>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => updateQuantity(item.id, item.quantity - 1)} 
              className="p-1 hover:bg-gray-100 rounded border border-gray-300"
              disabled={item.quantity <= 1}
            >
              <Minus className="w-3 h-3" />
            </button>
            <span className="font-semibold text-sm">{item.quantity}</span>
            <button 
              onClick={() => updateQuantity(item.id, item.quantity + 1)} 
              className="p-1 hover:bg-gray-100 rounded border border-gray-300"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-600">
            Total: ₹{(item.price * item.quantity).toLocaleString()}
          </span>
          <button 
            onClick={() => removeItem(item.id)} 
            className="text-red-500 hover:text-red-700 flex items-center gap-1 text-xs"
          >
            <Trash2 className="w-3 h-3" />
            Remove
          </button>
        </div>
      </div>
    </div>
  )

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div>
      <PageHeader
        title="Manage your Cart"
        subtitle="Review your selected items and proceed to checkout"
      />

      <section className="py-6 md:py-10 bg-gray-50">
        <div className="container mx-auto px-1 md:px-4">
          {cartItems.length === 0 ? (
            <div className="text-center py-12 md:py-20">
              <ShoppingCart className="w-16 h-16 md:w-24 md:h-24 text-gray-300 mx-auto mb-4 md:mb-6" />
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3 md:mb-4">Your Cart is Empty</h2>
              <p className="text-gray-600 mb-6 md:mb-8 text-sm md:text-base">Add some amazing fireworks to get started!</p>
              <Link
                href="/quick-purchase"
                onClick={() => window.scrollTo(0, 0)}
                className="bg-red-600 text-white px-6 py-3 md:px-8 md:py-4 rounded-full hover:bg-red-700 transition-colors font-semibold text-sm md:text-base"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl md:rounded-2xl shadow-lg p-2 md:p-4 mb-3 md:mb-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 md:mb-6 gap-2">
                    <h2 className="text-xl md:text-2xl font-bold text-gray-800">Cart Items</h2>
                    <p className="text-xs md:text-sm text-gray-600">
                      Minimum order value is ₹{minimumOrderValue.toLocaleString()}
                    </p>
                  </div>

                  <div className="space-y-4 md:space-y-6">
                    {cartItems.map((item) => (
                      isDesktop ? (
                        <DesktopCartItem key={item.id} item={item} />
                      ) : (
                        <MobileCartItem key={item.id} item={item} />
                      )
                    ))}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-1">
  <div className="bg-white rounded-xl md:rounded-2xl shadow-lg p-2 md:p-6 sticky top-4 md:top-6">
    <div className="mb-4 md:mb-6">
      <h3 className="text-base md:text-lg font-bold text-gray-800 mb-2 md:mb-4">Shipping Information</h3>
      <p className="text-xs md:text-sm text-gray-600 mb-3">Your order will be shipped to the address provided during checkout. Ensure your address is correct to avoid any delays.</p>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="font-semibold text-sm md:text-base text-gray-800">Delivery Time:</span>
          <span className="text-sm md:text-base text-gray-600">3-5 business days</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold text-sm md:text-base text-gray-800">Shipping Method:</span>
          <span className="text-sm md:text-base text-gray-600">Standard Delivery</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold text-sm md:text-base text-gray-800">Carrier:</span>
          <span className="text-sm md:text-base text-gray-600">XYZ Logistics</span>
        </div>
      </div>
    </div>

    <div className="border-t border-gray-200 pt-4 md:pt-6">
      <h3 className="text-base md:text-lg font-bold text-gray-800 mb-3 md:mb-4">Booking Summary</h3>

      <div className="space-y-2 md:space-y-3 mb-4 md:mb-6">
        <div className="flex justify-between">
          <span className="text-xs md:text-sm text-gray-600">Sub-total:</span>
          <span className="font-semibold text-sm md:text-base">₹{subtotal.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-xs md:text-sm text-gray-600">Packing Charges:</span>
          <span className="font-semibold text-sm md:text-base">₹{packingCharges}</span>
        </div>
        <div className="border-t border-gray-200 pt-2 md:pt-3">
          <div className="flex justify-between text-base md:text-lg font-bold">
            <span>Total Payable:</span>
            <span className="text-red-600">₹{totalPayable.toLocaleString()}</span>
          </div>
        </div>
        <div className="text-xs md:text-sm text-gray-600">
          <strong>Transport Charges:</strong> Paid directly to transport agency.
        </div>
      </div>

      {subtotal < minimumOrderValue && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 md:p-4 mb-4 md:mb-6">
          <p className="text-yellow-800 text-xs md:text-sm">
            Add ₹{(minimumOrderValue - subtotal).toLocaleString()} more to reach minimum order value
          </p>
        </div>
      )}

      <button
        onClick={proceedToCheckout}
        disabled={subtotal < minimumOrderValue}
        className="w-full bg-blue-600 text-white py-2 md:py-3 px-4 md:px-6 rounded-lg hover:bg-blue-700 font-semibold text-sm md:text-base disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        Proceed to Checkout →
      </button>

      <div className="mt-3 md:mt-4 text-center">
        <Link
          href="/quick-purchase"
          onClick={() => window.scrollTo(0, 0)}
          className="text-red-600 hover:text-red-700 font-medium text-sm md:text-base"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  </div>
</div>

            </div>
          )}
        </div>
      </section>
    </div>
  )
}
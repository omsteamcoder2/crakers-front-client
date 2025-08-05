"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

interface Product {
  id: string;
  productName: string;
  productCode: string;
  price: number;
  quantity: number;
  boxQuantity?: string;
  piecesPerBox?: number;
}

export default function CheckoutPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [contact, setContact] = useState({
    name: "",
    phone: "",
    address: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    phone: "",
    address: "",
  });
  const [isLoading, setIsLoading] = useState(true);

  const nameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLTextAreaElement>(null);

  const packingCharges = 50;

  useEffect(() => {
    const loadCartData = () => {
      try {
        const data = localStorage.getItem("checkoutProducts");
        if (data) {
          const parsedData = JSON.parse(data);
          
          // Transform to ensure we only keep needed fields
          const checkoutProducts = parsedData.map((item: any) => ({
            id: item.id,
            productName: item.productName || item.name,
            productCode: item.productCode || '',
            price: item.price,
            quantity: item.quantity,
            boxQuantity: item.boxQuantity,
            piecesPerBox: item.piecesPerBox
          }));

          setProducts(checkoutProducts);
        } else {
          // Redirect if no cart data exists
          window.location.href = "/cart";
        }
      } catch (error) {
        console.error("Failed to load cart data:", error);
        window.location.href = "/cart";
      } finally {
        setIsLoading(false);
      }
    };

    loadCartData();
  }, []);

  const totalAmount = products.reduce((sum, p) => sum + p.price * p.quantity, 0);
  const grandTotal = totalAmount + packingCharges;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContact((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

const handleConfirmOrder = async () => {
  // Validate contact information
  const newErrors = {
    name: contact.name.trim() === "" ? "Please enter your full name" : "",
    phone:
      contact.phone.trim() === ""
        ? "Please enter your phone number"
        : !/^\d{10}$/.test(contact.phone.trim())
        ? "Phone number must be 10 digits"
        : "",
    address: contact.address.trim() === "" ? "Please enter your delivery address" : "",
  };

  setErrors(newErrors);

  const firstErrorField = Object.entries(newErrors).find(([_, msg]) => msg !== "");
  if (firstErrorField) {
    const [field] = firstErrorField;
    // Scroll to the first error field
    if (field === "name" && nameRef.current)
      nameRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    if (field === "phone" && phoneRef.current)
      phoneRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    if (field === "address" && addressRef.current)
      addressRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    return;
  }

  // Prepare order details
  const orderDetails = products
    .map(
      (p) =>
        `${p.productName} (${p.productCode}) - Qty: ${p.quantity} - ₹${p.price * p.quantity}${
          p.boxQuantity ? ` (Box: ${p.boxQuantity})` : ""
        }${p.piecesPerBox ? ` (${p.piecesPerBox} pcs/box)` : ""}`
    )
    .join("\n");

  const whatsappMessage = `Hi Crakers, I want to place an order:\n\n${orderDetails}\n\nItems Total: ₹${totalAmount}\nPacking Charges: ₹${packingCharges}\nGrand Total: ₹${grandTotal}\n\nCustomer Name: ${contact.name}\nPhone: ${contact.phone}\nAddress: ${contact.address}`;

  const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(whatsappMessage)}`;

  try {
    // Submit the order to the backend
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        products,
        contact,
        total: grandTotal,
        packingCharges,
      }),
    });

    if (!res.ok) throw new Error("Failed to place order");

    // Store order details in localStorage for the success page
    localStorage.setItem(
      "orderDetails",
      JSON.stringify({
        itemsTotal: totalAmount,
        packingCharges,
        grandTotal,
        products,
      })
    );

    // Remove the checkout products from localStorage (if needed)
    localStorage.removeItem("checkoutProducts");

    // Open WhatsApp
    window.open(whatsappUrl, "_blank");

    // Redirect the user to the order success page
    window.location.href = "/order-success"; // Or use router.push("/order-success") for a more Next.js-centric approach
  } catch (error) {
    console.error("Order submission error:", error);
    alert("Failed to place order. Please try again.");
  }
};


  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="max-w-4xl mx-auto py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">No Products Found</h2>
        <Link 
          href="/cart" 
          className="text-blue-600 hover:underline font-medium"
        >
          Return to Cart
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-2 sm:py-4 md:py-6 px-3 sm:px-4 md:px-6">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 text-center text-gray-800">🧨 Checkout</h1>

      {/* Product List */}
<div className="border border-gray-200 rounded-lg p-2 sm:p-3 md:p-4 mb-4 sm:mb-8 bg-white shadow-lg">
  <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">Your Products</h2>
  
  {products.map((product) => (
    <div
      key={product.id}
      className="flex justify-between items-center p-2 mb-2 md:mb-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-all ease-in-out"
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
        <div>
          <div className="font-semibold text-sm sm:text-base text-gray-800">{product.productName}</div>
          <div className="text-xs sm:text-sm text-gray-600 mt-1">Qty: {product.quantity}</div>
        </div>
      </div>

      <div className="font-bold text-red-600 text-sm sm:text-base md:text-lg">
        ₹{(product.price * product.quantity).toLocaleString()}
      </div>
    </div>
  ))}
</div>


      {/* Order Summary */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 sm:p-4 mb-6 sm:mb-8">
        <h2 className="text-base sm:text-lg font-semibold text-gray-700 mb-2 sm:mb-3">Order Summary</h2>
        <div className="space-y-1 text-xs sm:text-sm text-gray-700">
          <div className="flex justify-between">
            <span>Items Total</span>
            <span>₹{totalAmount.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span>Packing Charges</span>
            <span>₹{packingCharges}</span>
          </div>
          <hr className="my-1 sm:my-2" />
          <div className="flex justify-between font-bold text-sm sm:text-base text-gray-900">
            <span>Grand Total</span>
            <span>₹{grandTotal.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <div className="bg-white p-3 sm:p-4 md:p-5 rounded-lg shadow-md space-y-3 sm:space-y-4 border border-gray-200">
        <h2 className="text-base sm:text-lg font-semibold text-gray-700">Contact Details</h2>

        {/* Name */}
        <div>
          <label className="block text-xs sm:text-sm font-medium text-gray-600 mb-1">Full Name</label>
          <input
            ref={nameRef}
            name="name"
            placeholder="Enter your name"
            value={contact.name}
            onChange={handleInputChange}
            className={`w-full border rounded px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm focus:ring focus:ring-blue-200 outline-none ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.name && <p className="text-red-600 text-xs mt-1">{errors.name}</p>}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-xs sm:text-sm font-medium text-gray-600 mb-1">Phone Number</label>
          <input
            ref={phoneRef}
            name="phone"
            placeholder="Enter phone number"
            value={contact.phone}
            onChange={handleInputChange}
            className={`w-full border rounded px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm focus:ring focus:ring-blue-200 outline-none ${
              errors.phone ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.phone && <p className="text-red-600 text-xs mt-1">{errors.phone}</p>}
        </div>

        {/* Address */}
        <div>
          <label className="block text-xs sm:text-sm font-medium text-gray-600 mb-1">Address</label>
          <textarea
            ref={addressRef}
            name="address"
            placeholder="Delivery address"
            value={contact.address}
            onChange={handleInputChange}
            rows={3}
            className={`w-full border rounded px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm focus:ring focus:ring-blue-200 outline-none ${
              errors.address ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.address && <p className="text-red-600 text-xs mt-1">{errors.address}</p>}
        </div>

        <button
          onClick={handleConfirmOrder}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-1 sm:py-2 rounded-md font-medium text-xs sm:text-sm transition-all"
        >
          Confirm & Place Order
        </button>
      </div>
    </div>
  );
}
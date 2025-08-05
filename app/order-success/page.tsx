"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle, Home, ShoppingBag, AlertCircle } from "lucide-react";

const OrderSuccessPage = () => {
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const order = JSON.parse(localStorage.getItem("orderDetails") || "{}");
    if (Object.keys(order).length === 0) {
      window.location.href = "/";
      return;
    }
    setOrderDetails(order);
    localStorage.removeItem("orderDetails");
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-2 sm:px-4">
      <div className="max-w-3xl mx-auto">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Order Placed Successfully!
          </h1>
          <p className="text-gray-600 max-w-lg mx-auto">
            Thank you for your purchase. Your order has been received and is being processed.
          </p>
        </div>

        {/* Important Notice */}
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8 rounded-r-lg">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertCircle className="h-5 w-5 text-yellow-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                <strong>Important:</strong> Your order has been saved in our system. Please complete the 
                WhatsApp confirmation when prompted to finalize your order details with our team.
              </p>
            </div>
          </div>
        </div>

        {/* Order Summary Card */}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900 flex items-center">
              <ShoppingBag className="mr-2 h-5 w-5 text-blue-500" />
              Order Summary
            </h3>
          </div>
          <div className="px-2 md:px-4 py-5 sm:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Order Details */}
              <div>
                <h4 className="text-md font-medium text-gray-900 mb-3">Order Details</h4>
                <ul className="space-y-3">
                  {orderDetails.products.map((product: any, index: number) => (
                    <li key={index} className="flex justify-between items-start">
                      <div>
                        <span className="font-medium text-gray-900">{product.productName}</span>
                        {product.productCode && (
                          <span className="block text-xs text-gray-500">Code: {product.productCode}</span>
                        )}
                      </div>
                      <div className="text-right">
                        <span className="block">Qty: {product.quantity}</span>
                        <span className="block text-sm font-medium">
                          ₹{(product.price * product.quantity).toLocaleString()}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Payment Summary */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="text-md font-medium text-gray-900 mb-3">Payment Summary</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span>₹{orderDetails.itemsTotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Packing Charges</span>
                    <span>₹{orderDetails.packingCharges}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-2 mt-2">
                    <div className="flex justify-between font-semibold">
                      <span className="text-gray-900">Grand Total</span>
                      <span className="text-lg text-blue-600">
                        ₹{orderDetails.grandTotal.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Customer Support */}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Need Help?</h3>
          </div>
          <div className="px-4 py-5 sm:p-6">
            <p className="text-gray-600 mb-4">
              If you have any questions about your order, please contact our customer support.
            </p>
            <div className="space-y-2">
              <p className="text-sm">
                <span className="font-medium">Phone:</span> +91 9876543210
              </p>
              <p className="text-sm">
                <span className="font-medium">Email:</span> support@crakers.com
              </p>
            </div>
          </div>
        </div>

        {/* Continue Shopping Button */}
        <div className="text-center">
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Home className="mr-2 h-5 w-5" />
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
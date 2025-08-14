import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { CheckCircle, Home, ShoppingCart, Phone } from 'lucide-react';

const ThankYou: React.FC = () => {
  const location = useLocation();
  const { orderData, orderId, totalAmount } = location.state || {};

  return (
    <div className="pt-16 min-h-screen bg-gradient-to-br from-lime-50 to-orange-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Thank You!</h1>
          <p className="text-xl text-gray-600">
            Your order has been placed successfully
          </p>
        </div>

        {orderData && (
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Order Summary</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Customer Details</h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-gray-600">Name:</span>
                    <span className="ml-2 font-medium">{orderData.fullName}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">WhatsApp:</span>
                    <span className="ml-2 font-medium">{orderData.whatsappNumber}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Delivery Address:</span>
                    <span className="ml-2 font-medium">{orderData.deliveryAddress}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Order Details</h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-gray-600">Quantity:</span>
                    <span className="ml-2 font-medium">{orderData.quantity}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Number of Bottles:</span>
                    <span className="ml-2 font-medium">{orderData.numberOfBottles}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Total Amount:</span>
                    <span className="ml-2 font-bold text-lime-600">LKR {totalAmount?.toLocaleString()}/=</span>
                  </div>
                  {orderId && (
                    <div>
                      <span className="text-gray-600">Order ID:</span>
                      <span className="ml-2 font-medium text-sm bg-gray-100 px-2 py-1 rounded">
                        {orderId.toString().slice(-8)}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">What Happens Next?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 border border-gray-200 rounded-lg">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">1. Confirmation Call</h3>
              <p className="text-gray-600 text-sm">
                We'll contact you via WhatsApp within 1-2 hours to confirm your order details
              </p>
            </div>

            <div className="text-center p-6 border border-gray-200 rounded-lg">
              <div className="w-12 h-12 bg-lime-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingCart className="w-6 h-6 text-lime-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">2. Fresh Preparation</h3>
              <p className="text-gray-600 text-sm">
                Your lime pickle will be freshly prepared with our authentic recipe
              </p>
            </div>

            <div className="text-center p-6 border border-gray-200 rounded-lg">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">3. Home Delivery</h3>
              <p className="text-gray-600 text-sm">
                Your order will be delivered to your address within 2-3 business days
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-lime-500 to-orange-500 rounded-2xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Payment Information</h2>
          <p className="text-lime-100 mb-6">
            Payment will be collected upon delivery. Please keep the exact amount ready.
          </p>
          <div className="text-3xl font-bold">
            LKR {totalAmount?.toLocaleString()}/= (Cash on Delivery)
          </div>
        </div>

        <div className="text-center mt-12 space-y-4">
          <p className="text-gray-600">
            Need help? Contact us or visit our social media pages for updates.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="inline-flex items-center justify-center px-6 py-3 bg-lime-500 text-white font-semibold rounded-lg hover:bg-lime-600 transition-colors duration-200"
            >
              <Home className="w-5 h-5 mr-2" />
              Back to Home
            </Link>
            <Link
              to="/products"
              className="inline-flex items-center justify-center px-6 py-3 border-2 border-lime-500 text-lime-600 font-semibold rounded-lg hover:bg-lime-50 transition-colors duration-200"
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              Order More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;
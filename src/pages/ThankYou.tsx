import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { CheckCircle, Home, ShoppingCart, Phone } from 'lucide-react';

const ThankYou: React.FC = () => {
  const location = useLocation();
  const { orderData, orderId, totalAmount } = location.state || {};

  return (
    <div className="pt-16 min-h-screen bg-gradient-to-br from-lime-50 via-green-50 to-orange-50 relative overflow-hidden">
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-lime-200/30 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-orange-200/30 rounded-full blur-3xl"></div>
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <div className="relative inline-flex items-center justify-center mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full blur-2xl opacity-30 animate-pulse"></div>
            <div className="relative w-32 h-32 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-2xl">
              <CheckCircle className="w-16 h-16 text-white animate-bounce" />
            </div>
          </div>
          <div className="space-y-6">
            <div className="inline-flex items-center px-6 py-3 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
              🎉 Order Confirmed
            </div>
            <h1 className="text-6xl md:text-7xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Thank You!
              </span>
            </h1>
            <p className="text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Your order has been placed successfully and is being processed with care
            </p>
          </div>
        </div>

        {orderData && (
          <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-10 mb-10 hover:shadow-3xl transition-all duration-500">
            <div className="mb-8">
              <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold mb-4">
                📋 Order Summary
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-3">Your Order Details</h2>
              <p className="text-gray-600 leading-relaxed">
                Here's a complete summary of your order. Keep this for your records.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                    <div className="w-8 h-8 bg-lime-100 rounded-full flex items-center justify-center mr-3">
                      <div className="w-3 h-3 bg-lime-500 rounded-full"></div>
                    </div>
                    Customer Details
                  </h3>
                  <div className="space-y-4">
                    {[
                      { label: 'Name', value: orderData.fullName, icon: '👤' },
                      { label: 'WhatsApp', value: orderData.whatsappNumber, icon: '📱' },
                      { 
                        label: 'Delivery Address', 
                        value: [
                          orderData.deliveryAddressLine1,
                          orderData.deliveryAddressLine2,
                          orderData.deliveryAddressDistrict,
                          orderData.province,
                          `${orderData.district} ${orderData.postalCode || ''}`.trim()
                        ].filter(Boolean).join(', '),
                        icon: '📍'
                      }
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                        <div className="text-2xl">{item.icon}</div>
                        <div className="flex-1">
                          <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">{item.label}</span>
                          <p className="text-gray-900 font-medium mt-1 leading-relaxed">{item.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-3">
                      <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                    </div>
                    Order Details
                  </h3>
                  <div className="space-y-4">
                    {[
                      { label: 'Quantity', value: orderData.quantity, icon: '🌶️' },
                      { label: 'Number of Bottles', value: orderData.numberOfBottles, icon: '🫙' },
                      { label: 'Total Amount', value: `LKR ${totalAmount?.toLocaleString()}/=`, icon: '💰', special: true },
                      ...(orderId ? [{ 
                        label: 'Order ID', 
                        value: `#${orderId.toString().slice(-8)}`, 
                        icon: '🔢' 
                      }] : [])
                    ].map((item, idx) => (
                      <div key={idx} className={`flex items-start space-x-4 p-4 rounded-xl border ${
                        item.special 
                          ? 'bg-gradient-to-r from-lime-50 to-green-50 border-lime-200' 
                          : 'bg-gray-50 border-gray-100'
                      }`}>
                        <div className="text-2xl">{item.icon}</div>
                        <div className="flex-1">
                          <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">{item.label}</span>
                          <p className={`font-medium mt-1 ${
                            item.special 
                              ? 'text-2xl text-lime-600 font-bold' 
                              : 'text-gray-900'
                          }`}>
                            {item.value}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-10 mb-10 hover:shadow-3xl transition-all duration-500">
          <div className="mb-8">
            <div className="inline-flex items-center px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-semibold mb-4">
              🚀 Next Steps
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">What Happens Next?</h2>
            <p className="text-gray-600 leading-relaxed">
              Here's the simple process we follow to get your delicious lime pickle to you.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '1',
                title: 'Confirmation Call',
                description: "We'll contact you via WhatsApp within 1-2 hours to confirm your order details",
                icon: Phone,
                color: 'blue',
                time: '1-2 hours'
              },
              {
                step: '2', 
                title: 'Fresh Preparation',
                description: 'Your lime pickle will be freshly prepared with our authentic recipe',
                icon: ShoppingCart,
                color: 'lime',
                time: '1 day'
              },
              {
                step: '3',
                title: 'Home Delivery', 
                description: 'Your order will be delivered to your address within 2-3 business days',
                icon: () => (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                ),
                color: 'orange',
                time: '2-3 days'
              }
            ].map((item, idx) => (
              <div key={idx} className="group relative">
                <div className="text-center p-8 border-2 border-gray-100 rounded-3xl group-hover:border-gray-200 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                  <div className="relative mb-6">
                    <div className={`w-20 h-20 bg-gradient-to-br from-${item.color}-100 to-${item.color}-200 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300`}>
                      <item.icon className={`w-8 h-8 text-${item.color}-600`} />
                    </div>
                    <div className={`absolute -top-3 -right-3 w-8 h-8 bg-${item.color}-500 text-white rounded-full flex items-center justify-center font-bold text-sm`}>
                      {item.step}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-gray-700 transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {item.description}
                  </p>
                  <div className={`inline-flex items-center px-3 py-1 bg-${item.color}-50 text-${item.color}-700 rounded-full text-sm font-semibold`}>
                    ⏱️ {item.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-lime-500 via-green-500 to-orange-500 rounded-3xl p-10 text-white text-center shadow-2xl border border-white/20 mb-10">
          <div className="space-y-6">
            <div className="inline-flex items-center px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full text-white font-semibold">
              💳 Payment Info
            </div>
            <h2 className="text-4xl font-bold mb-4">Payment Information</h2>
            <p className="text-xl text-lime-50/90 mb-8 max-w-2xl mx-auto leading-relaxed">
              Payment will be collected upon delivery. Please keep the exact amount ready for a smooth transaction.
            </p>
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-8 border border-white/30">
              <div className="text-5xl font-bold mb-2">
                LKR {totalAmount?.toLocaleString()}/=
              </div>
              <div className="text-xl text-lime-100 font-semibold">
                💵 Cash on Delivery
              </div>
            </div>
          </div>
        </div>

        <div className="text-center space-y-8">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-gray-900">Need Help?</h3>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Contact us or visit our social media pages for updates and support.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              to="/"
              className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-lime-500 to-green-600 text-white font-bold rounded-2xl hover:from-lime-600 hover:to-green-700 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 transform text-lg"
            >
              <Home className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform duration-300" />
              Back to Home
            </Link>
            <Link
              to="/products"
              className="group inline-flex items-center justify-center px-8 py-4 border-2 border-lime-500 text-lime-600 font-bold rounded-2xl hover:bg-lime-50 hover:border-lime-600 transition-all duration-300 hover:scale-105 transform text-lg"
            >
              <ShoppingCart className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform duration-300" />
              Order More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;
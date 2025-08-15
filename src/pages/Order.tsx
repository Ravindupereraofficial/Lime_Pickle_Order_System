import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { ShoppingCart, Calculator, CheckCircle, Mail, User, MapPin, Phone, Package, CreditCard, Truck, Shield, Star } from 'lucide-react';
import { supabase } from '../lib/supabase';
import emailjs from 'emailjs-com';
import { testEmailJS, testMinimalEmail } from '../lib/emailjs-test';

interface OrderForm {
  fullName: string;
  address: string;
  deliveryAddress: string;
  whatsappNumber: string;
  quantity: string;
  numberOfBottles: number;
}

const Order: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting }
  } = useForm<OrderForm>();

  const [totalAmount, setTotalAmount] = useState(0);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const selectedQuantity = watch('quantity');
  const numberOfBottles = watch('numberOfBottles');

  const priceList = {
    '300 g': 650,
    '500 g': 850,
    '1 kg': 1450
  };

  // Set default selected size from products page
  useEffect(() => {
    if (location.state?.selectedSize) {
      setValue('quantity', location.state.selectedSize);
    }
  }, [location.state, setValue]);

  // Calculate total amount when quantity or bottles change
  useEffect(() => {
    if (selectedQuantity && numberOfBottles > 0) {
      const price = priceList[selectedQuantity as keyof typeof priceList];
      setTotalAmount(price * numberOfBottles);
    } else {
      setTotalAmount(0);
    }
  }, [selectedQuantity, numberOfBottles]);

  const onSubmit = async (data: OrderForm) => {
    try {
      console.log('Submitting order with data:', data);
      console.log('Total amount:', totalAmount);
      
      // Save order to Supabase database
      const { data: orderData, error } = await supabase
        .from('orders')
        .insert([
          {
            full_name: data.fullName,
            address: data.address,
            delivery_address: data.deliveryAddress,
            whatsapp_number: data.whatsappNumber,
            quantity: data.quantity,
            number_of_bottles: Number(data.numberOfBottles),
            total_amount: totalAmount
          }
        ])
        .select()
        .single();

      if (error) {
        throw error;
      }

      const orderId = orderData.id;
      console.log('Order created successfully with ID:', orderId);

      // Send email using EmailJS with better error handling
      try {
        console.log('Attempting to send email...');
        
        // Use the EmailJS configuration from the lib
        const emailParams = {
          to_email: 'ravindurandika2004@gmail.com',
          from_name: data.fullName,
          order_id: orderId,
          full_name: data.fullName,
          address: data.address,
          delivery_address: data.deliveryAddress,
          whatsapp_number: data.whatsappNumber,
          quantity: data.quantity,
          number_of_bottles: data.numberOfBottles,
          total_amount: totalAmount,
          order_date: new Date().toLocaleDateString()
        };

        console.log('Email parameters:', emailParams);

        // Send email using EmailJS
        const result = await emailjs.send(
          'service_loylxbw',  // Your EmailJS Service ID
          'template_u565g9w', // Your EmailJS Template ID
          emailParams,
          '00UOPjZ64lj9YNzvA' // Your EmailJS Public Key
        );

        console.log('Email sent successfully!', result);
      } catch (emailError) {
        console.error('EmailJS Error Details:', {
          message: emailError.message,
          status: emailError.status,
          text: emailError.text,
          response: emailError.response
        });
        
        // Continue with order success even if email fails
        console.log('Order saved but email failed. Customer will be contacted via WhatsApp.');
      }

      setOrderSuccess(true);
      
      // Redirect to thank you page after 3 seconds
      setTimeout(() => {
        navigate('/thank-you', { 
          state: { 
            orderData: data, 
            orderId: orderId,
            totalAmount: totalAmount 
          } 
        });
      }, 3000);

    } catch (error) {
      console.error('Error submitting order:', error);
      console.error('Error details:', {
        message: error.message,
        stack: error.stack,
        name: error.name
      });
      alert('There was an error submitting your order. Please try again.');
    }
  };

  if (orderSuccess) {
    return (
      <div className="pt-16 min-h-screen bg-gradient-to-br from-lime-50 to-orange-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white p-10 rounded-3xl shadow-2xl text-center transform animate-fade-in">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-500" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Order Placed Successfully!</h2>
          <p className="text-gray-600 mb-8 text-lg">
            Thank you for your order. We'll contact you shortly via WhatsApp to confirm the details.
          </p>
          <div className="flex items-center justify-center space-x-2">
            <div className="animate-spin w-6 h-6 border-3 border-lime-500 border-t-transparent rounded-full"></div>
            <span className="text-lime-600 font-medium">Redirecting...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16 min-h-screen bg-gradient-to-br from-gray-50 to-lime-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-lime-500 via-lime-400 to-orange-400 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Place Your Order
          </h1>
          <p className="text-xl md:text-2xl text-lime-50 max-w-3xl mx-auto">
            Experience the authentic taste of homemade lime pickle. Fill in your details below and we'll prepare your fresh order with care.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Order Form */}
          <div className="xl:col-span-2">
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
              <div className="bg-gradient-to-r from-lime-500 to-orange-500 px-8 py-6">
                <h2 className="text-2xl font-bold text-white flex items-center">
                  <User className="w-6 h-6 mr-3" />
                  Order Details
                </h2>
                <p className="text-lime-100 mt-2">Please provide your information to complete your order</p>
              </div>
              
              <div className="p-8">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                  {/* Personal Information Section */}
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
                      Personal Information
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                          Full Name *
                        </label>
                        <div className="relative">
                          <input
                            {...register('fullName', { required: 'Full name is required' })}
                            type="text"
                            className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-lime-100 focus:border-lime-500 transition-all duration-200 text-lg"
                            placeholder="Enter your full name"
                          />
                          <User className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        </div>
                        {errors.fullName && (
                          <p className="mt-2 text-sm text-red-600 flex items-center">
                            <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                            {errors.fullName.message}
                          </p>
                        )}
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                          Address *
                        </label>
                        <div className="relative">
                          <textarea
                            {...register('address', { required: 'Address is required' })}
                            rows={3}
                            className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-lime-100 focus:border-lime-500 transition-all duration-200 text-lg resize-none"
                            placeholder="Enter your complete address"
                          />
                          <MapPin className="absolute right-4 top-4 w-5 h-5 text-gray-400" />
                        </div>
                        {errors.address && (
                          <p className="mt-2 text-sm text-red-600 flex items-center">
                            <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                            {errors.address.message}
                          </p>
                        )}
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                          Delivery Address *
                        </label>
                        <div className="relative">
                          <textarea
                            {...register('deliveryAddress', { required: 'Delivery address is required' })}
                            rows={3}
                            className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-lime-100 focus:border-lime-500 transition-all duration-200 text-lg resize-none"
                            placeholder="Enter delivery address (if different from above)"
                          />
                          <Truck className="absolute right-4 top-4 w-5 h-5 text-gray-400" />
                        </div>
                        {errors.deliveryAddress && (
                          <p className="mt-2 text-sm text-red-600 flex items-center">
                            <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                            {errors.deliveryAddress.message}
                          </p>
                        )}
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                          WhatsApp Number *
                        </label>
                        <div className="relative">
                          <input
                            {...register('whatsappNumber', {
                              required: 'WhatsApp number is required',
                              pattern: {
                                value: /^[0-9+\-\s()]+$/,
                                message: 'Please enter a valid phone number'
                              }
                            })}
                            type="tel"
                            className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-lime-100 focus:border-lime-500 transition-all duration-200 text-lg"
                            placeholder="Enter your WhatsApp number"
                          />
                          <Phone className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        </div>
                        {errors.whatsappNumber && (
                          <p className="mt-2 text-sm text-red-600 flex items-center">
                            <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                            {errors.whatsappNumber.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Product Selection Section */}
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
                      Product Selection
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                          Quantity *
                        </label>
                        <div className="relative">
                          <select
                            {...register('quantity', { required: 'Please select a quantity' })}
                            className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-lime-100 focus:border-lime-500 transition-all duration-200 text-lg appearance-none cursor-pointer"
                          >
                            <option value="">Select quantity</option>
                            <option value="300 g">300 g - LKR 650/=</option>
                            <option value="500 g">500 g - LKR 850/=</option>
                            <option value="1 kg">1 kg - LKR 1450/=</option>
                          </select>
                          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        </div>
                        {errors.quantity && (
                          <p className="mt-2 text-sm text-red-600 flex items-center">
                            <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                            {errors.quantity.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                          Number of Bottles *
                        </label>
                        <div className="relative">
                          <input
                            {...register('numberOfBottles', {
                              required: 'Number of bottles is required',
                              min: { value: 1, message: 'Minimum 1 bottle required' },
                              max: { value: 50, message: 'Maximum 50 bottles per order' }
                            })}
                            type="number"
                            min="1"
                            max="50"
                            className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-lime-100 focus:border-lime-500 transition-all duration-200 text-lg"
                            placeholder="Enter number of bottles"
                          />
                          <Package className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        </div>
                        {errors.numberOfBottles && (
                          <p className="mt-2 text-sm text-red-600 flex items-center">
                            <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                            {errors.numberOfBottles.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-6">
                    <button
                      type="submit"
                      disabled={isSubmitting || !totalAmount}
                      className="w-full bg-gradient-to-r from-lime-500 to-orange-500 text-white py-5 px-8 rounded-2xl font-bold text-xl hover:from-lime-600 hover:to-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 shadow-2xl flex items-center justify-center"
                    >
                      {isSubmitting ? (
                        <div className="animate-spin w-6 h-6 border-3 border-white border-t-transparent rounded-full mr-3"></div>
                      ) : (
                        <ShoppingCart className="w-6 h-6 mr-3" />
                      )}
                      {isSubmitting ? 'Processing Your Order...' : 'Place Order Now'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Order Summary & Sidebar */}
          <div className="space-y-8">
            {/* Order Summary */}
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-5">
                <h2 className="text-xl font-bold text-white flex items-center">
                  <Calculator className="w-6 h-6 mr-3" />
                  Order Summary
                </h2>
              </div>

              <div className="p-6 space-y-4">
                <div className="flex justify-between py-3 border-b border-gray-100">
                  <span className="text-gray-600 font-medium">Selected Size:</span>
                  <span className="font-semibold text-gray-800">
                    {selectedQuantity || 'Not selected'}
                  </span>
                </div>
                
                <div className="flex justify-between py-3 border-b border-gray-100">
                  <span className="text-gray-600 font-medium">Number of Bottles:</span>
                  <span className="font-semibold text-gray-800">
                    {numberOfBottles || 0}
                  </span>
                </div>
                
                <div className="flex justify-between py-3 border-b border-gray-100">
                  <span className="text-gray-600 font-medium">Price per bottle:</span>
                  <span className="font-semibold text-gray-800">
                    {selectedQuantity ? `LKR ${priceList[selectedQuantity as keyof typeof priceList]}/=` : 'LKR 0/='}
                  </span>
                </div>

                <div className="bg-gradient-to-r from-lime-50 to-orange-50 p-6 rounded-2xl border-2 border-lime-200">
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-gray-800">Total Amount:</span>
                    <span className="text-3xl font-bold text-lime-600">
                      LKR {totalAmount.toLocaleString()}/=
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Process */}
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
              <div className="bg-gradient-to-r from-green-500 to-green-600 px-6 py-5">
                <h3 className="text-xl font-bold text-white flex items-center">
                  <Shield className="w-6 h-6 mr-3" />
                  Order Process
                </h3>
              </div>
              
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-green-600 font-bold text-sm">1</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">Order Confirmation</p>
                      <p className="text-sm text-gray-600">Via WhatsApp within 1 hour</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-blue-600 font-bold text-sm">2</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">Fresh Preparation</p>
                      <p className="text-sm text-gray-600">Handcrafted with care</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-purple-600 font-bold text-sm">3</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">Quality Packaging</p>
                      <p className="text-sm text-gray-600">Secure & hygienic</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-orange-600 font-bold text-sm">4</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">Home Delivery</p>
                      <p className="text-sm text-gray-600">Within 2-3 days</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-red-600 font-bold text-sm">5</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">Payment</p>
                      <p className="text-sm text-gray-600">Cash on delivery</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 px-6 py-5">
                <h3 className="text-xl font-bold text-white flex items-center">
                  <Star className="w-6 h-6 mr-3" />
                  Why Trust Us?
                </h3>
              </div>
              
              <div className="p-6 space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-lime-100 rounded-full flex items-center justify-center">
                    <Shield className="w-5 h-5 text-lime-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">100% Natural</p>
                    <p className="text-sm text-gray-600">No artificial preservatives</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                    <Truck className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Fast Delivery</p>
                    <p className="text-sm text-gray-600">2-3 days nationwide</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Secure Payment</p>
                    <p className="text-sm text-gray-600">Pay on delivery</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Test Email Button - Remove this after testing */}
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
              <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 px-6 py-5">
                <h3 className="text-xl font-bold text-white flex items-center">
                  <Mail className="w-6 h-6 mr-3" />
                  Debug EmailJS
                </h3>
              </div>
              
              <div className="p-6">
                <button
                  onClick={async () => {
                    console.log('Testing EmailJS...');
                    const result = await testEmailJS();
                    if (result.success) {
                      alert('Test email sent successfully! Check your email.');
                    } else {
                      alert('Test email failed. Check console for details.');
                    }
                  }}
                  className="w-full bg-yellow-500 text-white py-3 px-4 rounded-xl hover:bg-yellow-600 transition-colors duration-200 flex items-center justify-center font-medium"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Test EmailJS Connection
                </button>
                <p className="text-xs text-yellow-700 mt-3 text-center">
                  This button is for testing only. Remove after EmailJS is working.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
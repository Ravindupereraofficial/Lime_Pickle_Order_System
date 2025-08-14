import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { ShoppingCart, Calculator, CheckCircle, Mail } from 'lucide-react';
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
      <div className="pt-16 min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Order Placed Successfully!</h2>
          <p className="text-gray-600 mb-6">
            Thank you for your order. We'll contact you shortly via WhatsApp to confirm the details.
          </p>
          <div className="animate-spin w-8 h-8 border-4 border-lime-500 border-t-transparent rounded-full mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Place Your Order</h1>
          <p className="text-xl text-gray-600">
            Fill in your details below and we'll prepare your fresh lime pickle
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Order Form */}
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Order Details</h2>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  {...register('fullName', { required: 'Full name is required' })}
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-lime-500"
                  placeholder="Enter your full name"
                />
                {errors.fullName && (
                  <p className="mt-1 text-sm text-red-600">{errors.fullName.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address *
                </label>
                <textarea
                  {...register('address', { required: 'Address is required' })}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-lime-500"
                  placeholder="Enter your address"
                />
                {errors.address && (
                  <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Delivery Address *
                </label>
                <textarea
                  {...register('deliveryAddress', { required: 'Delivery address is required' })}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-lime-500"
                  placeholder="Enter delivery address (if different from above)"
                />
                {errors.deliveryAddress && (
                  <p className="mt-1 text-sm text-red-600">{errors.deliveryAddress.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  WhatsApp Number *
                </label>
                <input
                  {...register('whatsappNumber', {
                    required: 'WhatsApp number is required',
                    pattern: {
                      value: /^[0-9+\-\s()]+$/,
                      message: 'Please enter a valid phone number'
                    }
                  })}
                  type="tel"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-lime-500"
                  placeholder="Enter your WhatsApp number"
                />
                {errors.whatsappNumber && (
                  <p className="mt-1 text-sm text-red-600">{errors.whatsappNumber.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity *
                </label>
                <select
                  {...register('quantity', { required: 'Please select a quantity' })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-lime-500"
                >
                  <option value="">Select quantity</option>
                  <option value="300 g">300 g - LKR 650/=</option>
                  <option value="500 g">500 g - LKR 850/=</option>
                  <option value="1 kg">1 kg - LKR 1450/=</option>
                </select>
                {errors.quantity && (
                  <p className="mt-1 text-sm text-red-600">{errors.quantity.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Bottles *
                </label>
                <input
                  {...register('numberOfBottles', {
                    required: 'Number of bottles is required',
                    min: { value: 1, message: 'Minimum 1 bottle required' },
                    max: { value: 50, message: 'Maximum 50 bottles per order' }
                  })}
                  type="number"
                  min="1"
                  max="50"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-lime-500"
                  placeholder="Enter number of bottles"
                />
                {errors.numberOfBottles && (
                  <p className="mt-1 text-sm text-red-600">{errors.numberOfBottles.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !totalAmount}
                className="w-full bg-lime-500 text-white py-4 px-6 rounded-lg font-semibold hover:bg-lime-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center"
              >
                {isSubmitting ? (
                  <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                ) : (
                  <ShoppingCart className="w-5 h-5 mr-2" />
                )}
                {isSubmitting ? 'Processing...' : 'Proceed Order'}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
              <Calculator className="w-6 h-6 mr-2 text-lime-500" />
              Order Summary
            </h2>

            <div className="space-y-4 mb-8">
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="text-gray-600">Selected Size:</span>
                <span className="font-medium">
                  {selectedQuantity || 'Not selected'}
                </span>
              </div>
              
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="text-gray-600">Number of Bottles:</span>
                <span className="font-medium">
                  {numberOfBottles || 0}
                </span>
              </div>
              
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="text-gray-600">Price per bottle:</span>
                <span className="font-medium">
                  {selectedQuantity ? `LKR ${priceList[selectedQuantity as keyof typeof priceList]}/=` : 'LKR 0/='}
                </span>
              </div>
            </div>

            <div className="bg-lime-50 p-6 rounded-lg border border-lime-200">
              <div className="flex justify-between items-center">
                <span className="text-xl font-semibold text-gray-800">Total Amount:</span>
                <span className="text-2xl font-bold text-lime-600">
                  LKR {totalAmount.toLocaleString()}/=
                </span>
              </div>
            </div>

            <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h3 className="font-semibold text-blue-800 mb-2">Order Process:</h3>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Order confirmation via WhatsApp</li>
                <li>• Fresh preparation of your lime pickle</li>
                <li>• Quality packaging</li>
                <li>• Home delivery within 2-3 days</li>
                <li>• Payment on delivery</li>
              </ul>
            </div>

            {/* Test Email Button - Remove this after testing */}
            <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <h3 className="font-semibold text-yellow-800 mb-2">Debug EmailJS:</h3>
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
                className="w-full bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600 transition-colors duration-200 flex items-center justify-center"
              >
                <Mail className="w-4 h-4 mr-2" />
                Test EmailJS Connection
              </button>
              <p className="text-xs text-yellow-700 mt-2">
                This button is for testing only. Remove after EmailJS is working.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { ShoppingCart, Calculator, CheckCircle, Mail, User, MapPin, Phone, Package, CreditCard, Truck, Shield, Star } from 'lucide-react';
import { supabase } from '../lib/supabase';
import emailjs from 'emailjs-com';
import { testEmailJS, testMinimalEmail, testDefaultTemplate } from '../lib/emailjs-test';

interface OrderForm {
  fullName: string;
  province: string;
  district: string;
  postalCode: string;
  addressLine1: string;
  addressLine2: string;
  addressDistrict: string;
  deliveryAddressLine1: string;
  deliveryAddressLine2: string;
  deliveryAddressDistrict: string;
  whatsappNumber: string;
  quantity: string;
  numberOfBottles: number;
}
// Sri Lanka provinces, districts, and main postal codes
const slProvinces = [
  {
    name: 'Western',
    districts: [
      { name: 'Colombo', postalCode: '00100' },
      { name: 'Gampaha', postalCode: '11000' },
      { name: 'Kalutara', postalCode: '12000' }
    ]
  },
  {
    name: 'Central',
    districts: [
      { name: 'Kandy', postalCode: '20000' },
      { name: 'Matale', postalCode: '21000' },
      { name: 'Nuwara Eliya', postalCode: '22000' }
    ]
  },
  {
    name: 'Southern',
    districts: [
      { name: 'Galle', postalCode: '80000' },
      { name: 'Matara', postalCode: '81000' },
      { name: 'Hambantota', postalCode: '82000' }
    ]
  },
  {
    name: 'Northern',
    districts: [
      { name: 'Jaffna', postalCode: '40000' },
      { name: 'Kilinochchi', postalCode: '42000' },
      { name: 'Mannar', postalCode: '43000' },
      { name: 'Mullaitivu', postalCode: '42054' },
      { name: 'Vavuniya', postalCode: '43000' }
    ]
  },
  {
    name: 'Eastern',
    districts: [
      { name: 'Trincomalee', postalCode: '31000' },
      { name: 'Batticaloa', postalCode: '30000' },
      { name: 'Ampara', postalCode: '32000' }
    ]
  },
  {
    name: 'North Western',
    districts: [
      { name: 'Kurunegala', postalCode: '60000' },
      { name: 'Puttalam', postalCode: '61200' }
    ]
  },
  {
    name: 'North Central',
    districts: [
      { name: 'Anuradhapura', postalCode: '50000' },
      { name: 'Polonnaruwa', postalCode: '51000' }
    ]
  },
  {
    name: 'Uva',
    districts: [
      { name: 'Badulla', postalCode: '90000' },
      { name: 'Monaragala', postalCode: '91000' }
    ]
  },
  {
    name: 'Sabaragamuwa',
    districts: [
      { name: 'Ratnapura', postalCode: '70000' },
      { name: 'Kegalle', postalCode: '71000' }
    ]
  }
];

const Order: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // Simple local user session check
  const [user, setUser] = useState<any>(null);
  useEffect(() => {
    const localUser = localStorage.getItem('user');
    if (!localUser) {
      navigate('/');
    } else {
      setUser(JSON.parse(localUser));
    }
  }, [navigate]);
  if (!user) return null;

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting }
  } = useForm<OrderForm>();

  const [selectedProvince, setSelectedProvince] = useState('');
  const [districts, setDistricts] = useState<{ name: string; postalCode: string }[]>([]);
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [sameAsAddress, setSameAsAddress] = useState(false);
  // Update districts when province changes
  useEffect(() => {
    const provinceObj = slProvinces.find((p) => p.name === selectedProvince);
    if (provinceObj) {
      setDistricts(provinceObj.districts);
    } else {
      setDistricts([]);
    }
    setSelectedDistrict('');
    setPostalCode('');
    setValue('district', '');
    setValue('postalCode', '');
  }, [selectedProvince, setValue]);

  // Update postal code when district changes
  useEffect(() => {
    const districtObj = districts.find((d) => d.name === selectedDistrict);
    if (districtObj) {
      setPostalCode(districtObj.postalCode);
      setValue('postalCode', districtObj.postalCode);
    } else {
      setPostalCode('');
      setValue('postalCode', '');
    }
  }, [selectedDistrict, districts, setValue]);

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
            province: data.province,
            district: data.district,
            postal_code: data.postalCode,
            address_line1: data.addressLine1,
            address_line2: data.addressLine2,
            address_district: data.addressDistrict,
            delivery_address_line1: data.deliveryAddressLine1,
            delivery_address_line2: data.deliveryAddressLine2,
            delivery_address_district: data.deliveryAddressDistrict,
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
          email: "ckaushi723@gmail.com", // Required for EmailJS 'To Email' field
          orderId: orderId,
          order_date: new Date().toLocaleDateString(),
          full_name: data.fullName,
          address: `${data.addressLine1}, ${data.addressLine2}, ${data.addressDistrict}`,
          delivery_address: `${data.deliveryAddressLine1}, ${data.deliveryAddressLine2}, ${data.deliveryAddressDistrict}`,
          province: data.province,
          district: data.district,
          postal_code: data.postalCode,
          whatsapp_number: data.whatsappNumber,
          quantity: data.quantity,
          number_of_bottles: data.numberOfBottles,
          total_amount: totalAmount
        };

  console.log('Email parameters (full):', JSON.stringify(emailParams, null, 2));

        // Send email using EmailJS
        const result = await emailjs.send(
          'service_loylxbw',  // Your EmailJS Service ID
          'template_u565g9w', // Use the correct template ID
          emailParams,
          '00UOPjZ64lj9YNzvA' // Your EmailJS Public Key
        );

        console.log('Email sent successfully!', result);
      } catch (emailError: any) {
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

    } catch (error: any) {
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
                      {/* Full Name */}
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

                      {/* Province Dropdown */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                          Province *
                        </label>
                        <select
                          {...register('province', { required: 'Province is required' })}
                          className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-lime-100 focus:border-lime-500 transition-all duration-200 text-lg appearance-none cursor-pointer"
                          value={selectedProvince}
                          onChange={e => {
                            setSelectedProvince(e.target.value);
                            setValue('province', e.target.value);
                          }}
                        >
                          <option value="">Select province</option>
                          {slProvinces.map((prov) => (
                            <option key={prov.name} value={prov.name}>{prov.name}</option>
                          ))}
                        </select>
                        {errors.province && (
                          <p className="mt-2 text-sm text-red-600 flex items-center">
                            <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                            {errors.province.message}
                          </p>
                        )}
                      </div>

                      {/* District Dropdown */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                          District *
                        </label>
                        <select
                          {...register('district', { required: 'District is required' })}
                          className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-lime-100 focus:border-lime-500 transition-all duration-200 text-lg appearance-none cursor-pointer"
                          value={selectedDistrict}
                          onChange={e => {
                            setSelectedDistrict(e.target.value);
                            setValue('district', e.target.value);
                          }}
                          disabled={!selectedProvince}
                        >
                          <option value="">{selectedProvince ? 'Select district' : 'Select province first'}</option>
                          {districts.map((dist) => (
                            <option key={dist.name} value={dist.name}>{dist.name}</option>
                          ))}
                        </select>
                        {errors.district && (
                          <p className="mt-2 text-sm text-red-600 flex items-center">
                            <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                            {errors.district.message}
                          </p>
                        )}
                      </div>

                      {/* Postal Code (auto-filled) */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                          Postal Code
                        </label>
                        <input
                          {...register('postalCode')}
                          type="text"
                          className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-lime-100 focus:border-lime-500 transition-all duration-200 text-lg bg-gray-100"
                          value={postalCode}
                          readOnly
                          placeholder="Postal code will appear here"
                        />
                      </div>

                      {/* Address Fields */}
                      <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-1">Address Line 1 *</label>
                          <input
                            {...register('addressLine1', { required: 'Address Line 1 is required' })}
                            type="text"
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-lime-100 focus:border-lime-500 text-lg"
                            placeholder="House/Flat, No."
                          />
                          {errors.addressLine1 && <p className="mt-1 text-xs text-red-600">{errors.addressLine1.message}</p>}
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-1">Address Line 2 *</label>
                          <input
                            {...register('addressLine2', { required: 'Address Line 2 is required' })}
                            type="text"
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-lime-100 focus:border-lime-500 text-lg"
                            placeholder="Street, Area"
                          />
                          {errors.addressLine2 && <p className="mt-1 text-xs text-red-600">{errors.addressLine2.message}</p>}
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-1">Address District *</label>
                          <input
                            {...register('addressDistrict', { required: 'Address District is required' })}
                            type="text"
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-lime-100 focus:border-lime-500 text-lg"
                            placeholder="Village/Town"
                          />
                          {errors.addressDistrict && <p className="mt-1 text-xs text-red-600">{errors.addressDistrict.message}</p>}
                        </div>
                      </div>

                      {/* Delivery Address Fields with Same as Address Checkbox */}
                      <div className="md:col-span-2">
                        <div className="flex items-center mb-2">
                          <input
                            id="sameAsAddress"
                            type="checkbox"
                            checked={sameAsAddress}
                            onChange={e => {
                              setSameAsAddress(e.target.checked);
                              if (e.target.checked) {
                                setValue('deliveryAddressLine1', watch('addressLine1'));
                                setValue('deliveryAddressLine2', watch('addressLine2'));
                                setValue('deliveryAddressDistrict', watch('addressDistrict'));
                              } else {
                                setValue('deliveryAddressLine1', '');
                                setValue('deliveryAddressLine2', '');
                                setValue('deliveryAddressDistrict', '');
                              }
                            }}
                            className="mr-2"
                          />
                          <label htmlFor="sameAsAddress" className="text-sm font-medium text-gray-700">Same as Address</label>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Delivery Address Line 1 *</label>
                              <input
                                {...register('deliveryAddressLine1', { required: 'Delivery Address Line 1 is required' })}
                                type="text"
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-lime-100 focus:border-lime-500 text-lg"
                                placeholder="House/Flat, No."
                                readOnly={sameAsAddress}
                                value={sameAsAddress ? watch('addressLine1') || '' : watch('deliveryAddressLine1') || ''}
                              />
                            {errors.deliveryAddressLine1 && <p className="mt-1 text-xs text-red-600">{errors.deliveryAddressLine1.message}</p>}
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Delivery Address Line 2 *</label>
                              <input
                                {...register('deliveryAddressLine2', { required: 'Delivery Address Line 2 is required' })}
                                type="text"
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-lime-100 focus:border-lime-500 text-lg"
                                placeholder="Street, Area"
                                readOnly={sameAsAddress}
                                value={sameAsAddress ? watch('addressLine2') || '' : watch('deliveryAddressLine2') || ''}
                              />
                            {errors.deliveryAddressLine2 && <p className="mt-1 text-xs text-red-600">{errors.deliveryAddressLine2.message}</p>}
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Delivery Address District *</label>
                              <input
                                {...register('deliveryAddressDistrict', { required: 'Delivery Address District is required' })}
                                type="text"
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-lime-100 focus:border-lime-500 text-lg"
                                placeholder="Village/Town"
                                readOnly={sameAsAddress}
                                value={sameAsAddress ? watch('addressDistrict') || '' : watch('deliveryAddressDistrict') || ''}
                              />
                            {errors.deliveryAddressDistrict && <p className="mt-1 text-xs text-red-600">{errors.deliveryAddressDistrict.message}</p>}
                          </div>
                        </div>
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
              
              <div className="p-6 space-y-3">
                <button
                  onClick={async () => {
                    console.log('Testing EmailJS with default template...');
                    const result = await testDefaultTemplate();
                    if (result.success) {
                      alert('✅ Default template test email sent successfully! Check your email.');
                    } else {
                      alert('❌ Default template test failed. Check console for details.');
                    }
                  }}
                  className="w-full bg-green-500 text-white py-3 px-4 rounded-xl hover:bg-green-600 transition-colors duration-200 flex items-center justify-center font-medium"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Test Different Variables
                </button>
                
                <button
                  onClick={async () => {
                    console.log('Testing EmailJS with minimal parameters...');
                    const result = await testMinimalEmail();
                    if (result.success) {
                      alert('✅ Minimal test email sent successfully! Check your email.');
                    } else {
                      alert('❌ Minimal test failed. Check console for details.');
                    }
                  }}
                  className="w-full bg-blue-500 text-white py-3 px-4 rounded-xl hover:bg-blue-600 transition-colors duration-200 flex items-center justify-center font-medium"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Test Minimal Email
                </button>
                
                <button
                  onClick={async () => {
                    console.log('Testing EmailJS with full parameters...');
                    const result = await testEmailJS();
                    if (result.success) {
                      alert('✅ Full test email sent successfully! Check your email.');
                    } else {
                      alert('❌ Full test failed. Check console for details.');
                    }
                  }}
                  className="w-full bg-yellow-500 text-white py-3 px-4 rounded-xl hover:bg-yellow-600 transition-colors duration-200 flex items-center justify-center font-medium"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Test Full Email
                </button>
                
                <p className="text-xs text-yellow-700 mt-3 text-center">
                  Test buttons for debugging. Remove after EmailJS is working.
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
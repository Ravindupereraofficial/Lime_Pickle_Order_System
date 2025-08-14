import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { sendContactEmail } from '../lib/emailjs';

interface ContactForm {
  name: string;
  email: string;
  message: string;
}

const Contact: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<ContactForm>();

  const [messageSent, setMessageSent] = useState(false);

  const onSubmit = async (data: ContactForm) => {
    try {
      // Save contact message to Supabase database
      const { error: dbError } = await supabase
        .from('contact_messages')
        .insert([
          {
            name: data.name,
            email: data.email,
            message: data.message
          }
        ]);

      if (dbError) {
        console.error('Database error:', dbError);
      }

      // Send email using EmailJS
      await sendContactEmail({
        name: data.name,
        email: data.email,
        message: data.message
      });

      setMessageSent(true);
      reset();
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setMessageSent(false);
      }, 5000);

    } catch (error) {
      console.error('Error sending message:', error);
      alert('There was an error sending your message. Please try again.');
    }
  };

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-lime-600 to-orange-500 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">Contact Us</h1>
          <p className="text-xl text-lime-100 max-w-3xl mx-auto">
            Have questions? We'd love to hear from you. Get in touch with us!
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">Send us a Message</h2>
              
              {messageSent && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  <span className="text-green-700">Message sent successfully! We'll get back to you soon.</span>
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Name *
                  </label>
                  <input
                    {...register('name', { required: 'Name is required' })}
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-lime-500"
                    placeholder="Enter your full name"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: 'Please enter a valid email address'
                      }
                    })}
                    type="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-lime-500"
                    placeholder="Enter your email address"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    {...register('message', { required: 'Message is required' })}
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-lime-500"
                    placeholder="Tell us what you'd like to know..."
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-lime-500 text-white py-4 px-6 rounded-lg font-semibold hover:bg-lime-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                  ) : (
                    <Send className="w-5 h-5 mr-2" />
                  )}
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Get in Touch</h2>
                <p className="text-gray-600 mb-8">
                  We're here to help! Whether you have questions about our products, 
                  need assistance with an order, or just want to share your feedback, 
                  don't hesitate to reach out.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-lime-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-lime-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">Email Us</h3>
                    <p className="text-gray-600">ravindurandika2004@gmail.com</p>
                    <p className="text-sm text-gray-500 mt-1">
                      We'll respond within 24 hours
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">WhatsApp Orders</h3>
                    <p className="text-gray-600">Quick order processing</p>
                    <p className="text-sm text-gray-500 mt-1">
                      Available during business hours
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">Delivery Area</h3>
                    <p className="text-gray-600">Home delivery available</p>
                    <p className="text-sm text-gray-500 mt-1">
                      Fast and reliable service
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-lime-50 to-orange-50 p-6 rounded-xl border border-lime-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Business Hours</h3>
                <div className="space-y-2 text-gray-600">
                  <div className="flex justify-between">
                    <span>Monday - Friday:</span>
                    <span>9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday:</span>
                    <span>9:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday:</span>
                    <span>Closed</span>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Follow Us</h3>
                <p className="text-gray-600 mb-4">
                  Stay updated with our latest products and offers
                </p>
                <a
                  href="https://web.facebook.com/profile.php?id=100087136002444"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  Visit Facebook Page
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
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
      <section className="relative bg-gradient-to-br from-lime-600 via-green-500 to-orange-500 text-white py-32 overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-yellow-300/20 rounded-full blur-3xl"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            <div className="inline-flex items-center px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full text-white font-semibold">
              💬 Get In Touch
            </div>
            <h1 className="text-6xl md:text-7xl font-bold mb-8 leading-tight">
              Contact
              <span className="block bg-gradient-to-r from-yellow-200 to-orange-200 bg-clip-text text-transparent">
                Us
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-lime-50/90 max-w-4xl mx-auto leading-relaxed">
              Have questions? We'd love to hear from you. Get in touch with us and 
              let's start a conversation about our delicious lime pickle!
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-32 bg-gradient-to-b from-gray-50 to-white relative">
        <div className="absolute inset-0 opacity-40" style={{ backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmM2Y0ZjYiIGZpbGwtb3BhY2l0eT0iMC4zIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')" }}></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div className="group">
              <div className="bg-white p-10 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 border border-gray-100 hover:-translate-y-1">
                <div className="mb-8">
                  <div className="inline-flex items-center px-4 py-2 bg-lime-100 text-lime-800 rounded-full text-sm font-semibold mb-4">
                    ✉️ Send Message
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-3">Send us a Message</h2>
                  <p className="text-gray-600 leading-relaxed">
                    We're here to help! Fill out the form below and we'll get back to you as soon as possible.
                  </p>
                </div>
                
                {messageSent && (
                  <div className="mb-8 p-6 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl flex items-center shadow-lg">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-4">
                      <CheckCircle className="w-6 h-6 text-green-500" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-green-800">Message sent successfully!</h4>
                      <p className="text-green-700 text-sm">We'll get back to you within 24 hours.</p>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                  <div className="space-y-2">
                    <label className="block text-sm font-bold text-gray-800 mb-3">
                      Your Name *
                    </label>
                    <div className="relative">
                      <input
                        {...register('name', { required: 'Name is required' })}
                        type="text"
                        className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-lime-100 focus:border-lime-500 transition-all duration-200 text-lg hover:border-gray-300"
                        placeholder="Enter your full name"
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                        <div className="w-2 h-2 bg-lime-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                    </div>
                    {errors.name && (
                      <p className="mt-2 text-sm text-red-600 flex items-center">
                        <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-bold text-gray-800 mb-3">
                      Email Address *
                    </label>
                    <div className="relative">
                      <input
                        {...register('email', {
                          required: 'Email is required',
                          pattern: {
                            value: /^\S+@\S+$/i,
                            message: 'Please enter a valid email address'
                          }
                        })}
                        type="email"
                        className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-lime-100 focus:border-lime-500 transition-all duration-200 text-lg hover:border-gray-300"
                        placeholder="Enter your email address"
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                        <div className="w-2 h-2 bg-lime-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                    </div>
                    {errors.email && (
                      <p className="mt-2 text-sm text-red-600 flex items-center">
                        <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-bold text-gray-800 mb-3">
                      Message *
                    </label>
                    <textarea
                      {...register('message', { required: 'Message is required' })}
                      rows={6}
                      className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-lime-100 focus:border-lime-500 transition-all duration-200 text-lg hover:border-gray-300 resize-none"
                      placeholder="Tell us what you'd like to know..."
                    />
                    {errors.message && (
                      <p className="mt-2 text-sm text-red-600 flex items-center">
                        <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group/btn w-full bg-gradient-to-r from-lime-500 to-green-600 text-white py-5 px-8 rounded-2xl font-bold text-lg hover:from-lime-600 hover:to-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 transform flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      <div className="animate-spin w-6 h-6 border-2 border-white border-t-transparent rounded-full mr-3"></div>
                    ) : (
                      <Send className="w-6 h-6 mr-3 group-hover/btn:scale-110 transition-transform duration-300" />
                    )}
                    {isSubmitting ? 'Sending Message...' : 'Send Message'}
                  </button>
                </form>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-10">
              <div className="bg-white p-10 rounded-3xl shadow-2xl border border-gray-100">
                <div className="mb-8">
                  <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold mb-4">
                    📞 Contact Info
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-3">Get in Touch</h2>
                  <p className="text-gray-600 leading-relaxed">
                    We're here to help! Whether you have questions about our products, 
                    need assistance with an order, or just want to share your feedback, 
                    don't hesitate to reach out.
                  </p>
                </div>

                <div className="space-y-8">
                  <div className="group flex items-start space-x-5">
                    <div className="w-16 h-16 bg-gradient-to-br from-lime-100 to-lime-200 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <Mail className="w-8 h-8 text-lime-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-lime-600 transition-colors duration-300">
                        Email Us
                      </h3>
                      <p className="text-lg text-gray-700 font-medium">ckaushi895@gmail.com</p>
                      <p className="text-sm text-gray-500 mt-2 flex items-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                        We'll respond within 24 hours
                      </p>
                    </div>
                  </div>

                  <div className="group flex items-start space-x-5">
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <Phone className="w-8 h-8 text-orange-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors duration-300">
                        WhatsApp Orders
                      </h3>
                      <p className="text-lg text-gray-700 font-medium">Quick order processing</p>
                      <p className="text-sm text-gray-500 mt-2 flex items-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                        Available during business hours
                      </p>
                    </div>
                  </div>

                  <div className="group flex items-start space-x-5">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <MapPin className="w-8 h-8 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                        Delivery Area
                      </h3>
                      <p className="text-lg text-gray-700 font-medium">Nationwide delivery available</p>
                      <p className="text-sm text-gray-500 mt-2 flex items-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                        Fast and reliable service
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-lime-50 via-green-50 to-orange-50 p-8 rounded-3xl border border-lime-200 shadow-xl">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <div className="w-8 h-8 bg-lime-500 rounded-full flex items-center justify-center mr-3">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                  Business Hours
                </h3>
                <div className="space-y-4">
                  {[
                    { day: 'Monday - Friday', hours: '9:00 AM - 6:00 PM', active: true },
                    { day: 'Saturday', hours: '9:00 AM - 4:00 PM', active: true },
                    { day: 'Sunday', hours: 'Closed', active: false }
                  ].map((schedule, idx) => (
                    <div key={idx} className="flex justify-between items-center p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                      <span className="font-semibold text-gray-800">{schedule.day}</span>
                      <div className="flex items-center space-x-2">
                        <div className={`w-2 h-2 rounded-full ${schedule.active ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                        <span className={`font-medium ${schedule.active ? 'text-gray-700' : 'text-gray-500'}`}>
                          {schedule.hours}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-8 rounded-3xl shadow-2xl border border-gray-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                  Follow Us
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Stay updated with our latest products, offers, and behind-the-scenes content
                </p>
                <a
                  href="https://web.facebook.com/profile.php?id=100087136002444"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-105 transform font-semibold"
                >
                  <svg className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  Visit Our Facebook Page
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
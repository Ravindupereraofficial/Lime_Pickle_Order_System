import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star, Truck, Shield } from 'lucide-react';
import ImageCarousel from '../components/ImageCarousel';

const Home: React.FC = () => {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-lime-500 via-lime-400 to-orange-400 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Authentic
                <span className="block text-orange-200">Lime Pickle</span>
              </h1>
              <p className="text-xl mb-8 text-lime-50">
                Experience the authentic taste of homemade lime pickle, crafted with 
                traditional recipes and the finest ingredients. Made with love in small 
                batches to preserve that authentic home-cooked flavor.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/order"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-lime-600 font-semibold rounded-lg hover:bg-lime-50 transition-colors duration-200 shadow-lg"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Place Order Now
                </Link>
                <Link
                  to="/products"
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-lime-600 transition-colors duration-200"
                >
                  View Products
                </Link>
              </div>
            </div>
            <div className="relative">
              <ImageCarousel 
                images={[
                  "/images/lime-pickle-1.jpg",
                  "/images/lime-pickle-2.jpg", 
                  "/images/lime-pickle-3.jpg",
                  "/images/lime-pickle-4.jpg"
                ]}
                interval={4000}
              />
              <div className="absolute -bottom-4 -right-4 bg-orange-500 text-white p-4 rounded-xl shadow-lg z-10">
                <Star className="w-6 h-6 fill-current" />
                <span className="text-sm font-semibold">Premium Quality</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Why Choose Our Lime Pickle?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We take pride in delivering authentic, homemade lime pickle that brings 
              the traditional taste right to your table.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-lime-100 rounded-full flex items-center justify-center mb-6">
                <Shield className="w-8 h-8 text-lime-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">100% Natural</h3>
              <p className="text-gray-600">
                Made with fresh limes and natural spices, no artificial preservatives or colors. 
                Just pure, authentic taste in every bite.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-6">
                <Truck className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Home Delivery</h3>
              <p className="text-gray-600">
                Fast and reliable delivery service right to your doorstep. 
                Order online and enjoy fresh lime pickle at home.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-6">
                <Star className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Traditional Recipe</h3>
              <p className="text-gray-600">
                Time-tested family recipe passed down through generations, 
                ensuring authentic flavor and perfect spice balance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-500 to-lime-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Taste Tradition?</h2>
          <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
            Order your authentic lime pickle today and experience the perfect blend 
            of tangy limes and aromatic spices.
          </p>
          <Link
            to="/order"
            className="inline-flex items-center px-8 py-4 bg-white text-orange-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-200 shadow-lg text-lg"
          >
            <ShoppingCart className="w-6 h-6 mr-2" />
            Order Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
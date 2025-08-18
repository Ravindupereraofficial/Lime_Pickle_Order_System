
import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star, Truck, Shield } from 'lucide-react';
import ImageCarousel from '../components/ImageCarousel';

const Home: React.FC = () => {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-lime-500 via-lime-400 to-orange-400 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-orange-300/20 rounded-full blur-3xl"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
                  🌟 Authentic Sri Lankan Recipe
                </div>
                <h1 className="text-6xl md:text-7xl font-bold leading-tight">
                  Authentic
                  <span className="block bg-gradient-to-r from-orange-200 to-yellow-200 bg-clip-text text-transparent">
                    Lime Pickle
                  </span>
                </h1>
                <p className="text-xl leading-relaxed text-lime-50/90 max-w-lg">
                  Experience the authentic taste of homemade lime pickle, crafted with 
                  traditional recipes and the finest ingredients. Made with love in small 
                  batches to preserve that authentic home-cooked flavor.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/order"
                  className="group inline-flex items-center justify-center px-8 py-4 bg-white text-lime-600 font-bold rounded-xl hover:bg-lime-50 transition-all duration-300 shadow-2xl hover:shadow-white/25 hover:scale-105 transform"
                >
                  <ShoppingCart className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
                  Start Your Order
                </Link>
                <Link
                  to="/products"
                  className="group inline-flex items-center justify-center px-8 py-4 border-2 border-white/80 text-white font-bold rounded-xl hover:bg-white hover:text-lime-600 transition-all duration-300 backdrop-blur-sm hover:scale-105 transform"
                >
                  View Products
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400/30 to-lime-400/30 rounded-3xl blur-2xl transform rotate-6"></div>
              <div className="relative">
                <ImageCarousel 
                  images={[
                    "https://res.cloudinary.com/dtol8lk5b/image/upload/v1755235591/516871801_704957635752097_7789693277955808336_n_ikmnfn.jpg",
                    "https://res.cloudinary.com/dtol8lk5b/image/upload/v1755235591/516542850_704957345752126_4691991998449596816_n_pyifx5.jpg", 
                    "https://res.cloudinary.com/dtol8lk5b/image/upload/v1755235591/516542850_704957345752126_4691991998449596816_n_pyifx5.jpg",
                    "https://res.cloudinary.com/dtol8lk5b/image/upload/v1755235590/312896837_104320839149116_3474329651582148420_n_jcvyce.jpg"
                  ]}
                  interval={4000}
                />
                <div className="absolute -bottom-6 -right-6 bg-gradient-to-r from-orange-500 to-orange-600 text-white p-5 rounded-2xl shadow-2xl z-10 backdrop-blur-sm border border-white/20">
                  <div className="flex items-center space-x-2">
                    <Star className="w-6 h-6 fill-current text-yellow-300" />
                    <span className="font-bold">Premium Quality</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 bg-gradient-to-b from-gray-50 to-white relative">
        <div className="absolute inset-0 opacity-40" style={{ backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmM2Y0ZjYiIGZpbGwtb3BhY2l0eT0iMC4zIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')" }}></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-4 py-2 bg-lime-100 text-lime-800 rounded-full text-sm font-semibold mb-6">
              ✨ Premium Quality Promise
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Why Choose Our
              <span className="block bg-gradient-to-r from-lime-600 to-orange-500 bg-clip-text text-transparent">
                Lime Pickle?
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We take pride in delivering authentic, homemade lime pickle that brings 
              the traditional taste right to your table with uncompromising quality.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group bg-white p-10 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-lime-200 hover:-translate-y-2">
              <div className="relative mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-lime-100 to-lime-200 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Shield className="w-10 h-10 text-lime-600" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-lime-500 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-lime-600 transition-colors duration-300">
                100% Natural
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Made with fresh limes and natural spices, no artificial preservatives or colors. 
                Just pure, authentic taste in every bite that honors tradition.
              </p>
            </div>

            <div className="group bg-white p-10 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-orange-200 hover:-translate-y-2">
              <div className="relative mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Truck className="w-10 h-10 text-orange-600" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-orange-600 transition-colors duration-300">
                Home Delivery
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Fast and reliable delivery service right to your doorstep. 
                Order online and enjoy fresh lime pickle at home with complete convenience.
              </p>
            </div>

            <div className="group bg-white p-10 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-yellow-200 hover:-translate-y-2">
              <div className="relative mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Star className="w-10 h-10 text-yellow-600" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-yellow-600 transition-colors duration-300">
                Traditional Recipe
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Time-tested family recipe passed down through generations, 
                ensuring authentic flavor and perfect spice balance in every jar.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Updates - Facebook Videos */}
      <section className="py-32 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold mb-6">
              📱 Follow Our Journey
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Latest
              <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Updates
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Watch our recent updates and stories from Facebook to see the love and care 
              that goes into every jar of our lime pickle.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-b from-gray-900 to-black border border-gray-800 group-hover:shadow-blue-500/25 transition-all duration-500">
                <iframe
                  title="Facebook video 1"
                  src="https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Freel%2F19HJSVmsBV%2F&show_text=false&width=500&height=420"
                  className="w-full h-64 md:h-80"
                  style={{ border: 'none', overflow: 'hidden' }}
                  scrolling="no"
                  frameBorder={0}
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  allowFullScreen={true}
                  referrerPolicy="strict-origin-when-cross-origin"
                />
              </div>
            </div>

            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-b from-gray-900 to-black border border-gray-800 group-hover:shadow-purple-500/25 transition-all duration-500">
                <iframe
                  title="Facebook video 2"
                  src="https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2F100087136002444%2Fvideos%2F776003948238953%2F&show_text=false&width=500&height=420"
                  className="w-full h-64 md:h-80"
                  style={{ border: 'none', overflow: 'hidden' }}
                  scrolling="no"
                  frameBorder={0}
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  allowFullScreen={true}
                  referrerPolicy="strict-origin-when-cross-origin"
                />
              </div>
            </div>

            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-red-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-b from-gray-900 to-black border border-gray-800 group-hover:shadow-pink-500/25 transition-all duration-500">
                <iframe
                  title="Facebook video 3"
                  src="https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Freel%2F1XTRki6fvz%2F&show_text=false&width=500&height=420"
                  className="w-full h-64 md:h-80"
                  style={{ border: 'none', overflow: 'hidden' }}
                  scrolling="no"
                  frameBorder={0}
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  allowFullScreen={true}
                  referrerPolicy="strict-origin-when-cross-origin"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 bg-gradient-to-br from-orange-500 via-lime-500 to-green-500 overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-yellow-300/20 rounded-full blur-3xl"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            <div className="inline-flex items-center px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full text-white font-semibold">
              🚀 Start Your Journey Today
            </div>
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
              Ready to Taste
              <span className="block bg-gradient-to-r from-yellow-200 to-orange-200 bg-clip-text text-transparent">
                Tradition?
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-lime-50/90 mb-12 max-w-4xl mx-auto leading-relaxed">
              Order your authentic lime pickle today and experience the perfect blend 
              of tangy limes and aromatic spices that will transport you to grandma's kitchen.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                to="/order"
                className="group inline-flex items-center justify-center px-10 py-5 bg-white text-orange-600 font-bold rounded-2xl hover:bg-lime-50 transition-all duration-300 shadow-2xl hover:shadow-white/25 hover:scale-105 transform text-xl"
              >
                <ShoppingCart className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform duration-300" />
                Start Your Order Now
              </Link>
              <Link
                to="/products"
                className="group inline-flex items-center justify-center px-10 py-5 border-2 border-white/80 text-white font-bold rounded-2xl hover:bg-white hover:text-orange-600 transition-all duration-300 backdrop-blur-sm hover:scale-105 transform text-xl"
              >
                View All Products
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
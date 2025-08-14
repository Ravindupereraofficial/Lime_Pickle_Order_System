import React from 'react';
import { Heart, Users, Award, Leaf } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-lime-600 to-orange-500 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">Our Story</h1>
          <p className="text-xl text-lime-100 max-w-3xl mx-auto">
            A journey of passion, tradition, and authentic flavors
          </p>
        </div>
      </section>

      {/* Main Story */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-800 mb-6">From Kitchen to Community</h2>
              <p className="text-lg text-gray-600 mb-6">
                Lime Pickle began as a family tradition, where recipes were passed down 
                through generations. What started in our grandmother's kitchen has now 
                grown into a beloved brand that brings authentic homemade taste to 
                families across the region.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Our commitment to quality means using only the freshest limes, 
                hand-selected spices, and traditional preparation methods. Each batch 
                is made with the same care and attention that has been our hallmark 
                for decades.
              </p>
              <p className="text-lg text-gray-600">
                We believe that great food brings people together, and our lime pickle 
                is more than just a condiment - it's a bridge between tradition and 
                modernity, between generations, and between families.
              </p>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/4198170/pexels-photo-4198170.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Traditional lime pickle preparation"
                className="w-full h-96 object-cover rounded-2xl shadow-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything we do is guided by these core principles that have shaped our journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-lime-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-10 h-10 text-lime-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Made with Love</h3>
              <p className="text-gray-600">
                Every jar is prepared with care and attention, just like homemade should be.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Leaf className="w-10 h-10 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Natural Ingredients</h3>
              <p className="text-gray-600">
                We use only fresh, natural ingredients without artificial preservatives.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="w-10 h-10 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Quality First</h3>
              <p className="text-gray-600">
                Uncompromising quality standards ensure consistent taste in every batch.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Community Focus</h3>
              <p className="text-gray-600">
                Building connections and serving our community with dedication and care.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative order-2 lg:order-1">
              <img
                src="https://images.pexels.com/photos/4099235/pexels-photo-4099235.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Fresh lime pickle ingredients"
                className="w-full h-96 object-cover rounded-2xl shadow-lg"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-4xl font-bold text-gray-800 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-6">
                To preserve and share the authentic taste of traditional lime pickle, 
                making it accessible to modern families while maintaining the integrity 
                of time-honored recipes and preparation methods.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                We strive to be more than just a food business - we aim to be custodians 
                of culinary heritage, ensuring that the flavors our grandparents cherished 
                continue to delight future generations.
              </p>
              <div className="bg-lime-50 p-6 rounded-lg border-l-4 border-lime-500">
                <p className="text-lime-800 font-medium italic">
                  "Every jar tells a story of tradition, quality, and the love that goes 
                  into creating something truly special."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
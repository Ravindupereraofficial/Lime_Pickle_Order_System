import React from 'react';
import { Heart, Users, Award, Leaf } from 'lucide-react';

const About: React.FC = () => {
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
              📖 Our Journey
            </div>
            <h1 className="text-6xl md:text-7xl font-bold mb-8 leading-tight">
              Our
              <span className="block bg-gradient-to-r from-yellow-200 to-orange-200 bg-clip-text text-transparent">
                Story
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-lime-50/90 max-w-4xl mx-auto leading-relaxed">
              A journey of passion, tradition, and authentic flavors that spans generations, 
              bringing you the finest homemade lime pickle with love and care.
            </p>
          </div>
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
                src="https://res.cloudinary.com/dtol8lk5b/image/upload/v1755235591/516871801_704957635752097_7789693277955808336_n_ikmnfn.jpg"
                alt="Traditional lime pickle preparation"
                className="w-full h-96 object-cover rounded-2xl shadow-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-32 bg-gradient-to-b from-gray-50 to-white relative">
        <div className="absolute inset-0 opacity-40" style={{ backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmM2Y0ZjYiIGZpbGwtb3BhY2l0eT0iMC4zIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')" }}></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-4 py-2 bg-lime-100 text-lime-800 rounded-full text-sm font-semibold mb-6">
              💎 Core Values
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Our
              <span className="block bg-gradient-to-r from-lime-600 to-orange-500 bg-clip-text text-transparent">
                Values
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Everything we do is guided by these core principles that have shaped our journey 
              and continue to drive our commitment to excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Heart,
                color: 'lime',
                title: 'Made with Love',
                description: 'Every jar is prepared with care and attention, just like homemade should be.'
              },
              {
                icon: Leaf,
                color: 'orange', 
                title: 'Natural Ingredients',
                description: 'We use only fresh, natural ingredients without artificial preservatives.'
              },
              {
                icon: Award,
                color: 'yellow',
                title: 'Quality First', 
                description: 'Uncompromising quality standards ensure consistent taste in every batch.'
              },
              {
                icon: Users,
                color: 'blue',
                title: 'Community Focus',
                description: 'Building connections and serving our community with dedication and care.'
              }
            ].map((value, idx) => (
              <div key={idx} className="group text-center">
                <div className="bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:-translate-y-2">
                  <div className="relative mb-8">
                    <div className={`w-24 h-24 bg-gradient-to-br from-${value.color}-100 to-${value.color}-200 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300`}>
                      <value.icon className={`w-12 h-12 text-${value.color}-600`} />
                    </div>
                    <div className={`absolute -top-2 -right-2 w-6 h-6 bg-${value.color}-500 rounded-full flex items-center justify-center`}>
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  </div>
                  <h3 className={`text-2xl font-bold text-gray-900 mb-4 group-hover:text-${value.color}-600 transition-colors duration-300`}>
                    {value.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative order-2 lg:order-1">
              <img
                src="https://res.cloudinary.com/dtol8lk5b/image/upload/v1755235591/516542850_704957345752126_4691991998449596816_n_pyifx5.jpg"
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
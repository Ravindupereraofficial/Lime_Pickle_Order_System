import React from 'react';
import { ShoppingCart, Star, Leaf } from 'lucide-react';
import { Link } from 'react-router-dom';

const Products: React.FC = () => {
  const products = [
    {
      id: 1,
      weight: '300 g',
      price: 650,
      emoji: '🌶🍋',
      description: 'Perfect for small families or trying our lime pickle for the first time',
      popular: false
    },
    {
      id: 2,
      weight: '500 g',
      price: 850,
      emoji: '🌶🍋',
      description: 'Most popular size - great value for regular consumers',
      popular: true
    },
    {
      id: 3,
      weight: '1 kg',
      price: 1450,
      emoji: '🌶🍋',
      description: 'Best value for large families and lime pickle enthusiasts',
      popular: false
    }
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-500 to-lime-500 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">Our Products</h1>
          <p className="text-xl text-orange-100 max-w-3xl mx-auto">
            Choose from our range of authentic lime pickle sizes, 
            perfect for every family and occasion
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                className={`relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden ${
                  product.popular ? 'ring-2 ring-lime-500' : ''
                }`}
              >
                {product.popular && (
                  <div className="absolute top-4 right-4 bg-lime-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center">
                    <Star className="w-4 h-4 mr-1 fill-current" />
                    Popular
                  </div>
                )}

                <div className="p-8">
                  <div className="text-center mb-6">
                    <div className="text-6xl mb-4">{product.emoji}</div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">
                      Lime Pickle {product.weight}
                    </h3>
                    <p className="text-gray-600">{product.description}</p>
                  </div>

                  <div className="text-center mb-6">
                    <div className="text-4xl font-bold text-lime-600 mb-2">
                      LKR {product.price}/=
                    </div>
                    <div className="text-gray-500">per jar</div>
                  </div>

                  <div className="space-y-3 mb-8">
                    <div className="flex items-center text-gray-700">
                      <Leaf className="w-5 h-5 text-lime-500 mr-3" />
                      <span>100% Natural Ingredients</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <Leaf className="w-5 h-5 text-lime-500 mr-3" />
                      <span>Traditional Recipe</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <Leaf className="w-5 h-5 text-lime-500 mr-3" />
                      <span>Fresh Homemade</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <Leaf className="w-5 h-5 text-lime-500 mr-3" />
                      <span>No Preservatives</span>
                    </div>
                  </div>

                  <Link
                    to="/order"
                    state={{ selectedSize: product.weight }}
                    className={`w-full flex items-center justify-center px-6 py-3 rounded-lg font-semibold transition-colors duration-200 ${
                      product.popular
                        ? 'bg-lime-500 text-white hover:bg-lime-600'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                  >
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Order Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">What Makes Our Lime Pickle Special?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the authentic taste and quality that sets our lime pickle apart
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <img
                src="https://images.pexels.com/photos/4099235/pexels-photo-4099235.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Fresh ingredients"
                className="w-full h-48 object-cover rounded-lg mb-6"
              />
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Premium Ingredients</h3>
              <p className="text-gray-600">
                We source only the freshest limes and authentic spices to ensure 
                every jar delivers the perfect balance of tangy and spicy flavors.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg">
              <img
                src="https://images.pexels.com/photos/4198170/pexels-photo-4198170.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Traditional preparation"
                className="w-full h-48 object-cover rounded-lg mb-6"
              />
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Traditional Method</h3>
              <p className="text-gray-600">
                Following age-old recipes and preparation techniques passed down through 
                generations, ensuring authentic taste in every batch.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-lime-500 to-orange-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Order?</h2>
          <p className="text-xl text-lime-100 mb-8 max-w-2xl mx-auto">
            Choose your preferred size and enjoy the authentic taste of homemade lime pickle
          </p>
          <Link
            to="/order"
            className="inline-flex items-center px-8 py-4 bg-white text-lime-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-200 shadow-lg text-lg"
          >
            <ShoppingCart className="w-6 h-6 mr-2" />
            Place Your Order
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Products;
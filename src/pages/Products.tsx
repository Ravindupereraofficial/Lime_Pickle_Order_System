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
      <section className="relative bg-gradient-to-br from-orange-500 via-lime-500 to-green-500 text-white py-32 overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-yellow-300/20 rounded-full blur-3xl"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            <div className="inline-flex items-center px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full text-white font-semibold">
              🌶️ Premium Selection
            </div>
            <h1 className="text-6xl md:text-7xl font-bold mb-8 leading-tight">
              Our
              <span className="block bg-gradient-to-r from-yellow-200 to-orange-200 bg-clip-text text-transparent">
                Products
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-orange-100/90 max-w-4xl mx-auto leading-relaxed">
              Choose from our range of authentic lime pickle sizes, 
              perfect for every family and occasion. Each jar is crafted with love and tradition.
            </p>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-32 bg-gradient-to-b from-gray-50 to-white relative">
        <div className="absolute inset-0 opacity-40" style={{ backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmM2Y0ZjYiIGZpbGwtb3BhY2l0eT0iMC4zIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')" }}></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-4 py-2 bg-lime-100 text-lime-800 rounded-full text-sm font-semibold mb-6">
              🏆 Best Sellers
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Choose Your Perfect
              <span className="block bg-gradient-to-r from-lime-600 to-orange-500 bg-clip-text text-transparent">
                Size
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              From single servings to family-sized portions, we have the perfect size for every occasion.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {products.map((product, index) => (
              <div
                key={product.id}
                className={`group relative bg-white rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-700 overflow-hidden border border-gray-100 hover:-translate-y-3 ${
                  product.popular ? 'ring-4 ring-lime-500/50 scale-105' : ''
                }`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {product.popular && (
                  <div className="absolute -top-3 -right-3 z-20">
                    <div className="bg-gradient-to-r from-lime-500 to-green-600 text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center font-bold">
                      <Star className="w-5 h-5 mr-2 fill-current text-yellow-300" />
                      Most Popular
                    </div>
                  </div>
                )}

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-lime-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="relative p-10">
                  <div className="text-center mb-8">
                    <div className="relative mb-6">
                      <div className="text-8xl mb-4 group-hover:scale-110 transition-transform duration-500">
                        {product.emoji}
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-r from-lime-200/20 to-orange-200/20 rounded-full blur-2xl group-hover:blur-3xl transition-all duration-500"></div>
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-3 group-hover:text-lime-600 transition-colors duration-300">
                      Lime Pickle {product.weight}
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-lg">{product.description}</p>
                  </div>

                  <div className="text-center mb-8">
                    <div className="relative">
                      <div className="text-5xl font-bold text-lime-600 mb-2 group-hover:scale-110 transition-transform duration-300">
                        LKR {product.price}/=
                      </div>
                      <div className="text-gray-500 text-lg">per jar</div>
                      {product.popular && (
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-orange-500 rounded-full animate-pulse"></div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-4 mb-10">
                    {[
                      "100% Natural Ingredients",
                      "Traditional Recipe", 
                      "Fresh Homemade",
                      "No Preservatives"
                    ].map((feature, idx) => (
                      <div key={idx} className="flex items-center text-gray-700 group-hover:text-gray-900 transition-colors duration-300">
                        <div className="w-6 h-6 bg-lime-100 rounded-full flex items-center justify-center mr-4 group-hover:bg-lime-200 transition-colors duration-300">
                          <Leaf className="w-4 h-4 text-lime-600" />
                        </div>
                        <span className="font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Link
                    to="/order"
                    state={{ selectedSize: product.weight }}
                    className={`group/btn w-full flex items-center justify-center px-8 py-5 rounded-2xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-105 transform ${
                      product.popular
                        ? 'bg-gradient-to-r from-lime-500 to-green-600 text-white hover:from-lime-600 hover:to-green-700 shadow-lime-500/25'
                        : 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 hover:from-gray-200 hover:to-gray-300'
                    }`}
                  >
                    <ShoppingCart className="w-6 h-6 mr-3 group-hover/btn:scale-110 transition-transform duration-300" />
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
                src="https://res.cloudinary.com/dtol8lk5b/image/upload/f_auto,q_auto,w_1200,dpr_auto/v1755503502/535846326_736749802572880_4155635982096008702_n_nhvawk.jpg"
                srcSet="https://res.cloudinary.com/dtol8lk5b/image/upload/f_auto,q_auto,w_600,dpr_auto/v1755503502/535846326_736749802572880_4155635982096008702_n_nhvawk.jpg 600w, https://res.cloudinary.com/dtol8lk5b/image/upload/f_auto,q_auto,w_900,dpr_auto/v1755503502/535846326_736749802572880_4155635982096008702_n_nhvawk.jpg 900w, https://res.cloudinary.com/dtol8lk5b/image/upload/f_auto,q_auto,w_1200,dpr_auto/v1755503502/535846326_736749802572880_4155635982096008702_n_nhvawk.jpg 1200w"
                sizes="(min-width: 768px) 50vw, 100vw"
                loading="lazy"
                decoding="async"
                alt="Fresh ingredients"
                className="w-full h-64 md:h-80 object-cover rounded-lg mb-6"
              />
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Premium Ingredients</h3>
              <p className="text-gray-600">
                We source only the freshest limes and authentic spices to ensure 
                every jar delivers the perfect balance of tangy and spicy flavors.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg">
              <img
                src="https://res.cloudinary.com/dtol8lk5b/image/upload/f_auto,q_auto,w_1200,dpr_auto/v1755503504/467731356_540349522212910_7268412714141758126_n_ajjlnf.jpg"
                srcSet="https://res.cloudinary.com/dtol8lk5b/image/upload/f_auto,q_auto,w_600,dpr_auto/v1755503504/467731356_540349522212910_7268412714141758126_n_ajjlnf.jpg 600w, https://res.cloudinary.com/dtol8lk5b/image/upload/f_auto,q_auto,w_900,dpr_auto/v1755503504/467731356_540349522212910_7268412714141758126_n_ajjlnf.jpg 900w, https://res.cloudinary.com/dtol8lk5b/image/upload/f_auto,q_auto,w_1200,dpr_auto/v1755503504/467731356_540349522212910_7268412714141758126_n_ajjlnf.jpg 1200w"
                sizes="(min-width: 768px) 50vw, 100vw"
                loading="lazy"
                decoding="async"
                alt="Traditional preparation"
                className="w-full h-64 md:h-80 object-cover rounded-lg mb-6"
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
      <section className="relative py-32 bg-gradient-to-br from-lime-500 via-green-500 to-orange-500 overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-yellow-300/20 rounded-full blur-3xl"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            <div className="inline-flex items-center px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full text-white font-semibold">
              🛒 Easy Ordering
            </div>
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
              Ready to
              <span className="block bg-gradient-to-r from-yellow-200 to-orange-200 bg-clip-text text-transparent">
                Order?
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-lime-50/90 mb-12 max-w-4xl mx-auto leading-relaxed">
              Choose your preferred size and enjoy the authentic taste of homemade lime pickle 
              delivered fresh to your doorstep with our fast, reliable service.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                to="/order"
                className="group inline-flex items-center justify-center px-10 py-5 bg-white text-lime-600 font-bold rounded-2xl hover:bg-lime-50 transition-all duration-300 shadow-2xl hover:shadow-white/25 hover:scale-105 transform text-xl"
              >
                <ShoppingCart className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform duration-300" />
                Place Your Order Now
              </Link>
              <Link
                to="/about"
                className="group inline-flex items-center justify-center px-10 py-5 border-2 border-white/80 text-white font-bold rounded-2xl hover:bg-white hover:text-lime-600 transition-all duration-300 backdrop-blur-sm hover:scale-105 transform text-xl"
              >
                Learn Our Story
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Products;
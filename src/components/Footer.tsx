import React from 'react';
import { Facebook, Leaf, Phone, Mail, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Leaf className="h-8 w-8 text-lime-500" />
              <span className="font-bold text-xl">Lime Pickle</span>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Authentic homemade lime pickle crafted with love and traditional recipes. 
              Bringing the taste of home to your doorstep with fresh, quality ingredients.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="/" className="hover:text-lime-500 transition-colors">Home</a></li>
              <li><a href="/about" className="hover:text-lime-500 transition-colors">About</a></li>
              <li><a href="/products" className="hover:text-lime-500 transition-colors">Products</a></li>
              <li><a href="/order" className="hover:text-lime-500 transition-colors">Place Order</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="space-y-2 text-gray-300">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>WhatsApp Orders</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>limepickle@email.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>Home Delivery Available</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-300 text-sm">
            © 2024 Lime Pickle. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a
              href="https://web.facebook.com/profile.php?id=100087136002444"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-lime-500 transition-colors"
            >
              <Facebook className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
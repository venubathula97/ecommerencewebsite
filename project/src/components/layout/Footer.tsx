import React from 'react';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-amber-500">Luxe Shop</h3>
            <p className="text-gray-300 mb-4">
              Premium shopping experience with carefully curated products for the modern lifestyle.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-amber-500 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-amber-500 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-amber-500 transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-gray-300 hover:text-amber-500 transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="/products" className="text-gray-300 hover:text-amber-500 transition-colors">
                  Shop All
                </a>
              </li>
              <li>
                <a href="/categories" className="text-gray-300 hover:text-amber-500 transition-colors">
                  Categories
                </a>
              </li>
              <li>
                <a href="/about" className="text-gray-300 hover:text-amber-500 transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="/contact" className="text-gray-300 hover:text-amber-500 transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <a href="/faq" className="text-gray-300 hover:text-amber-500 transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="/shipping" className="text-gray-300 hover:text-amber-500 transition-colors">
                  Shipping & Returns
                </a>
              </li>
              <li>
                <a href="/warranty" className="text-gray-300 hover:text-amber-500 transition-colors">
                  Warranty
                </a>
              </li>
              <li>
                <a href="/terms" className="text-gray-300 hover:text-amber-500 transition-colors">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="/privacy" className="text-gray-300 hover:text-amber-500 transition-colors">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={18} className="mr-2 mt-1 text-amber-500" />
                <span className="text-gray-300">
                  123 Commerce St, San Francisco, CA 94103
                </span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-2 text-amber-500" />
                <a href="tel:+1-555-123-4567" className="text-gray-300 hover:text-amber-500 transition-colors">
                  +1 (555) 123-4567
                </a>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-2 text-amber-500" />
                <a href="mailto:support@luxeshop.com" className="text-gray-300 hover:text-amber-500 transition-colors">
                  support@luxeshop.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter - Disabled for the MVP */}
        {/* <div className="mt-12 mb-8 py-6 border-t border-b border-gray-700">
          <h3 className="text-lg font-semibold mb-3">Subscribe to our Newsletter</h3>
          <form className="flex max-w-md">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-grow py-2 px-4 rounded-l outline-none text-gray-900"
            />
            <button
              type="submit"
              className="bg-amber-500 hover:bg-amber-600 transition-colors py-2 px-4 rounded-r text-white font-medium"
            >
              Subscribe
            </button>
          </form>
        </div> */}

        {/* Bottom */}
        <div className="mt-8 pt-6 border-t border-gray-800 text-center text-gray-400 text-sm">
          <p>&copy; {currentYear} Luxe Shop. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
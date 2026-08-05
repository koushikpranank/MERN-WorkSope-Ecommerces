import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900/80 backdrop-blur-md border-t border-white/10 text-white pt-12 pb-8 mt-20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        {/* Brand Info */}
        <div>
          <h2 className="text-2xl font-extrabold bg-gradient-to-r from-teal-300 to-green-300 bg-clip-text text-transparent mb-4">
            MyStore
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            Experience the future of online shopping. Premium products, secure
            checkout, and lightning-fast delivery.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-bold text-teal-300 mb-4">Quick Links</h3>
          <ul className="space-y-2 list-none p-0 m-0">
            <li>
              <Link
                to="/"
                className="text-gray-400 hover:text-white no-underline transition-colors text-sm"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/products"
                className="text-gray-400 hover:text-white no-underline transition-colors text-sm"
              >
                Products
              </Link>
            </li>
            <li>
              <Link
                to="/cart"
                className="text-gray-400 hover:text-white no-underline transition-colors text-sm"
              >
                Cart
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="text-gray-400 hover:text-white no-underline transition-colors text-sm"
              >
                About Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-lg font-bold text-teal-300 mb-4">Support</h3>
          <ul className="space-y-2 list-none p-0 m-0">
            <li>
              <a
                href="#faq"
                className="text-gray-400 hover:text-white no-underline transition-colors text-sm"
              >
                FAQ
              </a>
            </li>
            <li>
              <a
                href="#shipping"
                className="text-gray-400 hover:text-white no-underline transition-colors text-sm"
              >
                Shipping & Returns
              </a>
            </li>
            <li>
              <a
                href="#privacy"
                className="text-gray-400 hover:text-white no-underline transition-colors text-sm"
              >
                Privacy Policy
              </a>
            </li>
            <li>
              <a
                href="#terms"
                className="text-gray-400 hover:text-white no-underline transition-colors text-sm"
              >
                Terms of Service
              </a>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-bold text-teal-300 mb-4">Stay Updated</h3>
          <p className="text-gray-400 text-sm mb-4">
            Subscribe to get special offers and updates.
          </p>
          <div className="flex flex-col space-y-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400 text-sm"
            />
            <button className="bg-gradient-to-r from-teal-400 to-green-400 hover:from-teal-500 hover:to-green-500 text-gray-900 font-bold py-2 px-4 rounded-lg shadow-md transition-transform hover:scale-105 cursor-pointer text-sm">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="max-w-7xl mx-auto px-6 pt-6 border-t border-white/10 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} MyStore. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

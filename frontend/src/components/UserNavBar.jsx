import React from "react";
import { Link } from "react-router-dom";
import "../index.css";

const UserNavBar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-linear-to-r from-violet-900/70 to-purple-800/70 backdrop-blur-md border-b border-white/20 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Brand Logo - Gradient Text */}
        <Link
          to="/"
          className="text-3xl font-extrabold text-white no-underline! transition-opacity hover:opacity-80"
        >
          MyStore
        </Link>

        {/* Navigation Links as Buttons */}
        <ul className="flex space-x-4 items-center m-0 p-0 list-none">
          <li>
            <Link
              to="/"
              className="px-4 py-2 bg-white/10 hover:bg-white/25 rounded-lg text-white no-underline! font-medium tracking-wide transition-all shadow-sm hover:shadow-md hover:scale-105 inline-block"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/products"
              className="px-4 py-2 bg-white/10 hover:bg-white/25 rounded-lg text-white no-underline! font-medium tracking-wide transition-all shadow-sm hover:shadow-md hover:scale-105 inline-block"
            >
              Products
            </Link>
          </li>
          <li>
            <Link
              to="/cart"
              className="px-4 py-2 bg-white/10 hover:bg-white/25 rounded-lg text-white no-underline! font-medium tracking-wide transition-all shadow-sm hover:shadow-md hover:scale-105 inline-block"
            >
              Cart
            </Link>
          </li>
          <li>
            <Link
              to="/user-profile"
              className="px-4 py-2 bg-white/10 hover:bg-white/25 rounded-lg text-white no-underline! font-medium tracking-wide transition-all shadow-sm hover:shadow-md hover:scale-105 inline-block"
            >
              Profile
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="px-4 py-2 bg-white/10 hover:bg-white/25 rounded-lg text-white no-underline! font-medium tracking-wide transition-all shadow-sm hover:shadow-md hover:scale-105 inline-block"
            >
              About
            </Link>
          </li>

          {/* Logout Button */}
          <li className="ml-4">
            <Link
              to="/login"
              className="bg-linear-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white no-underline! font-semibold py-2 px-6 rounded-full shadow-md transition-all hover:scale-105 hover:shadow-lg inline-block"
            >
              Logout
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default UserNavBar;

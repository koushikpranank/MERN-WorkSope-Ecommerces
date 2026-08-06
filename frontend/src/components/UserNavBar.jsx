import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../index.css";

const UserNavBar = () => {
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    localStorage.clear();
    navigate("/login", { replace: true });
  };

  const isLoggedIn = !!localStorage.getItem("token");

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

          {/* Auth Buttons */}
          {isLoggedIn ? (
            <li className="ml-4">
              <button
                onClick={handleLogout}
                className="bg-linear-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-semibold py-2 px-6 rounded-full shadow-md transition-all hover:scale-105 hover:shadow-lg inline-block cursor-pointer border-0"
              >
                Logout
              </button>
            </li>
          ) : (
            <div className="flex space-x-3 ml-4">
              <li>
                <Link
                  to="/login"
                  className="bg-white/10 hover:bg-white/25 text-white no-underline! font-semibold py-2 px-5 rounded-full shadow-md transition-all hover:scale-105 inline-block border border-white/20"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="bg-linear-to-r from-teal-400 to-green-400 hover:from-teal-500 hover:to-green-500 text-gray-900 no-underline! font-bold py-2 px-5 rounded-full shadow-md transition-all hover:scale-105 inline-block"
                >
                  Register
                </Link>
              </li>
            </div>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default UserNavBar;

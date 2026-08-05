import React from "react";
import { Link } from "react-router-dom";
import UserNavBar from "../../components/UserNavBar";
import UserFooter from "../../components/UserFooter";

const Cart = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-violet-900">
      <UserNavBar />

      <div
        className="flex items-center justify-center p-6"
        style={{ minHeight: "calc(100vh - 80px)" }}
      >
        <div className="max-w-3xl w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 md:p-12 shadow-2xl flex flex-col items-center text-center text-white transition-all duration-300 hover:-translate-y-2">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 w-full text-center">
            Your{" "}
            <span className="bg-gradient-to-r from-teal-300 to-green-300 bg-clip-text text-transparent">
              Cart
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-200 leading-relaxed mb-10 max-w-2xl text-center">
            Your cart is currently empty. Browse our catalog to find premium
            products carefully curated for you.
          </p>

          <Link
            to="/products"
            className="inline-block bg-gradient-to-r from-teal-400 to-green-400 hover:from-teal-500 hover:to-green-500 text-gray-900 no-underline! font-bold py-3 px-8 rounded-full shadow-lg transition-transform hover:scale-105"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
      <UserFooter />
    </div>
  );
};

export default Cart;

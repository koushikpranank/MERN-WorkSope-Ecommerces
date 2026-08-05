import React from "react";
import { Link } from "react-router-dom";
import UserNavBar from "../../components/UserNavBar";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-violet-900 overflow-x-hidden">
      <UserNavBar />

      {/* Hero Section with Video Background */}
      <div className="relative w-full h-[80vh] flex items-center justify-center overflow-hidden border-b border-white/10">
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute z-0 w-auto min-w-full min-h-full max-w-none object-cover opacity-30"
        >
          {/* Free stock video for demo - replace with your own */}
          <source
            src="https://www.w3schools.com/html/mov_bbb.mp4"
            type="video/mp4"
          />
        </video>

        {/* Hero Text Content */}
        <div className="relative z-10 flex flex-col items-center text-center px-6">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 drop-shadow-xl">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-teal-300 to-green-300 bg-clip-text text-transparent">
              MyStore
            </span>
          </h1>
          <p className="text-lg md:text-2xl text-gray-200 mb-10 max-w-2xl drop-shadow-md">
            Experience the future of shopping. Premium products, seamless
            design, and unparalleled quality.
          </p>
          <Link
            to="/products"
            className="inline-block bg-gradient-to-r from-teal-400 to-green-400 hover:from-teal-500 hover:to-green-500 text-gray-900 no-underline! font-bold py-4 px-10 rounded-full shadow-2xl transition-transform hover:scale-110"
          >
            Start Exploring
          </Link>
        </div>
      </div>

      {/* Interactive Glassmorphism Cards Section */}
      <div className="max-w-7xl mx-auto px-6 py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-16">
          Why Shop <span className="text-teal-300">With Us?</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 shadow-xl hover:-translate-y-4 hover:shadow-2xl hover:bg-white/15 transition-all duration-300 flex flex-col items-center text-center group">
            <div className="w-20 h-20 bg-gradient-to-br from-teal-400 to-green-400 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:rotate-12 transition-transform">
              <span className="text-4xl">🚀</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">
              Fast Delivery
            </h3>
            <p className="text-gray-300 mb-6">
              Get your products delivered to your doorstep at lightning speed
              with our premium logistics.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 shadow-xl hover:-translate-y-4 hover:shadow-2xl hover:bg-white/15 transition-all duration-300 flex flex-col items-center text-center group">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-400 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:rotate-12 transition-transform">
              <span className="text-4xl">💎</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Top Quality</h3>
            <p className="text-gray-300 mb-6">
              Every item is carefully verified to ensure you receive only the
              highest quality products.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 shadow-xl hover:-translate-y-4 hover:shadow-2xl hover:bg-white/15 transition-all duration-300 flex flex-col items-center text-center group">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-indigo-400 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:rotate-12 transition-transform">
              <span className="text-4xl">🔒</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">
              Secure Checkout
            </h3>
            <p className="text-gray-300 mb-6">
              Your data is safe with us. Enjoy 100% secure, encrypted payments
              every time you shop.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

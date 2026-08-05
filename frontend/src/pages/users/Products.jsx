import React from "react";
import UserNavBar from "../../components/UserNavBar";

const Products = () => {
  // Dummy product data for the UI layout
  const products = [
    {
      id: 1,
      name: "Wireless Earbuds",
      price: "$49.99",
      icon: "🎧",
      color: "from-blue-400 to-indigo-500",
    },
    {
      id: 2,
      name: "Smart Watch Pro",
      price: "$199.99",
      icon: "⌚",
      color: "from-teal-400 to-green-500",
    },
    {
      id: 3,
      name: "Mechanical Keyboard",
      price: "$89.99",
      icon: "⌨️",
      color: "from-purple-400 to-pink-500",
    },
    {
      id: 4,
      name: "Gaming Mouse",
      price: "$59.99",
      icon: "🖱️",
      color: "from-red-400 to-orange-500",
    },
    {
      id: 5,
      name: "Ultra 4K Monitor",
      price: "$299.99",
      icon: "🖥️",
      color: "from-yellow-400 to-orange-500",
    },
    {
      id: 6,
      name: "VR Headset",
      price: "$349.99",
      icon: "🥽",
      color: "from-cyan-400 to-blue-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-violet-900">
      <UserNavBar />

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Our{" "}
            <span className="bg-gradient-to-r from-teal-300 to-green-300 bg-clip-text text-transparent">
              Collection
            </span>
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Discover our hand-picked selection of premium products designed to
            elevate your everyday experience.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 shadow-xl hover:-translate-y-3 hover:shadow-2xl hover:bg-white/15 transition-all duration-300 flex flex-col group"
            >
              {/* Product Image Placeholder */}
              <div
                className={`w-full h-48 rounded-2xl bg-gradient-to-br ${product.color} flex items-center justify-center mb-6 shadow-inner group-hover:scale-105 transition-transform duration-300`}
              >
                <span className="text-6xl drop-shadow-md">{product.icon}</span>
              </div>

              {/* Product Details */}
              <h3 className="text-2xl font-bold text-white mb-2">
                {product.name}
              </h3>
              <p className="text-gray-300 mb-6 flex-grow">
                Experience the best in class performance and sleek design with
                our premium {product.name.toLowerCase()}.
              </p>

              {/* Price and Add to Cart Button */}
              <div className="flex items-center justify-between mt-auto">
                <span className="text-2xl font-extrabold text-teal-300">
                  {product.price}
                </span>
                <button className="bg-gradient-to-r from-teal-400 to-green-400 hover:from-teal-500 hover:to-green-500 text-gray-900 font-bold py-2 px-6 rounded-full shadow-md transition-transform hover:scale-105 cursor-pointer">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;

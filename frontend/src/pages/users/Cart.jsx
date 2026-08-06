import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import UserNavBar from "../../components/UserNavBar";
import UserFooter from "../../components/UserFooter";
import DecodedToken from "../../services/DecodedToken";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [totalCost, setTotalCost] = useState(0);

  const fetchCartData = async () => {
    try {
      const userInfo = DecodedToken();
      if (!userInfo) {
        setCartItems([]);
        setLoading(false);
        return;
      }

      const token = localStorage.getItem("token") || "";
      const userId = userInfo.id || userInfo._id;

      const [productsRes, costRes] = await Promise.all([
        fetch(`http://localhost:5001/api/cart/products?userId=${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch(
          `http://localhost:5001/api/cart/get-total-cost?userId=${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        ),
      ]);

      if (productsRes.status === 404 || costRes.status === 404) {
        setCartItems([]);
        setTotalCost(0);
        setLoading(false);
        return;
      }

      const productsData = await productsRes.json();
      const costData = await costRes.json();

      if (productsRes.ok) {
        setCartItems(productsData.allCartProducts || []);
      } else {
        setCartItems([]);
      }

      if (costRes.ok) {
        setTotalCost(costData.totalCost || 0);
      }
    } catch (err) {
      console.error("Error fetching cart data:", err);
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCartData();
  }, []);

  const handleQuantityChange = async (productId, currentCount, delta) => {
    const newCount = currentCount + delta;

    // If quantity goes below 1, automatically trigger removal
    if (newCount < 1) {
      handleRemove(productId);
      return;
    }

    // Optimistically update the UI instantly
    setCartItems((prevItems) =>
      prevItems.map((item) => {
        const prodId = item.details._id || item.details.id;
        if (prodId === productId) {
          return { ...item, count: newCount };
        }
        return item;
      }),
    );

    try {
      const userInfo = DecodedToken();
      if (!userInfo) return;

      const token = localStorage.getItem("token") || "";
      const userId = userInfo.id || userInfo._id;

      const response = await fetch(
        "http://localhost:5001/api/cart/add-quantity",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ userId, productId, count: newCount }),
        },
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to update quantity.");
      }

      fetchCartData();
    } catch (err) {
      setMessage(`Error: ${err.message}`);
      setTimeout(() => setMessage(""), 3000);
      fetchCartData(); // Revert on error
    }
  };

  const handleRemove = async (productId) => {
    try {
      const userInfo = DecodedToken();
      if (!userInfo) return;

      const token = localStorage.getItem("token") || "";
      const userId = userInfo.id || userInfo._id;

      const response = await fetch(
        `http://localhost:5001/api/cart/remove?userId=${userId}&productId=${productId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to remove product.");
      }

      setMessage("Product removed successfully!");
      setTimeout(() => setMessage(""), 3000);
      fetchCartData();
    } catch (err) {
      setMessage(`Error: ${err.message}`);
      setTimeout(() => setMessage(""), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-indigo-900 to-violet-900 flex flex-col justify-between">
      <UserNavBar />

      <div className="max-w-4xl w-full mx-auto p-6 my-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-center text-white">
          Your{" "}
          <span className="bg-linear-to-r from-teal-300 to-green-300 bg-clip-text text-transparent">
            Cart
          </span>
        </h1>

        {message && (
          <div className="mb-6 p-3 text-center bg-teal-500/20 border border-teal-400 text-teal-200 rounded-xl font-medium shadow-lg">
            {message}
          </div>
        )}

        {loading ? (
          <div className="text-center text-white py-20 text-xl font-medium">
            Loading your cart...
          </div>
        ) : cartItems.length === 0 ? (
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 md:p-12 shadow-2xl flex flex-col items-center text-center text-white">
            <p className="text-lg md:text-xl text-gray-200 leading-relaxed mb-10 max-w-2xl">
              Your cart is currently empty. Browse our catalog to find premium
              products carefully curated for you.
            </p>
            <Link
              to="/products"
              className="inline-block bg-linear-to-r from-teal-400 to-green-400 hover:from-teal-500 hover:to-green-500 text-gray-900 font-bold py-3 px-8 rounded-full shadow-lg transition-transform hover:scale-105"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {cartItems.map((item) => {
              const prod = item.details;
              const count = item.count || 1;
              const price = Number(prod.price || prod.cost || 0);

              return (
                <div
                  key={prod._id}
                  className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 md:p-6 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4 text-white"
                >
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="w-20 h-20 object-cover rounded-xl shadow-inner"
                    />
                    <div>
                      <h3 className="text-xl font-bold">{prod.name}</h3>
                      <p className="text-teal-300 font-extrabold text-lg">
                        ${price.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center border border-white/30 rounded-full overflow-hidden bg-black/20">
                      <button
                        onClick={() =>
                          handleQuantityChange(prod._id, count, -1)
                        }
                        className="px-3 py-1 text-white hover:bg-white/20 transition-all cursor-pointer font-bold"
                      >
                        -
                      </button>
                      <span className="px-4 py-1 font-semibold text-white">
                        {count}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(prod._id, count, 1)}
                        className="px-3 py-1 text-white hover:bg-white/20 transition-all cursor-pointer font-bold"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => handleRemove(prod._id)}
                      className="bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-400/30 px-5 py-2 rounded-full font-semibold transition-all cursor-pointer text-sm text-center"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}

            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-xl flex flex-col sm:flex-row justify-between items-center text-white mt-6">
              <Link
                to="/products"
                className="text-teal-300 hover:underline font-semibold mb-4 sm:mb-0"
              >
                &larr; Continue Shopping
              </Link>
              <div className="flex items-center gap-6">
                <div className="text-xl font-bold">
                  Total:{" "}
                  <span className="text-teal-300">
                    ${Number(totalCost).toFixed(2)}
                  </span>
                </div>
                <button
                  onClick={() => alert("Proceeding to checkout...")}
                  className="bg-linear-to-r from-teal-400 to-green-400 hover:from-teal-500 hover:to-green-500 text-gray-900 font-bold py-2.5 px-6 rounded-full shadow-lg transition-transform hover:scale-105 cursor-pointer"
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <UserFooter />
    </div>
  );
};

export default Cart;

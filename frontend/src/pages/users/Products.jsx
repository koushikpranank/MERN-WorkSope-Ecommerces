import React, { useState, useEffect } from "react";
import UserNavBar from "../../components/UserNavBar";
import ProductsCarousel from "../../components/ProductsCarousel";
import ImageGallery from "../../components/ImageGallery";
import UserFooter from "../../components/UserFooter";
import DecodedToken from "../../services/DecodedToken";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [sortBy, setSortBy] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);
  const [cartMessage, setCartMessage] = useState("");
  const productsPerPage = 8;

  // Fetch products from backend on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:5001/api/products");

        if (!response.ok) {
          throw new Error("Failed to fetch products from the server.");
        }

        const data = await response.json();
        const productList = Array.isArray(data) ? data : data.allProducts || [];
        setProducts(productList);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Handle Add to Cart API Call with DecodedToken integration
  const handleAddToCart = async (productId) => {
    try {
      const userInfo = DecodedToken();

      if (!userInfo) {
        throw new Error("Please log in to add items to your cart.");
      }

      const userId = userInfo.id || userInfo._id;
      console.log(userId);

      if (!userId) {
        throw new Error("Invalid user ID found in session.");
      }

      const token = localStorage.getItem("token") || "";

      const response = await fetch("http://localhost:5001/api/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId,
          productId,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to add product to cart.");
      }

      setCartMessage("Product added to cart successfully!");
      setTimeout(() => setCartMessage(""), 3000);
    } catch (err) {
      setCartMessage(`Error: ${err.message}`);
      setTimeout(() => setCartMessage(""), 3000);
    }
  };

  // Extract unique brands dynamically for filter options
  const brands = [
    "All",
    ...new Set(products.map((p) => p.brand).filter(Boolean)),
  ];

  // 1. Filter products by search & brand
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product?.name
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesBrand =
      selectedBrand === "All" ||
      product?.brand?.toLowerCase() === selectedBrand.toLowerCase();
    return matchesSearch && matchesBrand;
  });

  // 2. Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    const priceA = parseFloat(a.price || a.cost || 0);
    const priceB = parseFloat(b.price || b.cost || 0);

    if (sortBy === "low-high") return priceA - priceB;
    if (sortBy === "high-low") return priceB - priceA;
    if (sortBy === "name-asc")
      return (a.name || "").localeCompare(b.name || "");
    return 0;
  });

  // 3. Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct,
  );
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleBrandChange = (brand) => {
    setSelectedBrand(brand);
    setCurrentPage(1);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-linear-to-br from-gray-900 via-indigo-900 to-violet-900">
      <div>
        <UserNavBar />

        {/* Hero Carousel Section */}
        <div className="px-6">
          <ProductsCarousel />
        </div>

        <div className="max-w-7xl mx-auto px-6 py-6">
          {/* Page Header */}
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
              Our{" "}
              <span className="bg-linear-to-r from-teal-300 to-green-300 bg-clip-text text-transparent">
                Collection
              </span>
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Discover our hand-picked selection of premium products designed to
              elevate your everyday experience.
            </p>
          </div>

          {/* Cart Feedback Banner */}
          {cartMessage && (
            <div className="mb-6 p-3 text-center bg-teal-500/20 border border-teal-400 text-teal-200 rounded-xl font-medium shadow-lg transition-all">
              {cartMessage}
            </div>
          )}

          {/* Search and Filters Bar */}
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-8">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full max-w-md px-6 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400 backdrop-blur-md shadow-lg transition-all"
            />

            <select
              value={sortBy}
              onChange={handleSortChange}
              className="w-full md:w-auto px-6 py-3 rounded-full bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-teal-400 backdrop-blur-md shadow-lg transition-all cursor-pointer [&>option]:bg-gray-900 [&>option]:text-white"
            >
              <option value="default">Sort by: Default</option>
              <option value="low-high">Price: Low to High</option>
              <option value="high-low">Price: High to Low</option>
              <option value="name-asc">Name: A to Z</option>
            </select>
          </div>

          {/* Brand Filter Pills */}
          {brands.length > 1 && (
            <div className="flex flex-wrap justify-center items-center gap-2 mb-12">
              {brands.map((brand) => (
                <button
                  key={brand}
                  onClick={() => handleBrandChange(brand)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all cursor-pointer ${
                    selectedBrand.toLowerCase() === brand.toLowerCase()
                      ? "bg-linear-to-r from-teal-400 to-green-400 text-gray-900 shadow-md scale-105"
                      : "bg-white/10 text-gray-300 hover:bg-white/20 border border-white/10"
                  }`}
                >
                  {brand.charAt(0).toUpperCase() + brand.slice(1)}
                </button>
              ))}
            </div>
          )}

          {/* Loading / Error States */}
          {loading ? (
            <div className="text-center text-white py-20 text-xl font-medium">
              Loading products from backend...
            </div>
          ) : error ? (
            <div className="text-center text-red-400 py-20 text-xl font-medium">
              Error: {error}
            </div>
          ) : (
            <>
              {/* Products Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {currentProducts.length > 0 ? (
                  currentProducts.map((product) => (
                    <div
                      key={product.id || product._id}
                      className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-5 shadow-xl hover:-translate-y-2 hover:shadow-2xl hover:bg-white/15 transition-all duration-300 flex flex-col group"
                    >
                      <div className="w-full h-40 rounded-2xl overflow-hidden mb-5 shadow-inner">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-300 mb-5 grow">
                        {product.description ||
                          `Premium ${product.name?.toLowerCase() || ""} for your everyday needs.`}
                      </p>
                      <div className="flex items-center justify-between mt-auto">
                        <span className="text-xl font-extrabold text-teal-300">
                          ${product.price || product.cost}
                        </span>
                        <button
                          onClick={() =>
                            handleAddToCart(product._id || product.id)
                          }
                          className="bg-linear-to-r from-teal-400 to-green-400 hover:from-teal-500 hover:to-green-500 text-gray-900 font-bold py-1.5 px-4 rounded-full shadow-md transition-transform hover:scale-105 cursor-pointer text-sm"
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full text-center text-gray-300 py-10">
                    No products found matching your criteria.
                  </div>
                )}
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center space-x-4 mb-16">
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                    className={`px-6 py-2 rounded-full font-bold transition-all ${currentPage === 1 ? "bg-gray-600 text-gray-400 cursor-not-allowed" : "bg-white/10 text-white hover:bg-white/25 shadow-md"}`}
                  >
                    Previous
                  </button>

                  <span className="text-white font-medium">
                    Page {currentPage} of {totalPages}
                  </span>

                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                    className={`px-6 py-2 rounded-full font-bold transition-all ${currentPage === totalPages ? "bg-gray-600 text-gray-400 cursor-not-allowed" : "bg-linear-to-r from-teal-400 to-green-400 text-gray-900 shadow-md hover:scale-105"}`}
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}

          {/* Gallery Section */}
          <ImageGallery />
        </div>
      </div>

      <UserFooter />
    </div>
  );
};

export default Products;

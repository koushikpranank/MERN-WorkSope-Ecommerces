import React, { useState, useEffect } from "react";
import UserNavBar from "../../components/UserNavBar";
import ProductsCarousel from "../../components/ProductsCarousel";
import ImageGallery from "../../components/ImageGallery";
import UserFooter from "../../components/UserFooter";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
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

        // FIX: Handle backend response structure ({ message, allProducts })
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

  // 1. Filter products safely by search
  const filteredProducts = products.filter((product) =>
    product?.name?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // 2. Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct,
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to page 1 when searching
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

          {/* Search Bar */}
          <div className="flex justify-center mb-12">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full max-w-md px-6 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400 backdrop-blur-md shadow-lg transition-all"
            />
          </div>

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
                          ${product.price}
                        </span>
                        <button className="bg-linear-to-r from-teal-400 to-green-400 hover:from-teal-500 hover:to-green-500 text-gray-900 font-bold py-1.5 px-4 rounded-full shadow-md transition-transform hover:scale-105 cursor-pointer text-sm">
                          Add
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full text-center text-gray-300 py-10">
                    No products found matching "{searchTerm}".
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

const mongoose = require("mongoose");
const Products = require("../model/products");

// 1. Add Product
const AddProduct = async (req, res) => {
  try {
    const newProduct = await Products.create(req.body);
    res.status(201).json({ message: "Product added successfully", newProduct });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to add product", err: error.message });
  }
};

// 2. Get All Products
const GetProducts = async (req, res) => {
  try {
    const allProducts = await Products.find();
    res.status(200).json({ allProducts });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to get products", err: error.message });
  }
};

// 3. Get Product Based on ID
const GetProductBasedOnId = async (req, res) => {
  try {
    const vendorId = req.user.id; // From your auth middleware token
    const productId = req.params.id; // From your route URL /getproduct/:id

    const foundProduct = await Products.aggregate([
      // 1. Match the specific product AND verify this vendor owns it
      {
        $match: {
          vendorId: vendorId,
          _id: new mongoose.Types.ObjectId(productId), // Fixed: match product ID
        },
      },
      // 2. Lookup/Join the products collection
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "vendorId",
          as: "ProductDetails",
        },
      },
      // 3. Project stage moved inside the array
      {
        $project: { ProductDetails: 1, _id: 0 },
      },
    ]);

    if (!foundProduct || foundProduct.length === 0) {
      return res
        .status(404)
        .json({ message: "Product not found or you don't have access to it" });
    }

    res.status(200).json({ foundProduct: foundProduct[0] });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to get product", err: error.message });
  }
};

// 4. Update Product
const UpdateProduct = async (req, res) => {
  try {
    const updatedProduct = await Products.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    if (!updatedProduct)
      return res.status(404).json({ message: "Product not found" });

    res.status(200).json({
      message: "Updated successfully",
      updatedProductDetails: updatedProduct,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update product", err: error.message });
  }
};

// 5. Delete Product
const DeleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Products.findByIdAndDelete(req.params.id);
    if (!deletedProduct)
      return res.status(404).json({ message: "Product not found" });

    res
      .status(200)
      .json({ message: "Product deleted successfully", deletedProduct });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete product", err: error.message });
  }
};

// 6. Filter Products on Price Range
const FilterProductsOnPrice = async (req, res) => {
  try {
    const min = Number(req.query.min) || 0;
    const max = Number(req.query.max) || Infinity;

    const filteredProducts = await Products.find({
      price: { $gte: min, $lte: max },
    });
    res.status(200).json({ filteredProducts });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to filter products", err: error.message });
  }
};

// 7. Filter Products on Ratings
const FilterProductsOnRatings = async (req, res) => {
  try {
    const filteredProducts = await Products.find({
      ratings: Number(req.query.ratings),
    });
    res.status(200).json({ filteredProducts });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to filter by ratings", err: error.message });
  }
};

// 8. Get Products with Pagination
const getProductsWithPagination = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const ProductRecords = await Products.find().skip(skip).limit(limit);
    res
      .status(200)
      .json({ success: true, currentPage: page, limit, ProductRecords });
  } catch (error) {
    res.status(500).json({
      message: "Failed to get paginated products",
      err: error.message,
    });
  }
};

// 9. Get Products Based on Specific Price Range (Note: Assuming schema uses 'price', not 'cost')
const getProductsBasedOnPrice = async (req, res) => {
  try {
    const { minPrice, maxPrice } = req.query;
    // Changed 'cost' to 'price' assuming that is your schema property
    const filteredProducts = await Products.find({
      price: { $gte: minPrice, $lte: maxPrice },
    });

    if (filteredProducts.length === 0) {
      return res.status(404).json({
        message: `No products found between ${minPrice} and ${maxPrice}`,
      });
    }
    res.status(200).json({ filteredProducts });
  } catch (error) {
    res.status(500).json({
      message: "Failed to filter products based on price",
      err: error.message,
    });
  }
};

// 10. Get Products Based on Brand
const getProductsBasedOnBrand = async (req, res) => {
  try {
    const { brand } = req.query;
    const filteredProducts = await Products.find({
      brand: brand?.toLowerCase(),
    });

    if (filteredProducts.length === 0) {
      return res
        .status(404)
        .json({ message: `No products found for brand: ${brand}` });
    }
    res.status(200).json({ filteredProducts });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to filter by brand", err: error.message }); // Fixed missing response
  }
};

// 11. Get Limited Products (Redundant to pagination, but cleaned up)
const getLimitedProducts = async (req, res) => {
  try {
    const pages = parseInt(req.query.pages) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const foundProducts = await Products.find()
      .skip((pages - 1) * limit)
      .limit(limit);

    if (foundProducts.length === 0) {
      return res
        .status(404)
        .json({ message: `No products found for page ${pages}` });
    }
    res.status(200).json({ currentPage: pages, limit, foundProducts });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to get limited products", err: error.message });
  }
};

module.exports = {
  AddProduct,
  GetProducts,
  GetProductBasedOnId,
  DeleteProduct,
  UpdateProduct,
  FilterProductsOnPrice,
  FilterProductsOnRatings,
  getProductsWithPagination,
  getProductsBasedOnPrice,
  getProductsBasedOnBrand,
  getLimitedProducts,
};

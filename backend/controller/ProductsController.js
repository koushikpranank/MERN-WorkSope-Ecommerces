const Products = require("../model/products");
const Users = require("../model/users");
const mongoose = require("mongoose");
const { sendPromotionEmail } = require("../services/emailServices");

// Add Products -> vendor access
const AddProduct = async (req, res) => {
  try {
    const newProduct = req.body;
    const user = {
      venderId: req.user.id,
      brand: newProduct.brand.toLowerCase(),
    };

    await Products.create({
      ...newProduct,
      ...user,
    });

    res.status(200).json({ message: "product added successfully" });

   
    const allUsers = await Users.find({}, { email: 1 });
    allUsers.forEach((u) => {
      if (u.email) sendPromotionEmail(u.email, newProduct.productName);
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "failed to add" });
  }
};

// Get all products -> all type of users
const GetProducts = async (req, res) => {
  try {
    const allProducts = await Products.find();
    if (allProducts.length == 0) {
      return res.status(404).json({ message: "Products Not Found" }); // Added return
    }
    res.status(200).json({ message: "get successfully", allProducts });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "failed to get products" });
  }
};

// Update product details -> vendor access
const updateProduct = async (req, res) => {
  try {
    const foundProduct = await Products.findById(req.params.id);
    if (foundProduct == null) {
      return res.status(404).json({ message: "invalid Product ID" }); // Added return
    }

    const updatedProduct = await Products.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true },
    );
    res.status(200).json({ message: "updated successful", updatedProduct });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "failed to update product details" });
  }
};

// Delete Product -> vendor access
const DeleteProduct = async (req, res) => {
  try {
    const foundProduct = await Products.findById(req.params.id);
    if (foundProduct == null) {
      return res.status(404).json({ message: "Product Not Found to delete" }); // Added return
    }

    await Products.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Product deleted Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "failed to delete product" });
  }
};

// Get products based on prices (min and max) -> all type of users
const GetProductsBasedOnPrice = async (req, res) => {
  try {
    const { max, min } = req.query;
    const filteredProducts = await Products.find({
      cost: { $gte: min, $lte: max },
    });

    if (filteredProducts.length == 0) {
      return res
        .status(404)
        .json({ message: `No Products Found in that range ${min} To ${max}` }); // Added return
    }

    res.status(200).json({ filteredProducts });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "failed to get filtered products" });
  }
};

// Get products based on brand name -> all type of users
const GetProductsBasedOnBrand = async (req, res) => {
  try {
    const { brand } = req.query;
    const filteredProduct = await Products.find({ brand: brand.toLowerCase() });

    if (filteredProduct.length == 0) {
      return res
        .status(404)
        .json({ message: `No Products Found on brand ${brand}` }); // Added return
    }
    res.status(200).json({ filteredProduct });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "failed to get filtered products" });
  }
};

// Get products on pagination -> all type of users
const getLimitedProducts = async (req, res) => {
  try {
    // FIX: Ensure page and limit are converted to numbers for math
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const foundProduct = await Products.find().skip(skip).limit(limit);

    if (foundProduct.length == 0) {
      return res
        .status(404)
        .json({ message: "No Products found on this page" }); // Added return
    }
    res
      .status(200)
      .json({ currentPage: page, limit: limit, data: foundProduct });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "failed to get filtered products" });
  }
};

// Get matched Products based on userId
const getProductsOnUserId = async (req, res) => {
  try {
    const vendorId = req.user.id;
    const allProducts = await Users.aggregate([
      {
        $match: { role: "vendor", _id: new mongoose.Types.ObjectId(vendorId) },
      },
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "venderId",
          as: "ProductsDetails",
        },
      },
      { $project: { ProductsDetails: 1, _id: 0 } },
    ]);
    res.status(200).json({ allProducts });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "failed to get products" });
  }
};

module.exports = {
  AddProduct,
  GetProducts,
  GetProductsBasedOnBrand,
  GetProductsBasedOnPrice,
  getLimitedProducts,
  updateProduct,
  DeleteProduct,
  getProductsOnUserId,
};

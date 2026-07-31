const express = require("express");
const router = express.Router();
const {
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
} = require("../controller/ProductsController");

const { isAdmin, isUser } = require("../middleware/userRoleAuth");

// Core CRUD Endpoints
router.post("/addproduct", AddProduct);
router.get("/getproducts", isUser, GetProducts);
router.get("/getproduct/:id", GetProductBasedOnId);
router.put("/updateproduct/:id", UpdateProduct);
router.delete("/deleteproduct/:id", DeleteProduct);

// Advanced Filtering & Pagination Endpoints
router.get("/filterproducts/price", FilterProductsOnPrice);
router.get("/filterproducts/ratings", FilterProductsOnRatings);
router.get("/getproductspagination", getProductsWithPagination);
router.get("/getproducts/price", getProductsBasedOnPrice);
router.get("/getproducts/brand", getProductsBasedOnBrand);
router.get("/getlimitedproducts", getLimitedProducts);

module.exports = router;

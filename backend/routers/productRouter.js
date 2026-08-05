const express = require("express");
const router = express.Router();
const {
  AddProduct,
  GetProducts,
  GetProductsBasedOnBrand,
  GetProductsBasedOnPrice,
  getLimitedProducts,
  updateProduct,
  DeleteProduct,
  getProductsOnUserId,
} = require("../controller/ProductsController");

const { isUser, isAdmin, isVendor } = require("../middleware/userRoleAuth");

router.post("/add-product", isVendor, AddProduct);
router.get("/", GetProducts); // Fixed route to match /api/products
router.get("/products-brand", GetProductsBasedOnBrand);
router.get("/products-price", GetProductsBasedOnPrice);
router.get("/products-pagination", getLimitedProducts);
router.put("/update-product/:id", isVendor, updateProduct);
router.delete("/delete-product/:id", isVendor, DeleteProduct);
router.get("/get-products", isVendor, getProductsOnUserId);

module.exports = router;

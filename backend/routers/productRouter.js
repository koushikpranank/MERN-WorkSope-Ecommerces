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

router.post("/addproduct", AddProduct);
router.get("/getproducts", GetProducts);
router.get("/getproduct/:id", GetProductBasedOnId);
router.delete("/deleteproduct/:id", DeleteProduct);
router.put("/updateproduct/:id", UpdateProduct);
router.get("/filterproducts/price", FilterProductsOnPrice);
router.get("/filterproducts/ratings", FilterProductsOnRatings);
router.get("/getproductspagination", getProductsWithPagination);
router.get("/getproducts/price", getProductsBasedOnPrice);
router.get("/getproducts/brand", getProductsBasedOnBrand);
router.get("/getlimitedproducts", getLimitedProducts);
router.delete("/deleteuser/:id", deleteUser);

module.exports = router;

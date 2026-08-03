const express = require("express");
const router = express.Router();

// I added getCartProducts to the import list here:
const {
  AddToCart,
  RemoveCartProduct,
  addQuantity,
  getTotalCost,
  getCartProducts,
} = require("../controller/CartController");

const { isUser } = require("../middleware/userRoleAuth");

router.post("/add", isUser, AddToCart);
router.delete("/remove", isUser, RemoveCartProduct);
router.get("/get-total-cost", isUser, getTotalCost);
router.post("/add-quantity", isUser, addQuantity);
router.get("/products", isUser, getCartProducts);

module.exports = router;

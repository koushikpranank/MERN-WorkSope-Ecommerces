const express = require("express");
const router = express.Router();
const {
  register,
  login,
  getAllUsers,
  deleteUser,
} = require("../controller/UserController");
const { isAdmin } = require("../middleware/userRoleAuth");
router.post("/register", register);
router.post("/login", login);
router.get("/getallusers", isAdmin, getAllUsers);
router.delete("/deleteuser/:id", isAdmin, deleteUser);

module.exports = router;

const express = require("express");
const router = express.Router();
const {
  Register,
  Login,
  getUsers,
  deleteUser,
  updateUserDetails,
  emailController,
} = require("../controller/UserController");

const { isAdmin } = require("../middleware/userRoleAuth");

router.post("/send-otp", emailController);
router.post("/register", Register);
router.post("/login", Login);
router.delete("/delete-user/:id", isAdmin, deleteUser);
router.get("/users", isAdmin, getUsers);
router.put("/update-user/:id", updateUserDetails);

module.exports = router;

const express= require("express");
const router=express.Router();
const { register, login, getAllUsers, deleteUser } = require("../controller/UserController");

router.post("/register", register);
router.post("/login", login);
router.get("/getallusers", getAllUsers);
router.delete("/deleteuser/:id", deleteUser);




module.exports=router;
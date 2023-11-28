const express = require("express");
const router = express.Router();
const {
  register,
  login,
  logout,
  getUser,
  getLoginStatus,
  updateUser,
  updatePhoto,
  saveCart,
  getCart,
} = require("../controllers/userController");

const {authenticateUser} = require("../middlewares/authentication-middleware");

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/getuser", authenticateUser, getUser);
router.get("/getloginstatus", getLoginStatus);
router.patch("/updateuser",authenticateUser, updateUser);
router.patch("/updatephoto",authenticateUser, updatePhoto);

//CART:
router.get("/getCart",authenticateUser, getCart)
router.patch("/saveCart",authenticateUser, saveCart);

module.exports = router;

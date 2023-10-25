const express = require("express");
const router = express.Router();

const {
  authenticateUser,
  adminOnly,
} = require("../middlewares/authentication-middleware");

const {
  createProduct,
  getProducts,
  getSingleProduct,
  deleteProduct,
  updateProduct,
  reviewProduct,
  deleteReview,
  updateReview,
} = require("../controllers/productController");

router.post("/", authenticateUser, adminOnly, createProduct);
router.get("/", getProducts);
router.get("/:id", getSingleProduct);
router.delete("/:id", authenticateUser, adminOnly, deleteProduct);
router.patch("/:id",authenticateUser,adminOnly, updateProduct);

router.patch("/review/:id",authenticateUser, reviewProduct);//we want to review a product by its id.
router.patch("/deletereview/:id",authenticateUser, deleteReview);
router.patch("/updatereview/:id",authenticateUser, updateReview);

module.exports = router;

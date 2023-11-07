const express = require("express");
const router = express.Router();

const {createCategory, getCategories, deleteCategory} = require("../controllers/categoryController");
const {authenticateUser,adminOnly} = require("../middlewares/authentication-middleware")

router.post("/createcategory",authenticateUser,adminOnly,createCategory);
router.get("/getCategories",authenticateUser,adminOnly, getCategories);
router.delete("/:slug",authenticateUser,adminOnly, deleteCategory)

module.exports = router;



// {
//     "email":"admin@gmail.com",
//     "password":"bernard"
// }


// {
//     "orderDate":"Mon 3rd Dec,202",
//     "orderTime":"9:00am",
//     "orderAmount":"100",
//     "orderStatus":"order Placed",
//     "cartItems":"REGULAR_USERps5",
//     "shippingAddress":"Nigeria",
//     "paymentMethod":"Stripe",
//     "coupon":"presale"
// }


// {
//     "orderStatus":"processing"
// }
const express = require("express");
const router = express.Router();


const {createCoupon,getCoupons,getSingleCoupon,deleteCoupon} =require("../controllers/couponController");
const {authenticateUser,adminOnly} = require("../middlewares/authentication-middleware");

router.post("/createCoupon", authenticateUser,adminOnly,createCoupon);
router.get("/getCoupons",authenticateUser,adminOnly,getCoupons);
router.get("/:couponName",authenticateUser,getSingleCoupon);
router.delete("/:id", authenticateUser,adminOnly,deleteCoupon)


module.exports = router;
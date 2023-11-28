const express = require("express");
const router = express.Router();

const {authenticateUser, adminOnly} = require("../middlewares/authentication-middleware")

const {createOrder, getOrders, getSingleOrder, updateOrderStatus, payWithStripe, verifyFlwPayment} = require("../controllers/orderController");

router.post("/createOrder", authenticateUser, createOrder);
router.get("/response",verifyFlwPayment);
router.get("/getOrders",authenticateUser,getOrders);
router.get("/:id",authenticateUser,getSingleOrder);
router.post("/create-payment-intent",payWithStripe);
router.patch("/:id",authenticateUser, adminOnly, updateOrderStatus);

module.exports = router;

// 6545c0d48e379745044d0552 admin's
// 6545b882a800e6983c65630d admin's
// 6545c26a8e379745044d0556 ben's
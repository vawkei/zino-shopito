const express = require("express");
const router = express.Router();

const {
  transferFunds,
  verifyAccount,
  getUserTransactions,
  depositFundsStripe,
  webhook,
  depositFundsFlutterwave
} = require("../controllers/transactionController");
const {
  authenticateUser,
} = require("../middlewares/authentication-middleware");

router.post("/transferFunds", express.json(), authenticateUser, transferFunds);
router.post("/verifyAccount", express.json(), authenticateUser, verifyAccount);

router.get(
  "/getUserTransactions",
  express.json(),
  authenticateUser,
  getUserTransactions
);
router.post(
  "/depositFundsStripe",
  express.json(),
  authenticateUser,
  depositFundsStripe
);

router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  webhook
);

router.get(
  "/depositFundsFlutterwave",
  express.json(),
  authenticateUser,
  depositFundsFlutterwave
);

module.exports = router;

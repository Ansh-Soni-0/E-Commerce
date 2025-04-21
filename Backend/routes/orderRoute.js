const express = require("express");
const { adminAuth } = require("../middleware/adminAuth");

const {
  placeOrder,
  placeOrderStripe,
  placeOrderRazorpay,
  allOrders,
  userOrders,
  updateStatus,
} = require("../controllers/orderController");
const { authUser } = require("../middleware/auth");

const orderRouter = express.Router();

//Admin features
orderRouter.post("/list", adminAuth, allOrders);
orderRouter.post("/status", adminAuth, updateStatus);

//payment features
orderRouter.post("/place", authUser, placeOrder);
orderRouter.post("/stripe", authUser, placeOrderStripe);
orderRouter.post("/razorpay", authUser, placeOrderRazorpay);

//user feature
orderRouter.post("/userorders", authUser, userOrders);

module.exports = orderRouter;

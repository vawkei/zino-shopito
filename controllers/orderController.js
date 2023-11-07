const Order = require("../models/order");
const User = require("../models/user");

//create order:
const createOrder = async (req, res) => {
  const {
    orderDate,
    orderTime,
    orderAmount,
    orderStatus,
    cartItems,
    shippingAddress,
    paymentMethod,
    coupon,
  } = req.body;

  if (!cartItems || !orderStatus || !shippingAddress || !paymentMethod) {
    return res.status(400).json({ msg: "Order data missing!!!" });
  }

  try {
    await Order.create({
      createdBy: req.user.userId,
      orderDate,
      orderTime,
      orderAmount,
      orderStatus,
      cartItems,
      shippingAddress,
      paymentMethod,
      coupon,
    });
    res.status(201).json({ msg: "Order was created" });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

//get orders:

const getOrders = async (req, res) => {
  const userId = req.user.userId;
  //console.log(userId)

  try {
    const user = await User.findOne({ _id: userId }).select("-password");
    //console.log(user)

    if (user.role === "admin") {
      const orders = await Order.find({}).sort("-createdAt");
      return res.status(200).json({ orders, nbhits: orders.length });
    }
    const orders = await Order.find({ createdBy: user._id }).sort("-createdAt");
    res.status(200).json(orders);
    // res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

//getSingleOrders:

const getSingleOrder = async (req, res) => {
  const orderId = req.params.id;

  try {
    const order = await Order.findOne({ _id: orderId });
    if (!order) {
      return res.status(404).json({ msg: `No order with id:${orderId}` });
    }

    const user = await User.findOne({ _id: req.user.userId });
    if (user.role === "admin") {
      return res.status(200).json(order);
    }

    const userOrder = await Order.findOne({
      _id: orderId,
      createdBy: req.user.userId,
    });

    if (!userOrder) {
      return res
        .status(404)
        .json({ msg: `There's no order with id:${orderId} for ${user.name}` });
    }

    res.status(200).json(userOrder);
  } catch (error) {
    console.log(error);

    res.status(500).json(error);
  }
};

//update order status:
const updateOrderStatus = async (req, res) => {
  const  orderStatus  = req.body;
  const { id } = req.params;

  try {
    // const order = await Order.findOne({ _id: id });

    // if (!order) {
    //   return res.status(404).json({ msg: `No order with id: ${id}` });
    // }
    const order = await Order.findOneAndUpdate(
      { _id: id },
      orderStatus,
      { new: true, runValidators: true }
    );

    if (!order) {
      return res.status(404).json({ msg: `No order with id: ${id}` });
    }
    res.status(200).json({msg:"Order status updated",order})
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = { createOrder, getOrders, getSingleOrder, updateOrderStatus };

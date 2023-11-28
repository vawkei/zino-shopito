const Order = require("../models/order");
const User = require("../models/user");
const Products = require("../models/products");
const { calculateTotalPrice, updateProductQuantity } = require("../utils");
const sendEmail = require("../utils/sendEmail");
const { orderSuccessEmail } = require("../email-templates/orderTemplate");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const axios = require("axios");

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

  const user = await User.findOne({_id:req.user.userId})
  console.log(user)

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

    //update product quantity:
    await updateProductQuantity(cartItems);
    

    //send order email message to the user:
    const subject = "New order placed -Shopito";
    const send_to = user.email; 
    const template = orderSuccessEmail(user.name,cartItems);
    const reply_to = "noreply@shopito.com"

    await sendEmail(subject,send_to,template,reply_to);

    res.status(201).json({ msg: "Order was created" });
  } catch (error) {
    console.log(error);
    res.status(500).json({msg:error.message});
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
    res.status(200).json({orders});
    // res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
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
  const orderStatus = req.body;
  const { id } = req.params;

  try {
    // const order = await Order.findOne({ _id: id });

    // if (!order) {
    //   return res.status(404).json({ msg: `No order with id: ${id}` });
    // }
    const order = await Order.findOneAndUpdate({ _id: id }, orderStatus, {
      new: true,
      runValidators: true,
    });

    if (!order) {
      return res.status(404).json({ msg: `No order with id: ${id}` });
    }
    res.status(200).json({ msg: "Order status updated", order });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

//payWithStripe:
const payWithStripe = async (req, res) => {
  const { items,shipping,description,coupon } = req.body;

  const calculateOrderAmount = (items) => {
    // Replace this constant with a calculation of the order's amount
    // Calculate the order total on the server to prevent
    // people from directly manipulating the amount on the client
    return 1400;
  };

  const products = await Products.find();
  let orderAmount;

  orderAmount = calculateTotalPrice(products,items);

  if(coupon !== null && coupon?.name !== "nill"){
    let totalAmount = orderAmount -(orderAmount*coupon.discount) /100;
    orderAmount = totalAmount
  }

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: orderAmount,
    currency: "usd",
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {
      enabled: true,
    },
    description,
    shipping:{
      address:{
        line1:shipping.line1,
        line2:shipping.line2,
        city:shipping.city,
        country:shipping.country,
        postal_code:shipping.postal_code
      },
      name:shipping.name,
      phone:shipping.phone
    }
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
};


//verifyFlwPayment:
const verifyFlwPayment =async (req,res)=>{
  const {transaction_id} = req.query;

  //confirm transaction:
  const url = `https://api.flutterwave.com/v3/transactions/${transaction_id}/verify`;

  const response = await axios({
    url:url,
    method: "get",
    headers:{
      "Content-Type":"application/json",
      Accept:"application/json",
      Authorization:process.env.FLUTTERWAVE_SECRET_KEY
    }
  })

  console.log(response)
  const {tx_ref} = response.data.data;

  const successURL = process.env.FRONTEND_URL + `/checkout-flutterwave?payment=successful&ref=${tx_ref}`;
  
  const failURL = process.env.FRONTEND_URL + `/checkout-flutterwave?payment=failed`;
  
  if(req.query.status==="successful"){
    res.redirect(successURL)
  }else{
    res.redirect(failURL)
  };
  
}

module.exports = {
  createOrder,
  getOrders,
  getSingleOrder,
  updateOrderStatus,
  payWithStripe,
  verifyFlwPayment
};

const Products = require("../models/products");

const Stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

//calculateTotalPrice:

// function calculateTotalPrice(products, cartItems) {
//     let totalPrice = 0;
  
//     cartItems.forEach(function (cartItem) {
//       const product = products.find(function (product) {
//         return product._id?.toString() === cartItem._id;
//       });
  
//       if (product) {
//         const quantity = cartItem.cartQuantity;
//         const price = parseFloat(product.price);
//         totalPrice += quantity * price;
//       }
//     });
  
//     return totalPrice;
//   }
  


const calculateTotalPrice = (products, cartItems) => {
  let totalPrice = 0;

  cartItems.forEach((cartItem) => {
    const product = products.find(product => product._id?.toString() === cartItem._id);

    if (product) {
      const { cartQuantity } = cartItem; //or const quantity = cartItem.cartQuantity;
      const price = parseFloat(product.price);
      totalPrice += cartQuantity * price;
    }
  });

  return totalPrice * 100;
};

//updateProductQuantity:
const updateProductQuantity =async (cartItems)=>{
  let bulkOption = cartItems.map((product)=>{
    return{
      updateOne:{
        filter:{_id:product._id},
        update:{
          $inc:{
            quantity:-product.cartQuantity,
            sold:+product.cartQuantity
          }
        }
      }
    }
  })
  await Products.bulkWrite(bulkOption,{})
}

  module.exports = {calculateTotalPrice, updateProductQuantity, Stripe}










  // server.js
//
// Use this sample code to handle webhook events in your integration.
//
// 1) Paste this code into a new file (server.js)
//
// 2) Install dependencies
//   npm install stripe
//   npm install express
//
// 3) Run the server on http://localhost:4242
//   node server.js

// The library needs to be configured with your account's secret key.
// Ensure the key is kept out of any version control system you might be using.

// const stripe = require('stripe')('sk_test_...');
// const express = require('express');
// const app = express();


// // This is your Stripe CLI webhook secret for testing your endpoint locally.
// const endpointSecret = "whsec_3b9bf03c9d3405909861117bc55b368a9d342751e6a8a98f163f7276dde120a0";

// app.post('/webhook', express.raw({type: 'application/json'}), (request, response) => {
//   const sig = request.headers['stripe-signature'];

//   let event;

//   try {
//     event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
//   } catch (err) {
//     response.status(400).send(`Webhook Error: ${err.message}`);
//     return;
//   }

//   // Handle the event
//   console.log(`Unhandled event type ${event.type}`);

//   // Return a 200 response to acknowledge receipt of the event
//   response.send();
// });

// app.listen(4242, () => console.log('Running on port 4242'));


  
const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Please enter a name"],
    },
    email: {
      type: String,
      trim: true,
      required: [true, "Please provide an email address"],
      unique: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please Provide a valid email",
      ],
    },
    password: {
      type: String,
      trim: true,
      required: [true, "Please provide a password"],
      minlength: [6, "password shouldn't be less than 6 characters."],
    },
    role: {
      type: String,
      required: [true],
      default: "customer",
      enum: ["customer", "admin"],
    },
    photo: {
      type: String,
      required: [true, "Please add a photo"],
      default: "https://i.ibb.co/4pDNDk1/avatar.png",
    },
    phone: {
      type: String,
      default: "+234",
    },
    balance:{
      type:Number,
      default:0 //note: went to the mongodb to change it frm 0 to 100 in the user who he was presently loggedinto, mine was admin.
    },
    address: {
      type: Object,
      // address,state,country
    },
    cartItems:{
      type:[Object]
    },
    stripeCustomerId:{
      type:String
    },
    
  },
  { timestamp: true }
);

module.exports = mongoose.model("user", UserSchema);

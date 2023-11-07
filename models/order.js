const mongoose = require("mongoose");
const orderSchema = mongoose.Schema({
    createdBy:{
        type:mongoose.Types.ObjectId,
        required:[true,"Please provide a user"],
        ref:"user"
    },
    orderDate:{
        type:String,
        trim:true,
        required:[true,"Please add an order time"]
    },
    orderTime:{
        type:String,
        trim:true,
        required:[true,"Please add an order date"]
    },
    orderAmount:{
        type:Number,
        trim:true,
        required:[true,"Please add an order amount"]
    },
    orderStatus:{
        type:String,
        trim:true,
        required:[true,"Please add an order status"]
    },
    paymentMethod:{
        type:String,
        trim:true
    },
    cartItems:{
        type:String,
        //type:[object], start as string for testing, then he changed it later
        required:[true]
    },
    shippingAddress:{
        type:String,
        //type:Object,start as string for testing, then he changed it later
        required:true
    },
    coupon:{
        type:Object,
        required:true,
        default:{
            name:"nill"
        }
    }
}, {timestamps:true});

module.exports = mongoose.model("order",orderSchema);
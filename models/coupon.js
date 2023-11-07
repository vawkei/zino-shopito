const mongoose =require("mongoose");
const couponSchema = mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:[true,"Please add a coupon name"],
        unique:true,
        uppercase:true,
        minlength:[6,"Coupon must be up to 6 charcters"],
        maxlength:[12,"Coupon must not be more than 12 characters"],
    },
    discount:{
        type:Number,
        required:true
    },
    expiresAt:{
        //type:Date,
        type:String,
        required:true
    }
},{timestamps:true});

module.exports = mongoose.model("coupon",couponSchema);
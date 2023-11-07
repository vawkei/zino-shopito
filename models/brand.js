const mongoose = require("mongoose");
const brandSchema = mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:[true,"Please fill in a brand name"],
        minlength:[2,"Too short"],
        maxlength:[32,"Too long"]
    },
    slug:{
        type:String,
        unique:true,
        lowercase:true,
        index:true
    },
    category:{
        type:String,
        required:true
    }
},{timestamps:true});

module.exports = mongoose.model("brand",brandSchema);
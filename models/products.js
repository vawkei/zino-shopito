const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Please add a product"],
    },
    sku: {
      type: String,
      required: true,
      default: "SKU",
      trim: true,
    },
    category: {
      type: String,
      trim: true,
      required: [true, "Please add a category"],
    },
    brand: {
      type: String,
      trim: true,
      required: [true, "Please add a brand"],
    },
    color: {
      type: String,
      trim: true,
      //required: [true, "Please add a color"],
      default: "As seen",
    },
    quantity: {
      type: Number,
      trim: true,
      required: [true, "Please add a quantity"],
    },
    sold: {
      type: Number,
      trim: true,
      default: 0,
    },
    regularPrice: {
      type: Number,
      trim: true,
    },
    price: {
      type: Number,
      trim: true,
      required: [true, "Please add a price"],
    },
    description: {
      type: String,
      trim: true,
      required: [true, "Please add a description"],
    },
    image: {
      type: [String], //this means we will v an array of images
    },
    ratings: {
      type: [Object],
    }, 
  },
  { timestamps: true }
);

module.exports = mongoose.model("products", ProductSchema);

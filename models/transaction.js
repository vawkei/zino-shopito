const mongoose = require("mongoose");
const transactionSchema = mongoose.Schema(
  {
    amount: {
      type: Number,
      required: [true, "Please enter amount"],
    },
    sender: {
      type: String,
      required: [true, "Please enter name"],
      
    },
    receiver: {
      type: String,
      required: [true, "Please enter name"],
      
    },
    description: {
      type: String,
      trim: true,
      required: [true, "Please enter description"],
    },
    status: {
      type: String,
      required: [true, "Please enter status"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("transaction", transactionSchema);

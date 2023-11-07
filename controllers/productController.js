//const { default: mongoose } = require("mongoose");
const Product = require("../models/products");

// Create product:
const createProduct = async (req, res) => {
  const {
    name,
    sku,
    category,
    brand,
    quantity,
    price,
    description,
    image,
    regularPrice,
    color,
  } = req.body;

  if (!name || !category || !brand || !quantity || !price || !description) {
    res.status(400).json({ msg: "Please fill in all fields" });
  }
  //create product:
  try {
    const product = await Product.create({
      name,
      sku,
      category,
      brand,
      quantity,
      price,
      description,
      image,
      regularPrice,
      color,
    });

    res.status(201).json({ msg: "Product created", product });
    // res.send("<h1>Create product route</h1>");
  } catch (error) {
    res.status(500).json(error);
  }
};

// Get products:
const getProducts = async (req, res) => {
  try {
    const products = await Product.find({}).sort("-createdAt");
    console.log(products);

    res.status(200).json({ products, nbhits: products.length });

    //res.send("<h1>Get Products</h1>")
  } catch (error) {
    res.status(500).json(error);
  }
};

// Get single product:

const getSingleProduct = async (req, res) => {
  const productId = req.params.id;
  //console.log(productId);

  try {
    const singleProduct = await Product.findOne({ _id: productId });
    //console.log(singleProduct);
    if (!singleProduct) {
      return res.status(404).json({ msg: `No product with id:${productId}` });
    }
    res.status(200).json(singleProduct);
  } catch (error) {
    if (error.name === "CastError" && error.kind === "ObjectId") {
      return res.status(404).json({ msg: `No product with id: ${productId}` });
    }
    res.status(500).json(error);
  }

  //res.send("<h1>Get single product route</h1>")
};

// Delete product:

const deleteProduct = async (req, res) => {
  const productId = req.params.id;
  console.log(productId);

  try {
    const product = await Product.findOneAndRemove({ _id: productId });
    if (!product) {
      return res.status(404).json({ msg: `No product with id: ${productId}` });
    }
    res.status(200).json({ msg: "Product deleted successfully" });
  } catch (error) {
    if (error.name === "CastError" && error.kind === "ObjectId") {
      return res.status(404).json(`No product with id: ${productId}`);
    }
    res.status(500).json(error);
  }

  //res.send("<h1>Delete product route</h1>")
};

// Update product:

const updateProduct = async (req, res) => {
  const productId = req.params.id;
  console.log(productId);

  const {
    name,
    category,
    brand,
    quantity,
    price,
    description,
    image,
    regularPrice,
    color,
  } = req.body;

  try {
    const product = await Product.findOneAndUpdate(
      { _id: productId },
      req.body,
      { new: true, runValidators: true }
    );
    if (!product) {
      return res.status(404).json({ msg: `No product with id: ${productId}` });
    }

    res.status(200).json({ msg: "Product successfully updated", product });
  } catch (error) {
    if (error.name === "CastError" && error.kind === "ObjectId") {
      return res.status(404).json({ msg: `No product with id: ${productId}` });
    }
    res.status(500).json(error);
  }

  //res.send("<h1>Update product route</h1>");
};

// Review product:
const reviewProduct = async (req, res) => {
  const { star, review, reviewDate } = req.body;
  const { id } = req.params;

  if (star < 1 || !review) {
    return res.status(400).json({ msg: "Please add a star and a review" });
  }
  try {
    const product = await Product.findOne({ _id: id });

    if (!product) {
      return res.status(404).json({ msg: `No product with id: ${id}` });
    }

    //update rating:

    product.ratings.push({
      star,
      review,
      reviewDate,
      name: req.user.name,
      userId: req.user.userId,
    });
    product.save();
    res.status(201).json({ msg: "Product review has been added" });
  } catch (error) {
    res.status(500).json(error);
  }

  //res.send("<h1>Review product route</h1>");
};

//Delete review :

const deleteReview = async (req, res) => {
  const userId = req.user.userId;
  console.log(userId);
  const productId = req.params.id;

  try {
    const product = await Product.findOne({ _id: productId });

    if (!product) {
      return res.status(404).json({ msg: `No product with id: ${productId}` });
    }

    const newRatings = product.ratings.filter((rating) => {
      return rating.userId.toString() !== userId.toString();
    });

    product.ratings = newRatings;
    product.save();

    res.status(200).json({ msg: "Product review deleted" });
  } catch (error) {
    res.status(500).json(error);
  }
  //res.send("<h1>Delete review route</h1>");
};

//Update review :

// const updateReview = async (req, res) => {
//   const { star, review, reviewDate, userId } = req.body;

//   const { id } = req.params;

//   //validation:
//   if (!star || !review) {
//     return res.status(400).json({ msg: "Please add a star and a review" });
//   }

//   try {
//     const product = await Product.findById(id);
//     if (!product) {
//       return res.status(404).json({ msg: "Product not found" });
//     }

//     //match user to review:
//     if (req.user.userId.toString() !== userId) {
//       return res.status(401).json({ msg: "User not authorized" });
//     }

//     //update product review:
//     const updatedReview = await Product.findOneAndUpdate(
//       {
//         _id: product._id,
//         "ratings.userId":  mongoose.Types.ObjectId(req.user.userId),
//       },
//       {
//         $set: {
//           "ratings.$.star": star,
//           "ratings.$.review": review,
//           "ratings.$.reviewDate": reviewDate,
//         },
//       }
//     );

//     if (updatedReview) {
//       return res.status(200).json({ msg: "Product review updated" });
//     } else {
//       res.status(400).json({ msg: "Product review NOT updated" });
//     }
//   } catch (error) {
//     console.log(error);
//   }

//   //res.send("<h1>Update review route</h1>")
// };

const updateReview = async (req, res) => {
  const { star, review, reviewDate, userId } = req.body;
  const { id } = req.params;

  // Validation:
  if (!star || !review) {
    return res.status(400).json({ msg: "Please add a star and a review" });
  }

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }

    // Match user to review:
    if (req.user.userId.toString() !== userId) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    // Check if the user's review exists in the product's ratings array
    const userReview = product.ratings.find(
      (rating) => rating.userId.toString() === userId
    );
    console.log(userReview);
    
    if (!userReview) {
      return res.status(404).json({ msg: "User review not found" });
    }

    // Update the user's review
    userReview.star = star;
    userReview.review = review;
    userReview.reviewDate = reviewDate;

    // Save the changes to the product
    product.markModified("ratings");
    await product.save();
    console.log(product.ratings)
    return res.status(200).json({ msg: "Product review updated" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error" });
  }
};



module.exports = {
  createProduct,
  getProducts,
  getSingleProduct,
  deleteProduct,
  updateProduct,
  reviewProduct,
  deleteReview,
  updateReview,
};

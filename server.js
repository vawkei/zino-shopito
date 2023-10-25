
require("dotenv").config();
require("express-async-handler")

const express = require("express");
const app = express();


const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const register = require("./routes/userRoute");
const login = require("./routes/userRoute");
const logout = require("./routes/userRoute");
const getUser = require("./routes/userRoute");
const updateUser = require("./routes/userRoute")
const updatePhoto = require("./routes/userRoute")

const createProduct = require("./routes/productRoute");
const getProducts = require("./routes/productRoute");
const getSingleProduct = require("./routes/productRoute");
const deleteProduct = require("./routes/productRoute");
const updateProduct = require("./routes/productRoute");

const reviewProduct = require("./routes/productRoute");
const deleteReview = require("./routes/productRoute");
const updateReview = require("./routes/productRoute");

const errorHandlerMiddleware = require("./middlewares/error-handler");




//middlewares:
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:false}))
app.use(cors({
  origin:["http://localhost:3000","https://shopitoapp.vercel.app"],
  credentials:true
}));
//app.use(cors());it enables CORS with default options.
// The default options allow requests from any origin and don't set the credentials flag. In other words, it allows any website to make requests to your server, but it doesn't allow cookies, HTTP authentication[it does for the simplest ones], or other sensitive information to be sent with the requests.while app.use(cors()) might work for the Authorization header by default due to it being a simple request, it might not work for cookies until you specify credentials: true in your CORS options.



//user routes:
app.get("/", (req, res) => {
  res.send("<h1>It's on baby</h1>");
});

app.use("/api/v1/auth",register);

app.use("/api/v1/auth",login);

app.use("/api/v1/auth/",logout)

app.use("/api/v1/auth/",getUser),

app.use("/api/v1/auth",updateUser),

app.use("/api/v1/auth",updatePhoto),



//product routes:
app.use("/api/v1/products",createProduct)
app.use("/api/v1/products",getProducts)
app.use("/api/v1/products",getSingleProduct)
app.use("/api/v1/products",deleteProduct);
app.use("/api/v1/products",updateProduct);

app.use("/api/v1/products",reviewProduct);
app.use("/api/v1/products",deleteReview)
app.use("/api/v1/products",updateReview);

app.use(errorHandlerMiddleware)




const PORT = process.env.PORT || 5000

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    app.listen(PORT, "localhost", () => {
      console.log("it's on");
      console.log("connected to DB");
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();

// app.listen(5000, "localhost", () => {
//   console.log("Server listening on port 5000");
// });

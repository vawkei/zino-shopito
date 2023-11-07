
require("dotenv").config();
require("express-async-handler")

const express = require("express");
const app = express();


const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");


const userRoute = require("./routes/userRoute");
// const login = require("./routes/userRoute");
// const logout = require("./routes/userRoute");
// const getUser = require("./routes/userRoute");
// const updateUser = require("./routes/userRoute")
// const updatePhoto = require("./routes/userRoute")
const productRoute = require("./routes/productRoute");
const categoryRoute  = require("./routes/categoryRoute");
const brandRoute = require("./routes/brandRoute");
const couponRoute =require("./routes/couponRoute");
const orderRoute =require("./routes/orderRoute");

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



//Routes:
app.get("/", (req, res) => {
  res.send("<h1>It's on baby</h1>");
});

app.use("/api/v1/auth",userRoute);
app.use("/api/v1/products",productRoute);
app.use("/api/v1/category",categoryRoute);
app.use("/api/v1/brand",brandRoute);
app.use("/api/v1/coupon",couponRoute);
app.use("/api/v1/order",orderRoute)

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

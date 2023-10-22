const jwt = require("jsonwebtoken");
const User = require("../models/user");

const authenticateUser = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res
        .status(401)
        .json({ msg: "Not authorized to access this route, please log in" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_IV);
    req.user = { userId: decoded.userId, name: decoded.name };
    console.log(req.user.userId);
    next();
  } catch (error) {
    res
      .status(401)
      .json({ msg: "Not authorized to access this route, please log in" });
  }
};

const adminOnly = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res
        .status(401)
        .json({ msg: "Not authorized to access this route, please log in" });
    } 
    const verified = jwt.verify(token, process.env.JWT_SECRET_IV);
    const user = await User.findById(verified.userId).select("-password");
    if (!user || user.role !== "admin") {
      return res.status(401).json({ msg: "Admin Only" });
    }
    next();
  } catch (error) {
    res
      .status(401)
      .json({ msg: "Not authorized to access this route, please log in" });
  }
};

module.exports = {
  authenticateUser,
  adminOnly,
};

























// const jwt = require("jsonwebtoken");
// const User = require("../models/user");

// //Zino's verion
// // const authenticateUser =async (req, res, next) => {
// //   try {
// //     const token = req.cookies.token;
// //     if (!token) {
// //       return res
// //         .status(401)
// //         .json({ msg: "Not authorized to access this route, please log in" });
// //     }
// //     //if theres token,verify the token:
// //     const verified = jwt.verify(token, process.env.JWT_SECRET_IV);
// //     //console.log(verified.userId);
// //     const user =await User.findById({_id: verified.userId} ).select("-password");
// //     console.log(user)
// //     if (!user) {
// //       return res.status(401).json({ msg: "User not found" });
// //     }
// //     req.user = user;
// //     //console.log(req.user)
// //     next();

// //   } catch (error) {
// //     res
// //       .status(401)
// //       .json({ msg: "Not authorized to access this route, please log in" });
// //   }
// // };

// // module.exports = authenticateUser;

// //John smilga's method:
// //const jwt = require("jsonwebtoken");

// const authenticateUser = (req, res, next) => {
//   try {
//     const token = req.cookies.token;
//     if (!token) {
//       return res
//         .status(401)
//         .json({ msg: "Not authorized to access this route, please log in" });
//     }
//     //if theres token,verify the token:
//     const decoded = jwt.verify(token, process.env.JWT_SECRET_IV);
//     req.user = { userId: decoded.userId, name: decoded.name };
//     console.log(req.user.userId);

//     next();

//     // if (!req.user) {
//     //   return res.status(401).json({ msg: "User not found" });
//     // }
//   } catch (error) {
//     res
//       .status(401)
//       .json({ msg: "Not authorized to access this route, please log in" });
//   }
// };

// module.exports = authenticateUser;

// //Admin only:

// const adminOnly = async (req, res, next) => {
//   try {
//     const token = req.cookies.token;
//     if (!token) {
//       return res
//         .status(401)
//         .json({ msg: "Not authorized to access this route, please log in" });
//     }
//     //if theres token,verify the token:
//     const verified = jwt.verify(token, process.env.JWT_SECRET_IV);
//     //console.log(verified.userId);
//     const verifiedUser = await User.findById({
//       _id: verified.userId,
//     }).select("-password");

//     console.log(verifiedUser);
//     if (!verifiedUser) {
//       return res.status(401).json({ msg: "User not found" });
//     }
//     // req.user = verifiedUser;
//     //console.log(req.user)

//     const user = await User.findById(verifiedUser.userId).select("-password");


//     if (!user) {
//       return res.status(401).json({ msg: "User not found" });
//     }

//     if (user && user.role === "admin") {
//       next();
//     } else {
//       res.status(401).json({ msg: "Admin Only" });
//     }
//   } catch (error) {
//     res
//       .status(401)
//       .json({ msg: "Not authorized to access this route, please log in" });
//   }
// };

// // module.exports = authenticateUser;
// // module.exports = adminOnly;
// module.exports = {
//   authenticateUser,
//   adminOnly,
// };


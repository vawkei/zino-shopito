const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const User = require("../models/user");

const register = async (req, res) => {
  const { name, email, password } = req.body;

  if ((!name.trim(), !email.trim(), !password.trim())) {
    return res.status(401).json({ msg: "Inputs shouldn't be empty" });
  }
  if (password.length < 6) {
    return res
      .status(401)
      .json({ msg: "password shouldn't be less than 6 characters baby." });
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const data = { name: name, email: email, password: hashedPassword };

    const user = await User.create(data);

    const token = jwt.sign(
      { userId: user._id, name: user.name },
      process.env.JWT_SECRET_IV,
      { expiresIn: process.env.JWT_LIFETIME }
    );

    const oneDay = 1000 * 60 * 60 * 24;

    if (user) {
      const { _id, name, email, role } = user;
      res.cookie("token", token, {
        path: "/",
        httpOnly: true,
        expires: new Date(Date.now() + oneDay),
        // secure:true,
        // samesite:none
      });
      //send user data:
      return res.status(201).json({ _id, name, email, role, token });
    } else {
      return res.status(401).json({ msg: "Couldn't create user" });
    }
  } catch (error) {
    if (error.keyPattern.email === 1 && error.code === 11000) {
      return res.status(400).json({
        msg: `User already exists with email ${error.keyValue.email}`,
      });
    }
    res.status(500).json(error);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(401).json({ msg: "Inputs shouldn't be empty" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const verifyPassword = async (inComingPwD, PwDInDb) => {
      const isValid = await bcrypt.compare(inComingPwD, PwDInDb);
      return isValid;
    };

    const validPassword = await verifyPassword(password, user.password);

    if (!validPassword) {
      return res.status(401).json({ msg: "Your password is invalid" });
    }

    const token = jwt.sign(
      { userId: user._id, name: user.name },
      process.env.JWT_SECRET_IV,
      { expiresIn: process.env.JWT_LIFETIME }
    );

    // res.status(201).json({user,token})

    const oneDay = 1000 * 60 * 60 * 24;

    if (user && validPassword) {
      const newUser = await User.findOne({ email }).select("-password");
      res.cookie("token", token, {
        path: "/",
        httpOnly: true,
        expires: new Date(Date.now() + oneDay),
        // secure:true,
        // samesite:none
      });
      res.status(201).json(newUser);
    }
  } catch (error) {
    res.status(500).json(error);
  }

  //res.send("<h1>Login route</h1>");
};

const logout = async (req, res) => {
  res.cookie("token", "", {
    path: "/",
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ msg: "User logged out successfully" });
  // res.send("<h1>Logout Route</h1>")
};

const getUser = async (req, res) => {
  const user = await User.findById(req.user.userId).select("-password");
  console.log(user);
  if (user) {
    return res.status(200).json(user);
  } else {
    res.status(400).json({ msg: "user not found" });
  }

  //res.send("<h1>Get user route </h1>")
};

const getLoginStatus = (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.json(false);
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET_IV);
  if (decoded) {
    return res.json(true);
  } else {
    return res.json(false);
  }

  //res.send("<h1>Login status</h1>")
};

const updateUser = async (req, res) => {
  const userId = req.user.userId;
  console.log(userId);

  try {
    const user = await User.findOne({ _id: userId });
    console.log(user);
    if (user) {
      const { name, phone, address } = user;
      user.name = req.body.name || name;
      user.phone = req.body.phone || phone;
      user.address = req.body.address || address;

      const updatedUser = await user.save();

      return res.status(200).json(updatedUser);
    } else {
      return res.status(400).json({ msg: "User not found" });
    }
  } catch (error) {
    res.status(500).json(error);
  }

};

const updatePhoto = async (req, res) => {
  const { photo } = req.body;

  const userId = req.user.userId;
  try {
    const user = await User.findOne({ _id: userId });
    console.log(user);
    user.photo = photo;
    const updatedUser = await user.save();
    res.status(201).json(updatedUser);
  } catch (error) {
    res.status(500).json(error);
  }

  // res.send("<h1>UpdatePhoto</h1>")
};

module.exports = {
  register,
  login,
  logout,
  getUser,
  getLoginStatus,
  updateUser,
  updatePhoto,
};


const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// =================== Registering A new User =========================

const userRegister = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (name === "" || email === "" || password === "") {
    throw new Error("Kindly fill all the required fields");
  }

  const userExist = await User.findOne({
    email,
  });

  if (userExist) {
    throw new Error("User Already Exist");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  res.json({
    _id: newUser._id,
    name: newUser.name,
    email: newUser.email,
    token: generateJWT(newUser._id),
  });
});

// ========================== Login User ===================================
const userLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (email === "" || password === "") {
    throw new Error("Kindly Fill all the fields");
  }

  // check first user exist or not
  const user = await User.findOne({
    email,
  });

  // if user exist then we have to check password matched with the hashed one or not
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateJWT(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid credentials");
  }
});

const generateJWT = (id) => {
  return jwt.sign({ id }, process.env.JWT_KEY, { expiresIn: "30d" });
};

// ============================ About Me  ===========================

const userAboutMe = asyncHandler(async (req, res) => {
  res.json(req.user);
});

// ===================== Get Login User detail ========================================
module.exports = {
  userRegister,
  userLogin,
  userAboutMe,
};

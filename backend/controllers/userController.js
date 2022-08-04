const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// =================== Registering A new User =========================

const userRegister = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  console.log("Working");
  // Checking fields are empty or not

  if (name === "" || email === "" || password === "") {
    throw new Error("Kindly fill all the required fields");
  }

  // check User Exist
  const userExist = await User.findOne({
    email,
  });

  if (userExist) {
    throw new Error("User Already Exist");
  }

  // Hashing Password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create a New User in the database
  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  console.log(newUser);

  // send Back the created User

  res.send({ ...newUser, token: generateJWT(newUser._id) });
});

// ========================== Login User ===================================
const userLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // check first user exist or not
  const userExist = await User.findOne({
    email,
  });

  // if user exist then we have to check password matched with the hashed one or not
  if (userExist) {
    if (await bcrypt.compare(password, userExist.password)) {
      const token = generateJWT(userExist._id);
      res.json(token);
    }
  }
  throw new Error("Invalid Email Or Password");
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

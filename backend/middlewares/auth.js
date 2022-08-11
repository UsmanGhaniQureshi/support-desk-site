const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");

const authMiddleware = asyncHandler(async (req, res, next) => {
  const headers = req.headers.authorization;
  let token;

  if (headers) {
    try {
      token = headers.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_KEY);

      req.user = await User.findById(decoded.id).select("-password");
    } catch (error) {
      throw new Error("Not Authorized");
    }

    next();
  }

  if (!token) throw new Error("Not Authorized");
});

module.exports = { authMiddleware };

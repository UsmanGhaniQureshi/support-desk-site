const express = require("express");
const router = express.Router();

const {
  userRegister,
  userLogin,
  userAboutMe,
} = require("../controllers/userController");
const { authMiddleware } = require("../middlewares/auth");

router.post("/register", userRegister);
router.post("/login", userLogin);
router.get("/aboutme", authMiddleware, userAboutMe);

module.exports = router;

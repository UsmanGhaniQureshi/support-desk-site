const express = require("express");
const router = express.Router();

const {
  userRegister,
  userLogin,
  userAboutMe,
} = require("../controllers/userController");
const { auth } = require("../middlewares/auth");

router.post("/register", userRegister);
router.post("/login", userLogin);
router.get("/aboutme", auth, userAboutMe);

module.exports = router;

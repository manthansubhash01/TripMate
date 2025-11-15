const express = require("express");
const router = express.Router();
const {
  register,
  login,
  changePassword,
} = require("../controllers/authController");
const protect = require("../middleware/authMiddleware");

router.post("/signup", register);
router.post("/login", login);
router.post("/changePassword", protect, changePassword);

module.exports = router;

const express = require("express");
const {
  signup,
  login,
  updatePassword,
} = require("../controllers/userController");
const { protect } = require("../utils/protect");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/update-password", protect, updatePassword);

// TODO: forgot password, update password

module.exports = router;

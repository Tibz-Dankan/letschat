const express = require("express");
const {
  signup,
  login,
  updatePassword,
  updateProfile,
} = require("../controllers/userController");
const { protect } = require("../utils/protect");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/update-password", protect, updatePassword);
router.post("/update-profile", protect, updateProfile);

// TODO: forgot password, update password

module.exports = router;

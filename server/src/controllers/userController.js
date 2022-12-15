const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const AppError = require("../utils/error");

const { asyncHandler } = require("../utils/asyncHandler");
require("dotenv").config();

const assignToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRETE_TOKEN);
};

const createSendToken = (user, statusCode, res) => {
  const token = assignToken(user.userId);

  res.status(statusCode).json({
    status: "success",
    token,
    user,
  });
};

const createUserSendResponse = async (
  res,
  next,
  name,
  email,
  password,
  isVerified,
  token
) => {
  const user = await User.getUserByEmail(email);
  if (user.rows[0]) return next(new AppError("Email already exists", 400));
  await User.createUser(name, email, password, isVerified, token);
  res.status(201).json({ status: "success" });
};

const signup = asyncHandler(async (req, res, next) => {
  const userName = req.body.userName;
  const email = req.body.email;
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const isVerifiedEmail = false;
  const token = crypto.randomBytes(16).toString("hex");

  createUserSendResponse(
    res,
    next,
    userName,
    email,
    hashedPassword,
    isVerifiedEmail,
    token
  );
});

const login = asyncHandler(async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const user = await User.getUserByEmail(email);
  if (!user.rows[0]) return next(new AppError("Email does not exist", 403));
  if (!(await bcrypt.compare(password, user.rows[0].password))) {
    return next(new AppError("Incorrect password", 403));
  }
  const userObject = {
    userId: user.rows[0].user_id,
    userName: user.rows[0].user_name,
    email: user.rows[0].email,
  };
  createSendToken(userObject, 200, res);
});

// TODO: forgot password, update password

module.exports = {
  signup,
  login,
};

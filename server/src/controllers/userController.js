const User = require("../models/user");
const jwt = require("jsonwebtoken");
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

const signup = asyncHandler(async (req, res, next) => {
  console.log("request body");
  console.log(req.body);
  const email = req.body.email;
  const user = await User.findUserByEmail(email);

  if (user) return next(new AppError("Email already exists", 400));
  const newUser = await User.create(req.body);
  createSendToken(newUser, 201, res);
});

const login = asyncHandler(async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  const user = await User.findUserByEmail(email);
  if (!user) return next(new AppError("Email does not exist", 403));
  if (!(await User.comparePasswords(password, user.password))) {
    return next(new AppError("Incorrect password", 403));
  }
  const userObj = {
    userIndex: user.userIndex,
    userId: user.userId,
    userName: user.userName,
    email: user.email,
  };
  createSendToken(userObj, 200, res);
});

// TODO: forgot password, update password

// TODO: explore users (users you haven't chatted with)

module.exports = {
  signup,
  login,
};

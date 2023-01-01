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
const updatePassword = asyncHandler(async (req, res, next) => {
  const userId = req.body.userId;
  console.log("userId");
  console.log(userId);
  const currentPassword = req.body.currentPassword;
  const newPassword = req.body.newPassword;
  const user = await User.findUserById(userId);
  console.log("user");
  console.log(user);
  if (!(await User.comparePasswords(currentPassword, user.password))) {
    return next(new AppError("Incorrect current password", 403));
  }
  if (await User.comparePasswords(newPassword, user.password)) {
    return next(new AppError("New password same as current password", 403));
  }
  await User.updatePassword(userId, newPassword);
  res.status(200).json({ status: "success" });
});

const updateProfile = asyncHandler(async (req, res, next) => {
  const userId = req.body.userId;
  const userName = req.body.userName;
  const email = req.body.email;
  if (!userId || !userName || !email) {
    return next(new AppError("Please fill out all fields", 400));
  }
  let user = await User.findUserById(userId);
  if (user.email !== email) {
    user = await User.findUserByEmail(email);
    if (user) {
      return next(
        new AppError("Can't update to already registered email", 400)
      );
    }
  }
  user = await User.updateProfile(userId, userName, email);

  res.status(200).json({
    status: "success",
    user,
  });
});

// TODO: explore users (users you haven't chatted with)

module.exports = {
  signup,
  login,
  updatePassword,
  updateProfile,
};

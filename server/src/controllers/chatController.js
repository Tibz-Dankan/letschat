const User = require("../models/user");
const Chat = require("../models/chat");
const AppError = require("../utils/error");
const { asyncHandler } = require("../utils/asyncHandler");
require("dotenv").config();

const sortUserInfoSendResponse = (usersArray, res) => {
  const users = [];
  usersArray.forEach(({ userIndex, userId, userName, email, imageUrl }) => {
    users.push({
      userIndex: userIndex,
      userId: userId,
      userName: userName,
      email: email,
      imageUrl: imageUrl,
    });
  });
  return res.status(200).json(users);
};

// TODO: shift this function in the user controller
const getUsers = asyncHandler(async (req, res, next) => {
  const userId = req.params.userId;
  if (!userId) return next(new AppError("No users id is provided", 400));

  const users = await User.findUsersExceptMe(req.params.userId);
  if (!users) return next(new AppError("No users found", 404));
  const usersArray = users;
  sortUserInfoSendResponse(usersArray, res);
  console.log("Getting users to chat with");
});

const getChatMates = asyncHandler(async (req, res, next) => {
  // TODO: only fetch users recently chatted with
  const userId = req.params.userId;
  if (!userId) return next(new AppError("No users id is provided", 400));

  const users = await User.findUsersExceptMe(userId);
  if (!users) return next(new AppError("No users found", 404));
  const usersArray = users;
  sortUserInfoSendResponse(usersArray, res);
  console.log("Getting users to chat with");
});

const getChatMessages = asyncHandler(async (req, res, next) => {
  const chatRoomId = req.params.chatRoomId;
  if (!chatRoomId) return next(new AppError("No chat room id", 403));
  const chat = await Chat.findMessagesByChatRoomId(chatRoomId);
  res.status(200).json({ status: "success", data: chat });
  console.log("User getting chat messages");
});

const getExploreChatMates = asyncHandler(async (req, res, next) => {
  // TODO: fetch on users you have never chatted with
  const userId = req.params.userId;
  if (!userId) return next(new AppError("No users id is provided", 400));

  const user = await User.findById(userId);
  console.log("user object nature");
  console.log(user);

  console.log("user sender array nature");
  console.log(user[0].sender);

  const users = await User.findUsersExceptMe(req.params.userId);
  if (!users) return next(new AppError("No users found", 404));
  const usersArray = users;
  sortUserInfoSendResponse(usersArray, res);
  console.log("Getting explored users to chat with");
});

const saveChatMessages = async (chatObj) => {
  await Chat.saveMessage(chatObj);
  console.log("chat saved");
};

// Join room
const joinRoom = (socket) => {
  socket.on("joinRoom", (chatRoomId) => {
    socket.join(chatRoomId);
    console.log("User joined room with Id#: " + chatRoomId);
  });
};

//receive and Send messages
const receiveSendMessages = (socket) => {
  socket.on("sendMessage", (msgObj) => {
    console.log("Message sent: ");
    console.log(msgObj);
    socket.to(msgObj.chatRoomId).emit("receiveMessage", msgObj);
    // save chat message in the in the database
    saveChatMessages(msgObj);
  });
};

// Leave room
const leaveRoom = (socket) => {
  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
};

//TODO:  function below to be renamed to chatHandler
const chatHandler = (io) => {
  io.on("connection", (socket) => {
    console.log("socket id: " + socket.id);
    joinRoom(socket);
    receiveSendMessages(socket);
    leaveRoom(socket);
  });
};

module.exports = {
  chatHandler,
  getUsers,
  getChatMates,
  getChatMessages,
  getExploreChatMates,
};

const User = require("../models/user");
const Chat = require("../models/chat");
const AppError = require("../utils/error");
const { asyncHandler } = require("../utils/asyncHandler");
require("dotenv").config();

const sortUserInfoSendResponse = (usersArray, res) => {
  const users = [];
  usersArray.forEach(({ userIndex, userId, userName, email }) => {
    users.push({
      userIndex: userIndex,
      userId: userId,
      userName: userName,
      email: email,
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

const getChatMessages = asyncHandler(async (req, res, next) => {
  const chatRoomId = req.params.chatRoomId;
  if (!chatRoomId) return next(new AppError("No chat room id", 403));
  const chat = await Chat.findMessagesByChatRoomId(chatRoomId);
  res.status(200).json({ status: "success", data: chat });
  console.log("User getting chat messages");
});

// const storeChatMessagesInDatabase = async (
//   senderId,
//   recipientId,
//   chatRoomId,
//   date,
//   message
// ) => {
//   await Chat.storeChatMessages(
//     senderId,
//     recipientId,
//     chatRoomId,
//     date,
//     message
//   );
//   console.log("chat message stored in the database");
// };

const saveChatMessages = async (chatObj) => {
  await Chat.saveMessage(chatObj);
  console.log("chat saved");
};

// Join room
const joinRoom = (socket) => {
  socket.on("joinRoom", (data) => {
    socket.join(data);
    console.log("User joined room with Id#: " + data);
  });
};

//receive and Send messages
const receiveSendMessages = (socket) => {
  socket.on("sendMessage", (data) => {
    console.log("Message sent: ");
    console.log(data);
    socket.to(data.chatRoomId).emit("receiveMessage", data);
    // save chat message in the in the database
    saveChatMessages(data);
  });
};

// Leave room
const leaveRoom = (socket) => {
  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
};

//TODO:  function below to be renamed to chatHandler
const chatTextMessages = (io) => {
  io.on("connection", (socket) => {
    console.log("socket id: " + socket.id);
    joinRoom(socket);
    receiveSendMessages(socket);
    leaveRoom(socket);
  });
};

module.exports = { chatTextMessages, getUsers, getChatMessages };

const User = require("../models/user");
const Chat = require("../models/chat");
const AppError = require("../utils/error");
const { asyncHandler } = require("../utils/asyncHandler");
require("dotenv").config();

const sortUserInfoSendResponse = (usersArray, res) => {
  const users = [];
  usersArray.forEach(({ user_id, user_name, email }) => {
    users.push({
      user_id: user_id,
      user_name: user_name,
      email: email,
    });
  });
  return res.status(200).json(users);
};

const getUsers = asyncHandler(async (req, res, next) => {
  const userId = req.params.user_id;
  if (!userId || userId === undefined) {
    return next(new AppError("No users id is provided", 400));
  }
  const users = await User.getAllUsersExceptMe(req.params.user_id);
  if (!users.rows[0]) return next(new AppError("No users found", 404));
  const usersArray = users.rows;
  sortUserInfoSendResponse(usersArray, res);
  console.log("Getting users to chat with");
});

const getChatMessages = asyncHandler(async (req, res, next) => {
  const chatRoomId = req.params.chat_room_id;
  if (!chatRoomId) return next(new AppError("No chat room id", 403));
  const response = await Chat.getChatMessagesByChatRoomId(chatRoomId);
  res.status(200).json({ status: "success", data: response.rows });
  console.log("User getting chat messages");
});

const storeChatMessagesInDatabase = async (
  senderId,
  recipientId,
  chatRoomId,
  date,
  message
) => {
  await Chat.storeChatMessages(
    senderId,
    recipientId,
    chatRoomId,
    date,
    message
  );
  console.log("chat message stored in the database");
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
    // store chat message in the in the database
    storeChatMessagesInDatabase(
      data.senderId,
      data.recipientId,
      data.chatRoomId,
      data.date,
      data.message
    );
  });
};

// Leave room
const leaveRoom = (socket) => {
  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
};

const chatTextMessages = (io) => {
  io.on("connection", (socket) => {
    console.log("socket id: " + socket.id);
    joinRoom(socket);
    receiveSendMessages(socket);
    leaveRoom(socket);
  });
};

module.exports = { chatTextMessages, getUsers, getChatMessages };

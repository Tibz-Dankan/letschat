const express = require("express");
const {
  getUsers,
  getChatMates,
  getChatMessages,
} = require("../controllers/chatController");

const router = express.Router();

// TODO: add jwt verification middle function
router.get("/users/:userId", getUsers); //To be removed
router.get("/chat-mates/:userId", getChatMates);
router.get("/chat-messages/:chatRoomId", getChatMessages);

module.exports = router;

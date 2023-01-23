const express = require("express");
const {
  getChatMates,
  getChatMessages,
  getExploreChatMates,
} = require("../controllers/chatController");
const { protect } = require("../utils/protect");

const router = express.Router();

router.get("/chat-mates/:userId", protect, getChatMates);
router.get("/explore-chat-mates/:userId", protect, getExploreChatMates);
router.get("/chat-messages/:chatRoomId", protect, getChatMessages);

module.exports = router;

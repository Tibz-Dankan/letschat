const express = require("express");
const { getUsers, getChatMessages } = require("../controllers/chatController");

const router = express.Router();

router.get("/users/:userId", getUsers);
router.get("/chat-messages/:chatRoomId", getChatMessages);

module.exports = router;

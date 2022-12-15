const express = require("express");
const { getUsers, getChatMessages } = require("../controllers/chatController");

const router = express.Router();

router.get("/users/:user_id", getUsers);
router.get("/chat-messages/:chat_room_id", getChatMessages);

module.exports = router;

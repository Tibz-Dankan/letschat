const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const Chat = {};

Chat.saveMessage = async (chatObj) => {
  return await prisma.chat.create({
    data: chatObj,
  });
};

Chat.findMessagesByChatRoomId = async (chatRoomId) => {
  return await prisma.chat.findMany({
    where: {
      chatRoomId: { equals: chatRoomId },
    },
    orderBy: {
      messageIndex: "asc",
    },
  });
};

module.exports = Chat;

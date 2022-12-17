const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const Chat = {};

Chat.saveMessage = async (chatObj) => {
  return await prisma.chat.create({
    // data: {
    //   senderId: chatObj.senderId,
    //   recipientId: chatObj.recipient,
    //   chatRoomId: chatObj.chatRoomId,
    //   date: chatObj.date,
    //   message: chatObj.message,
    // },
    data: chatObj,
  });
};

Chat.findMessagesByChatRoomId = async (chatRoomId) => {
  return await prisma.chat.findMany({
    where: {
      chatRoomId: { equals: chatRoomId },
    },
  });
};

module.exports = Chat;

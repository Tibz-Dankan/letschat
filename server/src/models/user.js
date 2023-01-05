const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const User = {};

User.create = async (userObj) => {
  userObj.password = await bcrypt.hash(userObj.password, 10);

  return await prisma.user.create({
    data: userObj,
    select: {
      userIndex: true,
      userId: true,
      userName: true,
      email: true,
    },
  });
};

User.comparePasswords = async (password, dbPassword) => {
  return await bcrypt.compare(password, dbPassword);
};

User.findUserById = async (userId) => {
  return await prisma.user.findFirst({
    where: {
      userId: { equals: userId },
    },
  });
};

User.findUserByEmail = async (email) => {
  return await prisma.user.findFirst({
    where: {
      email: { equals: email },
    },
  });
};

User.findUsers = async () => {
  return await prisma.user.findMany();
};

User.findUsersExceptMe = async (userId) => {
  return await prisma.user.findMany({
    where: {
      userId: { not: userId },
    },
  });
};

User.updatePassword = async (userId, newPassword) => {
  const newHashedPassword = await bcrypt.hash(newPassword, 10);
  return await prisma.user.update({
    where: {
      userId: userId,
    },
    data: {
      password: newHashedPassword,
    },
  });
};

User.updateProfile = async (userId, userName, email) => {
  return await prisma.user.update({
    where: {
      userId: userId,
    },
    data: {
      userName: userName,
      email: email,
    },
    select: {
      userIndex: true,
      userId: true,
      userName: true,
      email: true,
      imageUrl: true,
    },
  });
};

User.updatePhoto = async (userId, imageName, imageUrl) => {
  return await prisma.user.update({
    where: {
      userId: userId,
    },
    data: {
      imageName: imageName,
      imageUrl: imageUrl,
    },
    select: {
      userIndex: true,
      userId: true,
      userName: true,
      email: true,
      imageUrl: true,
    },
  });
};

module.exports = User;

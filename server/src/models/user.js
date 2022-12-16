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
      userId: { equals: userId.toString() },
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
      userId: { not: userId.toString() },
    },
  });
};

// // update password
// User.updatePassword = (newHashedPassword, userId, userEmail) => {
//   return db.query(
//     "UPDATE users SET password = $1 WHERE user_id = $2 AND email =$3 RETURNING *",
//     [newHashedPassword, userId, userEmail]
//   );
// };

module.exports = User;

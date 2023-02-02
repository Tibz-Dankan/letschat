const app = require("../app");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// beforeAll(async () => {
//   await prisma.user.deleteMany({});
// });

beforeEach(async () => {
  await prisma.user.deleteMany({});
});

afterEach(async () => {
  app.close();
});

const request = require("supertest");
const app = require("../../app");

it("fails when supplied email doesn't exist", async () => {
  await request(app)
    .post("/api/users/login")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(403);
});

it("fails when supplied password is incorrect", async () => {
  await request(app)
    .post("/api/users/login")
    .send({
      email: "test@test.com",
      password: "password"    })
    .expect(200);
  await request(app)
    .post("/api/users/login")
    .send({
      email: "test@test.com",
      password: "passwd",
    })
    .expect(403);
});

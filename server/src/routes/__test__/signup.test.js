const request = require("supertest");
const app = require("../../app");

it("returns a 201 on successful signup", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      userName: "test",
      email: "test@test.com",
      password: "password",
    })
    .expect(201);
});

it("disallows duplicate emails", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      userName: "test",
      email: "test@test.com",
      password: "password",
    })
    .expect(201);
  await request(app)
    .post("/api/users/signup")
    .send({
      userName: "test",
      email: "test@test.com",
      password: "password",
    })
    .expect(400);
});

const request = require("supertest");
const {app, server} = require("../server");
const User = require("../models/User");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

describe("Authentication API Tests", () => {
  let refreshToken;

  afterAll(async () => {
    await new Promise((resolve) => server.close(resolve));
    await mongoose.connection.close();
  });

  test("User should login and receive access & refresh tokens", async () => {
    const res = await request(app).post("/api/auth").send({
      email: "test@example.com",
      password: "password123",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("accessToken");
    expect(res.body).toHaveProperty("refreshToken");

    refreshToken = res.body.refreshToken;
  });

  test("Should refresh access token using refresh token", async () => {
    const res = await request(app)
      .post("/api/refresh")
      .set("authorization", `Bearer ${refreshToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("accessToken");
  });

  test("Should return 403 for invalid refresh token", async () => {
    const res = await request(app)
      .post("/api/refresh")
      .set("Authorization", "Bearer invalidtoken");

    expect(res.statusCode).toBe(403);
  });

  test("User should be able to logout", async () => {
    const res = await request(app).post("/api/logout").set("Authorization", `Bearer ${refreshToken}`);
    expect(res.statusCode).toBe(200);
  });
});

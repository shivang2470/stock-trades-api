const request = require("supertest");
const mongoose = require("mongoose");
const Trade = require("../models/Trade");
const {app, server} = require("../server");

let accessToken = "";

describe("Trade API Tests", () => {
  beforeAll(async () => {
    const authResponse = await request(app).post("/api/auth").send({
      email: "test@example.com",
      password: "password123",
    });
    accessToken = authResponse.body.accessToken;
    await new Promise((resolve) => server.close(resolve));
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  test("Should create a new trade", async () => {
    const res = await request(app)
      .post("/api/trades")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        type: "buy",
        symbol: "AAPL",
        shares: 10,
        price: 150,
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("data");
    expect(res.body.data.symbol).toBe("AAPL");
    expect(res.body.data.type).toBe("buy");
    await new Promise((resolve) => server.close(resolve));
  });

  test("Should fetch all trades", async () => {
    const res = await request(app)
      .get("/api/trades")
      .set("Authorization", `Bearer ${accessToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.data.length).toBeGreaterThan(0);
    await new Promise((resolve) => server.close(resolve));
  });

  test("Should return 401 if no token is provided", async () => {
    const res = await request(app).get("/api/trades");
    expect(res.statusCode).toBe(401);
    await new Promise((resolve) => server.close(resolve));
  });
});

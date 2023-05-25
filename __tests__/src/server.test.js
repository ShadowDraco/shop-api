"use strict";

process.env.SECRET = "TEST_SECRET";

const supertest = require("supertest");

const { server } = require("../../src/server.js");
const { db } = require("../../src/models/index");

beforeAll(async () => {
  await db.sync();
});

afterAll(async () => {
  await db.drop();
});

let userData = {
  testUser: { username: "user", password: "password" },
  testAdmin: { username: "admin", password: "admin", role: "admin" },
};

let badAccessToken = null;
let goodAccessToken = null;

const request = supertest(server);

describe("Server", () => {
  it("runs", async () => {
    const response = await request.get("/");

    expect(response.status).toEqual(200);
    expect(response.text).toEqual("Home route!");
  });
});

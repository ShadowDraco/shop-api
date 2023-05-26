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

const request = supertest(app);

describe("Server", () => {
  it("runs", async () => {
    const response = await request.get("/");

    expect(response.status).toEqual(200);
    expect(response.text).toEqual("Home route!");
  });

  //* */
  //? Auth ROUTE
  //* */

  it("creates new users", async () => {
    const response = await request.post("/signup").send(userData.testAdmin);
    const user2 = await request.post("/signup").send(userData.testUser);

    // set the good access token for future use
    goodAccessToken = response.body.token;

    expect(response.status).toEqual(201);
    expect(response.body.user).toBeDefined();
    expect(response.body.token).toBeDefined();
    expect(user2.body.user.username).toEqual("user");
  });

  it("signs in old users", async () => {
    let { username, password } = userData.testAdmin;
    // post.auth function does basic auth
    const response = await request.post("/signin").auth(username, password);

    expect(response.status).toEqual(200);
    expect(response.body.user).toBeDefined();
    expect(response.body.token).toBeDefined();
  });

  //* */
  //? V1 ROUTE
  //* */

  it("handles POST to v1", async () => {
    const response = await request
      .post("/api/v1/clothes")
      .send({ name: "shirt", size: "medium", color: "blue" });
    const shirt2 = await request
      .post("/api/v1/clothes")
      .send({ name: "shirt", size: "small", color: "red" });

    expect(response.status).toEqual(201);
    expect(response.body).toMatchObject({
      name: "shirt",
      size: "medium",
      color: "blue",
    });
    expect(shirt2.body).toMatchObject({
      name: "shirt",
      size: "small",
      color: "red",
    });
  });

  it("handles GET all from v1", async () => {
    const response = await request.get("/api/v1/clothes");

    expect(response.status).toEqual(200);
    expect(response.body.length).toEqual(2);
  });
  it("handles GET one from v1", async () => {
    const response = await request.get("/api/v1/clothes/1");

    expect(response.status).toEqual(200);
    expect(response.body.length).toBeUndefined();
    expect(response.body).toMatchObject({
      name: "shirt",
      size: "medium",
      color: "blue",
    });
  });

  it("handles UPDATE to v1", async () => {
    const response = await request
      .put("/api/v1/clothes/1")
      .send({ name: "pants" });

    expect(response.status).toEqual(200);
    expect(response.body).toMatchObject({
      name: "pants",
      size: "medium",
      color: "blue",
    });
  });

  it("handles BAD UPDATE to v1", async () => {
    const response = await request
      .put("/api/v2/clothes/3")
      .set("Authorization", `Bearer ${goodAccessToken}`)
      .send({ name: "hat", size: "fits-all" });

    expect(response.status).toEqual(200);
    expect(response.body).toEqual("That item could not be updated.");
  });

  it("handles DELETE to to v1", async () => {
    const createIt = await request
      .post("/api/v1/clothes")
      .send({ name: "test", size: "test", color: "test" });

    const deleteIt = await request.delete("/api/v1/clothes/3");

    const findIt = await request.get("/api/v1/clothes/3");

    expect(createIt.status).toEqual(201);
    expect(deleteIt.status).toBe(200);
    expect(deleteIt.body).toBe(1);
    expect(findIt.status).toBe(200);
    expect(findIt.body).toEqual(null);
  });

  //* */
  //? V2 ROUTE
  //* */

  it("handles POST to v2", async () => {
    const response = await request
      .post("/api/v2/clothes")
      .set("Authorization", `Bearer ${goodAccessToken}`)
      .send({ name: "shoes", size: "medium", color: "blue" });
    const shoes2 = await request
      .post("/api/v2/clothes")
      .set("Authorization", `Bearer ${goodAccessToken}`)
      .send({ name: "shoes", size: "small", color: "red" });

    expect(response.status).toEqual(201);
    expect(response.body).toMatchObject({
      name: "shoes",
      size: "medium",
      color: "blue",
    });
    expect(shoes2.body).toMatchObject({
      name: "shoes",
      size: "small",
      color: "red",
    });
  });

  it("handles GET all from v2", async () => {
    const response = await request
      .get("/api/v2/clothes")
      .set("Authorization", `Bearer ${goodAccessToken}`);

    expect(response.status).toEqual(200);
    expect(response.body.length).toEqual(4);
  });
  it("handles GET one from v2", async () => {
    const response = await request
      .get("/api/v2/clothes/4")
      .set("Authorization", `Bearer ${goodAccessToken}`);

    expect(response.status).toEqual(200);
    expect(response.body).toMatchObject({
      name: "shoes",
      size: "medium",
      color: "blue",
    });
  });

  it("handles UPDATE to v2", async () => {
    const response = await request
      .put("/api/v2/clothes/4")
      .set("Authorization", `Bearer ${goodAccessToken}`)
      .send({ name: "hat", size: "fits-all" });

    expect(response.status).toEqual(200);
    expect(response.body).toMatchObject({
      name: "hat",
      size: "fits-all",
      color: "blue",
    });
  });

  it("handles BAD UPDATE to v2", async () => {
    const response = await request
      .put("/api/v2/clothes/3")
      .set("Authorization", `Bearer ${goodAccessToken}`)
      .send({ name: "hat", size: "fits-all" });

    expect(response.status).toEqual(200);
    expect(response.body).toEqual("That item could not be updated.");
  });

  it("handles DELETE to to v2", async () => {
    const createIt = await request
      .post("/api/v2/clothes")
      .set("Authorization", `Bearer ${goodAccessToken}`)
      .send({ name: "test", size: "test", color: "test" });

    const deleteIt = await request
      .delete("/api/v2/clothes/6")
      .set("Authorization", `Bearer ${goodAccessToken}`);

    const findIt = await request
      .get("/api/v2/clothes/6")
      .set("Authorization", `Bearer ${goodAccessToken}`);

    expect(createIt.status).toEqual(201);
    expect(deleteIt.status).toBe(200);
    expect(deleteIt.body).toBe(1);
    expect(findIt.status).toBe(200);
    expect(findIt.body).toEqual(null);
  });

  it("handles UNAUTHORIZED DELETE to v2", async () => {
    const response = await request
      .delete("/api/v2/clothes/4")
      .set("Authorization", `Bearer ${badAccessToken}`)
      .send({ name: "hat", size: "fits-all" });

    expect(response.status).toEqual(500);
    expect(response.body).toEqual({ message: "Invalid Login", status: 500 });
  });
});

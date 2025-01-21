import {
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  test,
} from "@jest/globals";
import mongoose from "mongoose";
import "dotenv/config";
import request from "supertest";

import { app } from "../../app.js";
import { User } from "../../models/userModel.js";

const { DB_HOST_TEST, PORT: port = 3000 } = process.env;

describe("auth routes register", () => {
  let server = null;

  beforeAll(async () => {
    await mongoose.connect(DB_HOST_TEST); // connect to mongoose db
    console.log("DB connecting successful");

    server = app.listen(port, () =>
      console.log(`Server running on port ${port}`),
    ); // start web-server
  });

  afterAll(async () => {
    await mongoose.connection.close(DB_HOST_TEST); // disconnect to mongoose db
    console.log("DB disconnecting successful");

    server.close(); // close web-server
  });

  beforeEach(async () => {
    console.log(
      "start new test :>> You can do something before each test here",
    );
  });

  afterEach(async () => {
    // clear db for other tests
    await User.deleteMany({}); // will delete all entries in db
  });

  test("Test of 'registration' when data is correct", async () => {
    const registerData = {
      name: "andrii",
      email: "andrii@vestibul.co.uk",
      password: "andrii",
    };

    const { body, statusCode } = await request(app)
      .post("/api/auth/register")
      .send(registerData);

    // Check whether data from server is correct
    expect(statusCode).toBe(201);
    expect(body.name).toBe(registerData.name);
    expect(body.email).toBe(registerData.email);

    // Check whether user was added to server (making additional request to server for this user)
    const user = await User.findOne({ email: registerData.email });

    expect(user.name).toBe(registerData.name);
    expect(user.email).toBe(registerData.email);
  });

  // some other tests if it needs...
});

// In this file you can make several des cribe() for each router (/login, /current, etc.)

"use strict";
process.env.NODE_ENV === "test"

const db = require("../db.js");
const {ExpressError,
  NotFoundError,
  UnauthorizedError,
  BadRequestError,
  ForbiddenError} = require("../ExpressError")

const User = require("../models/user");
const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
} = require("./_testCommons");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

describe("create user", function () {
  const newUser = {
      username: "testing1",
      email: "testing1@gmail.com",
      password: "testing1"
  }

  test("works", async function () {
      let user = await User.register(newUser);
        expect(user.username).toEqual(newUser.username)
  })
})
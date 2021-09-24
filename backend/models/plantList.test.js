"use strict";
process.env.NODE_ENV === "test"

const db = require("../db.js");
const {ExpressError,
  NotFoundError,
  UnauthorizedError,
  BadRequestError,
  ForbiddenError} = require("../ExpressError")

const PlantList = require("../models/plantList");
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

describe("create", function () {
  const newList = {
    title: "New Title",
    user: 1
  }

  test("works", async function () {
    let list = await PlantList.create(newList);
    expect(list).toEqual(newList)
  })
})
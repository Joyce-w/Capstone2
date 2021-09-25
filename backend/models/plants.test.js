"use strict";
process.env.NODE_ENV === "test"

const db = require("../db.js");
const {ExpressError,
  NotFoundError,
  UnauthorizedError,
  BadRequestError,
  ForbiddenError} = require("../ExpressError")

const Plant = require("../models/plants");
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
    const newPlant = {
        id: "test_plant",
        plant_name: "test_plant",
        details: "This is the description for test_plant"
    }
    
    test("add new plant", async function () {
        let plant = await Plant.create(newPlant);
        expect(plant.plant_name).toEqual(newPlant.plant_name)
    });
    test("test for plant dupe", async function () {
        try {
            await Plant.create(newPlant);
            await Plant.create(newPlant);            
        } catch (err) {
            expect(err instanceof BadRequestError).toBeTruthy();
        }
    });
    test("empty fields", async function () {
        try {
            await Plant.create({pet_friendly: true});
        } catch (err) {
            expect(err instanceof ExpressError).toBeTruthy();
        }
    });


})
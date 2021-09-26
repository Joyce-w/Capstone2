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

describe("create plant", function () {
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

describe("Get single plant", async function () {

    test("check single plant", async function () {
        let plant = await Plant.getPlant('chinese_evergreen');
        expect(plant.plant_name).toEqual('Chinese Evergreen');
        expect(plant.max_height).toEqual(36);
    });

    test("check fake plant", async function () {
        try {
            await db.query(`SELECT * from plants WHERE id='Not_A_Plant'`);
        } catch (err) {
            expect(err instanceof NotFoundError).toBeTruthy();
        }
    });
});

describe("Get all plants", async function () {

    test("Check all plants", async function () {
        let plants = await Plant.getAllPlants();
        expect(plants.length).toEqual(7);
        expect(plants[6].id).toEqual('philodendron');
    });

});

describe("Show results for filtered plants", async function () {

    test("Check filtered plant", async function () {
        const searchResult = {
            pos: ["F","T","W"],
            lighting: 5,
            has_kids: "1",
            has_pets: "1",
            does_flower:"0",
            watering:"high"
        }

        let plants = await Plant.filterPlants(searchResult);
        expect(plants[0].id).toEqual('norfolk_island_pine');
    });

    test("Non-matching plant", async function () {
        const searchResult = {
            pos: ["H"],
            lighting: 0,
            has_kids: "1",
            has_pets: "1",
            does_flower:"0",
            watering:"high"
        }

        let plants = await Plant.filterPlants(searchResult);
        expect(plants.length).toEqual(0);
    });

});
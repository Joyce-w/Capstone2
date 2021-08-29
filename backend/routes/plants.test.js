"use strict";
process.env.NODE_ENV = "test";

const request = require("supertest");

const app = require("../app");

const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);


describe("GET /plants", function () {
    test("works for everyone", async function () {
        const resp = await request(app)
            .get("/plants")
    
    expect(resp.body).toEqual(
        [{
            "id": "wisteria",
            "plant_name": "wisteria",
            "details": "vines that can be trained into trees",
            "lighting": "bright",
            "kid_friendly": false,
            "pet_friendly": false,
            "max_height": 12,
            "flowering": true
        }]
        );
    })
})

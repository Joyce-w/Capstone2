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
    test("Get all plants", async () => {
        const resp = await request(app)
            .get("/plants")
        
        console.log('resp', resp.statusCode)
        expect(resp.statusCode).toBe(200);
    })
})

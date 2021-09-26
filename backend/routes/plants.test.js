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

describe("GET /plants/", function () {
    test("get all plants", async function () {

        let resp = await request(app)
        .get("/plants/")

        expect(resp.statusCode).toBe(200);
        expect(resp.body.length).toEqual(7);
        expect(resp.body[2].id).toEqual('grape_ivy');
    });
});

describe("GET /plants/:plant", function () {
    test("get single plant", async function () {

        let resp = await request(app)
        .get("/plants/philodendron")

        expect(resp.statusCode).toBe(200);
        expect(resp.body.plant_name).toEqual('Philodendron');
        expect(resp.body.placements).toEqual('FTW');
    });
});

describe("POST /plants/:plant", function () {
    test("get single plant", async function () {

        let resp = await request(app)
            .post("/plants/results")
            .send({
            pos: ["F","T","W"],
            lighting: 5,
            has_kids: "1",
            has_pets: "1",
            does_flower:"0",
            watering:"high"
        });

        expect(resp.statusCode).toBe(200);
        expect(resp.body[0].plant_name).toEqual('Norfolk Island Pine');
        expect(resp.body[0].max_height).toEqual(60);
    });
});


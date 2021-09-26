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



describe("GET /users/", function () {
    test("get all users", async function () {

        let resp = await request(app)
        .get("/users/")

        expect(resp.statusCode).toBe(200);
        expect(resp.body.length).toEqual(2);
        expect(resp.body[0].username).toEqual('test1');
    });
});

describe("GET /users/:user", function () {

    test("get single user", async function () {
        let resp = await request(app)
        .get("/users/test1")

        expect(resp.statusCode).toBe(200);
        expect(resp.body.user.email).toEqual('t1@gmail.com');
    });
    
    test("invalid single user", async function () {
        let resp = await request(app)
        .get("/users/noUser")

        expect(resp.statusCode).toBe(404);
    });

});

describe("DELETE /users/:user", function () {

    test("delete single user", async function () {
        let resp = await request(app)
        .delete("/users/test1")

        expect(resp.statusCode).toBe(201);
        expect(resp.body).toEqual({ messsage: 'Removed user: test1' });
    });

        test("invalid single user", async function () {
        let resp = await request(app)
        .delete("/users/noUser")

        expect(resp.statusCode).toBe(404);
    });
});

describe("GET /users/:user/plant-list", function () {

    test("get lists that a user created", async function () {
        let resp = await request(app)
        .get("/users/test1/plant-list")

        expect(resp.statusCode).toBe(200);
        expect(resp.body.length).toEqual(1)
        expect(resp.body[0].list_name).toEqual('Test List 1')
    });

});
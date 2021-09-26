process.env.NODE_ENV = "test";

const { ExpectationFailed } = require("http-errors");
const request = require("supertest");
const app = require("../app");


const db = require("../db.js");


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


describe("POST /auth/register", function () {
  test("register user", async function () {
    const resp = await request(app)
        .post("/auth/register")
        .send({
          username: "testingUser1",
          email: "testingUser1@gmail.com",
          password: "password"
        });
    
    expect(resp.statusCode).toBe(201);
    });
});

describe("POST /auth/login", function () {
    test("register user", async function () {
        // Register new user
        await request(app)
        .post("/auth/register")
        .send({
          username: "testingUser1",
          email: "testingUser1@gmail.com",
          password: "password"
        });

        // login with new user credentials 
        const resp = await request(app)
            .post("/auth/login")
            .send({
            username: "testingUser1",
            password: "password"
        });
    
        expect(resp.statusCode).toBe(201);
    });
});
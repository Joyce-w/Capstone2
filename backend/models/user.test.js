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
    
    test("check to see if username is added ", async function () {
        let user = await User.register(newUser);
        expect(user.username).toEqual(newUser.username)
    });

    test("check for missing fields", async function () {
        try {
            await User.register(newUser);
        } catch (err) {
            expect(err instanceof ExpressError).toBeTruthy();
        }
    });

    test("error when field is incomplete", async function () {
        try {
            await User.register({
                username: "testing2",
                password: "testing2"
            });
        } catch (err) {
            expect(err instanceof ExpressError).toBeTruthy();
        }
    });
    test("for dupe username", async function () {
        try {
            await User.register(newUser);
            await User.register(newUser);
        } catch (err) {
            expect(err instanceof BadRequestError).toBeTruthy();
        }
    });
})


describe("login user", function () {
  const newUser = {
      username: "testing1",
      email: "testing1@gmail.com",
      password: "testing1"
    }
    
    test("check to see if username is added ", async function () {
        await User.register(newUser);

        let user = await db.query(`
            SELECT username, pw
            FROM users
            WHERE username = $1;
        `, ['testing1']);
        
        expect(user.rows[0].username).toEqual('testing1')

    });
    
    test("check if login works", async function () {
        await User.register(newUser);
        let loginUser = await User.login("testing1", "testing1");
        expect(loginUser.username).toEqual("testing1")
    });
    test("check if login works", async function () {
        await User.register(newUser);

        await db.query(`
            SELECT username, pw
            FROM users
            WHERE username = $1;
        `, ['testing1']);

        let loginUser = await User.login("testing1", "testing1");
        expect(loginUser.username).toEqual("testing1")
    });
    test("check if login works", async function () {
        await User.register(newUser);

        await db.query(`
            SELECT username, pw
            FROM users
            WHERE username = $1;
        `, ['testing1']);

        try {
            await User.login("noValidUser", "testing1");
        } catch {
            expect(err instanceof ExpressError).toBeTruthy();            
        }
    });
    test("incorrect login credential", async function () {

        try {
            await User.login("noValidUser", "noPassword");
        } catch {
            expect(err instanceof ExpressError).toBeTruthy();            
        }
    });
});


describe("get single user", function () {
    test("if user is in db", async function () {
        let user = await db.query(`SELECT * FROM users WHERE username = 'test1';`)
        expect(user.rows[0].email).toEqual('t1@gmail.com');
    });
    test("Non-existing user", async function () {
        try {
            await db.query(`SELECT * FROM users WHERE username = 'FakeUsername'`)
        } catch (err) {
            expect(err instanceof NotFoundError).toBeTruthy();             
        }
    });
})
process.env.NODE_ENV = "test";

const request = require("supertest");
const app = require("../app");


const {
    commonBeforeAll,
    commonBeforeEach,
    commonAfterEach,
    commonAfterAll,
    userToken
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);


describe("POST /list/create", function () {
    test("create new plant list", async function () {

        // get user id
        let user = await request(app)
        .get("/users/")

        let user_id = user.body[0].id
        let newList = {
          list_name: "testingUser1",
          user_id: user_id
        }

        const resp = await request(app)
        .post("/lists/create")
            .send(newList)
            .set("Authorization", `Bearer ${userToken}`);
        console.log(resp.body)
        expect(resp.statusCode).toBe(201);
    });
});

describe("GET /lists/", function () {

    test("get list information", async function () {
        let lists = await request(app)
            .get("/lists/")
        
        expect(lists.body.length).toEqual(1)
        expect(lists.statusCode).toBe(200)

    });

});

describe("GET /lists/", function () {

    test("get list information", async function () {
        // get list id
        let lists = await request(app)
            .get("/lists/")
        
        let list_id = lists.body[0].id
        let list = await request(app)
            .get(`/lists/${list_id}`)

        console.log(list.body.plants_list.length )
        expect(lists.statusCode).toBe(200)
        expect(list.body.plants_list.length).toEqual(0)
        
    });

    test("get list information", async function () {
        // get list id
        let lists = await request(app)
            .get("/lists/")
        
        let list_id = lists.body[0].id
        let list = await request(app)
            .get(`/lists/${list_id}`)

        
        expect(lists.statusCode).toBe(200)
        expect(list.body.plants_list.length).toEqual(0)
        expect(lists.body[0].list_name).toEqual('Test List 1')

       

        // get user id
        let user = await request(app)
        .get("/users/")
    });

});


describe("PATCH /list//:list_id", async function () {

    test("update existing list name", async function () {
        // get list id
        let lists = await request(app)
            .get("/lists/")
    

        expect(lists.body[0].list_name).toEqual('Test List 1');

        // patch and change list name
        let updatedList = {
            id: lists.body[0].id,
            list_name: "Updated list name"
        }
        let updateList = await request(app)
            .patch(`/lists/${lists.body[0].id}`).send(updatedList)
        
        expect(updateList.statusCode).toBe(200);
        expect(updateList.body.list_name).toEqual('Updated list name');

    });

});

describe("POST /list/:list_id", async function () {

    test("add plant to plant list", async function () {
        // get list id
        let lists = await request(app)
            .get("/lists/");
        
        let newPlant = await request(app)
            .post(`/lists/${lists.body[0].id}`)
            .send({ plant_id: 'peperomia' })
        
        expect(newPlant.statusCode).toBe(200);
        expect(newPlant.body).toEqual({ new: { user_list_id: lists.body[0].id, plant_id: 'peperomia' } })
    });

});

describe("DELETE list/:list_id/:plant_id", async function () {

    test("remove plant from list", async function () {

        // get list id
        let lists = await request(app)
            .get("/lists/");
        
        //add new plant to list 
        await request(app)
            .post(`/lists/${lists.body[0].id}`)
            .send({ plant_id: 'peperomia' })
        
        await request(app)
            .post(`/lists/${lists.body[0].id}`)
            .send({ plant_id: 'grape_ivy'})
        
        //delete a plant
        await request(app)
            .delete(`/lists/${lists.body[0].id}/peperomia`);
        
        let list = await request(app)
            .get(`/lists/${lists.body[0].id}`);
        
        console.log('LIST', list.body.plants_list)
        expect(list.body.plants_list.length).toBe(1);
        expect(list.body.plants_list[0]).toEqual('grape_ivy');
    });

});

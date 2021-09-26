"use strict";
process.env.NODE_ENV === "test"

const db = require("../db.js");

const User = require("../models/user");
const PlantList = require("../models/plantList");

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

describe("Create plant list", async function () {

    test("create a plant list", async function () {

        // get the new user's id from db
        let newUserID = await db.query(`
                SELECT id
                FROM users;
        `)
    
        let userID = newUserID.rows[0].id;

        // create a plant list
        let newPlant = await PlantList.create('New Plant List', userID);
        expect(newPlant[0].list_name).toEqual('New Plant List')
    });

    test("duplicate list", async function () {

        // get the new user's id from db
        let newUserID = await db.query(`
                SELECT id
                FROM users;
        `)
    
        let userID = newUserID.rows[0].id

        // create a plant list
        try {
            await PlantList.create('New Plant List', userID);
            await PlantList.create('New Plant List', userID);
        } catch (err) {
            expect(err instanceof BadRequestError).toBeTruthy();
        }
    });


});

describe("test getList", async function () {
    
    test("get list name", async function () {
        let newUserID =  await db.query(`
            SELECT * FROM user_lists;
        `)

        let list_id = newUserID.rows[0].id;
        let list = await PlantList.getList(list_id);
        expect(list.list_name).toEqual('Test List 1');

    })

    test("get non-existing name", async function () {
        try {
            await PlantList.getList(0);
        } catch (err) {
            expect(err instanceof ExpressError).toBeTruthy();
        }
    })

});

describe("updating list name", async function () {
    test("update list name with existing list", async function () {
        let lists = await db.query(`
                SELECT * FROM user_lists;
        `)
        let list_id = lists.rows[0].id;
        await PlantList.updateList(list_id, 'updated list title')

        let updatedList = await db.query(`
                SELECT * FROM user_lists WHERE id=${list_id};
        `)
        expect(updatedList.rows[0].list_name).toEqual('updated list title')
    });

    test("update list name with existing list", async function () {
        
    });
});

describe("delete an existing list", async function () {
    test("delete plant list", async function () {
        let lists = await db.query(`
                SELECT * FROM user_lists;
            `)
        let list_id = lists.rows[0].id;
        await PlantList.delete(list_id)

        try {
            await db.query(`
                SELECT * FROM user_lists
                WHERE id = ${list_id};
            `)            
        } catch (err) {
            expect(err instanceof BadRequestError).toBeTruthy();
        }

    });

});

describe("adding plant to list", async function () {
    test("add plant to list", async function() {
        let newUserID =  await db.query(`
            SELECT * FROM user_lists;
        `)

        let list_id = newUserID.rows[0].id;
        await PlantList.addPlant(list_id, 'peperomia');  
        await PlantList.addPlant(list_id, 'grape_ivy');

        let listOfPlants = await db.query(`
            SELECT * FROM plant_list WHERE user_list_id=${list_id}
        `)
        expect(listOfPlants.rows[0].plant_id).toEqual('peperomia');
        expect(listOfPlants.rows.length).toEqual(2);

    });
    test("duplicate ", async function() {
        let newUserID =  await db.query(`
            SELECT * FROM user_lists;
        `)

        let list_id = newUserID.rows[0].id;

        try {
            await PlantList.addPlant(list_id, 'peperomia');
            await PlantList.addPlant(list_id, 'peperomia');  
        } catch (err) {
            expect(err instanceof BadRequestError).toBeTruthy();    
        }

    });

});

describe("removing plant from list ", async function () {
    test("delete plant list", async function () {
        // get list id to add plant to
        let newUserID =  await db.query(`
            SELECT * FROM user_lists;
        `)
        let list_id = newUserID.rows[0].id;
        // add plants to the same list
        await PlantList.addPlant(list_id, 'peperomia');  
        await PlantList.addPlant(list_id, 'grape_ivy');
        await PlantList.addPlant(list_id, 'chinese_evergreen');
        //remove a plant
        await PlantList.removePlant(list_id, 'peperomia');

        let listOfPlants = await db.query(`
            SELECT * FROM plant_list WHERE user_list_id=${list_id}
        `)
        expect(listOfPlants.rows.length).toEqual(2);

    });

    test("error when deleting plants from empty list", async function () {
        // get list id to add plant to
        let newUserID =  await db.query(`
            SELECT * FROM user_lists;
        `)
        let list_id = newUserID.rows[0].id;
        try {
            // add plants to the same list
            await PlantList.addPlant(list_id, 'peperomia');  
            //remove a plant
            await PlantList.removePlant(list_id, 'peperomia');
            await PlantList.removePlant(list_id, 'peperomia');
            
        } catch (err) {
            expect(err instanceof ExpressError).toBeTruthy();  
        }

    });

});


"use strict";

const db = require("../db");
const { BadRequestError, ExpressError, NotFoundError } = require("../ExpressError");

/**Class that handles  */
class PlantList {

    /**Create a list of plants for a user with a list title, user, and the plant_list_id*/
    //id does not fill in automatically into db
    static async create(title, user) {
        //check if there is a similar list by the same user
        const checkDupe = await db.query(`
            SELECT list_name, user_id
            FROM user_lists
            WHERE user_id =$1 AND
            list_name=$2;
        `, [user, title]);

        //throw error if there is duplicate title with same user
        if (checkDupe.rows[0]) throw new BadRequestError('Duplicate list name');
        //add new list to db
        let newList = await db.query(`
            INSERT INTO user_lists
            (list_name, user_id)
            VALUES ($1, $2)
            RETURNING user_id, list_name;
        `, [title, user])
        return newList.rows;
    }

    /**Gets a list based off the id (or username?)
     * Additional Implementations**
    */
    static async getPlantList() {
        const lists = await db.query(`
            SELECT ul.id, ul.list_name, u.username as user
            FROM user_lists ul
            JOIN users u ON u.id = ul.user_id
            GROUP BY ul.id, ul.list_name, u.username;
        `);

        return lists.rows
    }

    /**Gets a single list based off list id */
    static async getList(list_id) {

        const listRes = await db.query(`
            SELECT ul.id, ul.list_name, u.username
            FROM user_lists ul
            JOIN users u ON u.id = ul.user_id
            WHERE ul.id=$1
            GROUP BY  ul.id, ul.list_name,u.username;
        `, [list_id])

        //check to see if list exists
        if (listRes.rows.length === 0) {
            throw new ExpressError("List cannot be found", 404);
        }

        const plants = await db.query(`
            SELECT pl.plant_id, p.plant_name FROM user_lists ul
            JOIN plant_list pl ON pl.user_list_id = ul.user_id
            JOIN plants p ON pl.plant_id = p.id
            WHERE pl.user_list_id = $1
            GROUP BY pl.plant_id, p.plant_name;
        `,[list_id])


        const { id, list_name, username } = listRes.rows[0];
        //return an array of each plant's id and name
        const plants_list = plants.rows.map(p => ({
            plant_id: p.plant_id,
            plant_name: p.plant_name
                
        }));

        return ({id, list_name, username, plants_list})

    }

    // /**allow only list name to be updated*/
    static async updateList(list_id, listName) {
        //check to see if it is the user, add parameter!

        //check if list exists
        let checkList = await db.query(`
        SELECT * FROM user_lists
        WHERE id = $1
        `, [list_id])
        
        if(checkList.rows.length === 0) throw new ExpressError("List cannot be found", 404);
        

        //update list name in db
        let res = await db.query(`
            UPDATE user_lists
            SET list_name = $1
            WHERE id = $2
            RETURNING  id, list_name, user_id;
        `,[listName,list_id])

        console.log(res.rows[0])
        return res.rows[0];
    }

    /**Delete the plant list if it is own user */
    static async delete(list_id) {

        let res = await db.query(`
            DELETE FROM user_lists
            WHERE id = $1
            RETURNING id;`, [list_id]
        );

        // Check if there is an id to be deleted
        if (res.rows.length === 0) {
            throw new BadRequestError("List cannot be found ", 404);
        }
    }
    
    /**Add plant to plant_list */
    static async addPlant(list_id, plant) {
        //check for duplicates in plant list
        let checkDupe = await db.query(`
            SELECT plant_id
            FROM plant_list
            WHERE plant_id = $1
        `, [plant])
        
        if(checkDupe.rows[0]) throw new BadRequestError('Duplicate plant in list.');

        let newPlant = await db.query(`
            INSERT INTO plant_list
            (user_list_id, plant_id)
            VALUES ($1, $2)
            RETURNING user_list_id, plant_id
        `, [list_id, plant])
        return newPlant.rows[0];
    }

    static async removePlant(list_id, plant) {
        
        let res = await db.query(`
            DELETE FROM plant_list
            WHERE user_list_id = $1 AND plant_id = $2
            RETURNING id plant_id
        `, [list_id, plant])

        // Check if there is an id to be deleted
        if (res.rows.length === 0) {
            throw new ExpressError("Plant cannot be found", 404);
        }
    }
}


module.exports = PlantList;

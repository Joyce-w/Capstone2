"use strict";

const db = require("../db");
const { BadRequestError, ExpressError, NotFoundError } = require("../ExpressError");

/**Class that handles  */
class PlantList {

    /**Create a list of plants for a user with a list title, user, and the plant_list_id*/
    static async create(title, user) {
        console.log(title, user)
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
            SELECT id, list_name, user_id
            FROM user_lists;
        `);

        return lists.rows
    }

    // /**Edit list name if it is own user*/
    // static async updateListName(user_id)

    // /**Delete the plant list if it is own user */
    // static async deletePlantList(user_id)
    
    // /**Add plant to plant_list */
    // static async addPlantToList(list_id, plant_id)

    // static async removePlantFromList(list_id, plant_id)

}


module.exports = PlantList;

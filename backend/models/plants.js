"use strict";

const db = require("../db");
const { BadRequestError } = require("../ExpressError");

/**Class that handles  */
class Plants {


    /**Adds plants  with minimum of id, plant_name, description, lighting, kid_friendly, pet_friendly, max_height, flowering, ideal_temp,environment*/
    static async addPlant(id, name, desc, lighting, k_fren, p_fren, height, has_flower, temp, envir, placements, shape, drought_tol,img) {
        /**Check if there is a duplicate plant name */
        const dupeCheck = await db.query(
            `SELECT plant_name
            FROM plants
            WHERE username = $1`,
            [name]
        );

        if (dupeCheck.rows[0]) {
            throw new BadRequestError(`There is already a ${name} in the database.`)
        }
        
        /**Insert data into plant table in db */
        const res = await db.query(
            `INSERT INTO plants
            id,
            plant_name,
            description,
            lighting,
            kid_friendly,
            pet_friendly,
            max_height,
            flowering,
            ideal_temp,
            environment,
            ideal_positions,
            general_shape,
            drought_tolerant,
            img
            VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)
            RETURNING plant_id, plant_name`,
            [id, name, desc, lighting, k_fren, p_fren, height, has_flower, temp, envir, placements, shape, drought_tol,img]
        )
        const plant = res.row[0];

        return plant;
    }


    /**grabs a plant based on plant_name 
     * Additional Implementations***
    */
    static async getPlant(id) {
        const res = await db.query(
            `SELECT id
            FROM plants
            WHERE id = $1`,
            [id]
        )
        return res.result[0];
    }

    /**grabs a plant based on plant_name 
     * Additional Implementations***
    */
    static async getAllPlants() {
        const res = await db.query(
            `SELECT
            id,
            plant_name,
            description,
            lighting,
            kid_friendly,
            pet_friendly,
            max_height,
            flowering
            FROM plants`
        )

        return res;
    }

    // /**Updates an existing plant based in plant_name, desc, light, k_friendly, p_friendly, height, flower, ideal_temp, environment */
    // static async updatePlant()

    // /**Delete a plant based on id
    // */
    // static async deletePlant()

}

module.exports =  Plants;
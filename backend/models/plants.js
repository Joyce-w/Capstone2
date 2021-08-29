"use strict";

const db = require("../db");
const { BadRequestError } = require("../ExpressError");

/**Class that handles  */
class Plants {


    /**Adds plants  with minimum of id, plant_name, details, lighting, kid_friendly, pet_friendly, max_height, flowering, ideal_temp,environment*/
    static async addPlant({id, plant_name, details, lighting, kid_friendly, pet_friendly, max_height, flowering=null, ideal_temp=null, environment=null, ideal_positions=null, general_shape=null, drought_tolerant=null, img=null}) {

        /**Check if there is a duplicate plant name */
        const dupeCheck = await db.query(
            `SELECT id, plant_name, details
            FROM plants
            WHERE id = $1`,
            [id]
        );
        if (dupeCheck.rows[0]){ throw new BadRequestError(`${plant_name} already exists in the db`)};
        
        /**Insert data into plant table in db */
        const res = await db.query(
            `INSERT INTO plants
            (id,
            plant_name,
            details,
            lighting,
            kid_friendly,
            pet_friendly,
            max_height,
            flowering,
            ideal_temp,
            environment,
            ideal_positions,
            general_shape
            ,drought_tolerant,
            img)
            VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)
            RETURNING id, plant_name`,
            [id, plant_name, details, lighting, kid_friendly, pet_friendly, max_height, flowering, ideal_temp, environment, ideal_positions, general_shape, drought_tolerant, img]
        )

        return (res.rows[0]);
    }


    /**grabs a plant based on plant_name 
     * Additional Implementations***
    */
    static async getPlant(plant_id) {
        const res = await db.query(
            `SELECT
            id,
            plant_name,
            details,
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
            FROM plants
            WHERE id = $1`,
            [plant_id]
        )
        return res.rows[0]
    }

    /**grabs a plant based on plant_name 
     * Additional Implementations***
    */
    static async getAllPlants() {
        const res = await db.query(
            `SELECT
            id,
            plant_name,
            details,
            lighting,
            kid_friendly,
            pet_friendly,
            max_height,
            flowering
            FROM plants`
        )

        return res.rows;
    }

    // /**Updates an existing plant based in plant_name, desc, light, k_friendly, p_friendly, height, flower, ideal_temp, environment */
    // static async updatePlant()

    // /**Delete a plant based on id
    // */
    // static async deletePlant()

}

module.exports =  Plants;
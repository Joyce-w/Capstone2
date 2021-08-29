"use strict";

const db = require("../db");
const { BadRequestError, ExpressError, NotFoundError } = require("../ExpressError");
const sqlForPartialUpdate = require("../helpers/sqlForPartialUpdate")

/**Class that handles  */
class Plants {


    /**Adds plants  with minimum of: id, plant_name, details, lighting, kid_friendly, pet_friendly, max_height, flowering, ideal_temp,environment*/
    static async create({id, plant_name, details, lighting, kid_friendly, pet_friendly, max_height, flowering=null, ideal_temp=null, environment=null, ideal_positions=null, general_shape=null, drought_tolerant=null, img=null}) {

        /**Check if there is a duplicate plant name */
        const dupeCheck = await db.query(
            `SELECT id, plant_name
            FROM plants
            WHERE id = $1`,
            [id]
        );
            console.log('dupecheck', dupeCheck)
        // condition is catching but nothing is throwing! 
        if (dupeCheck.rows[0]){throw new ExpressError("Duplicate plant", 400)};

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
            ideal_temp,
            environment,
            ideal_positions,
            general_shape,
            drought_tolerant,
            img
            FROM plants`
        )

        return res.rows;
    }

    /**Delete a plant based on id
        Additional Implementations: admin priv*/
    
    static async delete(id) {
        let res = await db.query(
            `DELETE FROM plants
            where id = $1
            RETURNING id`,
            [id]
        );
        // Check if there is an id to be deleted
        if (res.rows.length === 0) {
            throw new ExpressError("Plant cannot be found", 404);
        }
    }

    // /**Updates an existing plant based in plant_name, desc, light, k_friendly, p_friendly, height, flower, ideal_temp, environment */
    static async update(plant_id, req_body) {
        const { id, plant_name, details, lighting, kid_friendly, pet_friendly, max_height, flowering, ideal_temp, environment, ideal_positions, general_shape, drought_tolerant, img } = req_body;
    console.log(id, plant_name, details, lighting, kid_friendly, pet_friendly, max_height, flowering, ideal_temp, environment, ideal_positions, general_shape, drought_tolerant, img)        

        const result = await db.query(`
        UPDATE plants
        SET
        plant_name = $2,
        details = $3,
        lighting = $4,
        kid_friendly = $5,
        pet_friendly = $6,
        max_height = $7,
        flowering = $8,
        ideal_temp = $9,
        environment = $10,
        ideal_positions = $11,
        general_shape = $12,
        drought_tolerant = $13,
        img=$14
        WHERE id = $1
        RETURNING id, plant_name, details, lighting, kid_friendly, pet_friendly, max_height, flowering, ideal_temp, environment, ideal_positions, general_shape, drought_tolerant, img`,
            [id, plant_name, details, lighting, kid_friendly, pet_friendly, max_height, flowering, ideal_temp, environment, ideal_positions, general_shape, drought_tolerant, img]);

        return result.rows[0];
    }

}


module.exports =  Plants;
"use strict";

const db = require("../db");
const { BadRequestError, ExpressError, NotFoundError } = require("../ExpressError");
const sqlForPartialUpdate = require("../helpers/sqlForPartialUpdate")

/**Class that handles  */
class Plants {


    /**Adds plants  with minimum of: id, plant_name, details, lighting, kid_friendly, pet_friendly, max_height, flowering, min_temp, max_temp,environment*/
    static async create(req) {
        const { id, plant_name, details, lighting, kid_friendly, pet_friendly, max_height, flowering = null, min_temp = null, max_temp = null, environment = null, placements = null, drought_tolerant = null, img = null, air_purifying = null } = req;

        /**Check if there is a duplicate plant name */
        const dupeCheck = await db.query(
            `SELECT id, plant_name
            FROM plants
            WHERE id = $1`,
            [id]
        );

        // condition is catching but nothing is throwing! 
        if (dupeCheck.rows[0]) {
           throw new BadRequestError(`${id} already exists`) 
        } 
        
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
            min_temp,
            max_temp,
            environment,
            placements,
            drought_tolerant,
            img,
            air_purifying)
            VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15)
            RETURNING
            id,
            plant_name,
            details,
            lighting,
            kid_friendly,
            pet_friendly,
            max_height,
            flowering,
            min_temp,
            max_temp,
            environment,
            placements,
            drought_tolerant,
            img,
            air_purifying`,
            [id, plant_name, details, lighting, kid_friendly, pet_friendly, max_height, flowering, min_temp, max_temp, environment, placements,drought_tolerant, img, air_purifying]
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
            min_temp, max_temp,
            environment,
            placements,
            drought_tolerant,
            img,
            air_purifying
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
            min_temp,
            max_temp,
            environment,
            placements,
            drought_tolerant,
            img,
            air_purifying
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

    // /**Updates an existing plant based in plant_name, desc, light, k_friendly, p_friendly, height, flower, min_temp, max_temp, environment */
    static async update(plant_id, req_body) {
        const { id, plant_name, details, lighting, kid_friendly, pet_friendly, max_height, flowering, min_temp, max_temp, environment, placements, drought_tolerant, img, air_purifying } = req_body;
        
        console.log(req_body)
    // console.log(id, plant_name, details, lighting, kid_friendly, pet_friendly, max_height, flowering, min_temp, max_temp, environment, placements, drought_tolerant, img,air_purifying)        

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
        min_temp = $9,
        max_temp = $10,
        environment = $11,
        placements = $12,
        drought_tolerant = $13,
        img=$14,
        air_purifying=$15
        WHERE id = $1
        RETURNING id, plant_name, details, lighting, kid_friendly, pet_friendly, max_height, flowering, min_temp, max_temp, environment, placements,drought_tolerant, img, air_purifying`,
            [id, plant_name, details, lighting, kid_friendly, pet_friendly, max_height, flowering, min_temp,max_temp, environment, placements, drought_tolerant, img,air_purifying]);

        return result.rows[0];
    }

}


module.exports =  Plants;
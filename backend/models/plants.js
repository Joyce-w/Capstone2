"use strict";
const express = require('express');
const db = require("../db");
const { BadRequestError, ExpressError, NotFoundError } = require("../ExpressError");
const sqlForPartialUpdate = require("../helpers/sqlForPartialUpdate");

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
        //check if plant exists in db
        if (res.rows.length === 0) throw new NotFoundError(`${plant_id} does not exists.`);

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
            throw new NotFoundError("Plant cannot be found", 404);
        }
    }

    // /**Updates an existing plant based in plant_name, desc, light, k_friendly, p_friendly, height, flower, min_temp, max_temp, environment */
    static async update(plant_id, req_body) {
        const { setCols, values } = sqlForPartialUpdate(req_body, {});

        //sets the plant id to be 1 + the values length;
        const idVarIdx = "$" + (values.length + 1);

        const querySql =
            `UPDATE plants
            SET ${setCols}
            WHERE id = ${idVarIdx}
            RETURNING
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
            `
        const result = await db.query(querySql, [...values, plant_id]);
        const plant = result.rows[0];

        if (!plant) throw new NotFoundError(`No plant: ${plant_id}`);

        return plant;
       
    }

    // Filtering plants from quiz results
    
    static async filterPlants(searchFilters = {}) {

        let { pos, lighting, has_kids, has_pets, does_flower, watering } = searchFilters;

        const formatVal = (key_name) => {
            if (key_name === "1") {
                key_name = true;
                return key_name;
            } else if (key_name === "0") {
                key_name = false;
                return key_name;
            } else {
                key_name = undefined;
                return key_name;
            }
        }

        has_kids = formatVal(has_kids);
        has_pets = formatVal(has_pets);
        does_flower = formatVal(does_flower);
        pos = pos === '' ? undefined : pos;


        lighting = parseInt(lighting);
        if (pos === '') pos = undefined;
        console.log('res', pos, lighting, has_kids, has_pets, does_flower, watering)

        let whereExpressions = [];
        let queryValues = [];

        let query =
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

        /** For each parameter in searchFilter:
         * Adds the value into queryValue array 
         * Adds the current queryValues.length which will be used as the position for sql injection
         * */

        if (lighting !== undefined) {
            queryValues.push(lighting)
            whereExpressions.push(`lighting=$${queryValues.length}`)
        }
        if (watering !== 'unsure') {
            queryValues.push(watering)
            whereExpressions.push(`drought_tolerant=$${queryValues.length}`)
        }
        //write query and add value for keys with bool values
        if (has_kids !== undefined) {
            //pushes the value into queryValues
            queryValues.push(has_kids); 
            //pushes into where expression with sql injection
            whereExpressions.push(`kid_friendly=$${queryValues.length}`);
        }
        if (has_pets !== undefined) {
            //pushes the value into queryValues
            queryValues.push(has_pets);
            //pushes into where expression with sql injection
            whereExpressions.push(`pet_friendly=$${queryValues.length}`);
        }
        if (does_flower !== undefined) {
            //pushes the value into queryValues
            queryValues.push(does_flower);
            //pushes into where expression with sql injection
            whereExpressions.push(`flowering=$${queryValues.length}`);
        }
        if (pos !== undefined) {
            pos = pos.sort().join('%');
            queryValues.push(pos)
            whereExpressions.push(`placements LIKE $${queryValues.length}`)
        }

        //if there are expression, add WHERE syntax and join the values with 'AND'
        if (whereExpressions.length > 0) {
        query += " WHERE " + whereExpressions.join(" AND ");
        }

        console.log('queryValues', queryValues)
        console.log('query', query)

        let res = await db.query(query, queryValues);
        // let filteredPlants = res.rows.map(p => p.id)
        let filteredPlants = res.rows

        console.log('filteredPlants',filteredPlants)
        return filteredPlants;

    }

}


module.exports = Plants;


// SELECT id FROM plants WHERE lighting=5 AND drought_tolerant='high' AND kid_friendly=true AND pet_friendly=$4 AND flowering=$5 AND placements LIKE $6
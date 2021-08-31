"use strict";

const db = require("../db");
const { BadRequestError, ExpressError, NotFoundError } = require("../ExpressError");

/**
 * Filter method to return all plants that filters passed in
 *
 * @param searchFilters {Object} 
    {
        "pos": "FTW",
        "lighting": 4,
        "has_kids": true,
        "has_pets": false,
        "does_flower": false,
        "watering" : "medium"
    }

 * @returns {Array} [plant1, plant2]
 *
 * @example ["zz_plant", "monsterea", "hoya_hearts",...]
 */

async function filterPlants(searchFilters = {}) {

    const { pos, lighting, has_kids, has_pets, does_flower, watering } = searchFilters;    let query = `SELECT id FROM plants`

    let whereExpressions = [];
    let queryValues = [];
    

    /** For each parameter in searchFilter:
     * Adds the value into queryValue array 
     * Adds the current queryValues.length which will be used as the position for sql injection
     * */

    if (pos !== undefined) {
        queryValues.push(pos)
        whereExpressions.push(`placements=$${queryValues.length}`)
    }
    if (lighting !== undefined) {
        queryValues.push(lighting)
        whereExpressions.push(`lighting=$${queryValues.length}`)
    }
    if (watering !== undefined) {
        queryValues.push(watering)
        whereExpressions.push(`drought_tolerant=$${queryValues.length}`)
    }
    //write query and add value for keys with bool values
    if (has_kids !== undefined) {
        //pushes the value into queryValues
        queryValues.push(has_kids); 
        //pushes into where expression with sql injection
        whereExpressions.push(`kid_friendly = $${queryValues.length}`);
    }

    if (has_pets !== undefined) {
        //pushes the value into queryValues
        queryValues.push(has_pets);
        //pushes into where expression with sql injection
        whereExpressions.push(`pet_friendly = $${queryValues.length}`);
    }

    if (does_flower !== undefined) {
        //pushes the value into queryValues
        queryValues.push(does_flower);
        //pushes into where expression with sql injection
        whereExpressions.push(`flowering = $${queryValues.length}`);
    }

    //if there are expression, add WHERE syntax and join the values with 'AND'
    if (whereExpressions.length > 0) {
      query += " WHERE " + whereExpressions.join(" AND ");
    }

    console.log(whereExpressions)
    console.log(queryValues)

    let filteredPlants = await db.query(query, queryValues);

    return filteredPlants.rows;


}

module.exports = filterPlants;


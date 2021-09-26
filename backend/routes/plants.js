const express = require('express');
const router = new express.Router();
const { BadRequestError } = require("../ExpressError");
// const filterPlants = require('../helpers/filterPlants')

//require plant model
const Plant = require("../models/plants");

/* GET details about all plants 
[{id,plant_name,details,lighting,kid_friendly,pet_friendly,max_height,flowering,min_temp, max_temp,environment,placements,drought_tolerant,img},...]
*/
router.get('/', async function (req, res, next) {
    try {
        let plants = await Plant.getAllPlants();
        return res.json(plants)
    } catch (e) {
        next(e)
    }
});


/* GET details about a single plant based off plant_id 
[{id,plant_name,details,lighting,kid_friendly,pet_friendly,max_height,flowering,min_temp, max_temp, environment,placements,drought_tolerant,img},...]
*/
router.get("/:id", async function (req, res, next) {
    try {
        //get plant id from params
        const { id } = req.params;
        
        let plant = await Plant.getPlant(id);
        
        if (!plant) throw new BadRequestError;

        return res.json(plant);
    } catch (e) {
        next(e);
    }
})

/* GET details about plants from quiz results
*/
router.post('/results', async function (req, res, next) {
    try {
        let plants = await Plant.filterPlants(req.body);
        return res.json(plants)
    } catch (e) {
        next(e);
    }
});


/**
 * The folowing routes were created but have not been used yet in the application 
 * */

/* Add new plant data into db
* requires: {id,plant_name,details,lighting,kid_friendly,pet_friendly,max_height,flowering,min_temp, max_temp,environment} => id, plant_name
*/
router.post("/", async function (req, res, next) {
    try {
        console.log('created new plant')
        const plant = await Plant.create(req.body);
        
        return res.status(201).json(plant);
    } catch (e) {
        next(e)
    }
})


/**Updates a plant with the following optional properties: {details,lighting,kid_friendly,pet_friendly,max_height,flowering,min_temp, max_temp,environment,placements,drought_tolerant,img} 
 * No updates to id or name. Plant must be deleted and remade in that case.
*/
router.patch("/:id", async function (req, res, next) {
    try {
        // const { details, lighting, kid_friendly, pet_friendly, max_height, flowering, min_temp, max_temp, environment, placements,, drought_tolerant, img } = req.body;
        const plant = await Plant.update(req.params.id, req.body);
        return res.json({Updated: plant})

    } catch(e) {
        next(e)
    }
})

/**Deletes a plant from db based of id */
router.delete("/:id", async function (req, res, next) {
    try {
        await Plant.delete(req.params.id);
        return res.json({message: `Deleted ${req.params.id}`})
    } catch (e) {
        next(e)
    }
});

module.exports = router;

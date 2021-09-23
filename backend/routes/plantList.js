
const express = require('express');

const {BadRequestError} = require("../ExpressError");

//require plant model
const PlantList = require("../models/plantList");
const filterPlants = require('../helpers/filterPlants');
const { ensureLoggedIn } = require("../middleware/middleware")

const router = new express.Router();
/** Creates a new list that stores plants for a user */
router.post('/create', ensureLoggedIn, async function (req, res, next) {
    try {
        const {  list_name, user_id } = req.body;
        let plants = await PlantList.create(list_name, user_id);
        return res.status(201).json(plants);
    } catch (e) {
        next(e)
    }
});

/**GET all plant lists */
router.get("/", async function (req, res, next) {
    try {
        let plantList = await PlantList.getPlantList(data = {});
        return res.json(plantList);
    } catch (e) {
        next(e);
    }
})

/**GET a single plant list based on list_id */
router.get("/:list_id", async function (req, res, next) {
    try {
        console.log(req.params.list_id);
        let plantList = await PlantList.getList(req.params.list_id);
        return res.json(plantList);
    } catch (e) {
        next(e);
    }
})

router.patch("/:list_id", async function (req, res, next) {
    try {
        const { id, list_name } = req.body;
        let updateList = await PlantList.updateList(id, list_name);
        
        return res.json(updateList);
    } catch (e) {
        next(e)
    }
})

//**Deletes entire list */
router.delete("/:list_id", async function (req, res, next) {
    try {
        await PlantList.delete(req.params.list_id);
        return res.json({message: `List deleted`})
    } catch (e) {
        next(e);
    }
})




/**Methods for adding and removing plants from a list */

/*Adds a plant to a list based on list id*/
router.post("/:list_id", async function (req, res, next) {
    try {
        const { plant_id } = req.body;
        let plant = await PlantList.addPlant(req.params.list_id, plant_id);
        return res.json({new: plant});
    } catch (e) {
        // if (e) {
        //     console.log('error response data', e.message)
        //     setError(error)
        // }
        next(e);
    }
});

/**Removes a plant from a list with the list id and plant id */
router.delete("/:list_id/:plant_id", async function (req, res, next) {
    try {
        const { list_id, plant_id } = req.params;
        console.log( list_id, plant_id )
        await PlantList.removePlant(list_id, plant_id);
        return res.json({message: `Deleted ${plant_id}`})
    } catch (e) {
        next(e);
    }
});




module.exports = router;

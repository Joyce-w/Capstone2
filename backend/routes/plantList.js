
const express = require('express');
const router = new express.Router();
const {BadRequestError} = require("../ExpressError");

//require plant model
const PlantList = require("../models/plantList");

/**POST Creates a new list that stores plants for a user */
router.post('/newList', async function (req, res, next) {
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
        console.log('plant-list route HIT');
        let plantList = await PlantList.getPlantList();
        return res.json(plantList);
    } catch (e) {
        next(e);
    }
})

/**GET a single plant list based on list_id */
router.get("/:list_id", async function (req, res, next) {
    try {
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

router.delete("/:list_id", async function (req, res, next) {
    try {
        await PlantList.delete(req.params.id);
        return res.json({message: `List deleted`})
    } catch (e) {
        next(e);
    }
})

router.post("/:list_id", async function (req, res, next) {
    try {
        const { plant_id } = req.body;
        console.log(plant_id)
        let plant = await PlantList.addPlant(req.params.list_id, plant_id);
        return res.json({new: plant});
    } catch (e) {
        next(e);
    }
});

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

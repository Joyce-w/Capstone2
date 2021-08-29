const express = require('express');
const router = new express.Router();
const {BadRequestError} = require("../ExpressError");

//require plant model
const Plant = require("../models/plants");

/* GET users listing. */
router.get('/', async function (req, res, next) {
    try {
        let plants = await Plant.getAllPlants();
        return res.json(plants)
    } catch (e) {
        next(e)
    }
});

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

router.post("/", async function (req, res, next) {
    try {
        const plant = await Plant.addPlant(req.body);
        return res.status(201).json(plant);
    } catch (e) {
        
    }
})

module.exports = router;

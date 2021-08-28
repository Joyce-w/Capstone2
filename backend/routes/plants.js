var express = require('express');
var router = new express.Router();

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


module.exports = router;

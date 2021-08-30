
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
        console.log(req.params.list_id)
        let plantList = await PlantList.getList(req.params.list_id);
        return res.json(plantList);
    } catch (e) {
        next(e);
    }
})



// /* Add new plant data int db
// * requires: {id,plant_name,details,lighting,kid_friendly,pet_friendly,max_height,flowering,ideal_temp,environment} => id, plant_name
// */
// router.post("/", async function (req, res, next) {
//     try {
//         const plant = await Plant.create(req.body);
//         return res.status(201).json(plant);
//     } catch (e) {
        
//     }
// })

// /**Updates a plant with the following optional properties: {details,lighting,kid_friendly,pet_friendly,max_height,flowering,ideal_temp,environment,ideal_positions,general_shape,drought_tolerant,img} 
//  * No updates to id or name. Plant must be deleted and remade in that case.
// */
// router.put("/:id", async function (req, res, next) {
//     try {
//         // const { details, lighting, kid_friendly, pet_friendly, max_height, flowering, ideal_temp, environment, ideal_positions, general_shape, drought_tolerant, img } = req.body;


//         const plant = await Plant.update(req.params.id, req.body);
//         console.log('plant',plant);
//         return res.json({Updated: plant})

//     } catch(e) {
//         next(e)
//     }
// })

// /**Deletes a plant from db based of id */
// router.delete("/:id", async function (req, res, next) {
//     try {
//         await Plant.delete(req.params.id);
//         return res.json({message: `Deleted ${req.params.id}`})
//     } catch (e) {
//         next(e)
//     }
// });


module.exports = router;

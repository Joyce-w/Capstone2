const express = require('express');
const User = require('../models/user');
// const User = require('../models/user');
const router = new express.Router();
const Users = require("../models/user")


/* GET users listing and their corresponding list */
router.get('/', async function (req, res, next) {
  try {
    const users = await Users.getAllUsers();
    return res.json(users);    
  } catch (e) {
    next(e)
  }
});

/**GET single user form db */
router.get("/:user", async function (req, res,next ) {
  try {
    const user = await Users.getUser(req.params.user);
    return res.json(user);    
  } catch (e) {
    next(e)
  }
});

/**DELETE single user from datbase */
router.delete('/:user', async function (req, res, next) {
  try {
    await Users.remove(req.params.user);
    return res.status(201).json({messsage:`Removed user: ${req.params.user}`});  
  } catch (e) {
     next(e)
  }
})

/**GET plant-list pertaining to a particular user */
router.get("/:users/plant-list", async function (req, res, next) {
  try {

    const lists = await User.getUsersPlantList(req.params.users);
    return res.json(lists)
  } catch(e){
      next(e);
  }
})


/**
 * The folowing routes were created but have not been used yet in the application 
 * */

/**PATCH user updating username*/
router.patch("/:users", async function (req, res, next) {
  try {
    const user = await User.update(req.params.users, req.body);
    return res.json(user);
  } catch (e) {
    next(e);
  }
})


module.exports = router;

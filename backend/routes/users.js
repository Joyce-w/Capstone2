const express = require('express');
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

router.get("/:user", async function (req, res,next ) {
  try {
    const user = await Users.getUser(req.params.user);
    return res.json(user);    
  } catch (e) {
    next(e)
  }
});

router.delete('/:user', async function (req, res, next) {
  try {
    await Users.remove(req.params.user);
    return res.status(201).json({messsage:`Removed user: ${req.params.user}`});  
  } catch (e) {
     next(e)
  }
})

router.patch("/:users", async function (req, res, next) {
  try {
    const user = await User.update(req.params.users, req.body);
    return res.json(user);
  } catch (e) {
    next(e);
  }
})





module.exports = router;

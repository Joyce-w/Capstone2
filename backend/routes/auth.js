const express = require('express');
const router = new express.Router();
const Users = require("../models/user")
const { createToken } = require("../helpers/tokens");
const User = require('../models/user');

/** POST create new user
 * Requires: username, email and password
*/
router.post('/register', async function (req, res, next) {
  try {
    await Users.register(req.body);
    // const newUser = await User.getUser(username);
    // const userID = newUser['user']['id'];
    // //create a token with user info
    // const token = createToken(newUser,userID);
    return res.status(201).json({message: "Successfully registered."});    
  } catch(e) {
    next(e)
  }
});


/**POST route to login users with username and password */
router.post('/login', async function (req, res, next) {
  try {
    const { username, password } = req.body;

    await User.login(username, password);
    const newUser = await User.getUser(username);
    const userID = newUser['user']['id'];

    const token = createToken(newUser,userID);

    return res.status(201).json({ token });
    
  } catch (e) {
    next(e);
  }
})

/**POST route to login users with username and password */
router.post('/logout', async function (req, res, next) {
  try {
    //clear res.locals
    res.locals = null;
    console.log("User successfully signed out")
    return res.status(201).json({ message: "User successfully signed out" });
    
  } catch (e) {
    next(e);
  }
})



module.exports = router;

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
    let newUser = await Users.register(req.body);
    
    //create a token with user info
    const token = createToken(newUser);
    return res.status(201).json({token});    
  } catch(e) {
    next(e)
  }
});


/**POST route to login users with username and password */
router.post('/login', async function (req, res, next) {
  try {
    const { username, password } = req.body;

    const user = await User.login(username, password);

    const token = createToken(user);

    return res.status(201).json({ token });
    
  } catch (e) {
    next(e);
  }
})



module.exports = router;

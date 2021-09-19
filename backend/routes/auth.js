const express = require('express');
const router = new express.Router();
const Users = require("../models/user")
const { createToken } = require("../helpers/tokens");

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
      if (await Users.login(req.body)) {
    //create a token with user info
        
        //return  user.login()
        //pass user.login into createToken()

        const token = createToken(req.body);
          
      return res.status(201).json({token});  
    } 
    // return user;
  } catch (e) {
    next(e);
  }
})



module.exports = router;

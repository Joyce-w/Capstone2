const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");

/** return signed JWT from user data. */

function createToken(user, id) {


  let payload = {
    username: user.user.username,
    id: id
  };

  return jwt.sign(payload, SECRET_KEY);
}

module.exports = { createToken };
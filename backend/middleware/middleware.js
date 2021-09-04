const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");

/**Authenticate user 
 * If a token is provided, verifyt and store the payload into res.locals which is only the username.
 * If there is no token, it is not valid authenitcation.
 */

function authenticateJWT(req, res, next) {
  try {
    const authHeader = req.headers && req.headers.authorization;
    if (authHeader) {
        const token = authHeader.replace(/^[Bb]earer /, "").trim();
        console.log(token)
      res.locals.user = jwt.verify(token, SECRET_KEY);
    }
    return next();
  } catch (err) {
    return next();
  }
}

module.exports = { authenticateJWT };
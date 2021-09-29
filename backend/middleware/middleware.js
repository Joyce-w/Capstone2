const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");
const {UnauthorizedError} = require("../ExpressError");
/**Authenticate user 
 * If a token is provided, verify and store the payload into res.locals which is only the username.
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


/** Middleware to use when they must be logged in.
 *
 * If not, raises Unauthorized.
 */

function ensureLoggedIn(req, res, next) {
  try {
    // console.log('body', req.body)
    // console.log('middlewere', res.locals)
    
    if (!res.locals.user) throw new UnauthorizedError();

    return next();
  } catch (err) {
    return next(err);
  }
}

/** Middleware to use when they must provide a valid token & be user matching
   provided as route param.
 *
 *  If not, raises Unauthorized.
 */

function ensureCorrectUser(req, res, next) {
  try {
    const user = res.locals.user;

    if (req.body.user_id !== user.id) {
      throw new UnauthorizedError();
    }
    return next();
  } catch (err) {
    return next(err);
  }
}


module.exports = {
  authenticateJWT,
  ensureLoggedIn,
  ensureCorrectUser
};
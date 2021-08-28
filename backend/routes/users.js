var express = require('express');
var router = new express.Router();

//require the db
const db = "../db"

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
